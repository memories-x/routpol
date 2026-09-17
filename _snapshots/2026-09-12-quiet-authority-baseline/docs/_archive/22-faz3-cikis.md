# Faz 3 Çıkış Raporu

Tarih: 2026-08-05  
Sürüm: 0.3.0

## Checklist

| Kapı | Durum |
|------|--------|
| `npm run build` | ✅ |
| Form RHF + Zod client/server | ✅ |
| Honeypot + min-fill | ✅ |
| Rate limit 429 | ✅ |
| KVKK checkbox | ✅ |
| Dosya UI-only + not | ✅ |
| Mail adapter (noop) | ✅ |
| robots + sitemap | ✅ |
| Disclaimer + gizlilik | ✅ |
| FAB env-gated | ✅ |

## Manuel QA (operatör)

- [ ] T1 Chrome 390 — form submit başarı
- [ ] T3 Desktop — header + dil yakında
- [ ] T4 Keyboard — accordion / focus
- [ ] T6 PL dil — yakında bandı
- [ ] WA: env boşken FAB yok; doluyken açılır

## Ship kararı

**Teknik ship (TR local/preview):** Evet — kod hazır.  
**Canlı domain / gerçek WA / gerçek e-posta:** Operatör env + Vercel deploy sonrası.

## Deploy (operatör)

```bash
# Vercel CLI veya dashboard ile bu klasörü bağla
npx vercel
```

Env (Vercel Project Settings):

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_E164` (opsiyonel)
- `NEXT_PUBLIC_DEFAULT_LOCALE=tr`
- `CONTACT_EMAIL_TO` (Faz 4 mail için)

## Sonraki faz

Faz 4: PL/EN metin, hizmet detay sayfaları, Resend.
