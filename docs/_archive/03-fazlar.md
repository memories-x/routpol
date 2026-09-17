# Faz Master Planı — Geri Dönüşsüz Yol Haritası

> İlke: **Mimariyi bir kez doğru kur.** Sonradan sökülecek kısa yollar yok.  
> İçerik (çeviri metni, gerçek telefon) sonradan doldurulur; **iskelet ve sözleşmeler** baştan kilitli.

```
Faz 0  Plan kilidi          ← şimdi (05 onayı bekliyor)
Faz 1  Temel iskelet        ← locale + token + content tipi + tooling
Faz 2  TR ürün yüzeyi       ← tüm landing + gizlilik + görsel sistem
Faz 3  Lead motoru + ship   ← form/API/güvenlik + QA + Vercel preview
Faz 4  Çok dil + derinlik   ← PL/EN + hizmet detay + e-posta/upload
Faz 5  Büyüme               ← SEO içerik, analytics, CRM, domain cilası
```

---

## Neden bu bölünme?

| Sonradan pahalı olan | Hangi fazda kilitlenir? |
|----------------------|-------------------------|
| `[locale]` URL yapısı | Faz 1 (TR dolu, PL/EN iskelet) |
| `content/` tip sözleşmesi | Faz 1 (`21`) |
| `pt-*` tasarım tokenleri | Faz 1 |
| API envelope `{success,data,error}` | Faz 1 (route stub) → Faz 3 (tam) |
| Form güvenlik (honeypot/rate) | Faz 3 — MVP ship’ten önce |
| Disclaimer + KVKK checkbox | Faz 2–3 |
| PL/EN metinleri | Faz 4 (iskelet hazır) |
| Blog / CMS / ödeme | Faz 5 veya hiç |

**Bilinçli ertelenenler** (iskeleti bozmaz): gerçek WA numarası, domain, logo SVG, PL/EN cümleleri, gerçek e-posta sağlayıcı, dosya storage, analytics.

---

## Faz 0 — Plan & karar kilidi *(tamamlandı)*

**Geçiş kapısı:** ✅ `05` ACK → Faz 1

---

## Faz 1 — Temel iskelet *(tamamlandı — 2026-08-05)*

**Amaç:** Sonradan i18n/token/refactor için sökülmeyecek iskelet.

| WP | İş | Durum |
|----|-----|--------|
| 1.1 | Next.js App Router + TS + Tailwind v4 + ESLint | ✅ |
| 1.2 | `[locale]` routing (`tr`/`pl`/`en`) | ✅ |
| 1.3 | `pt-*` CSS + Source Serif/Sans | ✅ |
| 1.4 | `content` tipleri + tr + pl/en stub | ✅ |
| 1.5 | Header/Footer layout kabuğu | ✅ |
| 1.6 | `lib/` env, whatsapp, api | ✅ |
| 1.7 | `POST /api/teklif` stub + Zod | ✅ |
| 1.8 | `.env.example` + `npm run build` yeşil | ✅ |

**Geçiş:** Faz 2 — TR ürün yüzeyi.

---

## Faz 2 — TR ürün yüzeyi *(büyük ölçüde tamam — 2026-08-05)*

**Amaç:** Dönüşüm sayfasının tamamı TR; yasal metinler yerinde.

| WP | İş | Durum |
|----|-----|--------|
| 2.1 | Hero + trust rozetleri | ✅ |
| 2.2 | Services 6 kart | ✅ |
| 2.3 | WhyUs + Process + Faq | ✅ |
| 2.4 | Contact + form (API stub) | ✅ |
| 2.5 | Footer disclaimer + gizlilik | ✅ |
| 2.6 | WhatsApp FAB (env varsa) | ✅ |
| 2.7 | SEO metadata TR | ✅ |
| 2.8 | Motion + reduced-motion | ✅ |
| 2.9 | Responsive temel | ✅ |

**Sıradaki:** Faz 3 — rate-limit store, RHF cilası, Vercel preview, QA.

---

## Faz 3 — Lead motoru + kalite + ship *(kod tamam — 2026-08-05)*

| WP | İş | Durum |
|----|-----|--------|
| 3.1 | RHF + Zod | ✅ |
| 3.2 | Honeypot + rate limit + min-fill + KVKK | ✅ |
| 3.3 | API + mail noop adapter | ✅ |
| 3.4 | FileDropzone UI-only | ✅ |
| 3.5 | 429 / başarı mikro metin | ✅ |
| 3.6 | Manuel QA listesi | `22` — operatör |
| 3.7 | Performans (build OK; Lighthouse operatör) | ⏳ ops |
| 3.8 | Vercel hazır (`vercel.json` + env rehber) | ✅ iskelet |
| 3.9 | CHANGELOG 0.3.0 | ✅ |
| 3.10 | Çıkış raporu | `docs/22-faz3-cikis.md` |

**Geçiş:** Operatör manuel QA + (isteğe) Vercel deploy → Faz 4.

---

## Faz 4 — Çok dil + derinlik *(tamamlandı — 2026-08-05)*

| WP | İş | Durum |
|----|-----|--------|
| 4.1 | `pl.ts` + `en.ts` tam metin | ✅ |
| 4.2 | hreflang + sitemap genişletme | ✅ |
| 4.3 | `/hizmetler/[slug]` detay (6×3) | ✅ |
| 4.4 | Resend adapter (env ile açılır) | ✅ |
| 4.5 | Dosya upload storage | ⏳ bilerek ertelendi |
| 4.6 | OG görselleri final | ⏳ opsiyonel |
| 4.7 | Gizlilik 3 dil | ✅ |

**Sıradaki:** Kurumsal olgunlaşma — `23` eksik analizi + `24` fazlar A–D (onay bekliyor).

---

## Faz 5 — Büyüme & operasyon *(eski ad — artık Faz D içinde)*

Seçmeli; ürün çekirdeğini bozmaz.

- Custom domain + profesyonel mailbox  
- Plausible/GA4 + consent (gerekirse)  
- Blog/rehber SEO  
- Ek hizmetler (apostil, gayrimenkul…)  
- CRM / Telegram bildirimi  
- A/B veya heatmap (opsiyon)

---

## Faz geçiş tablosu (tek bakış)

| Faz | Kod? | Kullanıcıya değer | Bitince ne kilitli? |
|-----|------|-------------------|---------------------|
| 0 | Hayır | Harita | Kararlar |
| 1 | Evet | — | Locale, token, tipler |
| 2 | Evet | TR sayfa görünür | UI + yasal yüzey |
| 3 | Evet | Lead alınır | Ship TR |
| 4 | Evet | 3 dil + detay | Uluslararası |
| 5 | Evet | Trafik/ops | Büyüme |

---

## Altın kurallar (tüm fazlar)

1. **Plansız multi-file yok** — Architect PROCEED (`AGENTS.md`).  
2. **Metin = `content/`** — bileşende literal yok.  
3. **Env ile sır** — WA, mail key commit edilmez.  
4. **Kısa yol yok:** locale’siz sayfa, hardcode renk, `alert()`, kanıtsız garanti.  
5. **Faz atlama yok:** 2’ye geçmeden 1 kapısı; 3’e geçmeden 2 kapısı.  
6. **Kapsam şişirme:** yeni fikir → backlog Faz 5; aktif faz DoD’sini bozma.

---

## Operatör onay kutusu

Faz 0’ı kapatmak için tek mesaj yeterli:

```
05 onay — faz master (0→5) kabul
```

Düzeltme örneği: `05 onay; e-posta Faz 3’te Resend bağlansın`
