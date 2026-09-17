# Ticari faaliyet köprüsü — Avrupa + Türkiye → Polonya

**Durum:** taslak konu + hizmet türetimi · 2026-09-12  
**Kanon sınırı:** `docs/01-is-modeli.md` — avukatlık / tescil / onay garantisi yok  
**SKU:** yalnızca `tek-yazi` · `aylik-paket` · `surec-yonetimi` (+ lead `yatirimci` / `isletme`)

---

## 1) Konu (tek cümle)

> POL-TURK, **Türkiye ve Avrupa’daki şirketlerin Polonya’daki ticari faaliyetlerini** dil, evrak ve idari takip köprüsüyle bağlar — hukuk bürosu veya muhasebe ofisi değildir; Polonyalı avukat ve księgowy ile merkez ofis arasında bilgi ve sıranın kaybolmamasını sağlar.

### Neden bu konu?

Bugünkü kamu metinleri ağırlıklı **TR işletmeci → kuruluş** ve **Polonya’daki Türk KOBİ** odaklı. Gerçek talep alanı daha geniş:

| Segment | Tipik durum |
|---------|-------------|
| **TR merkezli şirket** | Polonya’da sp. z o.o. / şube / faaliyet açma veya büyütme |
| **AB merkezli şirket** (DE, NL, CZ, SK, AT, FR…) | Polonya’da satış, depo, lojistik, üretim, iştirak; merkez dili EN/DE, kurum dili PL |
| **Yabancı sermayeli Polonya şirketi** | Zaten KRS’te; aylık US/ZUS/belediye yazısı + merkez–yerel kopukluk |
| **Holding / grup** | Karar TR veya AB’de, icra PL’de; tek kaynak durum özeti yok |

Hepsi aynı operasyon ihtiyacı: **ne diyor bu yazı, ne zamana, kim cevaplar, avukat/muhasebe/merkez nasıl hizalanır.**

---

## 2) Konumlandırma çerçevesi

```
Merkez ofis (TR / AB)          POL-TURK                    Polonya icra
─────────────────────          ────────                    ────────────
Karar, sermaye, rapor    →     Dil özeti                   Urząd / US / ZUS
Checklist, imza yetkisi  →     Sıra + takip                Avukat ortağı
                               İdari koordinasyon          Księgowy / banka
                               (vekaletli pakette)         Noter / KRS
```

**Yapmadığımız (her segmentte aynı):** tescil, hukuki tavsiye, vergi imzası, onay/süre garantisi, form otomasyonu.

**Yaptığımız:** resmi yazı özeti (PL↔TR/EN), süreç haritası, evrak görünürlüğü, dosya sayfası, avukat/muhasebe köprüsü, isteğe bağlı noter idari vekaletiyle randevu/evrak koordinasyonu.

---

## 3) Şirketler için türeyen hizmet kalemleri

Aşağıdakiler **yeni Stripe SKU değil**; mevcut üç paketin + lead hatlarının **ticari faaliyet** dilinde açılımıdır.

### A · Pazara giriş / yapı (karar öncesi)

| Kalem | Ne sunulur | Satış yolu |
|-------|------------|------------|
| Yatırım / faaliyet dosyası açma | Kapsam, tipik sıra, avukata ilk iletim | Lead `yatirimci` → `/hizmetler/kurulum` |
| Yapı yükü bilgilendirmesi | sp. z o.o. / şube / temsil — idari yük farkı (hukuki seçim avukatta) | Aynı lead |
| Merkez checklist | Pasaport, yetki, adres, imza — kurum talebine göre liste | Lead + sonra yazı paketleri |

### B · Kuruluş ve kayıt dönemi

| Kalem | Ne sunulur | Satış yolu |
|-------|------------|------------|
| Avukat–noter–KRS akış takibi | Ne gönderildi, ne bekleniyor, sıradaki adım (dilde) | Lead + `surec-yonetimi` (yoğunsa) |
| Eksik belge görünürlüğü | Checklist; belge üretme yok | Lead / paket |
| İlk kurum yazıları | US / ZUS / VAT-UE / banka KYC özeti | `tek-yazi` veya `aylik-paket` |

