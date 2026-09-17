# Müşteri portalı — güvenlik mimarisi

**Durum:** Kanonik (2026-09-11) · Şifre üyeliği

---

## Karar

Kalıcı profil **e-posta** ile. Giriş **e-posta + şifre** (`Customer.passwordHash`, argon2). Magic link **yalnızca şifre sıfırlama**. Oturum: imzalı HttpOnly cookie (`CUSTOMER_AUTH_SECRET`).

| Tehdit | Önlem |
|--------|--------|
| Zayıf şifre | Min uzunluk kayıt API’de; hash argon2 |
| Hash sızıntısı | Düz şifre saklanmaz |
| Link tahmini (reset) | 32 byte rastgele token; DB’de yalnızca SHA-256 hash |
| Link yeniden kullanım | Tek kullanımlık (`usedAt`) |
| Eski reset | TTL 15 dk |
| Brute force | IP + e-posta rate limit |
| E-posta enumeration | Login/register hataları genel |
| XSS cookie çalma | `HttpOnly`, `Secure` (prod), `SameSite=Lax` |
| Panel / müşteri oturum karışması | Ayrı cookie + ayrı HMAC (`CUSTOMER_AUTH_SECRET`) |
| Oturum süresiz | Cookie TTL; sonra yeniden giriş |
| Ödeme yapmadan portal | Eligibility — paid/in_progress/closed veya kayıtlı hesap |

## Müşteri UX

| Yer | Özellik |
|-----|---------|
| `/hesabim` | Giriş / üye ol (bireysel veya kurumsal) |
| Dosya sayfası | Ödeme maili token linki; hesapta da listelenir |
| `/basvuru` | Misafir sipariş durur; Hesabım bandı |

## Akış

```
POST /api/customer/register  { email, password, entityType, … }
POST /api/customer/login/password  { email, password }
  → Set-Cookie pt_customer_session

POST /api/customer/login/request  { email }
  → Yalnızca passwordHash varsa reset maili
  → Customer yoksa bile "sent: true"

GET /{locale}/hesabim/giris?t=RAW_TOKEN
  → POST /api/customer/login/verify { token }
  → cookie + redirect /hesabim
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
| `RESEND_API_KEY` | Reset / dosya maili |

## Yapılmayan (bilinçli)

- TOTP / 2FA (ileride isteğe bağlı)
- Link query’de oturum token’ı (yalnızca tek kullanımlık reset token’ı)
- Müşteri JWT localStorage’da
