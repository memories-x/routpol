# Ton, Mikro Metin & Mesaj Şablonları

## Marka tonu

| Özellik | Evet | Hayır |
|---------|------|-------|
| Net, sakin, güven | Kısa cümle; aktif dil | Bağırmak, emoji yağmuru |
| Profesyonel | “süreç”, “teslim”, “teklif” | Avukat taklidi, abartı garanti |
| Yardımsever | “birlikte netleştirelim” | Küçümseyen bürokrasi dili |
| Diller | TR öncelik; PL/EN sonra | Karışık cümlede 3 dil birden |

**01 ile senkron:** Display serif + sans body (`07`); Inter varsayılanı **kullanılmaz**.

## UI mikro metin (TR)

| Yer | Metin |
|-----|--------|
| Form gönder | Teklif Al / Mesaj Gönder |
| Form loading | Gönderiliyor… |
| Form başarı | Talebiniz alındı. En kısa sürede dönüş yapacağız. |
| Form hata (ağ) | Gönderilemedi. Lütfen tekrar deneyin veya WhatsApp’tan yazın. |
| Form validation | Lütfen zorunlu alanları kontrol edin. |
| KVKK label | Kişisel verilerimin teklif amacıyla işlenmesini kabul ediyorum. [Gizlilik] |
| Dosya UI notu | Dosyalar şimdilik sunucuya yüklenmez; teklif sonrası güvenli kanalla ileteceğiz. |
| Dil yakında | Lehçe ve İngilizce içerik yakında. Şimdilik Türkçe devam edebilirsiniz. |
| Empty phone WA | WhatsApp numarası yakında — formdan ulaşın. _(numara yokken FAB gizlenir veya disabled)_ |

## WhatsApp ön mesaj şablonları

`https://wa.me/{E164}?text={encodeURIComponent(text)}`

**Hero / FAB varsayılan:**

```
Merhaba POL-TURK, web sitesinden yazıyorum. Teklif almak istiyorum.
Hizmet: (belirtiniz)
```

**Hizmet kartından (dinamik):**

```
Merhaba POL-TURK, “{hizmetAdi}” hakkında bilgi ve teklif istiyorum.
```

## E-posta konu şablonu (Faz 2)

`[POL-TURK Teklif] {hizmetTuru} — {fullName}`

## Hata / boş durumlar

| Durum | Davranış |
|-------|----------|
| API 429 | “Çok fazla deneme. Birkaç dakika sonra tekrar deneyin.” |
| JS kapalı | Form native fallback yoksa net noscript: WhatsApp / e-posta göster |
| Numara env yok | FAB render etme; Hero’da sadece form CTA |

## Yasak iddialar (kanıtsız)

- “%100 kabul garantisi”
- “Avukatlık hizmeti”
- “X günde oturum kesin”
- Uydurma müşteri sayısı / logo
