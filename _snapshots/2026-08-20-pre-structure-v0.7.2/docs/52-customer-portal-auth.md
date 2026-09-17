# Müşteri portalı — güvenlik mimarisi (passwordless)

**Durum:** Kanonik (2026-08-18)

---

## Karar

Klasik üyelik (şifre) **yok**. Kalıcı profil **e-posta** ile; giriş **magic link** + imzalı oturum cookie.

| Tehdit | Önlem |
|--------|--------|
| Zayıf / sızıntı şifre | Şifre saklanmaz |
| Link tahmini | 32 byte rastgele token; DB’de yalnızca SHA-256 hash |
| Link yeniden kullanım | Tek kullanımlık (`usedAt`) |
| Eski link | TTL 15 dk |
| Brute force | IP + e-posta rate limit |
| E-posta enumeration | Login isteği her zaman aynı JSON cevap |
| XSS cookie çalma | `HttpOnly`, `Secure` (prod), `SameSite=Lax` |
| Panel / müşteri oturum karışması | Ayrı cookie adı + ayrı HMAC secret (`CUSTOMER_AUTH_SECRET`) |
| Oturum süresiz | 12 saat; sonra yeni magic link |
| Ödeme yapmadan portal | `customerEligibleForPortal` — yalnızca paid/in_progress/closed dosya |

## Müşteri UX (2026-08-18)

| Yer | Özellik |
|-----|---------|
| `/basvuru` | “Zaten müşteriyim → Hesabım” bandı |
| Dosya sayfası | Adım çubuğu (Ödeme→Alındı→İşleniyor→Hazır) + Hesabım CTA |
| `/hesabim` | Özet kart, profil düzenle, tam geçmiş, paket yenileme |
| Ödeme maili | Dosya linki + Hesabım (tüm paketler) |

## Akış

```
POST /api/customer/login/request  { email }
  → Customer yoksa bile "sent: true"
  → Varsa ve en az bir ödenmiş dosyası varsa: CustomerPortalLogin (hash) + e-posta
  → Ödeme yoksa link gönderilmez (eligibility)

GET /{locale}/hesabim/giris?t=RAW_TOKEN
  → POST /api/customer/login/verify { token }
  → Set-Cookie pt_customer_session
  → Redirect /{locale}/hesabim

GET /api/customer/me  (cookie)
  → profil + özet + aktif dönem + tüm dosyalar

PATCH /api/customer/profile  (cookie)
  → ad, telefon, firma, NIP, entityType, preferredResultLocale
```

## Aylık paket dönemi

- İlk `aylik-paket` ödemesi → `SubscriptionPeriod` (30 gün, `quota`, `usedCount`)
- **Aktif veya kuyruktaki dönem varken** aynı e-posta ikinci `aylik-paket` alamaz (`409 ACTIVE_PERIOD`)
- Dönem bitince aynı e-posta yenileyebilir (aynı müşteri kartı)
- Çift ödeme yarışı → ikinci dönem `queued` (mevcut bitince başlar)
- Portal yazı yükleme → kota atomik; aşım 40 zł Stripe checkout
- Webhook `billing=overage` → `StripeCheckoutReceipt` ile tek sefer kredi
- Oturum varken sipariş e-postası kilitli (ikinci müşteri kartı yok)
- Checkout: açık Stripe session yeniden kullanılır (`awaiting_payment`)
- Aşım: tek pending session / period; webhook satış kaydı self-heal
- Dönem kuyruğu: `queued` zinciri restack; yeni paket `latestUnfinishedPeriodEnd` sonrası
- Dosya erişimi: 24s kısa ömürlü `vt` token (legacy token hâlâ geçerli)
- Rate limit: `DATABASE_URL` varsa `RateLimitBucket` tablosu

## Ortam

| Değişken | Açıklama |
|----------|----------|
| `CUSTOMER_AUTH_SECRET` | Oturum HMAC (prod zorunlu) |
| `DATABASE_URL` | Portal DB modu (yoksa portal devre dışı) |
| `RESEND_API_KEY` | Magic link maili |

## Yapılmayan (bilinçli)

- Şifre / TOTP (ileride isteğe bağlı)
- Link query’de oturum token’ı (yalnızca tek kullanımlık giriş token’ı)
- Müşteri JWT localStorage’da
