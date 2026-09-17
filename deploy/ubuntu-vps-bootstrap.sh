#!/usr/bin/env bash
# ROUTEPOL — Ubuntu VPS tek seferlik kurulum (Caddy + systemd + Postgres)
# Çalıştır: bash <(curl -fsSL https://raw.githubusercontent.com/memories-x/routpol/main/deploy/ubuntu-vps-bootstrap.sh)
set -euo pipefail

DOMAIN="${DOMAIN:-routpol.com}"
APP_DIR="${APP_DIR:-/var/www/routpol}"
DATA_DIR="${DATA_DIR:-/var/lib/sites/routpol}"
APP_PORT="${APP_PORT:-3000}"
REPO_URL="${REPO_URL:-https://github.com/memories-x/routpol.git}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "root olarak çalıştır"
  exit 1
fi

echo "[1/9] paketler"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl git ca-certificates gnupg ufw

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node -v
npm -v

echo "[2/9] postgres"
apt-get install -y postgresql postgresql-contrib
systemctl enable --now postgresql

DB_PASS="$(openssl rand -base64 24 | tr -d '/+=' | head -c 24)"
sudo -u postgres psql -v ON_ERROR_STOP=1 <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'routpol') THEN
    CREATE ROLE routpol LOGIN PASSWORD '${DB_PASS}';
  ELSE
    ALTER ROLE routpol WITH PASSWORD '${DB_PASS}';
  END IF;
END
\$\$;
SELECT 'CREATE DATABASE db_routpol OWNER routpol'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_routpol')\gexec
GRANT ALL PRIVILEGES ON DATABASE db_routpol TO routpol;
\c db_routpol
GRANT ALL ON SCHEMA public TO routpol;
SQL

echo "[3/9] dizinler + clone"
mkdir -p "${APP_DIR}" "${DATA_DIR}/data" "${DATA_DIR}/backups" "${DATA_DIR}/logs"
if [[ -f "${APP_DIR}/package.json" ]]; then
  cd "${APP_DIR}"
  git fetch --all
  git reset --hard origin/main || true
  git pull --ff-only || true
else
  rm -rf "${APP_DIR}"
  git clone "${REPO_URL}" "${APP_DIR}"
fi
cd "${APP_DIR}"
test -f package.json

echo "[4/9] .env"
PANEL_PASS="$(openssl rand -base64 12 | tr -d '/+=' | head -c 16)"
PANEL_SECRET="$(openssl rand -hex 32)"
CUSTOMER_SECRET="$(openssl rand -hex 32)"
CRON_SECRET="$(openssl rand -hex 24)"

cat > "${APP_DIR}/.env" <<EOF
NODE_ENV=production
PORT=${APP_PORT}
HOSTNAME=0.0.0.0

NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
NEXT_PUBLIC_DEFAULT_LOCALE=tr

DATABASE_URL=postgresql://routpol:${DB_PASS}@127.0.0.1:5432/db_routpol?schema=public

STORAGE_BACKEND=fs
STORAGE_ROOT=${DATA_DIR}/data

PANEL_PASSWORD=${PANEL_PASS}
PANEL_AUTH_SECRET=${PANEL_SECRET}
CUSTOMER_AUTH_SECRET=${CUSTOMER_SECRET}
CRON_SECRET=${CRON_SECRET}
TRUSTED_PROXY_HOPS=1

PACKAGE_CURRENCY=pln
INVOICE_PROVIDER=local
INVOICE_AUTO_ISSUE=
INVOICE_VAT_RATE=zw
INVOICE_EXEMPT_TAX_KIND=Zwolnienie z VAT na podstawie art. 113 ust. 1 ustawy o VAT

# Sonra doldur:
# STRIPE_SECRET_KEY=
# STRIPE_WEBHOOK_SECRET=
# SMTP_HOST=
# SMTP_PORT=587
# SMTP_USER=
# SMTP_PASS=
# SMTP_FROM=ROUTEPOL <faktury@${DOMAIN}>
# SELLER_NAME=
# SELLER_ADDRESS=
# SELLER_CITY=
# SELLER_NIP=
# RESEND_API_KEY=
# CONTACT_EMAIL_FROM=
# CONTACT_EMAIL_TO=
# NEXT_PUBLIC_CONTACT_EMAIL=
# NEXT_PUBLIC_OPERATOR_LEGAL_NAME=
# NEXT_PUBLIC_OPERATOR_NIP=
# NEXT_PUBLIC_OPERATOR_ADDRESS=
EOF
chmod 600 "${APP_DIR}/.env"
mkdir -p "${DATA_DIR}/secrets"
cp "${APP_DIR}/.env" "${DATA_DIR}/secrets/env.generated"
chmod 600 "${DATA_DIR}/secrets/env.generated"

echo "[5/9] npm + prisma + build"
npm ci
npx prisma migrate deploy
npm run build

echo "[6/9] systemd"
cat >/etc/systemd/system/routpol.service <<EOF
[Unit]
Description=ROUTEPOL Next.js
After=network.target postgresql.service

[Service]
Type=simple
WorkingDirectory=${APP_DIR}
EnvironmentFile=${APP_DIR}/.env
Environment=NODE_ENV=production
Environment=PORT=${APP_PORT}
Environment=HOSTNAME=0.0.0.0
ExecStart=/usr/bin/npm run start
Restart=on-failure
RestartSec=5
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable --now routpol
systemctl restart routpol

echo "[7/9] Caddy"
if ! command -v caddy >/dev/null 2>&1; then
  apt-get install -y debian-keyring debian-archive-keyring apt-transport-https
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -y
  apt-get install -y caddy
fi

cat >/etc/caddy/Caddyfile <<EOF
${DOMAIN}, www.${DOMAIN} {
	encode gzip
	reverse_proxy 127.0.0.1:${APP_PORT}
	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
		X-Content-Type-Options nosniff
		Referrer-Policy strict-origin-when-cross-origin
	}
	log {
		output file ${DATA_DIR}/logs/caddy-access.log
	}
}
EOF
caddy validate --config /etc/caddy/Caddyfile
systemctl enable --now caddy
systemctl reload caddy

echo "[8/9] firewall"
ufw allow OpenSSH || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw --force enable || true

echo "[9/9] cron"
cat >/etc/cron.d/routpol <<EOF
15 3 * * * root curl -fsS -X POST "https://${DOMAIN}/api/cron/cleanup" -H "x-cron-secret: ${CRON_SECRET}" >> ${DATA_DIR}/logs/cron.log 2>&1
EOF
chmod 644 /etc/cron.d/routpol

echo
echo "========== KURULUM BİTTI =========="
systemctl --no-pager --full status routpol | sed -n '1,12p' || true
echo
echo "Panel şifresi: ${PANEL_PASS}"
echo "Secrets kopyası: ${DATA_DIR}/secrets/env.generated"
echo "DNS A kaydı: ${DOMAIN} + www → bu VPS IP"
echo "Stripe / SMTP / SELLER sonra .env içine"
echo "==================================="
