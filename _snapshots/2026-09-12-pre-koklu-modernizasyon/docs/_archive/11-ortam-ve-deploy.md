# Ortam, Git & Deploy

## Geliştirme

| Bileşen | Hedef |
|---------|--------|
| Node.js | 20 LTS veya 22 LTS |
| Paket | `npm` |
| Local store | `data/cases` + `data/uploads` (yalnızca development) |

## Production (zorunlu)

| Bileşen | Hedef |
|---------|--------|
| Hosting | **Plesk Node.js** (`docs/54-plesk-deploy.md`) — Vercel alternatif |
| Dosya | Disk `STORAGE_BACKEND=fs` (Plesk) veya Vercel Blob |
| Veritabanı | Postgres (`DATABASE_URL`) |
| Ödeme | Stripe live + webhook |
| E-posta | Resend (doğrulanmış domain) |
| Kontrol | `npm run golive:check` / `--strict` |

Detay: `docs/40-go-live-checklist.md` · şablon env: `.env.example`

## Local vs prod store

- **Dev:** filesystem (`data/`)
- **Plesk prod:** filesystem (`STORAGE_ROOT` veya `data/uploads`) + Postgres
- **Vercel prod:** Blob + Postgres

## Domain & iletişim (operatör)

`NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_E164`, operator NIP/unvan env ile.
