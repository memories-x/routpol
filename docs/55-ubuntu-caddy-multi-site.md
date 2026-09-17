# 55 — Ubuntu panelsiz (Caddy) · çok site · iç runbook

**Durum:** İç operasyon · **2026-09-17**  
**Kilit:** Plesk yok. Bir VPS’te birden fazla site. ROUTEPOL = Node (Next) + Postgres + Caddy (TLS) + systemd.  
**İlgili:** `docs/04-go-live.md` (env/smoke), `docs/51-stripe-ksef-faturalar.md` (Stripe + yerel fatura).

Bu dosya **içeriye dönük**dür: SSH ile adım adım. Ajan secret uydurmaz; siz doldurursunuz.

---

## 0) Hedef mimari (çok site)

```
İnternet
   │  :443
   ▼
 Caddy  (SNI → site)
   │
   ├── routpol.com      → 127.0.0.1:3000   (ROUTEPOL / Next)
   └── baska-site.pl    → 127.0.0.1:3001   (ileride)
   
 Postgres (localhost:5432)
   ├── db_routpol
   └── db_baska          (ileride)

 Disk (web kökü DIŞI)
   /var/lib/sites/routpol/data     ← STORAGE_ROOT
   /var/lib/sites/baska/data
```

| Parça | Rol |
|--------|-----|
| Caddy | TLS + reverse proxy; site başına blok |
| systemd | `routpol.service` → `next start` PORT=3000 |
| Postgres | site başına **ayrı database + user** |
| Kod | `/var/www/routpol` (git clone / rsync) |

**Yapma:** Docker (bu projede canlıda yok), uygulamayı `httpdocs` altına data koyma, tek DB’yi iki siteye paylaştırma.

---

## 1) Sunucu hazırlık (bir kez)

SSH root veya sudo user:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw fail2ban ca-certificates gnupg
```

Firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

Hostname (isteğe bağlı):

```bash
sudo hostnamectl set-hostname vps-routpol
```

---

## 2) Node 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # v20.x
npm -v
```

---

## 3) Postgres (bir kez; DB site başına)

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable --now postgresql
```

ROUTEPOL DB (parolayı siz seçin, kaydedin):

```bash
sudo -u postgres psql <<'SQL'
CREATE USER routpol WITH PASSWORD 'CHANGE_ME_STRONG';
CREATE DATABASE db_routpol OWNER routpol;
GRANT ALL PRIVILEGES ON DATABASE db_routpol TO routpol;
\c db_routpol
GRANT ALL ON SCHEMA public TO routpol;
SQL
```

İkinci site örneği (ileride):

```bash
# CREATE USER site2 ... CREATE DATABASE db_site2 ...
```

Bağlantı dizesi (app `.env`):

```
DATABASE_URL=postgresql://routpol:CHANGE_ME_STRONG@127.0.0.1:5432/db_routpol?schema=public
```

---

## 4) Dizinler (çok site şablonu)

```bash
sudo mkdir -p /var/www/routpol
sudo mkdir -p /var/lib/sites/routpol/{data,backups,logs}
sudo mkdir -p /var/www/_template   # ileride kopya için

# Deploy kullanıcısı (önerilen)
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG www-data deploy
sudo chown -R deploy:deploy /var/www/routpol /var/lib/sites/routpol
```

İkinci site:

```bash
sudo mkdir -p /var/www/SITE2 /var/lib/sites/SITE2/{data,backups,logs}
sudo chown -R deploy:deploy /var/www/SITE2 /var/lib/sites/SITE2
```

---

## 5) Kodu koy

`deploy` olarak:

```bash
sudo -iu deploy
cd /var/www/routpol
git clone YOUR_REPO_URL .
# veya rsync / scp ile yükle
```

`.env` oluştur (`/var/www/routpol/.env`) — **secrets burada**, git’e girmez:

```bash
nano /var/www/routpol/.env
```

Minimum (canlı iskelet; değerleri siz):

```env
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

NEXT_PUBLIC_SITE_URL=https://routpol.com
NEXT_PUBLIC_DEFAULT_LOCALE=tr

DATABASE_URL=postgresql://routpol:CHANGE_ME_STRONG@127.0.0.1:5432/db_routpol?schema=public

STORAGE_BACKEND=fs
STORAGE_ROOT=/var/lib/sites/routpol/data

PANEL_PASSWORD=
PANEL_AUTH_SECRET=
CUSTOMER_AUTH_SECRET=
CRON_SECRET=
TRUSTED_PROXY_HOPS=1

# Stripe — ödeme kesinliği (Dashboard invoice/receipt KAPALI)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
PACKAGE_CURRENCY=pln

# Yerel fatura (Stripe makbuzu değil)
INVOICE_PROVIDER=local
INVOICE_AUTO_ISSUE=
INVOICE_VAT_RATE=zw
INVOICE_EXEMPT_TAX_KIND=Zwolnienie z VAT na podstawie art. 113 ust. 1 ustawy o VAT
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=ROUTEPOL <faktury@routpol.com>
SELLER_NAME=
SELLER_ADDRESS=
SELLER_CITY=
SELLER_NIP=