### C · Sürekli ticari faaliyet (asıl gelir hattı)

| Kalem | Ne sunulur | Satış yolu |
|-------|------------|------------|
| Aylık kurum yazısı masası | Kota kadar özet; portal yükleme; aşım | **`aylik-paket`** (ana ürün) |
| Tek sefer acil yazı | Tek resmi evrak + sonraki adım | **`tek-yazi`** |
| Yoğun idari dönem | Randevu / evrak koordinasyonu (idari vekalet) | **`surec-yonetimi`** |
| Muhasebe–avukat not köprüsü | Kısa operasyon notu; çelişkisiz iletim | Paket teslimatının parçası |
| Merkez ofis durum özeti | Dönemsel: ne kapandı, ne açık | Aylık paket / operatör notu |

### D · Operasyonel alt başlıklar (şirket senaryoları)

Bunlar pazarlama “iş kalemi” dilidir; hepsi C’deki paketlere map edilir:

1. **Kurum yazışması** — US, ZUS, KRS, belediye, sanepid, çevre, gümrük talepleri  
2. **Banka / KYC** — ek belge talebinin merkeze dilde aktarımı  
3. **Adres / yönetim / sermaye değişikliği** — evrak sırası bilgilendirme + avukat köprüsü  
4. **Lojistik / depo / saha** — faaliyet evrakı, randevu koordinasyonu (vekaletli)  
5. **İşveren tarafı (çalışan dosyası)** — oturum/MOS yazısının işveren checklist’i (oturum garantisi yok)  
6. **Grup raporlama** — TR/AB merkez + PL şube için aynı dosyada tutarlı dil  
7. **Yerinde eşlik** — ofis/banka/urząd (form → kapsam → uygun paket; ayrı SKU değil)

### E · Avrupa merkezli şirketlere özel vurgu (TR’den fark)

| Fark | Ne söylenir |
|------|-------------|
| Dil | Merkez çoğu zaman EN/DE; kurum PL — köprü EN↔PL (TR opsiyonel) |
| Beklenti | “Yerel ofis yok, tek muhatap istiyoruz” |
| Risk | Merkez–avukat–księgowy üçgeninde yazı kaybı |
| Ürün | Aynı üç SKU; lead metni “EU company / Polish operations” |

---

## 3b · AB şirketi × Polonya ticareti — geniş katalog (eksik hissedilen kısım)

Önceki liste “paket isimleri” gibi duruyordu. Aşağısı **Avrupa’daki bir şirketin Polonya ile ticaret / faaliyet** senaryolarına göre açılmış iş menüsüdür. Hâlâ yeni Stripe ürünü değildir; her satır lead veya üç SKU’ya map edilir.

### Senaryo 1 — Henüz PL’de tüzel kişilik yok, ticaret / satış istiyor

| İş kalemi | POL-TURK ne yapar | Yapmaz | Satış |
|-----------|------------------|--------|-------|
| “Polonya’ya nasıl gireriz?” ön brifing | Tipik yolların **idari yük** karşılaştırması (şirket / şube / temsil / uzaktan B2B) | Hangi yapıyı seçmenizi söyleyen hukuki tavsiye | Lead `yatirimci` |
| Yerel avukat + księgowy’ye dosya hazırlama | Merkez evrak checklist, dilde özet, ilk iletim | Sözleşme yazma, KRS başvurusu | Lead |
| İlk Polonya kurum / banka yazısı | Ne istendi, son tarih, kim cevaplar | Hesap açma, onay | `tek-yazi` |
| Merkez ziyareti / urząd / banka randevusu | Eşlik veya uzaktan koordinasyon | Karar / imza vekaleti (hukuki) | Lead `eslik` → kapsam → paket |

### Senaryo 2 — PL’de şirket / şube kuruyor veya yeni kurdu

