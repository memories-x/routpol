# Paketler — kamu teklifi + sipariş

**Kilit:** 2026-08-14 · mektup + Stripe sipariş döngüsü

| Slug | Ad (TR) | Kamu | Fiyat (sipariş) |
|------|---------|------|--------|
| `aylik-paket` | Aylık mektup (okuma) | Ana ürün | 40 zł × kota (asgari 4) — tek sefer |
| `surec-yonetimi` | Vekaletli süreç | İsterseniz | Şahıs 650 zł · Şirket 1 200 zł — tek sefer |
| `tek-yazi` | Tek yazı | Evet | 2 sayfaya kadar 50 zł; ekstra +25 zł |

## Sipariş döngüsü

1. `/{locale}/basvuru` — paket + yazı yükle  
2. Stripe Checkout (veya local `dev-pay`)  
3. `/{locale}/basvuru/basarili?case=&token=` — müşteri iş sayfası  
4. Panel: sonuç upload (`sonuc`) → müşteri indirir  

Teklif formu (`#iletisim`) ikinci kanal.

## Yok

Defter/beyan, avukatlık, onay garantisi. Aylık Stripe abonelik yenileme (MVP yok).

## Müşteri portalı (2026-08-18)

- `/tr/hesabim` — magic link (ödenmiş müşteri), özet, profil düzenleme, tam geçmiş
- Başvuru bandı: “Zaten müşteriyim → Hesabım”
- Dosya sayfası: adım çubuğu + Hesabım CTA
- Aşım: 40 zł / yazı (webhook tek sefer)
- Aktif dönem varken ikinci aylık paket yok; bitince aynı e-posta yeniler
- Mimari: `docs/52-customer-portal-auth.md`
