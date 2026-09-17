# Panel çalışma masası (P3 UI)

**Durum:** Uygulandı (2026-08-17) — operator PROCEED (implement plan)  
**Kabuk:** koyu navy sol ray + tablo listeler + dosya 3 bölge  
**Marka:** POL-TURK (RELYX düştü; rename ayrı tur)

```yaml
title: Ship operator workstation UI; defer brand rename
scope:
  project: pol-turk
  module: src/app/panel + src/components/panel + src/lib/cases
  out_of_scope:
    - KSeF / e-fatura / fatura PDF
    - RBAC / audit log
    - POL-TURK string replace until name chosen
    - Public marketing site redesign
intent:
  what: Replace thin list-pages with dense table + case workbench + dark navy rail.
  why: Operator judged panel superficial; IA shipped without workstation density.
  triggered_by: user_request
risk_overall: medium
estimated_effort: 180
disk_impact: none
success_criteria:
  - Sidebar full-height navy; no max-w-7xl chrome squeeze
  - Case lists are tables with TR package + status badge + aging days
  - Case page is identity / files / actions; no JSON.stringify in UI
  - Faturalar still honest skeleton
  - Brand strings still POL-TURK
stop_conditions:
  - Copy claims legal process management
  - Invoice engine or multi-user auth added
rollback:
  trigger: panel auth or case PATCH broken
  steps: [revert panel chrome and page layouts]
```

## Kabuk

- `PanelChrome`: tam yükseklik `pt-navy-950` ray; içerik sıkıştırması yok
- Üst bar arama → `/panel/dosyalar?q=`
- Mobil: hamburger drawer; yatay şerit yok

## Listeler

Paylaşılan `DataTable` + `CaseRowTable`: dosya | paket (TR) | durum rozeti | gün | evrak | tutar (ödemede).

Özet “Dikkat”: tüm `paid` / `in_progress` kuyruk (`slice(12)` değil). Gün: `paid` → `paidAt`, diğer → `updatedAt`.

Ödemeler ve ortak grupları aynı tablo kolonları.

## Süreç müşterisi hub (görüntüleme)

Site siparişi = bir `CaseRecord` (birleştirme yok). Özet ve kuyrukta `surec-yonetimi` müşteri e-postasına göre kart: `N açık süreç`. Tıklanınca `/panel/musteriler/{email}#surec`. Firma kartında süreç tablosu ayrı, tek yazı / aylık ayrı. `/panel/dosyalar` düz liste kalır.

## Dosya masası

`/panel/[id]`: kimlik | evrak | işlem. Fiyat `formatPricingLine` (JSON yok). Müşteri linki kopyala.

## Marka (kod dışı)

RELYX kullanılmadı. Adaylar: RELY / RELNOR / RELATUM / RELIUS — seçilince ayrı tur.

## Avukat ortak dizini

Kart oluşturma: `docs/50-avukat-ortak-dizini.md`. `/panel/ortaklar/yeni`. Avukat login yok.
