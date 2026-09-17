# Konumlandırma, Metrikler & Analytics

## Konumlandırma (1 cümle)

> Polonya’da Türkçe–Lehçe–İngilizce yeminli çeviri ve resmi süreç danışmanlığını **tek uçtan uca partner** olarak sunan köprü firma — sadece çeviri bürosu veya sadece “evrakçı” değil.

## Farklar (rakibe karşı)

| Biz | Tipik alternatif |
|-----|------------------|
| Çeviri + oturum/şirket/kurum süreci birlikte | Sadece tercüme ofisi |
| TR–PL kültür/dil çift yön | Tek dilli yerel büro |
| Şeffaf 3 adımlı süreç + hızlı teklif | Belirsiz fiyat / uzun mail zinciri |
| Online + saha tercüme | Sadece ofis randevusu |

## Sosyal kanıt (v1 gerçekçi)

v1’de uydurma müşteri logosuz:

- Süreç şeffaflığı ve dil rozetleri
- İsteğe bağlı: “X dilde hizmet” (kanıtlı)
- Faz 2+: anonim vaka özeti / puan (izinli)

Yanlış sayısal iddia (“1000+ mutlu müşteri”) **yazılmaz** ta ki veri gelsin.

## Dönüşüm metrikleri

| Metrik | Tanım | v1 hedef (ilk 30 gün, yön) |
|--------|--------|----------------------------|
| `teklif_submit` | Form başarı | Ölçüm kurulsun; hedef operatörle |
| `whatsapp_click` | FAB veya Hero WA | Formun ≥ %50’si kadar tıklanma makul |
| `cta_teklif_click` | Hero/Header Teklif | Scroll → form |
| Bounce (landing) | İzleme Faz 3 | — |

## Analytics planı

| Faz | Araç |
|-----|------|
| Faz 1 | Opsiyonel: yok veya privacy-friendly Plausible (çerezsiz) |
| Faz 3 | Plausible **veya** GA4 + consent |

### Olay isimleri (standart)

```
teklif_submit
whatsapp_click
cta_teklif_click
lang_switch   # Faz 2
service_detail_view  # Faz 2
```

## Başarı tanımı (MVP done)

1. Mobilde akış kırılmadan form gönderilebiliyor (API iskeleti dahil)  
2. WhatsApp linki doğru E.164 ile açılıyor  
3. TR içerik + KVKK checkbox + disclaimer görünür  
4. Lighthouse erişilebilirlik ciddi regresyon yok  

Sayısal lead hedefi operatör tarafından ilk ay sonunda yazılır.
