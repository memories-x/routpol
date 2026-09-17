# POL-TURK Panel — Master Plan (bağımsız ürün)

**Durum:** P2 UYGULANDI (2026-08-16) — operator PROCEED  
**Kaynak:** `docs/44-panel-piyasa-arastirmasi.md` (feyiz) + `docs/33` (kanon) + P1 mevcut panel  
**Ürün adı (iç):** **Köprü Operasyon Paneli** — hukuk PMS klonu değil  

```yaml
title: Ship independent POL-TURK bridge operations panel
scope:
  project: pol-turk
  module: src/app/panel + src/app/api/panel + src/lib/cases + src/components/panel
  out_of_scope:
    - USCIS/MOS form doldurma veya API otomasyonu
    - Avukat saat ücreti / trust accounting
    - praca.gov / MOS entegrasyonu
    - Çok kiracılı SaaS / white-label
    - Google Drive senkron API
    - Müşteri mobil uygulaması
intent:
  what: Piyasa kalıplarını alıp POL-TURK köprü modeline özel bağımsız operatör + müşteri takip paneli.
  why: P1 iskelet var; emsaller (Urząd Tracker + tercüme portalı) netleşti; bilinçli ürün sınırıyla P2/P3 planlanmalı.
  triggered_by: user_request
dependencies:
  - docs/33-is-modeli-master.md
  - docs/44-panel-piyasa-arastirmasi.md
  - DATABASE_URL + BLOB (prod)
risk_overall: medium
estimated_effort: P2=6-10h, P3=12-20h (ayrı turlar)
disk_impact: none
success_criteria:
  - Panel IA ve durum makinesi dokümante + UI etiketleri TR
  - Paket checklist şablonları dosya detayında
  - Durum değişiminde müşteri dilinde e-posta (Resend)
  - Avukat ortağı alanı (metin) + timeline notları
  - next build + sentinel panel yolları
stop_conditions:
  - Panel metni "hukuki süreç yönetiyoruz" iddiası taşırsa ABORT
  - Form/MOS otomasyonu scope'a girerse REVISE
rollback:
  trigger: auth kırılır / müşteri token sızıntısı
  steps: [revert panel routes, keep case store]
```

---

## 0) Ürün tezi (tek cümle)

> Operatör: müşteri kartı + dosya + evrak + checklist + durum + dilde bildirim.  
> Müşteri: token link ile durum, paylaşılan not, evrak.  
> Avukat ortağı: sistem dışı veya sadece “atanan ortak” etiketi — süreç kontrolü onda.

**Feyiz alınan / bilinçli reddedilen**

| Alındı | Reddedildi |
|--------|------------|
| Urząd Tracker: status → bildirim, checklist | LollyLaw form library |
| Tercüme portalı: sipariş→teslim döngüsü | Clio time/billing |
| Advisor247: kontrollü paylaşım | MOS/praca.gov bot |
| LegalSol: şirket altında çok dosya | Immigration AI form |

---

## 1) Bilgi mimarisi (hedef)

```
/panel                      Özet KPI + kuyruk (bugün ne yapılacak)
/panel/musteriler           Müşteri listesi + arama
/panel/musteriler/[key]     Kart: iletişim + tüm dosyalar + son not
/panel/dosyalar             Global dosya listesi + filtre
/panel/[id]                 Dosya operasyon masası (çekirdek)
/panel/ayarlar              (P3) parola değişim notu / checklist şablonları
```

Müşteri yüzü (panel dışı, mevcut):  
`/{locale}/basvuru/basarili?case=&token=` + dossier JSON.

---

## 2) Durum makinesi (köprü)

| Status | Operatör anlamı | Müşteriye (TR örnek) | Bildirim |
|--------|-----------------|----------------------|----------|
| `awaiting_payment` | Ödeme yok | Ödeme bekleniyor | — |
| `paid` | Kuyrukta | Ödeme alındı, işleme alındı | e-posta (var) |
| `in_progress` | Siz / ortak üzerinde | Hazırlanıyor / takipte | e-posta (P2) |
| `closed` | Teslim / kapandı | Tamamlandı — sonucu indirin | e-posta (var ready) |
| `unpaid_archived` | Ödenmedi arşiv | — | — |
| `draft` | Panelde gösterme | — | — |

UI’da İngilizce slug kalır; **görünen etiket TR** (P2). İsteğe bağlı ileride PL/EN operatör UI.

---

## 3) Paket checklist şablonları (P2 çekirdek)

Her `packageSlug` için varsayılan maddeler (operatör tikler; müşteriye sadece işaretlenenler/paylaşılan not).

### `tek-yazi`
1. Mektup indirildi  
2. Dil / sayfa kontrolü  
3. Sonuç üretildi / yüklendi  
4. Müşteri bilgilendirildi  

### `aylik-paket`
1. Takip konusu net  
2. Dönem kontrolü yapıldı  
3. Özet müşteri dilinde paylaşıldı  
4. Sonraki kontrol tarihi notu  

### `surec-yonetimi`
1. POA / yetki teyidi (meta)  
2. Avukat ortağına iletildi  
3. Ortak dönüşü alındı  
4. Müşteri dilinde özet paylaşıldı  
5. Evrak arşiv klasörü güncel  