# Lead/portal mail (Resend) — fatura SMTP ayrı
CONTACT_EMAIL_FROM=ROUTEPOL <noreply@routpol.com>
CONTACT_EMAIL_TO=
# RESEND_API_KEY=

NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_OPERATOR_LEGAL_NAME=
NEXT_PUBLIC_OPERATOR_NIP=
NEXT_PUBLIC_OPERATOR_ADDRESS=
```

İzin:

```bash
chmod 600 /var/www/routpol/.env
```

---

## 6) Build + migrate

```bash
cd /var/www/routpol
npm ci
npx prisma migrate deploy
npm run build
```

Hızlı smoke (Caddy öncesi):

```bash
PORT=3000 npm run start
# başka SSH: curl -I http://127.0.0.1:3000
# Ctrl+C
```

---

## 7) systemd (site başına bir unit)

`/etc/systemd/system/routpol.service`:

```ini
[Unit]
Description=ROUTEPOL Next.js
After=network.target postgresql.service

[Service]
Type=simple
User=deploy
WorkingDirectory=/var/www/routpol
EnvironmentFile=/var/www/routpol/.env
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=0.0.0.0
ExecStart=/usr/bin/npm run start
Restart=on-failure
RestartSec=5
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now routpol
sudo systemctl status routpol
sudo journalctl -u routpol -f
```

İkinci site: `site2.service` → `PORT=3001`, `WorkingDirectory=/var/www/SITE2`.

---

## 8) Caddy (TLS + çok site)

Kurulum:

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy
```

`/etc/caddy/Caddyfile`:

```caddy
# --- ROUTEPOL ---
routpol.com, www.routpol.com {
	encode gzip
	reverse_proxy 127.0.0.1:3000
	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
		X-Content-Type-Options nosniff
		Referrer-Policy strict-origin-when-cross-origin
	}
	log {
		output file /var/lib/sites/routpol/logs/caddy-access.log
	}
}

# --- İleride ikinci site ---
# baska-site.pl, www.baska-site.pl {
# 	encode gzip
# 	reverse_proxy 127.0.0.1:3001
# }
```

DNS (Hostinger vb.): domain **A kaydı** → VPS public IP. Caddy otomatik Let’s Encrypt alır (80/443 açık olmalı).

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl enable --now caddy
sudo systemctl reload caddy
```

Kontrol: `https://routpol.com` → 200.

---

## 9) Cron (site başına)

`/etc/cron.d/routpol`:

```cron
# günde 1 — cleanup / outbox
15 3 * * * deploy curl -fsS -X POST "https://routpol.com/api/cron/cleanup" -H "x-cron-secret: CRON_SECRET_BURAYA" >/var/lib/sites/routpol/logs/cron.log 2>&1
```

`CRON_SECRET` = `.env` ile aynı.

---

## 10) Stripe + fatura (canlı öncesi)

1. Stripe Dashboard → Webhook: `https://routpol.com/api/webhooks/stripe`  
2. Events: en az `checkout.session.completed` (+ abonelik için `invoice.paid`, `customer.subscription.*`)  
3. Customer emails: **invoices / receipts kapalı**  
4. `.env`: `STRIPE_*` + `INVOICE_PROVIDER=local` + `SELLER_*` + `SMTP_*`  
5. `npm run golive:check:strict` (sunucuda, env doluyken)

Detay: `docs/51-stripe-ksef-faturalar.md`.

---

## 11) Deploy güncelleme (tekrarlayan)

```bash
sudo -iu deploy
cd /var/www/routpol
git pull
npm ci
npx prisma migrate deploy
npm run build
sudo systemctl restart routpol
```

İkinci site aynı kalıp, kendi dizin / PORT / unit.

---

## 12) Yedek (iç)

Günlük örnek (root crontab):

```bash
0 2 * * * pg_dump -U routpol db_routpol | gzip > /var/lib/sites/routpol/backups/db-$(date +\%F).sql.gz
0 2 * * * tar -czf /var/lib/sites/routpol/backups/data-$(date +\%F).tgz -C /var/lib/sites/routpol data
```

`.env` yedeğini ayrı güvenli yerde tutun (disk tarball’a koyma).

---

## 13) Kontrol listesi

- [ ] UFW: 22/80/443  
- [ ] Node 20 + Postgres + Caddy  
- [ ] `/var/www/routpol` + `/var/lib/sites/routpol/data`  
- [ ] `.env` 600; `INVOICE_PROVIDER=local`  
- [ ] `prisma migrate deploy` + `npm run build`  
- [ ] `routpol.service` active  
- [ ] DNS A → VPS; HTTPS yeşil  
- [ ] Stripe webhook + local SMTP/seller  
- [ ] Cron cleanup  
- [ ] Smoke: tek yazı ödeme (test key ile önce)

---

## Port planı (çok site)

| Site | App port | systemd | DB |
|------|----------|---------|-----|
| routpol.com | 3000 | routpol.service | db_routpol |
| site-2 | 3001 | site2.service | db_site2 |
| site-3 | 3002 | site3.service | db_site3 |

Caddy yalnızca 443 dinler; app portları localhost’ta kalır (UFW’de 3000+ açma).
