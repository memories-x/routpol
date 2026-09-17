# 01 — İş modeli (kanon)

**Durum:** Kanonik · **2026-09-13** · ticaret danışmanlığı (hizmet kapsamı + sözleşmeli yerel operasyon); idari paketler ayrı ayak

---

## Tek cümle (her yerde aynı)

> POL-TURK, Polonya pazar girişinde **ticaret danışmanıdır**: pazar görünürlüğü, karşı taraf haritası, ticari görüşme koordinasyonu ve teklif/fiyat derlemesi; ücret açılan hizmet kalemine göre yazılı teklifle. Ayrı sözleşmeyle yerel satın alma ve lojistik yürütmesi; gümrükte lisanslı partner acente ağı. Aynı çatı altında **idari köprü** sunar: resmi yazıyı PL / EN / TR açıklar, süreci takip eder. Avukat değildir; hukuki süreci yönetmez, şirketi sizin adınıza tescil etmez. Hukuki tavsiye, sözleşme, noter işlemi ve KRS kararı Polonyalı avukat ortağındadır. Talep halinde **noter vekaletiyle idari işlerde** evrak ve randevu koordinasyonu sunulur — bu hukuki temsil değildir.

## İki ayak (kurumsal)

| Ayak | Rol | Satış yolu |
|------|-----|------------|
| **Ana — Ticaret danışmanlığı** | Hizmet kapsamı: pazar görünürlüğü, karşı taraf haritası, görüşme koordinasyonu, teklif derlemesi. Yerel operasyon (ayrı sözleşme): PL satın alma / lojistik; gümrük partner ağı | Lead `ticaret-masasi` · `/danismanlik` · **kalem bazlı fatura** · kamu oran yok |
| **Operasyon — İdari köprü** | Yazı özeti, aylık takip, vekaletli idari yürütme, yerinde eşlik | Stripe checkout SKU’lar |

Ticaret danışmanlığı **Stripe SKU değildir**. Ücret = açılan hizmet kalemi / yazılı teklif. Stok veya kalite taahhüdü yoktur. Lisanslı **gümrük acentesi / taşıyıcı değiliz** — partner ağ üzerinden.

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
