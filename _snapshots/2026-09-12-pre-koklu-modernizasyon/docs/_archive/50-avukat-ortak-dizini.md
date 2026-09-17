# Avukat ortak dizini (panel kart + oluşturma)

**Durum:** Uygulandı (2026-08-17) — operator isteği (oluşturma ekranı)  
**Kabuk:** `/panel/ortaklar` dizin; `/panel/ortaklar/yeni` form; kart `/panel/ortaklar/[id]`  
**Avukat sitesi:** yok — kayıt operatör işi

```yaml
title: Add operator-owned lawyer partner directory
scope:
  project: pol-turk
  module: src/lib/partners + src/app/panel/ortaklar + prisma LawyerPartner
  out_of_scope:
    - Lawyer login / partner portal
    - Avukatın siteden sipariş veya evrak yüklemesi
    - Case kayıtlarını tek dosyada birleştirme
    - KSeF / e-fatura
intent:
  what: Operator creates partner cards (name, kancelaria, contact, NIP, baro) then assigns them on a case.
  why: Ortaklar page was only a grouping of free-text case labels; operator had nowhere to create the card.
  triggered_by: user_request
steps:
  - { order: 1, action: LawyerPartner store (file/blob + prisma), files: [src/lib/partners, prisma], risk: medium }
  - { order: 2, action: Create/edit pages + list cards, files: [src/app/panel/ortaklar], risk: low }
  - { order: 3, action: Case select from directory, files: [PartnerField, cases PATCH], risk: low }
risk_overall: medium
estimated_effort: 90
disk_impact: light
disk_borrow: n/a
disk_return: n/a
success_criteria:
  - Yeni ortak formu kaydeder; kart listede görünür
  - Dosya masasında ortak seçilir (serbest metin zorunlu değil)
  - Avukat paneli / login yok
stop_conditions:
  - Lawyer portal or public partner signup
  - Merging paid orders into one case
rollback:
  trigger: panel PATCH or partner save broken
  steps: [revert partner routes and Case.lawyerPartnerId]
```

## Kullanım (operatör — sade akış)

1. Ortak ekle: ad + telefon / e-posta  
2. Dosya sayfasında listeden seç (asıl atama burada)  
3. Ortak kartı: Ara / E-posta + o ortağın dosyaları  

Sözleşme kağıt (`docs/41`) — panelde takip edilmez.  
Atama ortak kartından yapılmaz (yanlış dosya riski).

## Kesilenler

KPI, sözleşme/dil filtreleri, her kartta “atanmamış bağla”, yan yana düzenleme formu.