| İş kalemi | POL-TURK ne yapar | Yapmaz | Satış |
|-----------|------------------|--------|-------|
| Kuruluş sırası görünürlüğü | Noter→KRS→NIP/REGON→VAT/VAT-UE→banka→księgowy haritası | Tescil, noter işlemi | Lead + takip |
| Kayıt sonrası “yazı yağmuru” | US/ZUS/VAT-UE/banka KYC özet masası | Vergi beyanı, imza | `aylik-paket` / `tek-yazi` |
| Yoğun ilk 90 gün | Randevu + evrak elden/teslim koordinasyonu | Hukuki temsil | `surec-yonetimi` |
| HQ’ya İngilizce durum özeti | Aynı dosyada tutarlı dil | Yönetim danışmanlığı iddiası | Paket teslimatı |

### Senaryo 3 — Zaten PL’de faaliyet: alım-satım, depo, lojistik, üretim

| İş kalemi | POL-TURK ne yapar | Yapmaz | Satış |
|-----------|------------------|--------|-------|
| Aylık kurum yazışma masası | US, ZUS, KRS, belediye, sanepid, çevre, taşıma/ITD vb. | Defter, KPiR, JPK imza | **`aylik-paket`** |
| Gümrük / ithalat-ihracat yazısı | Yazının dilde özeti + kime iletileceği (gümrükçü / avukat / lojistik) | Gümrük beyannamesi, brokerlik | `tek-yazi` / aylık |
| Depo / saha / lisans evrakı | Checklist, randevu, yazı takibi | Lisans onayı | Eşlik + paket |
| Tedarikçi / müşteri urząd talebi | Resmi talebin operasyonel özeti | Ticari müzakere | `tek-yazi` |
| Adres, yönetim, sermaye, unvan değişikliği | Sıra bilgilendirme + avukat köprüsü | Değişikliği “biz yaparız” | Lead / vekalet |
| Banka KYC yenileme | Ek belge listesi, randevu, dilde aktarım | Hesap / kredi | Eşlik + `tek-yazi` |

### Senaryo 4 — İnsan / mobilite (ticari faaliyetin parçası)

| İş kalemi | POL-TURK ne yapar | Yapmaz | Satış |
|-----------|------------------|--------|-------|
| İşveren tarafı — çalışan oturum / MOS yazısı | İşveren checklist, yazı özeti, randevu köprüsü | Oturum / vize garantisi, form otomasyonu | Paket + eşlik |
| Yönetici / uzman PL’ye geliyor | PESEL, banka, urząd eşlik (kapsam görüşmede) | İkamet kararı | Eşlik hattı |
| Bordro / ZUS yazışması | Yazı özeti → księgowy’ye net not | Bordro üretimi | `tek-yazi` / aylık |

### Senaryo 5 — Merkez–Polonya operasyon ofisi (AB HQ’nun asıl ihtiyacı)

| İş kalemi | POL-TURK ne yapar | Yapmaz | Satış |
|-----------|------------------|--------|-------|
| Tek muhatap “mail desk” | Gelen resmi yazı → EN/DE/TR özet → portal | 7/24 hukuki hotline | `aylik-paket` |
| Avukat / muhasebe / lojistik üçgenini hizalama | Aynı not, çelişkisiz iletim | Onların yerine karar | Paket |
| Dönemsel yönetim özeti | Açık / kapalı dosya listesi | KPI / danışmanlık raporu satışı | Aylık operasyon |
| Yerinde kritik randevu | Ofis / banka / urząd eşliği | İmza yetkisi | Eşlik → paket |

### Senaryo 6 — “Sadece ticaret, şirket kurmak istemiyorum”

Dürüst sınır: **sözleşme, KDV/OSS seçimi, daimi işyeri (PE) riski** avukat + vergi danışmanındadır.  
POL-TURK yine de şunları yapabilir:

- Polonya’dan gelen **resmi yazı / talep** özeti (varsa)  
- Yerel avukat / księgowy / gümrükçüye **doğru dosya ile köprü**  
- İlk keşif görüşmesi: “hangi yazılar geliyor, kim takip ediyor?”  
- İleride varlık kurulursa A–B–C’ye geçiş

