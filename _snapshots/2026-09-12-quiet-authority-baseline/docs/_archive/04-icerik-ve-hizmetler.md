> **Süperseeded (2026-08-06):** Kanonik iş modeli ve site içeriği için `docs/32`, `docs/33`, `docs/35`, `docs/36` ve `src/content/*` kullanın. Bu dosya tarihsel / kısmen eski kalabilir.
# İçerik ve Hizmetler (v1)

## Hero (TR)

- **Başlık:** Polonya ve Türkiye Arasında Hukuki, Yeminli ve Ticari Çözüm Ortağınız
- **Alt başlık:** Resmi kurum ilişkileri, yeminli çeviri ve danışmanlık süreçlerinizde Türkçe, Lehçe ve İngilizce dillerinde profesyonel köprü kuruyoruz.
- **Rozetler:** Resmi süreçlere uygun evrak desteği · %100 Gizlilik · Hızlı teslimat  
  _(“Resmi Kurum Kabul Onaylı” ancak kanıtlanınca kullanılır — bkz. `08-seo-brief.md`)_
- **CTA:** Hızlı Fiyat Teklifi Al · WhatsApp’tan Yazın

## v1 — 6 ana hizmet

| # | Slug | Başlık | Kısa kapsam |
|---|------|--------|-------------|
| 1 | `yeminli-ceviri` | Yeminli & Yazılı Çeviri | Hukuki, ticari, akademik, evrak — TR/PL/EN |
| 2 | `sozlu-tercumanlik` | Sözlü & Saha Tercümanlığı | Noter, banka, urząd, polis, ticari görüşme |
| 3 | `kurumsal-iletisim` | Kurumlararası İletişim & İdari Danışmanlık | Resmi yazışma, dilekçe, takip |
| 4 | `oturum-calisma-izni` | Oturum & Çalışma İzni Danışmanlığı | Karta Pobytu evrak + dosya takip |
| 5 | `sirket-kurulumu` | Şirket Kurulumu & Ticari Danışmanlık | Sp. z o.o., JDG, sözleşme çevirileri |
| 6 | `teknik-ihale` | Teknik & İhale Dokümantasyon | İnşaat, altyapı, mühendislik şartnameleri |

### “Detaylı Bilgi” davranışı (v1)

Tüm kartlar `#iletisim` + ilgili `serviceType` ön seçimine kaydırır.  
Faz 2: `/hizmetler/[slug]`.

## Faz 2+ aday hizmetler

- Apostil / noter / konsolosluk rehberliği  
- Vize & aile birleşimi  
- Gayrimenkul sözleşme + noter tercümesi  
- Acil / 7/24 yeminli çeviri  
- Diploma denklik (nostryfikacja)  
- ZUS / vergi temel yönlendirme (hukuki tavsiye değil)

## Neden Biz

1. Polonya mevzuatına uyum odaklı süreç  
2. Çift yönlü kültür ve dil hâkimiyeti (TR–PL)  
3. Zamanında teslimat taahhüdü  
4. Uçtan uca takip ve şeffaflık  

## Süreç

1. Talebinizi gönderin  
2. Ücretsiz fiyat incelemesi  
3. Onayla süreci başlatalım / teslim  

## SSS (soru + cevap taslakları)

### 1. Yeminli çeviri ne kadar sürer?

Süre belge türüne, sayfa sayısına ve dil çiftine göre değişir. Standart kısa evraklarda çoğu zaman **1–3 iş günü** içinde teslim planlanır; acil talepler müsaitliğe göre ayrıca değerlendirilir. Net süre, ücretsiz fiyat incelemesinde yazılı bildirilir.

### 2. Karta Pobytu sürecinde hangi evraklar gerekir?

Gerekli evrak seti başvuru türüne (çalışma, aile birleşimi, vb.) ve güncel mevzuata göre değişir. Tipik olarak kimlik/pasaport, fotoğraf, başvuru formu, gerekçeyi gösteren belgeler ve çevirisi gereken ekler yer alır. Size özel kontrol listesini danışmanlık görüşmesinde netleştiririz; resmi karar urzęde aittir.

### 3. Noter / apostil işlemlerine destek veriyor musunuz?

Evet — süreç rehberliği, randevu/saha tercümanlığı ve ilgili belgelerin çevirisi konularında destek veririz. Noter veya konsolosluk **resmi işlemi kurum tarafından** yapılır; biz hazırlık, çeviri ve eşlik tarafındayız.

### 4. Fiyatlandırma nasıl yapılır?

Yazılı çeviride genelde **sayfa veya kelime** bazlı; sözlü tercümede **saat / yarım gün / tam gün**; danışmanlıkta kapsam paketleri kullanılır. Teklif öncesi ücretsiz inceleme ile şeffaf fiyat ve süre paylaşılır; gizli ek ücret yok.

### 5. Online mi yoksa yüz yüze mi çalışıyorsunuz?

Her ikisi de. Evrak ve danışmanlık süreçlerinin çoğunu **online** yürütünüz; noter, urząd, banka veya ticari görüşmelerde **yüz yüze / saha** tercümanlık sağlarız. Tercihinizi formda belirtmeniz yeterli.

## Form alanları (v1)

Detay: `10-form-ve-guvenlik.md`.

- Ad Soyad *, E-posta *, Telefon * (ülke kodu)  
- Hizmet türü * (6 + Diğer)  
- Dosya (UI only)  
- Not  
- KVKK onay *  
- CTA: Teklif Al / Mesaj Gönder  

## İletişim (placeholder — operatör doldurur)

| Alan | Plan varsayılanı |
|------|------------------|
| Ofis adresi | Polonya — randevu ile görüşme (adet TBD) |
| Telefon | TBD → env |
| E-posta | TBD → `teklif@…` |
| WhatsApp | TBD → `NEXT_PUBLIC_WHATSAPP_E164` |
| Çalışma saatleri | Pzt–Cum 09:00–17:00 (Europe/Warsaw) |

## Footer yasal kısa metin

`09-yasal-ve-uyumluluk.md` disclaimer bloğu.
