# 04 — Go-live

**Durum:** Kanonik · **2026-09-10**

Birleşik: eski `40-go-live-checklist.md` + `54-plesk-deploy.md`.

Checkout SKU (üç): `tek-yazi`, `aylik-paket`, `surec-yonetimi`. `telefon-gorusme` satılmıyor (KVKK / kayıt ertelendi; eski dosyalar için backend kalır). Yatırım / kuruluş danışmanlığı görüşme + lead `yatirimci` — ayrı Stripe ürünü değil. Yerinde eşlik form hattıdır.

---

## Operatör sırası (bu doküman `ARCHITECT_TASKS` active_plan)

Kod tarafı hazır. Aşağıdakiler **sizin doldurduğunuz** değerler olmadan `--strict` yeşil olmaz. Docker’ı ajan başlatmaz; Plesk/Postgres siz açarsınız.

**Kodda bu tur kapanan (canlı öncesi):** prod’da unvan/NIP/adres/cron yoksa kapı kırmızı; kamu metin üyelik + şifre ile uyumlu; gizlilik env kimliği.

**Sizde kalan (ajan uyduramaz):** domain, SSL, şirket unvanı/NIP/adres, Stripe live, Resend SPF, RODO imza, 3 gerçek ödeme smoke.

1. Domain + SSL + `NEXT_PUBLIC_SITE_URL=https://…` (localhost değil)
2. Unvan / NIP / adres → `NEXT_PUBLIC_OPERATOR_LEGAL_NAME`, `_NIP`, `_ADDRESS` (gizlilik sayfası)
3. İletişim → `NEXT_PUBLIC_CONTACT_EMAIL` (+ telefon / WhatsApp E164)
4. Postgres (**Plesk Databases**, Docker değil) + `DATABASE_URL` + `npx prisma migrate deploy`
5. `STORAGE_BACKEND=fs` + `STORAGE_ROOT` (httpdocs dışı)
6. Stripe **live** (`sk_live_…`) + webhook `https://DOMAIN/api/webhooks/stripe` + `STRIPE_WEBHOOK_SECRET`
7. Resend + SPF/DKIM; `RESEND_API_KEY`, `CONTACT_EMAIL_FROM` / `_TO`
8. Panel: `PANEL_PASSWORD`, `PANEL_AUTH_SECRET`, `CUSTOMER_AUTH_SECRET`, `CRON_SECRET`
9. Plesk günlük cron: `scripts/plesk-cron.example.sh`
10. `npm run golive:check -- --strict` yeşil
11. Üç gerçek smoke (`docs/04-go-live.md` smoke)
12. RODO imza (`docs/05-uyum-rodo.md`) — kod şablon; imza sizin

Yerel geliştirme: `DATABASE_URL` kapalı = dosya deposu. `node scripts/local-bootstrap.mjs` Docker açmaz.

## Postgres (canlı — zorunlu)

Üyelik, aylık paket, Stripe makbuz ve purge Postgres ister. Bu makinede Docker kullanılmaz.

Plesk:

1. Databases → Add Database → **PostgreSQL**
2. Veritabanı adı + kullanıcı + parola (Plesk üretir)
3. Node env: `DATABASE_URL=postgresql://USER:PASS@localhost:5432/DB?schema=public` (host Plesk’in gösterdiği)
4. Uygulama kökünde: `npx prisma migrate deploy`
5. Restart Node

Yerelde `DATABASE_URL` yoksa site dosya deposu ile çalışır; `/hesabim` ve aylık paket tam gerçek olmaz.

---

## Önkoşullar

- [ ] Marka + domain + SSL
- [ ] `golive:check --strict` yeşil (`sk_test_` ve localhost SITE_URL fail)
- [ ] Postgres + `prisma migrate deploy`
- [ ] Stripe live + webhook URL
- [ ] Resend SPF/DKIM
- [ ] `STORAGE_BACKEND=fs` + `STORAGE_ROOT` (httpdocs dışı) veya Blob

## Plesk (özet)

```bash
npm run plesk:build
# Startup: node plesk-server.js
# Env: .env (PANEL_*, CUSTOMER_AUTH_SECRET, DATABASE_URL, STRIPE_*, RESEND_*, CRON_SECRET)
```

Detay: `docs/_archive/54-plesk-deploy.md`

## Cron (Plesk günlük)

Zamanlanmış görev, günde 1:

```bash
curl -fsS -X POST "https://YOUR_DOMAIN/api/cron/cleanup" -H "x-cron-secret: $CRON_SECRET"
```

Şablon: `scripts/plesk-cron.example.sh`

## Zorunlu env (prod)

`NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `STRIPE_*` (live), `RESEND_*`, `PANEL_*`, `CUSTOMER_AUTH_SECRET`, `CRON_SECRET`, depolama (`STORAGE_BACKEND=fs` veya Blob), RODO kimliği (`NEXT_PUBLIC_OPERATOR_*`).

## Smoke (3 gerçek dosya)

1. Tek yazı: başvuru (Bireysel veya Kurumsal) → ödeme → panel → sonuç → müşteri indir (`/hesabim` veya dosya linki)
2. Aylık paket: ödeme → dönem → portal yazı yükle
3. Muhasebeci ZIP ay sonu

Ek: `/hesabim` üye ol + giriş (e-posta + şifre); şifre unut = magic link.

## Eski dokümanlar

`docs/40-*`, `docs/54-*` → `_archive/`
