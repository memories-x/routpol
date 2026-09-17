# Canlıya çıkış kontrol listesi (operatör)

**Kod tarafı (agent):** Disk store (Plesk) veya Blob, production fail-closed, iletişim env.  
**Sizin doldurmanız gerekenler:** aşağıdaki anahtarlar + domain.

**Plesk adım adım:** `docs/54-plesk-deploy.md`

---

## 1) Plesk (varsayılan) veya Vercel

- [ ] Domain + SSL (`NEXT_PUBLIC_SITE_URL=https://…`)
- [ ] Node 20/22 uygulama, startup: `plesk-server.js`
- [ ] `npm run plesk:build` + Restart
- [ ] Stripe webhook: `https://YOUR_DOMAIN/api/webhooks/stripe`

## 2) Env (Plesk Node.js → Custom environment variables)

Zorunlu (production fail-closed):

| Değişken | Ne |
|----------|-----|
| `NEXT_PUBLIC_SITE_URL` | `https://…` (localhost değil) |
| `STORAGE_BACKEND` | `fs` (Plesk disk) |
| `STRIPE_SECRET_KEY` | `sk_live_…` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` |
| `RESEND_API_KEY` | Resend |
| `CONTACT_EMAIL_TO` | Gelen teklifler (sizin inbox) |
| `CONTACT_EMAIL_FROM` | Doğrulanmış domain gönderen |
| `PANEL_PASSWORD` | Güçlü parola (`/panel`) |
| `PANEL_AUTH_SECRET` | Uzun rastgele string |
| `CUSTOMER_AUTH_SECRET` | Müşteri portal oturumu (magic link) |
| `DATABASE_URL` | Plesk Postgres |

Vercel kullanırsanız ek: `BLOB_READ_WRITE_TOKEN` (`STORAGE_BACKEND=fs` yok).

Önerilen:

| Değişken | Ne |
|----------|-----|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Sitede görünen e-posta |
| `NEXT_PUBLIC_CONTACT_PHONE` | Telefon |
| `NEXT_PUBLIC_WHATSAPP_E164` | `48…` |
| `NEXT_PUBLIC_OPERATOR_LEGAL_NAME` | Unvan |
| `NEXT_PUBLIC_OPERATOR_NIP` | NIP |
| `NEXT_PUBLIC_OPERATOR_ADDRESS` | Adres |

Kontrol:

```bash
npm run golive:check
```

## 3) Resend

- [ ] Domain doğrulandı (SPF/DKIM)
- [ ] `CONTACT_EMAIL_FROM` o domainden
- [ ] Test: teklif formu + ödeme sonrası müşteri link maili

## 4) Stripe

- [ ] Live mode
- [ ] Webhook events: `checkout.session.completed`
- [ ] Dashboard: customer invoice / receipt e-postaları **kapalı** (`docs/51`)
- [ ] Test ödemesi → panelde `paid` → Faturalar ay paketi ZIP → muhasebeci keser → sonuç yükle → müşteri indir

## 4b) Muhasebeci / KSeF (siz girmezsiniz)

- [ ] Muhasebeci Fakturownia veya eşdeğeri + KSeF
- [ ] Ay sonu: `/panel/faturalar` → Ay paketi (ZIP) e-posta
- [ ] Stripe invoice/receipt e-postası kapalı
- [ ] `INVOICE_AUTO_ISSUE` kapalı kalsın (çift fatura olmasın)

## 5) Dosya + Database

- [ ] Plesk: `STORAGE_BACKEND=fs` (+ isteğe `STORAGE_ROOT` httpdocs dışı)  
- [ ] veya Vercel Blob token  
- [ ] Postgres (`DATABASE_URL`) — Plesk PostgreSQL  
- [ ] `npx prisma migrate deploy`  
- [ ] Upload → panel → müşteri “Verilerimi indir” smoke  

## 6) Hukuk / operasyon (kod dışı)

- [ ] Avukat ortağı yazılı anlaşma (`docs/41-avukat-ortak-sozlesme-sablon.md`)
- [ ] Yeminli tercüman yönlendirme ücreti net
- [ ] Panel erişimi yalnızca size

## 7) Smoke (canlı)

1. `/tr/basvuru` → tek yazı → PDF → Stripe  
2. Başarı sayfası + e-posta linki  
3. `/panel` → mektup indir → sonuç yükle  
4. Müşteri “hazır” maili + indirme  
5. `/tr/gizlilik` unvan/NIP görünür mü  

---

**Not:** Anahtarlar ve gerçek telefon/e-posta bu repoya yazılmaz; Plesk env veya Vercel/env.
