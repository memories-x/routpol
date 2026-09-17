# 01 — İş modeli (kanon)

**Durum:** Kanonik · **2026-08-19** · Faz 2 kararı

---

## Tek cümle (her yerde aynı)

> POL-TURK avukat değildir; hukuki süreci yönetmez. Resmi yazıyı PL / EN / TR açıklar, süreci takip eder, avukat ortağı ile siz arasında koordinasyon sağlar. Hukuki tavsiye ve temsil Polonyalı avukat ortağındadır. Talep halinde **noter vekaletiyle idari işlerde** evrak ve randevu koordinasyonu sunulur — bu hukuki temsil değildir.

## Paketler

| Slug | Ad | Ne satılır |
|------|-----|------------|
| `tek-yazi` | Tek yazı | Tek resmi evrak özeti + sonraki adım |
| `aylik-paket` | Aylık idari takip | 30 gün, kota (min 4 yazı), portal yükleme, aşım 40 zł |
| `surec-yonetimi` | Vekaletli idari yürütme | Noter vekaletiyle **idari** evrak/randevu koordinasyonu; avukat ücreti ayrı |

## Rol ayrımı

| Avukat ortağı | POL-TURK |
|---------------|----------|
| Hukuki süreç, tavsiye, temsil | Dil özeti, durum takibi, koordinasyon |
| Kontrol | Köprü — bilgi kaybolmasın |

## Kullanmayın

- “Sürecinizi yönetiyoruz” (genel)
- “Avukatlarımız” (ortak avukat var; biz avukat değiliz)
- Onay / süre garantisi

## MOS / rehber

- `rehber/mos` = **bilgilendirme içeriği** (otomasyon değil)
- `invariants`: MOS/praca.gov **otomasyonu** yasak — çelişki yok

## Marka

Çalışma adı: **POL-TURK**. Final R-marka + domain canlı öncesi (`docs/04-go-live.md`).

## Eski dokümanlar

`docs/32-*`, `docs/33-*`, `docs/35-*` → `docs/_archive/` (kanon değil).
