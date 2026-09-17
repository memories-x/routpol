# 01 — İş modeli (kanon)

**Durum:** Kanonik · **2026-09-10** · yatırım / kuruluş idari hattı eklendi

---

## Tek cümle (her yerde aynı)

> POL-TURK avukat değildir; hukuki süreci yönetmez ve şirketi sizin adınıza tescil etmez. Resmi yazıyı PL / EN / TR açıklar, süreci takip eder; Türkiye’deki işletmecilerin Polonya’daki yatırım, şirket kuruluşu ve faaliyet açılışında **idari danışmanlık** verir ve avukat–noter–KRS akışına **ön ayak olur**. Hukuki tavsiye, sözleşme, noter işlemi ve KRS kararı Polonyalı avukat ortağındadır. Talep halinde **noter vekaletiyle idari işlerde** evrak ve randevu koordinasyonu sunulur — bu hukuki temsil değildir.

## Checkout paketleri

| Slug | Ad | Ne satılır |
|------|-----|------------|
| `tek-yazi` | Tek yazı | Tek resmi evrak özeti + sonraki adım |
| `aylik-paket` | Aylık idari takip | 30 gün, kota (min 4 yazı), portal yükleme, aşım 40 zł |
| `surec-yonetimi` | Vekaletli idari yürütme | Noter vekaletiyle **idari** evrak/randevu koordinasyonu; avukat ücreti ayrı |

**Satışta değil (ertelendi):** `telefon-gorusme` — saatlik telefon; KVKK / kayıt / rıza yükümlülükleri ekonomik olarak henüz desteklenmiyor. Slug, fiyatlandırma, slot ve panel **eski ödenmiş dosyalar** için kodda kalır; kamu checkout ve pazarlamada yok.

Yatırım / kuruluş danışmanlığı **ayrı SKU değildir**. Kamu: `/hizmetler/kurulum` + lead `yatirimci`. Ücretli yürütme checkout paketleridir (üç SKU).

Yerinde eşlik (ofis/banka/urząd) **ayrı Stripe ürünü değildir**. Satış: iletişim formu (eşlik — şahıs/firma) → kapsam → uygun yazı/vekalet paketi.

## Rol ayrımı

| Avukat ortağı | POL-TURK |
|---------------|----------|
| Hukuki süreç, tavsiye, temsil, KRS / noter | Dil özeti, durum takibi, koordinasyon |
| Şirket sözleşmesi ve tescil kararı | İdari süreç haritası, evrak checklist, dosyayı ortağa iletme |
| Kontrol | Köprü — bilgi kaybolmasın |

## Kullanmayın

- “Sürecinizi yönetiyoruz” (genel)
- “Avukatlarımız” (ortak avukat var; biz avukat değiliz)
- “Şirketi kuruyoruz” / KRS veya vergi kararı vaadi
- Onay / süre garantisi

## MOS / rehber

- `/rehber` = hub (kurum yazısı, paket seçimi, kuruluş, şahıs, MOS)
- `/rehber/mos` = MOS bilgilendirme (otomasyon değil)
- `invariants`: MOS/praca.gov **otomasyonu** yasak — çelişki yok

## Marka

Çalışma adı: **POL-TURK**. Final R-marka + domain canlı öncesi (`docs/04-go-live.md`).

## Eski dokümanlar

`docs/32-*`, `docs/33-*`, `docs/35-*` → `docs/_archive/` (kanon değil).
