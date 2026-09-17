# 01 — İş modeli (kanon)

**Durum:** Kanonik · **2026-09-14** · kamu yüzü: TR→PL evrak ve idari takip (kafa rahat teslim); ticaret danışmanlığı aynı çatı

---

## Tek cümle (her yerde aynı)

> POL-TURK, Türkiye’deki girişimci ve şirketlerin **Polonya tarafındaki evrak işleri ile idari süreçlerini takip eden köprüdür**: resmi yazıyı dilinde açıklar, son tarihi ve sıradaki adımı net tutar, dosyayı izler — iş sahibi Polonya idaresini güvenle bırakır. Avukat değildir; hukuki süreci yönetmez, şirketi sizin adınıza tescil etmez. Hukuki tavsiye, sözleşme, noter işlemi ve KRS kararı Polonyalı avukat ortağındadır. Aynı çatıda **ticaret danışmanlığı** (pazar görünürlüğü, karşı taraf, görüşme, teklif derlemesi; isteğe bağlı yerel operasyon) sunulur. Talep halinde **noter vekaletiyle idari işlerde** evrak ve randevu koordinasyonu sunulur — bu hukuki temsil değildir.

## İki ayak (kurumsal)

| Ayak | Rol | Satış yolu |
|------|-----|------------|
| **Ana kamu yüzü — İdari köprü** | Polonya’da kurum yazısı, evrak ve idari süreç takibi; vekaletli yürütme; yerinde eşlik. Türkiye’den “teslim et, takipte kal” | Stripe checkout SKU’lar · `/hizmetler` |
| **Aynı çatı — Ticaret danışmanlığı** | Pazar görünürlüğü, karşı taraf haritası, görüşme, teklif derlemesi; sözleşmeli yerel satın alma / lojistik / gümrük partner ağı | Lead `ticaret-masasi` · `/danismanlik` · kalem bazlı fatura · kamu oran yok |

İdari paketler **asıl anlaşılır üründür**. Ticaret danışmanlığı Stripe SKU değildir. Stok / kalite / onay garantisi yoktur. Lisanslı gümrük acentesi / taşıyıcı değiliz — partner ağ üzerinden.

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

Çalışma adı: **POL-TURK**. Kamu yüzü: Polonya’da evrak ve idari takip (TR→PL). Aynı çatıda **POL-TURK Danışmanlık** / ticaret hattı. Final R-marka + domain canlı öncesi (`docs/04-go-live.md`).

## Eski dokümanlar

`docs/32-*`, `docs/33-*`, `docs/35-*` → `docs/_archive/` (kanon değil).