Yani “sadece ticaret”te ürün ince ama **sıfır değil** — özellikle yazı + partner köprüsü.

### AB menüsünü “bu kadar mı?” sorusuna cevap

| Katman | Var mı? |
|--------|---------|
| Yazı özeti + takip (çekirdek) | Evet — üç SKU |
| Kuruluş / faaliyet idari danışmanlık | Evet — lead |
| Banka, urząd, saha eşliği | Evet — eşlik hattı |
| Gümrük / lisans / lojistik yazı masası | Evet — paket diliyle |
| İşveren mobilite köprüsü | Evet — sınırlı, garantisiz |
| Hukuk, vergi, tescil, brokerlik | Hayır — ortaklara bırakılır |

Eksik hissi çoğu zaman **SKU azlığından değil, senaryo dilinin yazılmamasından** gelir. Katalog yukarıdaki 6 senaryo ile doldurulur; ürün hâlâ üç paket + lead + eşliktir.

---

## 3c · Ayrı konu başlığı — Polonya ticaret aracılığı (çekirdek işin dışı)

**Operatör tanımı (2026-09-12, netleştirme):**  
İşlerden **biri** (ana yazı-paket köprüsünden ayrı):  
yurtdışındaki **Türk şirketlerine Polonya pazarı açan aracı firma** — aynı zamanda:

1. **Lojistik / ürün analizi**  
2. **Polonya’daki herhangi bir ticari ürün** için **pazar ve firma analizi**  
3. Ürün hakkında **fiyat teklifi** sağlama (aracılık)

**Çekirdek POL-TURK (değişmez):** resmi yazı özeti, aylık idari takip, vekaletli idari koordinasyon, kuruluş/faaliyet idari danışmanlık (`docs/01`).  
**Bu hat:** ticaret aracılığı — checkout SKU’lara ve Scope “ne yapıyoruz” bandına **karıştırılmaz**.

### Konumlandırma (tek cümle)

> Yurtdışındaki Türk şirketleri için Polonya pazarına girişte **aracıyız**: ürün/pazar/firma analizi, lojistik ürün analizi ve fiyat teklifi köprüsü — taşıyıcı, üretici veya hukuk bürosu değiliz; teklif ve analiz aracılığı + partner tanıtımı.

### Kim için

| Segment | İhtiyaç |
|---------|---------|
| TR merkezli üretici / ihracatçı | PL’de müşteri / kanal / fiyat görmek |
| Yurtdışında Türk sermayeli şirket | Polonya’ya ürün veya tedarik açmak |
| PL’ye ilk kez giren KOBİ | “Bu ürün burada kaça, kim satıyor, lojistik nasıl?” |

### Hizmet menüsü (bu başlık altında)

| Kalem | Ne sunulur (dürüst) | Sınır |
|-------|---------------------|--------|
| **Pazar analizi** | Ürün/kategori için PL’de kanal, regülasyon *kaynakları*, rakip/firma görünürlüğü (derleme) | Uydurma pazar payı / “girin kazanırsınız” yok |
| **Firma analizi** | İlgili toptancı / üretici / dağıtıcı aday kısa liste + özet profil | Due diligence garantisi, kredi notu vaadi yok |
| **Lojistik ürün analizi** | Ürüne göre tipik taşıma/depolama seçenekleri + partner teklif özeti | Navlun işletmeciliği, sigorta taahhüdü yok |
| **Fiyat teklifi aracılığı** | Brief → adaylara iletim → gelen tekliflerin dilde derlenmesi | Alım-satım tarafı, komisyon modeli yazılı olmalı |
| **Pazara açılış köprüsü** | Tanıştırma, görüşme ayarı, dil; gerekirse sonra çekirdek yazı paketleri | Şirket kurma / tescil bu hatta değil |

### Marka / yer kuralı

