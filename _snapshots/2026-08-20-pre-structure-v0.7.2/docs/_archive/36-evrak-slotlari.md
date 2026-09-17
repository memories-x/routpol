# Evrak slotları — çalışma notu

**Durum:** 2026-08-07 · Kaynak gerçek: `docs/35-paketler.md`  
**Bu dosya iç kullanımdır; müşteri sitesine yansımaz.**

## Ürün kuralı

| Paket | Müşteri yükleme |
|-------|-----------------|
| `oturum-dosyasi` / `okul-kaydi` / `genel-basvuru` | **Yok** — bilgilendirme |
| `dosya-takibi` | **Var** — `slotsForDosyaTakibi(trackingMode)` |
| `sirket-paketi` | Checkout yok (teklif) |

## Dosya takibi slotları (kod)

**self-apply:** `pasaport`*, `mevcut_dosya_ozeti`*, `ek_1` + kargo adresi  
**with-poa:** `vekalet`* + aynı kaynak slotlar  

Kod: `src/lib/cases/document-slots.ts` → `slotsForDosyaTakibi`

## Eski not

Önceki “oturum/okul/genel için etiketli checkout slotları” modeli **kaldırıldı**.  
Oturum profiline göre ulusal checklist (`residence-slots.ts`) **referans / operatör anlatımı** içindir; bilgilendirme checkout’unda yükleme zorunluluğu yoktur.
