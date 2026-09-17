# 01 — İş modeli (kanon)

**Durum:** Kanonik · **2026-09-12** · ticaret masası ana iş kolu; idari paketler operasyon

---

## Tek cümle (her yerde aynı)

> POL-TURK, Polonya’ya ticari girişte **aracı danışmandır** (pazar / firma / lojistik görünürlüğü ve fiyat teklifi köprüsü) ve aynı çatı altında **idari köprü** sunar: resmi yazıyı PL / EN / TR açıklar, süreci takip eder. Avukat değildir; hukuki süreci yönetmez, şirketi sizin adınıza tescil etmez. Hukuki tavsiye, sözleşme, noter işlemi ve KRS kararı Polonyalı avukat ortağındadır. Talep halinde **noter vekaletiyle idari işlerde** evrak ve randevu koordinasyonu sunulur — bu hukuki temsil değildir.

## İki ayak (kurumsal)

| Ayak | Rol | Satış yolu |
|------|-----|------------|
| **Ana — Ticaret masası** | Pazar / firma analizi, lojistik ürün analizi, fiyat teklifi aracılığı, tanıştırma | Lead `ticaret-masasi` · `/danismanlik` · kamu komisyon oranı yok (yazılı sözleşme sonrası) |
| **Operasyon — İdari köprü** | Yazı özeti, aylık takip, vekaletli idari yürütme, yerinde eşlik | Stripe checkout SKU’lar |

Ticaret masası **Stripe SKU değildir**. Analiz = bilgilendirme derlemesi; yatırım tavsiyesi, alım-satım tarafı, navlun işletmeciliği veya stok garantisi yoktur.

## Checkout paketleri (idari)

| Slug | Ad | Ne satılır |
|------|-----|------------|
| `tek-yazi` | Tek yazı | Tek resmi evrak özeti + sonraki adım |
| `aylik-paket` | Aylık idari takip | 30 gün, kota (min 4 yazı), portal yükleme, aşım 40 zł |
| `surec-yonetimi` | Vekaletli idari yürütme | Noter vekaletiyle **idari** evrak/randevu koordinasyonu; avukat ücreti ayrı |
| `yerinde-eslik` | Yerinde eşlik | Yarı gün (≈3–4 saat, 1 kurum); şehir zorunlu; şehir dışı ulaşım ayrıca |

**Satışta değil (ertelendi):** `telefon-gorusme` — saatlik telefon; KVKK / kayıt / rıza yükümlülükleri ekonomik olarak henüz desteklenmiyor. Slug, fiyatlandırma, slot ve panel **eski ödenmiş dosyalar** için kodda kalır; kamu checkout ve pazarlamada yok.

Yatırım / kuruluş danışmanlığı **ayrı SKU değildir**. Kamu: `/hizmetler/kurulum` + lead `yatirimci`.

## Rol ayrımı

| Avukat ortağı | POL-TURK |
|---------------|----------|
| Hukuki süreç, tavsiye, temsil, KRS / noter | Ticaret aracılığı (analiz / teklif köprüsü); dil özeti; durum takibi; koordinasyon |
| Şirket sözleşmesi ve tescil kararı | İdari süreç haritası, evrak checklist, dosyayı ortağa iletme |
| Kontrol | Köprü — bilgi kaybolmasın |

## Kullanmayın

- “Sürecinizi yönetiyoruz” (genel)
- “Avukatlarımız” (ortak avukat var; biz avukat değiliz)
- “Şirketi kuruyoruz” / KRS veya vergi kararı vaadi
- Onay / süre garantisi
- Uydurma pazar payı / “girin kazanırsınız” / kamu komisyon % (sözleşme öncesi)

## MOS / rehber

- `/rehber` = hub (kurum yazısı, paket seçimi, kuruluş, şahıs, MOS)
- `/rehber/mos` = MOS bilgilendirme (otomasyon değil)
- `invariants`: MOS/praca.gov **otomasyonu** yasak — çelişki yok

## Marka

Çalışma adı: **POL-TURK**. Ticaret yüzü: **POL-TURK Danışmanlık** / Polonya ticaret masası. Final R-marka + domain canlı öncesi (`docs/04-go-live.md`).

## Eski dokümanlar

`docs/32-*`, `docs/33-*`, `docs/35-*` → `docs/_archive/` (kanon değil).
