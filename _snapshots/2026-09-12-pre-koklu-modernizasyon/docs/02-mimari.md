# Mimari Plan

**Kanon indeks:** `docs/00-kanon-indeks.md` · Güncelleme: 2026-08-19

## 1) Ürün mimarisi (ne inşa ediyoruz?)

**v1 ürün tipi:** Tek sayfalık (landing) kurumsal site  
**v2 genişleme:** Hizmet detay sayfaları (`/hizmetler/[slug]`) + tam i18n içerik  
**v3 opsiyon:** Blog / rehber içerikleri, CRM entegrasyonu

```
[Kullanıcı]
    │
    ├─ Landing (TR öncelik) `/tr`
    │     Header → Hero → Trust → Hizmetler → Neden Biz
    │     → Süreç → SSS → İletişim/Form → Footer
    │     → Floating WhatsApp
    │
    ├─ /gizlilik (kısa KVKK)
    ├─ Form POST → API (teklif) → e-posta / webhook (sonra)
    └─ WhatsApp deep link

URL detay: `14-bilgi-mimarisi-ve-url.md`.  
Bileşen sözleşmeleri: `19-bilesen-sozlesmeleri.md`.```

## 2) Sayfa bölüm mimarisi (landing)

| # | Bölüm | Amaç | Bileşen (hedef) |
|---|--------|------|------------------|
| 0 | Header | Navigasyon, dil, Teklif Al | `Header` |
| 1 | Hero | Değer önerisi + CTA | `Hero` |
| 2 | Trust strip | Hızlı güvence rozetleri | `TrustBadges` (Hero içi veya ayrı) |
| 3 | Hizmetler | 6 ana hizmet | `Services` |
| 4 | Neden Biz | 4 avantaj | `WhyUs` |
| 5 | Süreç | 3 adım | `Process` |
| 6 | SSS | İtiraz giderme | `Faq` |
| 7 | İletişim + Form | Ana dönüşüm | `ContactForm` |
| 8 | Footer | Linkler, yasal | `Footer` |
| 9 | FAB | WhatsApp | `WhatsAppFab` |

**Anchor ID’ler (navigasyon):**  
`#hizmetler` `#neden-biz` `#surec` `#sss` `#iletisim`

## 3) Hedef kod klasör mimarisi (Faz 1’de kurulacak)

> Henüz oluşturulmadı — plan onayından sonra.

```
src/
├── app/
│   ├── [locale]/                 # tr | pl | en
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Landing
│   │   ├── gizlilik/page.tsx      # KVKK kısa
│   │   └── hizmetler/[slug]/     # Faz 2
│   ├── api/teklif/route.ts
│   └── globals.css
├── components/
│   ├── layout/                    # Header, Footer, WhatsAppFab
│   ├── sections/                  # Hero, Services, WhyUs, Process, Faq, Contact
│   └── ui/                        # Button, Accordion, Badge, FileDropzone...
├── content/                       # Metinler (i18n kaynağı)
│   ├── tr.ts
│   ├── pl.ts                      # Faz 2 veya paralel
│   ├── en.ts
│   └── services.ts                # Hizmet veri modeli (slug’lı)
├── lib/                           # validation, whatsapp, constants, i18n helpers
└── types/
```

## 4) Veri modeli (içerik odaklı)

### Hizmet

```ts
type Service = {
  slug: string;           // ornek: "yeminli-ceviri"
  icon: string;           // lucide icon key
  title: string;
  shortDescription: string;
  details?: string[];     // Faz 2 detay sayfası için
  ctaHref: string;        // "#iletisim" veya "/hizmetler/..."
};
```

### SSS

```ts
type FaqItem = {
  id: string;
  question: string;
  answer: string;
};
```

### Teklif formu

```ts
type QuoteRequest = {
  fullName: string;
  email: string;
  phone: string;          // ülke kodu dahil
  serviceType: string;
  message?: string;
  files?: FileMeta[];     // v1: UI + metadata; gerçek upload Faz 2
};
```

## 5) i18n stratejisi

| Faz | Yaklaşım |
|-----|----------|
| Faz 1 | UI dil seçici görünür; içerik **TR** |
| Faz 2 | `content/pl.ts` + `en.ts` doldurulur; URL `/tr` `/pl` `/en` |
| Kural | Metinler bileşen içinde hardcode edilmez → `content/` |

## 6) Form & iletişim mimarisi

```
ContactForm (client)
  → Zod doğrulama
  → POST /api/teklif
      → (v1) log / başarı yanıtı + mailto fallback veya Resend/SMTP placeholder
      → (v2) e-posta + isteğe bağlı CRM (HubSpot, Notion, Telegram bot vb.)
```

**Dosya yükleme:**  
- v1: Drag & drop UI + dosya adı/boyut doğrulama (gerçek storage yok)  
- v2: güvenli upload (boyut/tip limiti, virus scan opsiyonel)

## 7) SEO & performans

Detay: `08-seo-brief.md`, `11-ortam-ve-deploy.md`.

- Semantic HTML, tek H1 (Hero)
- Meta title/description locale’e göre
- Görseller: next/image, lazy below-fold
- Animasyon: Framer Motion hafif; reduced-motion saygısı
- Lighthouse: Performance hedef ≥ 90 (MVP kabul ≥ 85 mobil)

## 8) Güvenlik & uyumluluk

Detay: `09-yasal-ve-uyumluluk.md`, `10-form-ve-guvenlik.md`.

- Rate limit + honeypot + min fill time (v1 zorunlu)
- KVKK checkbox + kısa `/gizlilik` (v1)
- Footer disclaimer (danışmanlık ≠ avukatlık)
- WhatsApp / secret’lar env’de
- Dosya: v1 UI-only; tipler ve boyut limitleri tanımlı

## 9) Tasarım sistemi

Detay: `07-tasarim-tokenleri.md` — renk tokenleri (`pt-*`), tipografi, motion, a11y checklist.

## 10) Metrikler

Detay: `12-metrikler-ve-konumlandirma.md` — `teklif_submit`, `whatsapp_click`, konumlandırma cümlesi.

## 11) Deploy

Detay: `11-ortam-ve-deploy.md` — Node 20+, Vercel varsayılan, `.env.example` şablonu.
