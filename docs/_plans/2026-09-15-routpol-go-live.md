# routpol.com — canlı alma runbook (operatör)

**Domain (DNS doğrulandı):** `routpol.com` → `2.57.91.91` (Hostinger)  
**Yazım notu:** `routepol.com` değil; doğru alan adı **`routpol.com`**.

**Hedef URL:** `https://routpol.com`  
**Env:** `NEXT_PUBLIC_SITE_URL=https://routpol.com`

---

## Kritik önkoşul

Bu uygulama **Next.js + Node + PostgreSQL** ister.  
Hostinger’da yalnızca **domain + shared/PHP hosting** varsa site buraya **deploy edilemez**.

Gerekli ürün:
- **VPS + Plesk** (kanon yol), veya
- Hostinger **VPS** üzerinde Node 20 + Postgres (Plesk yoksa manuel Node)

hPanel’de “Websites / PHP” görüyorsanız → önce **VPS veya Plesk** alın.

---

## Plesk yolu (kanon)

1. Plesk’te domain `routpol.com` + Let’s Encrypt SSL  
2. Databases → PostgreSQL → `DATABASE_URL`  
3. Node.js app (20/22), root = repo, startup = `plesk-server.js`  
4. Env (özet):

```
NODE_ENV=production
HOSTNAME=0.0.0.0
NEXT_PUBLIC_SITE_URL=https://routpol.com
STORAGE_BACKEND=fs
STORAGE_ROOT=<httpdocs dışı path>
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=...
CONTACT_EMAIL_FROM=...
CONTACT_EMAIL_TO=...
PANEL_PASSWORD=...
PANEL_AUTH_SECRET=...
CUSTOMER_AUTH_SECRET=...
CRON_SECRET=...
NEXT_PUBLIC_OPERATOR_LEGAL_NAME=...
NEXT_PUBLIC_OPERATOR_NIP=...
NEXT_PUBLIC_OPERATOR_ADDRESS=...
NEXT_PUBLIC_CONTACT_EMAIL=...
```

5. SSH:

```bash
cd /var/www/vhosts/routpol.com/httpdocs   # path Plesk’e göre
npm ci
npx prisma migrate deploy
npm run plesk:build
# Plesk Node → Restart
```

6. Stripe webhook: `https://routpol.com/api/webhooks/stripe`  
7. Resend: domain `routpol.com` SPF/DKIM  
8. Cron: `POST https://routpol.com/api/cron/cleanup` + `x-cron-secret`  
9. `PLESK_ENV=production npm run golive:check -- --strict`

Kaynak: `docs/04-go-live.md`, `docs/_archive/54-plesk-deploy.md`

---

## Ajanın yapamayacağı

- Hostinger ödeme / VPS satın alma  
- Plesk şifresi olmadan sunucuya kurulum  
- Stripe live / Resend anahtarlarını sizin yerinize oluşturma  

Bunlar panelde siz + ajan birlikte (oturum açıkken) ilerler.
