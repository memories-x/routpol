# Plesk Node.js — canlı yayın (panel + site + API)

**Hedef:** Aynı Next.js uygulaması Plesk üzerinde çalışır. Operatör paneli: `https://YOUR_DOMAIN/panel`

Blob / Vercel **zorunlu değil**. Dosyalar diskte; veriler Plesk Postgres’te.

---

## 1) Plesk hazırlık

1. Domain + SSL (Let’s Encrypt)  
2. **Node.js** eklentisi (Node **20** veya **22**)  
3. **PostgreSQL** veritabanı + kullanıcı (Plesk Databases)  
4. Git ile kodu Application Root’a alın (ör. `httpdocs` veya `httpdocs/app`)

Application Root **proje kökü** olmalı (`package.json` burada).

---

## 2) Node.js uygulaması (Plesk)

| Alan | Değer |
|------|--------|
| Node version | 20 LTS veya 22 LTS |
| Application mode | `production` |
| Application root | Git clone kökü |
| Application startup file | `plesk-server.js` |
| Custom environment | aşağıdaki env |

İlk kurulum SSH (önerilir):

```bash
cd /var/www/vhosts/YOUR_DOMAIN/httpdocs
npm ci
npx prisma migrate deploy
npm run plesk:build
```

Plesk “NPM install” + “Run script `plesk:build`” da kullanılabilir. Sonra uygulamayı **Restart**.

`plesk:build` = `prisma generate` + `next build` + standalone dosyaları kopyala.

---

## 3) Env (Plesk Node.js → Custom environment variables)

Zorunlu:

| Değişken | Örnek / not |
|----------|-------------|
| `NODE_ENV` | `production` |
| `HOSTNAME` | `0.0.0.0` |
| `STORAGE_BACKEND` | `fs` |
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR_DOMAIN` (slash yok) |
| `DATABASE_URL` | `postgresql://USER:PASS@localhost:5432/DB?schema=public` |
| `PANEL_PASSWORD` | güçlü parola — `/panel` girişi |
| `PANEL_AUTH_SECRET` | uzun rastgele (32+ karakter) |
| `CUSTOMER_AUTH_SECRET` | ayrı uzun rastgele |
| `CASE_VIEW_SECRET` | (isteğe bağlı) dosya `vt` imzası; yoksa `CUSTOMER_AUTH_SECRET` |
| `STRIPE_SECRET_KEY` | `sk_live_…` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` |
| `RESEND_API_KEY` | Resend |
| `CONTACT_EMAIL_TO` | sizin inbox |
| `CONTACT_EMAIL_FROM` | doğrulanmış gönderen |
| `PACKAGE_CURRENCY` | `pln` |

Önerilen:

| Değişken | Ne |
|----------|-----|
| `STORAGE_ROOT` | httpdocs dışı klasör, ör. `…/private/pol-turk-data` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | sitede görünen e-posta |
| `NEXT_PUBLIC_CONTACT_PHONE` | telefon |
| `NEXT_PUBLIC_WHATSAPP_E164` | `48…` |
| `NEXT_PUBLIC_OPERATOR_LEGAL_NAME` | unvan |
| `NEXT_PUBLIC_OPERATOR_NIP` | NIP |
| `NEXT_PUBLIC_OPERATOR_ADDRESS` | adres |

**Koyulmaz (Plesk disk kullanıyorsanız):** `BLOB_READ_WRITE_TOKEN`  
**Kapalı kalsın:** `INVOICE_AUTO_ISSUE`

Kontrol (sunucuda):

```bash
PLESK_ENV=production npm run golive:check -- --strict
```

---

## 4) Nginx / Apache sızıntı kilidi

- `deploy/plesk-nginx.conf` → Domain → Apache & nginx → **Additional nginx directives**
- veya `deploy/plesk.htaccess` içeriğini Additional Apache directives’e

`STORAGE_ROOT` httpdocs dışında ise upload’lar zaten web kökünde olmaz.

---

## 5) Stripe webhook

Endpoint: `https://YOUR_DOMAIN/api/webhooks/stripe`  
Event: `checkout.session.completed`  
Dashboard fatura/makbuz e-postası **kapalı**.

---

## 6) Panel

- URL: `https://YOUR_DOMAIN/panel`  
- Şifre: `PANEL_PASSWORD`  
- Oturum cookie: `pt_panel_session` (12 saat, HttpOnly)

İlk girişten sonra kuyruk, sonuç yükleme, Faturalar ZIP aynı akış (`docs/53-operator-playbook.md`).

---

## 7) Güncelleme (yeni kod)

```bash
git pull
npm ci
npx prisma migrate deploy
npm run plesk:build
```

Plesk Node.js uygulamasını **Restart**.

---

## 8) Smoke

1. `https://YOUR_DOMAIN/tr` açılıyor  
2. `/panel/login` → panel  
3. `/tr/basvuru` test ödemesi (Stripe test veya live)  
4. Webhook sonrası panelde `paid`  
5. Sonuç yükle → müşteri dosya sayfası  

---

**Not:** Anahtarlar Git’e yazılmaz. Plesk env + `.env` (sunucuda, web dışı).
