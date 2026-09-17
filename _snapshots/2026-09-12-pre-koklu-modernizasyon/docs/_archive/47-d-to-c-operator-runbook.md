# D → C çıkış runbook (operatör)

**Amaç:** Skorkart genel bandı **D → C** (`docs/46`).  
**Kod tarafı (2026-08-16):** Charter + invariants ↔ `docs/33` hizalandı.  
**Sizin tarafınız:** aşağıdaki maddeler — ajan secret/NIP dolduramaz.

---

## Sıra (atlanmaz)

### 1) Kimlik & iletişim (şirket yüzü)

Vercel / `.env` production:

```
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_WHATSAPP_E164=48...
NEXT_PUBLIC_OPERATOR_LEGAL_NAME=
NEXT_PUBLIC_OPERATOR_NIP=
NEXT_PUBLIC_OPERATOR_ADDRESS=
```

- [ ] Sitede gerçek e-posta görünüyor  
- [ ] WA CTA açık (numara dolu)  
- [ ] Gizlilik sayfasında unvan + NIP  

### 2) Go-live teknik (`docs/40`)

- [ ] `NEXT_PUBLIC_SITE_URL=https://…`  
- [ ] Stripe **live** + webhook  
- [ ] Stripe Dashboard: invoice/receipt e-postaları kapalı (`docs/51`)  
- [ ] Muhasebeci KSeF keser; ay paketi ZIP (`docs/51`)  
- [ ] Resend API + doğrulanmış domain `CONTACT_EMAIL_FROM`  
- [ ] `BLOB_READ_WRITE_TOKEN`  
- [ ] `DATABASE_URL` + `npx prisma migrate deploy`  
- [ ] `PANEL_PASSWORD` (güçlü; `polturk-panel` değil)  
- [ ] `PANEL_AUTH_SECRET` (uzun rastgele)  
- [ ] `npm run golive:check` yeşil  

### 3) Avukat ortak

- [ ] `docs/41-avukat-ortak-sozlesme-sablon.md` dolduruldu  
- [ ] En az 1 ortak imzaladı  
- [ ] Panelde bir dosyada “Avukat ortağı” alanına yazıldı  

### 4) Kuru koşu (3 dosya)

Her biri için:

1. `/{locale}/basvuru` → ödeme (veya staging)  
2. `/panel` → dosya görünür  
3. Mektup indir → sonuç yükle (tek-yazi) veya not + checklist  
4. Durum `in_progress` / `closed` → müşteri maili (Resend)  
5. Müşteri linkinden indir / dossier  

- [ ] Dosya 1  
- [ ] Dosya 2  
- [ ] Dosya 3  

### 5) Skorkart güncelle

`docs/46` snapshot’ı yeniden puanla:

- Şirket katmanı 4–6 ≥ **C** (%40+)  
- Sistem zaten **B** civarı  

Sonra: `ARCHITECT_TASKS.md` → `maturity_band: C`

---

## Ajanın yapamayacakları

| İş | Neden |
|----|--------|
| Gerçek NIP / banka / Stripe live key | Sizin sırlarınız |
| Sözleşme imzası | Hukuki işlem |
| Domain DNS | Hesap erişimi |

## Ajanın yaptığı (env’siz turlar)

- [x] `PROJECT_CHARTER.md` ↔ `docs/33`  
- [x] `project.invariants.yaml` köprü + panel  
- [x] Bu runbook  
- [x] Logo mark + favicon + Header/Footer (`public/brand`)  
- [x] Root metadata / OG iskeleti (köprü dili)  

---

## C bandı DoD

```
[ ] docs/40 zorunlu env dolu
[ ] İletişim + NIP sitede
[ ] 1 imzalı ortak
[ ] Panel parola değişti
[ ] 3 smoke dosya
[ ] docs/46 genel bant = C
```
