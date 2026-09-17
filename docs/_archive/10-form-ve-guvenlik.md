# Form, Dosya & Güvenlik Politikası

## Teklif formu — kabul kriterleri (v1)

### Alanlar

| Alan | Zorunlu | Doğrulama |
|------|---------|-----------|
| Ad Soyad | Evet | 2–80 karakter |
| E-posta | Evet | E-posta formatı |
| Telefon | Evet | E.164 benzeri; ülke kodu seçici (TR +90, PL +48, EN/diğer) |
| Hizmet türü | Evet | Enum: 6 hizmet + `diger` |
| Not | Hayır | Max 2000 karakter |
| Dosya | Hayır | Aşağıdaki politika |
| KVKK onay | Evet | `true` |

### API

- `POST /api/teklif`
- Envelope: `{ success, data, error }`
- v1 başarı: `{ success: true, data: { id: "…" } }` — e-posta gönderimi opsiyonel (karar `05`)
- Hata: validation → 400; rate limit → 429; sunucu → 500

### Spam & rate limit (v1 zorunlu)

| Önlem | Değer |
|-------|--------|
| Rate limit | IP başına 5 istek / 15 dk (yaklaşık) |
| Honeypot | Gizli alan; doluysa 200 + no-op (bot’a başarı gibi) |
| Min doldurma süresi | Client timestamp; &lt; 2 sn → red |
| Dosya içeriği v1 | Sunucuya binary **gönderilmez** (sadece metadata opsiyonel) |

### Başarı UX

- Inline başarı mesajı (alert/prompt yok)
- Opsiyonel: WhatsApp’a “talebiniz alındı” yönlendirme linki

## Dosya yükleme politikası

### v1 (UI only)

- Drag & drop + dosya seçici görünür
- Client-side kontrol; **upload storage yok**
- Kullanıcıya net metin: “Dosyalarınız şimdilik yüklenmez; teklif sonrası güvenli kanal ile ileteceğiz.” veya WhatsApp’a yönlendir
- Metadata (isteğe bağlı log): dosya adı, boyut, MIME — PII dikkat

### Limitler (v1 UI + v2 upload ortak)

| Kural | Değer |
|-------|--------|
| Max dosya sayısı | 5 |
| Max boyut / dosya | 10 MB |
| Max toplam | 25 MB |
| İzinli tipler | `pdf`, `doc`, `docx`, `jpg`, `jpeg`, `png`, `txt` |
| Yasak | `.exe`, `.js`, `.html`, arşiv içinde executable, şifreli belirsiz |

### v2 (gerçek upload)

- Signed upload veya server multipart
- Virus scan opsiyonel
- Saklama: kısa ömürlü object storage; erişim kısıtlı
- Silme politikası: teklif kapanınca veya N gün

## Secrets

| Değişken | Amaç |
|----------|------|
| `WHATSAPP_E164` | wa.me linki |
| `CONTACT_EMAIL_TO` | Teklif alıcı |
| `RESEND_API_KEY` / SMTP | Faz 2 veya v1 e-posta seçilirse |
| `RATE_LIMIT_*` | Opsiyonel override |

Client bundle’a sadece `NEXT_PUBLIC_*` güvenli değerler.

## Sentinel / güvenlik notu

Form route: no `eval`, input sanitize (Zod), XSS yok (React default + raw HTML yok).
