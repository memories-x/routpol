# Bilgi Mimarisi, URL & Sitemap

## v1 sayfa haritası

```
/                    → redirect veya doğrudan TR landing
/tr                  → Ana landing (önerilen canonical v1)
/gizlilik            → Kısa gizlilik metni (locale: /tr/gizlilik de olabilir)
/pl                  → Faz 2 (v1’de dil seçicide “yakında” veya soft disable)
/en                  → Faz 2
/hizmetler/[slug]    → Faz 2
/robots.txt
/sitemap.xml
```

**v1 karar (plan):** Root `/` → `/tr` redirect. Dil seçici PL/EN tıklanınca toast/banner: “Lehçe / İngilizce yakında” **veya** aynı TR içeriği `lang` uyarısıyla (tercih: yakında mesajı — yanlış dil vaadi yok).

## Anchor haritası (landing)

| ID | Bölüm |
|----|--------|
| `#top` | Üst / logo |
| `#hizmetler` | Services |
| `#neden-biz` | WhyUs |
| `#surec` | Process |
| `#sss` | Faq |
| `#iletisim` | ContactForm |

Header “Teklif Al” → `#iletisim`.

## Footer linkleri (v1)

- Hizmetler, Neden Biz, Süreç, SSS, İletişim  
- Gizlilik  
- WhatsApp (external)  
- © yıl POL-TURK  

Yok (v1): Blog, Kariyer, Basın, Sosyal (ikon yoksa uydurma link yok).

## Hizmet slug’ları (kalıcı)

`yeminli-ceviri` · `sozlu-tercumanlik` · `kurumsal-iletisim` · `oturum-calisma-izni` · `sirket-kurulumu` · `teknik-ihale`

Slug değişmez; başlık metni i18n ile değişebilir.

## Navigasyon önceliği (mobil)

1. Hamburger: aynı anchor’lar  
2. Sticky CTA (opsiyonel): Teklif Al  
3. FAB: WhatsApp (sağ alt; formla çakışmayacak `z-index` + safe-area)

## Sitemap.xml (v1 içerik)

```
/tr
/tr/gizlilik   (veya /gizlilik)
```

Faz 2: + `/pl`, `/en`, her hizmet slug, hreflang.
