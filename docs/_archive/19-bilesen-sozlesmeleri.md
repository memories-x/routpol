# Bileşen Sözleşmeleri (Faz 1)

Her section’ın girdi/çıktı ve kabulü — implementasyon öncesi netlik.

## Header

- Props/data: `nav[]`, `locale`, `ctaLabel`
- Mobil: hamburger; açıkken scroll lock
- Dil: TR aktif; PL/EN → `onLocaleSoon()`
- Sticky; scroll’da border/shadow

## Hero

- Tek H1; alt metin; 3 rozet max
- CTA primary → `#iletisim`; secondary → WhatsApp (numara varsa)
- Tam bleed görsel/atmosfer; kart yok; overlay metin okunaklı (kontrast)

## Services

- 6 kart; `Array.isArray` guard
- İkon Lucide; “Detaylı Bilgi” → scroll + `serviceType` set (custom event veya URL `?hizmet=`)

## WhyUs

- 4 madde; sayaç animasyonu optional (reduced-motion off)

## Process

- 3 adım; numaralı; yatay desktop / dikey mobil

## Faq

- Accordion; birden fazla açık politikası: tek açık (basit)
- İçerik `faq[]` from content

## ContactForm

- RHF + Zod; ülke kodu; honeypot gizli
- Dosya dropzone UI-only
- Submit → `/api/teklif`; envelope `{ success, data, error }`
- Başarıda formu resetle (opsiyonel serviceType koru)

## Footer

- Nav tekrar; gizlilik; disclaimer paragraf; ©

## WhatsAppFab

- `aria-label`; numara yoksa unmount
- `z-index` form butonunun üstünde ama cookie banner yok v1

## Gizlilik sayfası

- Kısa markdown/TSX içerik; geri link ana sayfaya