| Kural | Uygulama |
|-------|----------|
| Ana iş kolu | **Polonya ticaret masası** — marka hikâyesi ve lead birincil |
| Operasyonel ürün | Yazı / takip / vekalet / yerinde eşlik — Stripe (aynı çatı) |
| Ayrı başlık | Menü: Danışmanlık · sayfa `/danismanlik` |
| Sitede | **T1** sayfa + **T2** landing hero birincil CTA — tamam (2026-09-12) |
| Komisyon | **T-komisyon** — oran kamu metinde yok; yazılı sözleşme sonrası |

### Risk notu (operatör)

- Fiyat teklifi / tedarik aracılığında **komisyon, sözleşme, sorumluluk** yazılı netleştirilmeden kamu vaadi yazılmaz.  
- Analiz = bilgilendirme derlemesi; yatırım tavsiyesi değildir.  
- İdari köprü (avukat değiliz) ile ticaret masası **karıştırılmaz** — UI’da ayrı başlık; kurumsal çerçevede iki ayak.

### Operatör kararı

| Kod | Anlam |
|-----|--------|
| **T0** | Brief’te başlık — sitede yok |
| **T1** | Ayrı sayfa (`/danismanlik`) + lead `ticaret-masasi` — *aktif* |
| **T2** | Landing hero birincil CTA ticaret — *aktif* |
| **T-komisyon** | Komisyon / sözleşme modeli operatör yazar → sonra metin |

---

## 4) Önerilen kamu “konu” iskeleti (site / rehber)

**Başlık adayı:**  
`Avrupa ve Türkiye şirketleri için Polonya ticari faaliyet köprüsü`

**Alt başlık:**  
`Kurum yazısı, kuruluş sonrası idare ve merkez–yerel takip — avukatlık değil, idari köprü.`

**Bölümler:**

1. Kim için (TR merkez / AB merkez / PL’de yabancı sermaye)  
2. Ne yapıyoruz / ne yapmıyoruz (mevcut Scope bandı ile uyumlu)  
3. Yaşam döngüsü: giriş → kayıt → ilk 90 gün → sürekli faaliyet  
4. Paket eşlemesi (üç SKU tablosu)  
5. Örnek senaryolar (uydurma müşteri/istatistik yok — tipik durum anlatımı)  
6. CTA: Başvur (paket) · İletişim (yatırımcı / eşlik lead)

**Yerleşim seçenekleri (sonraki tur):**

| Yer | Not |
|-----|-----|
| `/hizmetler/kurulum` genişletme | TR + **AB şirket** who blokları |
| Yeni rehber makalesi | SEO + satış eğitimi |
| Landing Bridge altı kısa band | Tek surface görsel tur ister |
| Lead form seçeneği | `yatirimci` kopyasını “TR/AB ticari faaliyet” diye netleştir |

---

## 5) Mesaj disiplini (kullan / kullanma)

**Kullan**

- “Ticari faaliyet köprüsü” / “idari takip masası” / “merkez–Polonya dil köprüsü”  
- “Avukat ortağına ön ayak / dosyayı iletme”  
- “US / ZUS / kurum yazısı özeti”

**Kullanma**

- “Şirketinizi kuruyoruz” / “Polonya’da işinizi biz yönetiyoruz”  
- “AB pazarına giriş garantisi” / müşteri sayısı / ödül  
- Yalnızca “PL–TR” dar koridor (chip kaldırıldı; dil listesi TR/PL/EN/… kalabilir)

---

## 6) Operatör kararı (sonraki adım)

| Seçenek | Çıktı |
|---------|--------|
| **A** | Bu konuyu `/hizmetler/kurulum` metnine işle (TR + AB who) |
| **B** | `/rehber` altına yeni makale |
| **C** | Landing’de tek surface “ticari köprü” bandı (görsel QA + snapshot) |
| **D** | Önce yalnızca bu brief; site değişmesin |
| **T0–T2** | §3c ticaret masası (çekirdek dışı) — ayrı başlık |

**Çekirdek köprü:** A / B / C · **Ticaret masası (iş dışı konu):** T0 (şimdi) → T1/T2 operatör isteğiyle.