Şema (öneri): `CaseChecklistItem { id, caseId, key, label, doneAt?, doneBy? }` veya JSON `checklist` Case üzerinde.

---

## 4) Dosya detay — operasyon masası (wireframe)

```
[← Dosyalar]  [Müşteri kartı]

┌─ Sol ─────────────────────┐  ┌─ Sağ ──────────────────────┐
│ Başlık (firma — konu)     │  │ Checklist (paket şablonu)   │
│ Durum [select] [Kaydet]   │  │ ☑ … ☐ …                    │
│ Paket · dil · ödeme       │  │                            │
│ Avukat ortağı [text]      │  │ Evrak                      │
│ Arşiv klasör [edit]       │  │  mektup… / sonuc…          │
│ Timeline                  │  │  [Sonuç yükle]             │
│  - notlar (iç / paylaş)   │  │                            │
│  - durum geçmişi (P3)     │  │ Müşteri linki (kısalt)     │
└───────────────────────────┘  └────────────────────────────┘
```

---

## 5) Fazlar

### P1 — TAMAMLANDI (iskelet)
- Özet / Müşteriler / Dosyalar  
- Not paylaşımı, evrak, durum PATCH, arşiv adı  
- Dossier JSON  

### P2 — Ürün paneli (bu planın uygulama turu)
| # | İş | Risk |
|---|-----|------|
| 1 | Status etiketleri TR + özet “bugün kuyruğu” (paid + in_progress üstte, tarih) | low |
| 2 | Checklist şablon + UI + API PATCH item | medium |
| 3 | `lawyerPartner` (string) Case/Customer | low |
| 4 | Durum → müşteri dilinde e-posta şablonu (`in_progress`, `closed` netleştir) | medium |
| 5 | Timeline: notlar kronolojik + “paylaşıldı” rozeti | low |
| 6 | Müşteri kartında son 3 not özeti | low |
| 7 | CSV export (müşteri / dosya) | low |
| 8 | Boş durum / ilk sipariş rehberi panelde | low |

### P3 — Ölçek
- Çok operatör + audit log  
- WhatsApp/SMS (Urząd Tracker kalıbı; Meta/Twilio)  
- Görev panosu (Legal HR tarzı)  
- Avukat ortağı ayrı entity  
- Bulk status  
- Panel ayarlar  

---

## 6) Veri modeli delta (P2)

```
Case += lawyerPartner String?
Case += checklist Json?   // [{ key, label, doneAt }]
// veya CaseChecklistItem tablosu

Customer: email unique (mevcut) — dokunma
```

Migration yalnızca `DATABASE_URL` varken; file store’da aynı alanlar CaseRecord JSON’da.

---

## 7) Güvenlik / RODO

- Panel: mevcut session cookie; parola env  
- Müşteri: accessToken; panelde tam token gösterme  
- Paylaşım: sadece `sharedWithCustomer` + dossier  
- Metin: hukuk iddiası yok (`docs/33`)  
- Prod: `DATABASE_URL` + Blob zorunlu  

---

## 8) Uygulama adımları (P2 — PROCEED sonrası)

```yaml
steps:
  - { order: 1, action: "Checklist types + store helpers", files: ["src/lib/cases/checklist.ts", "src/lib/cases/types.ts"], risk: low }
  - { order: 2, action: "Prisma migration lawyerPartner + checklist JSON", files: ["prisma/schema.prisma", "prisma/migrations/*"], risk: medium }
  - { order: 3, action: "API PATCH checklist + partner", files: ["src/app/api/panel/cases/[id]/route.ts"], risk: medium }
  - { order: 4, action: "UI ChecklistForm + PartnerField + status TR labels", files: ["src/components/panel/*", "src/app/panel/[id]/page.tsx"], risk: low }
  - { order: 5, action: "Status-change customer mail hooks", files: ["src/lib/mail/*", "src/lib/cases/store.ts"], risk: medium }
  - { order: 6, action: "Dashboard queue + müşteri kartı not özeti", files: ["src/app/panel/page.tsx", "src/app/panel/musteriler/[key]/page.tsx"], risk: low }
  - { order: 7, action: "CSV export API + buton", files: ["src/app/api/panel/export/*"], risk: low }
  - { order: 8, action: "Docs + build + sentinel", files: ["docs/45-*.md"], risk: low }
```

---

## 9) Başarı ölçütleri (P2)

1. Operatör bir `tek-yazi` dosyasında checklist’i tikleyip kaydedebilir.  
2. Durum `in_progress` olunca müşteri e-postası (dil = resultLocale/locale) gider (Resend yapılandırılmışsa).  
3. Müşteri kartında tüm dosyalar + avukat ortağı görünür.  
4. Panel kopyası `docs/33` ile çelişmez.  
5. `npx next build` geçer.

---

## 10) Operator kararı

Plan onayı için yanıt:

- **PROCEED P2** — uygulamaya geç  
- **REVISE** — checklist / WhatsApp önceliği değiştir  
- **DEFER** — sadece P1 ile canlıya çık  

Bağımsız panel = bu dokümandaki sınırlar; üçüncü parti hukuk yazılımı kurulmaz.
