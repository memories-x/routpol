# 01 — İş modeli (kanon)

**Durum:** Kanonik · **2026-09-13** · ticaret masası ana iş kolu (çekirdek + isteğe bağlı yürütme); idari paketler operasyon

---

## Tek cümle (her yerde aynı)

> POL-TURK, Polonya’ya ticari girişte **aracı danışmandır**: pazar araştırması, firma/kurum tespiti, şirketler arası görüşme ve fiyat toplama; hizmet başına danışmanlık faturası. Müşteri kabul ederse Polonya satın alma ve lojistik sürecini yazılı kapsamla üstlenebilir; gümrükte işbirliği yaptığı gümrük acenteleriyle köprü kurar. Aynı çatı altında **idari köprü** sunar: resmi yazıyı PL / EN / TR açıklar, süreci takip eder. Avukat değildir; hukuki süreci yönetmez, şirketi sizin adınıza tescil etmez. Hukuki tavsiye, sözleşme, noter işlemi ve KRS kararı Polonyalı avukat ortağındadır. Talep halinde **noter vekaletiyle idari işlerde** evrak ve randevu koordinasyonu sunulur — bu hukuki temsil değildir.

## İki ayak (kurumsal)

| Ayak | Rol | Satış yolu |
|------|-----|------------|
| **Ana — Ticaret masası** | Çekirdek: pazar araştırması, firma/kurum tespiti, şirketler arası görüşme, fiyat toplama. İsteğe bağlı (ayrı kapsam): PL satın alma / lojistik yürütme; gümrük desteği partner acenteler üzerinden | Lead `ticaret-masasi` · `/danismanlik` · **hizmet başına fatura** · kamu komisyon oranı yok |
| **Operasyon — İdari köprü** | Yazı özeti, aylık takip, vekaletli idari yürütme, yerinde eşlik | Stripe checkout SKU’lar |

Ticaret masası **Stripe SKU değildir**. Ücret = sağlanan hizmet başına danışmanlık faturası / yazılı teklif. Stok veya kalite garantisi yoktur. Kendimiz lisanslı **gümrük komisyoncusu / taşıyıcı değiliz** — gümrük ve taşıma işbirliği partnerleri üzerinden.

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
| Hukuki süreç, tavsiye, temsil, KRS / noter | Ticaret masası (çekirdek + onaylı yürütme); dil özeti; durum takibi; koordinasyon |
| Şirket sözleşmesi ve tescil kararı | İdari süreç haritası, evrak checklist, dosyayı ortağa iletme |
| Kontrol | Köprü — bilgi kaybolmasın |

| Gümrük / lojistik partner | POL-TURK |
|---------------------------|----------|
| Beyanname, lisanslı acentelik, taşıma | Brief, koordinasyon, müşteri onayıyla süreç üstlenme; partner köprüsü |

## Kullanmayın

- “Sürecinizi yönetiyoruz” (genel; kapsam yazılmadan)
- “Avukatlarımız” (ortak avukat var; biz avukat değiliz)
- “Şirketi kuruyoruz” / KRS veya vergi kararı vaadi
- “Biz gümrükçüyüz / taşıyıcıyız” (lisanslı acente / taşıyıcı partner)
- Onay / süre / stok / kalite garantisi
- Uydurma pazar payı / “girin kazanırsınız” / kamu komisyon % (sözleşme öncesi)
- İsimli partner listesi veya uydurma referans (yazılı onay yoksa)

## MOS / rehber

- `/rehber` = hub (kurum yazısı, paket seçimi, kuruluş, şahıs, MOS)
- `/rehber/mos` = MOS bilgilendirme (otomasyon değil)
- `invariants`: MOS/praca.gov **otomasyonu** yasak — çelişki yok

## Marka

Çalışma adı: **POL-TURK**. Ticaret yüzü: **POL-TURK Danışmanlık** / Polonya ticaret masası. Final R-marka + domain canlı öncesi (`docs/04-go-live.md`).

## Eski dokümanlar

`docs/32-*`, `docs/33-*`, `docs/35-*` → `docs/_archive/` (kanon değil).
