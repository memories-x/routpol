# 04 — Go-live

**Durum:** Kanonik · **2026-08-19**

Birleşik: eski `40-go-live-checklist.md` + `54-plesk-deploy.md`.

---

## Önkoşullar

- [ ] Marka + domain + SSL
- [ ] `golive:check --strict` yeşil
- [ ] Postgres + `prisma migrate deploy`
- [ ] Stripe live + webhook URL
- [ ] Resend SPF/DKIM
- [ ] `STORAGE_BACKEND=fs` + `STORAGE_ROOT` (httpdocs dışı) veya Blob

## Plesk (özet)

```bash
npm run plesk:build
# Startup: node plesk-server.js
# Env: .env (PANEL_*, CUSTOMER_AUTH_SECRET, DATABASE_URL, STRIPE_*, RESEND_*)
```

Detay: `docs/_archive/54-plesk-deploy.md`

## Zorunlu env (prod)

`NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `STRIPE_*`, `RESEND_*`, `PANEL_*`, `CUSTOMER_AUTH_SECRET`, depolama (`STORAGE_BACKEND=fs` veya Blob).

## Smoke (3 gerçek dosya)

1. Tek yazı: başvuru → ödeme → panel → sonuç → müşteri indir
2. Aylık paket: ödeme → dönem → portal yazı yükle
3. Muhasebeci ZIP ay sonu

## Eski dokümanlar

`docs/40-*`, `docs/54-*` → `_archive/`
