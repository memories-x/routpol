# POL-TURK — Tasarım Yenileme Master Brief + Prompt Seti

**Tarih:** 2026-08-19
**Kapsam:** Kamu site + müşteri portalı (`/hesabim`) + operatör paneli (`/panel`)
**Temel:** Mevcut kod okunarak yazıldı — `src/`, `globals.css`, `docs/07`, `docs/16`, `docs/20`, `docs/33`, `project.invariants.yaml`

---

## 0) Bu dosya nasıl kullanılır

| Bölüm | Ne zaman |
|---|---|
| **§1 Master Brief** | Kaynak gerçek. Her prompt bundan türer. Bir aracın çıktısı beğenilmezse buraya dönün, prompt'u değil |
| **§2 Prompt A** | Kod ajanı (Cursor / Claude Code / Antigravity) — repoda çalışacak |
| **§3 Prompt B** | v0 / Lovable / Bolt — sıfırdan görsel konsept |
| **§4 Prompt C** | Figma Make / görsel tasarım aracı — kodsuz konsept |
| **§5 Prompt D** | AI video modeli (Veo / Sora / Runway) — hero loop |
| **§6 Prompt E** | Lottie / motion graphics brief |
| **§7** | Kütüphane kararları |
| **§8** | Kabul kriterleri |
| **§9** | Önerilen sıra |

**Önerilen akış:** §4 (konsept, ucuz) → beğenilen yön → §2 (repoda uygula) → §5/§6 (hareketli varlık üretimi) paralel.

---

# 1) MASTER BRIEF

## 1.1 Ürün tek cümlede

> POL-TURK, Polonya'daki kurumlardan gelen resmi yazıyı müşterinin dilinde (PL/EN/TR) açıklar, süreci takip eder ve avukat ortağı–kurum–müşteri arasında koordinasyon sağlar. **Avukat değildir; hukuki süreci yönetmez.**

Kanonik metin: `docs/33-is-modeli-master.md`. Bu cümlenin sınırı **bağlayıcı** — tasarım hiçbir yerde "sürecinizi biz yönetiyoruz" izlenimi veremez.

## 1.2 Hedef kitle

| Persona | Acı | Sitede aradığı |
|---|---|---|
| Polonya'daki Türk birey (oturum/aile) | Lehçe evrak, belirsiz urząd süreci, yanlış çeviri riski | "Bu kâğıt ne diyor, ne yapmam lazım?" |
| Yabancı sermayeli KOBİ / Sp. z o.o. | ZUS/US/urząd yazışması yığılıyor, kimse takip etmiyor | Aylık takip, öngörülebilir fiyat |
| Acil evrak | Banka/noter randevusuna yetişme | Hızlı kanal, WhatsApp |

Ortak duygu: **kaygı + zaman baskısı**. Tasarımın işi heyecan yaratmak değil, **sakinleştirmek ve netleştirmek**.

## 1.3 Marka duygusu

**Evet:** sakin otorite · editöryel · net · resmi ama soğuk değil · "biri bu işi takip ediyor" güveni
**Hayır:** startup coşkusu · abartılı vaat · hukuk bürosu taklidi · turistik "Polonya-Türkiye dostluk" klişesi · emoji

Ton referansı: `docs/16-mikro-metin-ve-ton.md`. Kısa cümle, aktif dil, bağırmayan CTA.

## 1.4 Mevcut teknik durum (değişmeyecek zemin)

| Katman | Durum |
|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript strict |
| Stil | **Tailwind v4** — CSS-first (`@theme inline` içinde `globals.css`), `tailwind.config.js` **yok** |
| Token | `pt-*` prefix, CSS değişkeni olarak `:root`'ta |
| Font | `next/font/google` — Source Serif 4 (display) + Source Sans 3 (body) |
| Motion | `framer-motion` 12 — şu an sadece Hero'da tek fade |
| İkon | `lucide-react` |
| İçerik | `src/content/{tr,pl,en}.ts` — **tüm metinler burada**, bileşende hardcode yok |
| Sayfalar | Landing (7 bölüm), `hizmetler/[slug]`, `basvuru`, `basvuru/basarili`, `hesabim`, `gizlilik`, `rehber/mos`, `/panel` (13 sayfa) |

## 1.5 Mevcut tasarımın dürüst değerlendirmesi

**İyi olan:** Token disiplini gerçek. İçerik katmanı ayrılmış (3 dil sancısız). `Scope` bölümü — "yaptığımız / yapmadığımız" — dürüstlük olarak nadir ve değerli. Panel yoğunluğu (dark rail + tablolar) doğru yönde.

**Sorun olan:**

1. **Hero, invariants'ın yasakladığı "AI default look"un ta kendisi.** `bg-gradient-to-br from-pt-navy-900 via-pt-navy-800` + `radial-gradient(... rgba(16,185,129,0.18) ...)` — koyu gradient üstüne yeşil glow. `docs/07` "mor gradient yasak" diyor ama sorun mor değil, **kalıp**. Ayrıca hiç görsel yok: ürünün ne olduğunu gösteren tek bir şey yok.
2. **Hiçbir şey hareket etmiyor.** Hero'daki tek `motion.div` `initial={false}` ile çağrılmış — yani animasyon fiilen kapalı. `docs/07` "en az 2–3 motion" diyor; sitede 0 var.
3. **Görsel monotonluk.** Yedi bölümün altısı aynı: `max-w-6xl` + `py-16 md:py-24` + `h2` + kart/liste grid. Ritim yok, nefes yok, hiyerarşi yok.
4. **Tanımsız token'lar sessizce çalışmıyor.** `CaseStatusSteps.tsx` `bg-pt-emerald-50`, `text-pt-emerald-700`, `text-pt-slate-400` kullanıyor; `Scope.tsx` `text-pt-slate-400` kullanıyor. Bunların **hiçbiri** `globals.css`'te tanımlı değil → sınıflar hiçbir şey yapmıyor, renkler yanlış görünüyor. Ölçek eksik: sadece 600/500 var, 50/100/200/400/700/800 yok.
5. **Portal ve panel ayrı dünyalar.** `/hesabim` müşteri yüzü ama site diliyle konuşmuyor; panel kendi dilini kurmuş.
6. **Varyant yönetimi ternary zinciriyle.** `Services.tsx`'te üç seviyeli iç içe ternary ile kart kenarlığı seçiliyor — okunmaz ve genişletilemez.

## 1.6 Bağlayıcı kısıtlar

Bunlar tercih değil; ihlal edilirse iş geri alınır.

### Performans (`docs/20-performans-butcesi.md`)

| Metrik | Bütçe |
|---|---|
| Initial JS | **≤ 200 KB gzip** |
| LCP | **≤ 2.5 s** |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| Font | max 2 aile, `next/font` subset |
| Lighthouse mobil | ≥ 85 |

> **Bu, tasarım brief'inin en zor kısmı.** "Modern, hareketli" ile "200 KB JS" normalde çelişir. Çözüm §1.8'de: ağır JS yerine **CSS scroll-driven animation** ve **SVG**. Bunu her prompt'a yazın.

### Ürün / marka (`project.invariants.yaml`)

- "Hukuki süreci yönetiyoruz" / "avukatlarımız aracılığıyla her şeyi biz" **yasak**
- UI'da `Architect-01`, `Sentinel`, `ai-agent-team`, `Antigravity` stringleri **yasak**
- `prompt()` / `alert()` / `confirm()` **yasak**
- Array guard'ları zorunlu (`Array.isArray`)
- Token prefix `pt-*`

### Erişilebilirlik (`docs/07`)

Kontrast gövde ≥ 4.5:1, büyük metin ≥ 3:1 · görünür `:focus-visible` · skip-to-content · form label bağlı · klavye ile accordion · `lang` locale'e göre · `prefers-reduced-motion: reduce` → animasyon kapalı veya sadece opacity.

### i18n

Üç dil (tr/pl/en). **Yeni metin bileşene yazılmaz** — `src/content/types.ts` tipine alan eklenir, üç dosyaya da çevirisi girilir. Animasyon içindeki metinler de dahil.

## 1.7 Tasarım yönü — ne değişecek

### Ana fikir: **Belge dönüşümü**

Ürünün özü tek bir görsel harekette anlatılabilir:

```
Lehçe resmi yazı  →  vurgulama / ayrıştırma  →  sizin dilinizde net kart
(anlaşılmaz)          (biz burada çalışıyoruz)    ("ne istendi / son tarih / sıradaki adım")
```

Bu, sitenin **tek en önemli görseli** olmalı ve dört motion katmanının hepsinde aynı fikir kullanılmalı (tutarlılık). Detay §1.8.

### İkincil fikir: **Şerit diyagramı (kim ne yapar)**

Üç yatay şerit: `Kurum` — `POL-TURK` — `Siz`, ve ayrı/yukarıda bir `Avukat ortağı` şeridi. Bilgi akışı POL-TURK şeridinden geçer; hukuki karar oku **avukat şeridinde kalır ve POL-TURK'e girmez**.

> Bu diyagram aynı zamanda analiz raporundaki **U-1 konumlandırma çelişkisini görsel olarak çözer**: sınır anlatılmak yerine gösterilir. Metin bunu yapamıyor; diyagram yapar.

### Bölüm bölüm

| Bölüm | Şimdi | Olacak |
|---|---|---|
| **Header** | Sticky, scroll shadow | Aynı + üstte 2px scroll-progress çizgisi; dil seçici gerçek menü (Radix/Base UI); `/hesabim` linki daha görünür |
| **Hero** | Koyu gradient + glow + metin | **Editöryel split**: solda tipografik iddia + CTA, sağda **belge dönüşümü animasyonu**. Açık zemin (`--pt-bg`), koyu blok Hero'da değil aşağıda. LCP ögesi = h1 metni (görsel değil) |
| **Yeni: "Ne yapıyoruz"** | yok | Şerit diyagramı, scroll ile canlanır. Sitenin dürüstlük omurgası |
| **Hizmetler** | 3 kart, ternary varyant | `cva` varyantları; öne çıkan paket net; fiyat tipografisi güçlü; hover'da fiyat satırları açılır |
| **Neden biz** | Numaralı 2'li grid | Sayı tipografisi büyütülmüş, `01`'ler serif; karşılaştırma tablosu boşsa gizli (zaten öyle) |
| **Nasıl işler** | 4 kutu grid | **Yatay zaman çizgisi**, scroll-driven; mobilde dikey |
| **Kapsam** | 2 kolon ✓/✗ liste | Bölümün yıldızı yapılsın: koyu zemin, iki sütun karşıtlığı görsel olarak keskin, altta avukat şeridi vurgusu |
| **SSS** | Custom accordion | Radix/Base UI Accordion — klavye + ARIA bedava |
| **İletişim** | Form | Aynı yapı, hata/başarı `sonner` toast (alert yasak zaten) |
| **`/basvuru`** | Uzun form | Adım göstergesi + kalıcı özet kartı (ne alıyorum, ne kadar) |
| **`/hesabim`** | İşlevsel, sade | Site diliyle aynı; `CaseStatusSteps` ana öge, animasyonlu |
| **`/panel`** | Dark rail + tablolar | Yön doğru; token ölçeğini tamamla, tablo yoğunluğunu ayarla, boş durum ekranları, klavye kısayolu (`/` arama) |

### Yapılmayacaklar

Glassmorphism yığını · çok katmanlı glow · parallax hero · imleç takip efektleri · otomatik dönen carousel · sayfa yükünde giriş animasyonu şovu · mor/neon gradient · 3D chrome · sahte müşteri logoları · uydurma sayı sayacı ("1.200+ dosya").

## 1.8 Motion sistemi — dört katman

Her katmanın **farklı bir işi** var. Hepsi aynı "belge dönüşümü" fikrini taşır.

### Katman 1 — Kodla üretilen SVG/CSS animasyon (**omurga**)

Hero'daki belge dönüşümü ve süreç zaman çizgisi. **Tercih edilen çözüm budur**, çünkü:

- Dosya boyutu ~0, JS bütçesini yemez
- Metinleri `src/content/*`'tan gelir → 3 dilde otomatik doğru
- SEO/erişilebilir (gerçek DOM metni)
- `prefers-reduced-motion` ile temiz kapanır

Teknik: **CSS scroll-driven animations** (`animation-timeline: view()`) + `@supports` fallback. Sıfır JS. Yalnızca hero'daki giriş hareketi için Motion kullanılır.

### Katman 2 — Lottie / vektör animasyon (**zenginlik**)

Katman 1'in yetmediği yer: karakter/illüstrasyon hissi, daha organik akış. dotLottie formatı (~50–150 KB). Lazy: görünür alana girince yüklenir, `prefers-reduced-motion`'da statik poster.

### Katman 3 — Gerçek video (**duygusal kanca, opsiyonel**)

10–15 sn sessiz loop. **Hero'nun LCP ögesi olamaz** — h1'in altında veya "Ne yapıyoruz" bölümünde, `preload="none"`, `poster` ile, IntersectionObserver ile oynat. Mobilde varsayılan kapalı.

> Dürüst değerlendirme: en pahalı, en az getirili katman. AI video modelleri ofis/belge sahnelerinde hâlâ "stok video" hissi veriyor ve marka tonunuz zaten "abartısız". **Önce Katman 1'i yapın**; video sonra, gerçekten gerekiyorsa.

### Katman 4 — Ürün demosu (**güven, en yüksek getirili**)

Gerçek arayüzün animasyonlu mock'u: dosya kartı `Ödeme → Alındı → İşleniyor → Hazır` adımlarında ilerler; yan tarafta "sonuç yüklendi" bildirimi düşer. Stripe/Linear kalıbı.

Bu, satın alma kaygısını en çok azaltan öge: müşteri **parasının karşılığında ne göreceğini** görür. `CaseStatusSteps` bileşeni zaten var — hero seviyesine taşınıp animasyonlu bir varyantı yapılacak.

**Motion token'ları (hepsinde ortak):**

```
süre:    hızlı 150ms · normal 250ms · yavaş 400ms · anlatı 600ms+
easing:  giriş cubic-bezier(0.16,1,0.3,1) · çıkış cubic-bezier(0.7,0,0.84,0)
mesafe:  ≤ 24px (büyük kaydırma yok)
stagger: 60ms
kural:   opacity + transform SADECE (layout/paint animasyonu yok)
```

---

# 2) PROMPT A — Kod ajanı (Cursor / Claude Code / Antigravity)

> Repoda çalışacak ajana verilecek. `docs/61` bu dosyanın repodaki adıdır — ajan brief'i okuyabilsin diye referans veriliyor.

```
POL-TURK (Next.js 16 / React 19 / TypeScript / Tailwind v4) için tasarım
yenilemesi yapacaksın. Kod yazmadan ÖNCE şunları oku:

  docs/61-tasarim-brief-ve-promptlar.md   ← master brief (bağlayıcı)
  docs/07-tasarim-tokenleri.md            ← token yönü
  docs/20-performans-butcesi.md           ← performans bütçesi (bağlayıcı)
  docs/16-mikro-metin-ve-ton.md           ← ton
  docs/33-is-modeli-master.md             ← konumlandırma sınırı (bağlayıcı)
  project.invariants.yaml                 ← yasaklar
  src/app/globals.css                     ← mevcut token kurulumu
  src/content/types.ts + src/content/tr.ts

## Görev

Kamu sitesini, müşteri portalını (/hesabim) ve operatör panelini (/panel)
tek bir tasarım sistemi altında yenile. Amaç: "çalışan MVP" görünümünden
"güvenilir kurumsal servis" görünümüne geçmek.

## Bağlayıcı kısıtlar — ihlal edilirse iş reddedilir

1. PERFORMANS: initial JS ≤ 200 KB gzip, LCP ≤ 2.5 s, CLS ≤ 0.1.
   - Ağır scroll kütüphanesi (GSAP ScrollTrigger, Locomotive, Lenis) YASAK.
   - Scroll animasyonları CSS scroll-driven animations ile
     (animation-timeline: view() / scroll()) + @supports fallback.
   - Motion (framer-motion) yalnızca above-the-fold giriş hareketi ve
     layout animasyonu için; scroll için değil.
   - Yeni her bağımlılık için gzip boyutunu ve neden gerekli olduğunu yaz.

2. TAILWIND v4: Yapılandırma CSS-first — globals.css içindeki @theme inline.
   tailwind.config.js OLUŞTURMA.

3. TOKEN: Sadece pt-* token'ları. Kodda kullanılan ama tanımsız olan
   token'ları ÖNCE globals.css'e ekle (aşağıda liste). Hardcode hex YASAK.

4. i18n: Hiçbir kullanıcıya görünen metin bileşene yazılmaz.
   src/content/types.ts'e alan ekle, tr.ts + pl.ts + en.ts üçüne de çevir.
   Animasyon içindeki metinler dahil.

5. RSC: Varsayılan server component. "use client" yalnızca gerçekten
   gerekli yaprak bileşenlerde; bölüm bileşenlerine yayma.

6. ERİŞİLEBİLİRLİK: prefers-reduced-motion: reduce → hareket kapalı
   (yalnızca opacity kalabilir). :focus-visible görünür. Kontrast gövde
   ≥ 4.5:1. Accordion/menu klavye ile çalışır.

7. ÜRÜN SINIRI: Hiçbir metin/görsel "hukuki süreci biz yönetiyoruz"
   izlenimi veremez. docs/33'teki rol ayrımı korunur.

8. alert() / confirm() / prompt() YASAK. Array.isArray guard'ları korunur.

## Faz 0 — Temizlik (önce bu, tek commit)

globals.css'te @theme inline içine EKSİK token'ları ekle. Şu anda kodda
kullanılıyor ama TANIMSIZ (sınıflar sessizce çalışmıyor):

  pt-emerald-50, pt-emerald-700   → CaseStatusSteps.tsx
  pt-slate-400                    → CaseStatusSteps.tsx, Scope.tsx

Ayrıca tam ölçeği kur (50/100/200/300/400/600/700/800/900) navy, slate,
emerald için. Mevcut değerleri DEĞİŞTİRME, sadece eksikleri ekle.

Aynı commit'te ekle:
  - spacing/radius/shadow ölçeği (docs/07 ile uyumlu)
  - motion token'ları: --pt-dur-fast/normal/slow/narrative,
    --pt-ease-out/in (brief §1.8'deki değerler)

Doğrulama: `npx tsc --noEmit` + `npm run build` yeşil; görsel regresyon yok.

## Faz 1 — Tasarım primitifleri

  src/components/ui/ altında: Section, Container, Eyebrow, Heading,
  Prose, Button (cva varyantları), Card (cva), Badge, Stat.

  - class-variance-authority + tailwind-merge kullan.
  - Services.tsx'teki üç seviyeli iç içe ternary kart varyantını cva'ya taşı.
  - Button varyantları: primary (emerald) / secondary (outline navy) /
    whatsapp / ghost. Boyut: sm/md/lg.

## Faz 2 — Hero + belge dönüşümü (ana iş)

Mevcut Hero'yu değiştir. Şu anki hali (koyu gradient + radial emerald glow)
tam olarak invariants'ın yasakladığı "AI default look" kalıbı.

Yeni Hero:
  - Açık zemin (--pt-bg). Koyu blok Hero'da DEĞİL, aşağıdaki Kapsam
    bölümünde kullanılacak.
  - Editöryel split: solda eyebrow + h1 (font-display) + alt metin +
    rozetler + 2 CTA; sağda BELGE DÖNÜŞÜMÜ animasyonu.
  - LCP ögesi h1 METNİ olmalı — sağdaki görsel değil. Görselin yükü
    LCP'yi geciktirmemeli.

Belge dönüşümü (inline SVG + CSS, harici varlık yok):
  1. Solda: Lehçe resmi yazı temsili — gerçek metin DEĞİL, tipografik
     doku (gri çizgiler) + birkaç okunur Lehçe anahtar kelime
     (ör. "wezwanie", "termin", "załącznik"). Damga/başlık hissi.
  2. Orta: tarama/ayrıştırma hareketi — ince bir emerald çizgi geçer,
     3 alan vurgulanır.
  3. Sağda: net kart — üç satır, içerik src/content'ten:
       "Ne istendi" / "Son tarih" / "Sıradaki adım"
     Satırlar 60ms stagger ile belirir.
  4. Döngü değil: bir kez oynar, sonra durur. Kullanıcı scroll ile geri
     gelirse tekrar oynamaz (rahatsız edici olur).

  - Hareket: opacity + transform ONLY. Süre toplam ≤ 2.2 s.
  - prefers-reduced-motion → animasyonsuz son kare gösterilir.
  - Tüm metinler 3 dilde; SVG içinde <text> kullan (foreignObject değil),
    veya SVG'yi arka plan yapıp metni gerçek HTML olarak üstüne koy
    (tercih edilen: erişilebilirlik ve i18n için daha iyi).

## Faz 3 — "Ne yapıyoruz" şerit diyagramı (yeni bölüm)

Hero ile Hizmetler arasına yeni bölüm. Dört yatay şerit:

    Avukat ortağı  ─── hukuki karar ve temsil (AYRI ŞERİT)
    ─────────────────────────────────────────────────────
    Kurum (urząd/ZUS)  →  yazı gelir
    POL-TURK           →  açıklar · takip eder · koordine eder
    Siz                →  ne yapacağınızı bilirsiniz

  - Bilgi akışı okları POL-TURK şeridinden geçer.
  - Hukuki karar oku avukat şeridinde KALIR, POL-TURK şeridine girmez.
    Bu görsel ayrım brief'in amacı — sınırı metinle değil şekille anlat.
  - Scroll-driven: bölüm görünüme girince oklar sırayla çizilir
    (stroke-dashoffset), şeritler stagger ile açılır.
  - Mobilde dikey istifleme.
  - Tüm etiketler src/content'ten, 3 dil.

## Faz 4 — Bölüm yenilemeleri

  Process    → yatay zaman çizgisi, scroll-driven ilerleme; mobilde dikey
  Services   → cva varyantları, fiyat tipografisi güçlü, öne çıkan paket net
  Scope      → bölümün yıldızı: koyu zemin (pt-navy-950), iki sütun
               karşıtlığı keskin, altta avukat şeridi vurgusu.
               Bu bölüm dürüstlük iddiasıdır — tasarımı da öyle olsun.
  WhyUs      → sayı tipografisi büyük ve serif
  Faq        → Radix UI (veya Base UI) Accordion'a taşı
  Header     → üstte scroll-progress hairline; dil seçici gerçek menü
  Contact    → sonner toast (form başarı/hata)

## Faz 5 — Portal (/hesabim) hizalama

  - Site ile aynı primitifler.
  - CaseStatusSteps sayfanın ana ögesi: büyük, animasyonlu ilerleme.
    Aktif adımda hafif nabız (reduced-motion'da statik).
  - Dosya listesi kart yerine yoğun tablo; her satırda durum rozeti + gün.
  - Boş durum ekranı (henüz dosya yok).

## Faz 6 — Panel (/panel)

  Mevcut yön (dark navy rail + tablolar) DOĞRU — koru, cilala:
  - Token ölçeğini uygula (Faz 0'daki yeni değerler)
  - Tablo yoğunluğu: satır yüksekliği, hizalama, sayısal kolonlar
    tabular-nums
  - StatusBadge ve PackageLabel'ı cva'ya taşı
  - Her liste sayfasına boş durum ekranı
  - Klavye: "/" ile arama odaklanır
  - PanelChrome'daki body overflow manipülasyonunu koru (çalışıyor),
    ama scroll kilidi mantığını yorum satırıyla açıkla

## Her fazın sonunda

  1. npx tsc --noEmit
  2. npm run lint
  3. npm run build
  4. Değişen bölümlerin öncesi/sonrası açıklaması (1 paragraf)
  5. Eklenen bağımlılık varsa: gzip boyutu + gerekçe
  6. CHANGELOG.md'ye kayıt

## Yapma

  Glassmorphism yığını · çok katmanlı glow · parallax · imleç takip efekti ·
  otomatik carousel · sayfa yükünde giriş animasyonu şovu · mor/neon
  gradient · 3D chrome · sahte müşteri logosu · uydurma sayaç ·
  yeni renk paleti icat etme · tailwind.config.js oluşturma

## Çalışma şekli

Faz Faz ilerle. Her fazdan sonra DUR ve onay bekle. Plansız çoklu dosya
değişikliği yapma. Bir faz beklenenden büyük çıkarsa böl ve söyle.
```

---

# 3) PROMPT B — v0 / Lovable / Bolt (sıfırdan konsept)

> Repoya bağlı değil; hızlı görsel keşif için. Çıktı beğenilirse Prompt A ile repoya taşınır.

```
Design and build a landing page for a Poland-based bilingual administrative
support service. React + Tailwind. Single page, desktop and mobile.

## The business (get this right — it shapes everything)

The company explains Polish official letters (from tax office, social
security, immigration office) to foreign residents and companies in their
own language — Polish, English, Turkish. It tracks the process and
coordinates between the client, the institution, and a partner law firm.

CRITICAL: This company is NOT a law firm and does NOT manage legal
proceedings. A partner Polish lawyer does that. The design must make this
boundary VISIBLE, not hidden. Honesty is the brand's main asset — the
site has a "what we do / what we don't do" section and it should be one
of the most confidently designed parts of the page, not a disclaimer
buried in the footer.

## Audience emotion

Foreign residents and small business owners who received an official
letter in Polish they cannot read, with a deadline they might miss.
The feeling is anxiety plus time pressure. The design's job is to CALM
and CLARIFY — not to excite. Think "someone competent is handling this,"
not "exciting new startup."

## Visual direction

Editorial, calm authority, generous whitespace, strong typographic
hierarchy. Serif display headings paired with a humanist sans for body.
Light background as default; ONE dark section used as emphasis (the
"what we do / don't do" section).

Palette (use exactly, do not invent new colors):
  Navy   #0B1220 / #0F1C2E / #1A2B42   text and dark blocks
  Slate  #475569 / #64748B             body and helper text
  Bg     #F8FAFC   Surface #FFFFFF   Border #E2E8F0
  Accent emerald #059669 / #10B981     primary CTA and highlight
  Teal   #0D9488                       secondary accent
  WhatsApp #25D366                     WhatsApp button only

Type: Source Serif 4 (display) + Source Sans 3 (body). No Inter.

## The hero — this is the whole brief in one image

Split layout. Left: eyebrow, large serif headline, supporting paragraph,
three small outline badges, two buttons (primary emerald "Apply",
secondary outline "WhatsApp").

Right: an animated DOCUMENT TRANSFORMATION, built with inline SVG and
CSS (no video, no external asset):

  1. A Polish official letter — represented as typographic texture (grey
     line blocks), with a few readable Polish words visible: "wezwanie",
     "termin", "załącznik". Official stamp/header feel.
  2. A thin emerald scan line sweeps across; three regions highlight.
  3. It resolves into a clean card with three rows:
       "What is being asked"  ·  "Deadline"  ·  "Next step"
     Rows appear with 60ms stagger.

  Plays ONCE on load, then rests. Not a loop. Total under 2.2 seconds.
  Motion is opacity and transform only. Respect prefers-reduced-motion:
  reduce → show the final frame with no animation.

## Sections, in order

1. Header — sticky, thin scroll-progress line at the very top,
   logo left, nav center, language switcher (PL/EN/TR) + Account link +
   Apply button right. Mobile: overlay drawer, not a pushing accordion.

2. Hero (above).

3. "What we do" — a LANE DIAGRAM, the second key visual:
       Partner lawyer  ─── legal decisions and representation (SEPARATE LANE)
       ───────────────────────────────────────────────────────────────
       Institution     →  letter arrives
       This company    →  explains · tracks · coordinates
       You             →  you know what to do
   Information-flow arrows pass through the company's lane. The legal
   decision arrow STAYS in the lawyer's lane and never enters the
   company's lane. Animate the arrows drawing in on scroll
   (stroke-dashoffset). Stack vertically on mobile.

4. Packages — three cards. Monthly tracking (featured, emerald border),
   Single letter, Process handling with power of attorney (navy border).
   Strong price typography. Price rows expand on hover.

5. Why us — large numbered items, numerals in the serif display face
   at display size, in emerald.

6. How it works — four steps as a HORIZONTAL timeline with a progress
   line that fills as the section scrolls into view. Vertical on mobile.

7. Scope — "What we do" / "What we don't do", two columns, checks and
   crosses. Dark navy background. This is the page's honesty statement;
   design it with confidence, not apology. Below it, a highlighted note
   explaining the lawyer's role.

8. FAQ — accessible accordion, keyboard operable.

9. Contact — form with name, email, phone with country code, service
   type, message, consent checkbox. Toast for success and error
   (never alert()).

10. Footer — two columns, legal disclaimer, privacy link,
    operator legal name and tax ID placeholders.

11. Floating WhatsApp button, bottom right. No pulsing.

## Motion rules

  duration:  fast 150ms · normal 250ms · slow 400ms · narrative 600ms+
  easing:    enter cubic-bezier(0.16,1,0.3,1) · exit cubic-bezier(0.7,0,0.84,0)
  distance:  max 24px
  stagger:   60ms
  property:  opacity and transform only

Scroll animations must use CSS scroll-driven animations
(animation-timeline: view()) with an @supports fallback — no GSAP
ScrollTrigger, no Lenis, no Locomotive. JS budget is tight.

## Do not

Glassmorphism stacks · multi-layer glows · parallax hero · cursor-follow
effects · auto-rotating carousels · page-load animation showreels ·
purple or neon gradients · glossy 3D · fake client logos · invented
statistics counters ("1,200+ cases") · stock photos of handshakes or
skylines · flag collages.

## Accessibility

Body contrast ≥ 4.5:1. Visible :focus-visible ring. Skip to content link.
Labels bound to inputs. Accordion keyboard operable. Honour
prefers-reduced-motion.

Deliver: one page, responsive, with the hero animation and the lane
diagram fully realised. These two are the point of the exercise —
if you must simplify, simplify elsewhere.
```

---

# 4) PROMPT C — Figma Make / görsel tasarım aracı

> Kod üretmeden yön kararı almak için. En ucuz iterasyon burası.

```
Bir Polonya merkezli, çok dilli idari destek servisi için kurumsal web
sitesi tasarımı üret. Kod değil, görsel konsept istiyorum.

## İş

Polonya'daki kurumlardan (vergi dairesi, ZUS, göç idaresi) gelen resmi
Lehçe yazıları, yabancı sakinlere ve şirketlere kendi dillerinde
(PL/EN/TR) açıklayan bir servis. Süreci takip eder, müşteri–kurum–avukat
arasında koordinasyon sağlar.

ÖNEMLİ: Bu bir hukuk bürosu DEĞİL ve hukuki süreci yönetmiyor — onu
ortak Polonyalı avukat yapıyor. Tasarım bu sınırı gizlemek yerine
GÖRÜNÜR kılmalı. Dürüstlük markanın ana varlığı.

## Duygu

Hedef kitle: eline anlamadığı dilde, son tarihi olan resmi bir kâğıt
geçmiş insanlar. Duygu: kaygı + zaman baskısı. Tasarımın işi heyecan
yaratmak değil, SAKİNLEŞTİRMEK ve NETLEŞTİRMEK.

Referans hissi: ciddi danışmanlık, editöryel yayın, resmi belge güveni.
Referans OLMAYAN: startup, turizm acentesi, hukuk bürosu taklidi.

## Palet (bire bir kullan, yeni renk icat etme)

  Lacivert  #0B1220 · #0F1C2E · #1A2B42
  Slate     #475569 · #64748B
  Zemin     #F8FAFC   Yüzey #FFFFFF   Kenarlık #E2E8F0
  Emerald   #059669 · #10B981   (birincil CTA)
  Teal      #0D9488
  WhatsApp  #25D366   (sadece WhatsApp butonu)

Tipografi: Display = Source Serif 4, Gövde = Source Sans 3. Inter yok.
Açık zemin varsayılan; SADECE BİR koyu bölüm (Kapsam) vurgu olarak.

## Üretilecek ekranlar

  1. Ana sayfa — masaüstü (1440px), tam sayfa
  2. Ana sayfa — mobil (390px), tam sayfa
  3. Hero yakın plan — belge dönüşümü kompozisyonunun 3 karesi
     (başlangıç / tarama anı / sonuç)
  4. "Ne yapıyoruz" şerit diyagramı — tek başına, büyük
  5. Paket kartları — 3 varyant (normal / öne çıkan / vekaletli)
  6. Kapsam bölümü — koyu zemin, "yaptığımız / yapmadığımız"
  7. Müşteri portalı dosya sayfası — durum adımları ana öge
  8. Operatör paneli — koyu sol ray + yoğun tablo (mevcut yön korunur)

## Hero kompozisyonu (ana iş)

Split. Solda: küçük üst etiket, büyük serif başlık, açıklama paragrafı,
üç ince rozet, iki buton (dolu emerald + outline).

Sağda: BELGE DÖNÜŞÜMÜ — üç aşamalı görsel anlatı:
  1. Lehçe resmi yazı: gerçek metin değil tipografik doku (gri satır
     blokları) + birkaç okunur Lehçe kelime ("wezwanie", "termin",
     "załącznik") + damga/antet hissi
  2. İnce emerald tarama çizgisi geçer, üç alan vurgulanır
  3. Net kart: "Ne istendi" / "Son tarih" / "Sıradaki adım"

Bu üç aşamayı ayrı kareler olarak da ver — animasyon storyboard'u olacak.

## Şerit diyagramı (ikinci ana iş)

    Avukat ortağı  ─── hukuki karar ve temsil        [AYRI ŞERİT]
    ────────────────────────────────────────────────────────────
    Kurum          →  yazı gelir
    POL-TURK       →  açıklar · takip eder · koordine eder
    Siz            →  ne yapacağınızı bilirsiniz

Bilgi akışı okları POL-TURK şeridinden geçer. Hukuki karar oku avukat
şeridinde kalır ve POL-TURK şeridine GİRMEZ. Bu ayrım diyagramın tüm
amacı — sınırı yazıyla değil şekille anlat.

## Yapma

Glassmorphism · çok katmanlı glow · parallax · mor/neon gradient ·
3D chrome · el sıkışma / gökdelen stok fotoğrafı · bayrak kolajı ·
sahte müşteri logosu · uydurma istatistik ("1.200+ dosya") ·
otomatik carousel

## Çıktı

Her ekran için: tam kompozisyon + kullanılan token'ların listesi.
Ayrıca 8–12 bileşenlik bir mini tasarım sistemi sayfası (buton
varyantları, kart varyantları, rozet, durum göstergesi, tablo satırı,
form alanı, boş durum).
```

---

# 5) PROMPT D — AI video modeli (Veo / Sora / Runway)

> **Önce §1.8 Katman 3'teki uyarıyı okuyun** — bu en pahalı, en az getirili katman. Katman 1 ve 4'ü yaptıktan sonra hâlâ istiyorsanız kullanın.

## D.1 — Hero döngüsü (soyut, marka güvenli)

```
A quiet, elegant 12-second seamless loop for a professional services
website hero. Silent, no text overlays, no people's faces.

Subject: an official government letter on a clean desk surface, shot
from directly above (top-down, orthographic feel). The paper has the
typographic texture of a formal European administrative document —
dense small type, a header block, a stamp impression — but NO readable
sentences and NO recognisable institution names or logos.

Action: a soft band of light travels slowly across the page from left
to right, like a scanner pass. As it passes, three small regions of the
document gently lift and separate from the page — as if being
understood — and settle into three clean, evenly spaced horizontal
cards to the right of the page. The cards are blank (text will be
overlaid in the browser). Then everything settles and holds.

Camera: locked off, no movement. Very slight, slow push-in is
acceptable — no more than 3%.

Lighting: soft, diffuse, daylight from the upper left. Gentle paper
shadow. Calm and clinical, not dramatic.

Colour: desaturated cool neutrals. Deep navy (#0F1C2E) shadows, near-
white paper (#F8FAFC). ONE accent colour only: a restrained emerald
green (#059669) in the scan light and the card edges. No other colour.

Mood: calm authority, clarity, quiet competence. Serious professional
service. NOT corporate stock footage, NOT dramatic, NOT aspirational
lifestyle.

Avoid: people, faces, hands typing, handshakes, city skylines, flags,
maps, glass office towers, lens flares, particle effects, floating UI
holograms, blue-tech grids, purple or teal-orange grading, fast cuts,
camera shake, text of any kind, logos, watermarks.

Technical: 16:9 and 9:16 versions. Seamless loop — the last frame must
match the first. Silent. Sharp focus on the document throughout.
```

## D.2 — "Ne yapıyoruz" açıklayıcı (bağlamsal)

```
A 15-second silent loop showing a calm European office desk from a
slightly elevated three-quarter angle. On the desk: a stack of official
envelopes and letters in formal administrative layout (no readable text,
no logos, no institution names), a closed laptop, a plain notebook.

Action: the envelopes are gently sorted into an orderly row — unhurried,
deliberate, as if by someone competent and unrushed. No hands visible;
the movement is subtle and almost editorial, like stop-motion smoothed
out. The stack goes from disordered to ordered.

Lighting: natural window light from the left, soft shadows, late morning.
Colour: cool neutral, desaturated. Deep navy shadows, warm paper whites.
A single restrained emerald accent (a folder edge or a bookmark).

Mood: order emerging from disorder. Relief. Competence. Quiet.

Avoid: faces, hands, stock-office clichés, glass towers, flags, maps,
motivational lighting, lens flare, particles, holographic UI, fast
motion, text, logos, watermarks.

Technical: 16:9 and 9:16. Seamless loop. Silent. Locked camera.
```

### Video uygulama kuralları (kod tarafına)

```
- Hero'nun LCP ögesi ASLA video olmayacak. Video h1'in altında veya
  ayrı bölümde.
- <video muted playsInline loop preload="none" poster="...">
- poster: videonun ilk karesinden üretilmiş, ≤ 40 KB AVIF/WebP
- IntersectionObserver ile görünürken oynat, çıkınca duraklat
- prefers-reduced-motion: reduce → video hiç yüklenmez, poster kalır
- Mobilde varsayılan: sadece poster (bant genişliği)
- Format: AV1 (birincil) + H.264 (fallback), ≤ 1.5 MB toplam
- Video üstüne metin: HTML olarak, video içine gömülü DEĞİL (i18n)
```

---

# 6) PROMPT E — Lottie / motion graphics brief

> Bir motion designer'a veya AI motion aracına verilecek. Katman 1 yetmediğinde.

```
POL-TURK için dotLottie formatında iki vektör animasyonu.

## Ortak kurallar

  Format: .lottie (dotLottie), JSON değil — boyut için
  Bütçe: her biri ≤ 120 KB
  Kare: 30 fps
  Metin: ANİMASYONUN İÇİNDE METİN YOK. Metin katmanları boş bırakılacak;
         HTML olarak üstüne bindirilecek (3 dil desteği için zorunlu)
  Renk: sadece aşağıdaki palet, yeni renk yok
        #0B1220 #0F1C2E #1A2B42 #475569 #64748B
        #F8FAFC #FFFFFF #E2E8F0 #059669 #10B981 #0D9488
  Hareket: opacity + transform ağırlıklı; ağır path morph'tan kaçın
  Statik poster: her animasyonun son karesi ayrı SVG olarak teslim
                 (reduced-motion için)
  Döngü: yok — bir kez oynar ve son karede durur

## Animasyon 1 — "Belge dönüşümü" (3.0 s)

  0.0–0.8  Soldan bir resmi belge belirir. Tipografik doku: gri satır
           blokları, üstte antet bloğu, sağ altta damga dairesi.
           Okunur metin yok.
  0.8–1.6  İnce emerald yatay çizgi belgeyi yukarıdan aşağı tarar.
           Geçtiği yerde üç bölge kısa süre parlar (#10B981, %18 opaklık).
  1.6–2.4  Bu üç bölge belgeden ayrılıp sağa doğru kayar, üç yatay
           karta dönüşür. Kartlar beyaz yüzey, ince kenarlık, hafif gölge.
           Stagger 80 ms.
  2.4–3.0  Kartlar yerine oturur. Solda belge %35 opaklığa düşer
           (arka plana çekilir). Son kare: net üç kart öne çıkmış.

  Kart içleri BOŞ — üç satırlık metin alanı bırak (HTML bindirmesi için).

## Animasyon 2 — "Süreç şeritleri" (2.5 s)

  Dört yatay şerit, yukarıdan aşağı:
    Şerit A (ayrı, üstte, ince ayırıcı ile): Avukat ortağı
    Şerit B: Kurum
    Şerit C: POL-TURK  (vurgulu — emerald sol kenar)
    Şerit D: Siz

  0.0–0.6  Şeritler yukarıdan aşağı sırayla açılır (stagger 100 ms).
  0.6–1.6  Şerit B'den bir zarf ikonu çıkar, Şerit C'ye gelir,
           orada bir "netleşme" beklemesi yaşar (hafif ölçek nabzı),
           sonra Şerit D'ye ulaşır. İz olarak emerald bir çizgi bırakır.
  1.6–2.2  Şerit A'da AYRI bir ok belirir ve KENDİ ŞERİDİNDE kalır —
           Şerit C'ye asla girmez. Rengi navy (#1A2B42), emerald değil.
           Bu ayrım animasyonun tüm amacı.
  2.2–2.5  Her şeritte etiket alanı belirir (BOŞ — HTML bindirmesi).

  Şerit A'nın ayrılığı görsel olarak net olmalı: farklı renk, ayırıcı
  çizgi, ve okunun asla diğer şeritlere geçmemesi.

## Teslim

  - 2 × .lottie dosyası
  - 2 × son kare SVG (statik poster)
  - Renk katmanlarının isimlendirilmiş listesi (tema değişimi için)
  - Metin alanlarının koordinat/boyut listesi (HTML bindirmesi için)
```

**Kod tarafı yükleme:**

```
- @lottiefiles/dotlottie-react, dynamic import ile
- Görünür alana girene kadar yükleme (IntersectionObserver)
- prefers-reduced-motion: reduce → dotLottie hiç yüklenmez, SVG poster
- Yer tutucu boyut sabit (CLS = 0)
```

---

# 7) Kütüphane kararları

Mevcut: `next` 16.3.0 · `react` 19.2.8 · `tailwindcss` v4 · `framer-motion` 12.43.0 · `lucide-react` · `zod` 4 · `react-hook-form` 7

| Karar | Ne | Neden |
|---|---|---|
| **Taşı** | `framer-motion` → **`motion`** (`npm install motion`, import `motion/react`) | Framer Motion'ın yeni adı ve yeni paketi. Kütüphane "Motion for React (previously Framer Motion)" olarak yeniden markalandı. Geçiş çoğunlukla import değişikliği |
| **Ekle** | `class-variance-authority` + `tailwind-merge` + `clsx` | `Services.tsx`'teki üç seviyeli ternary kart varyantı tam olarak bunun için var. Toplam ~3 KB gzip |
| **Ekle** | **Radix UI Primitives** veya **Base UI** (Accordion, Dropdown, Dialog) | SSS accordion ve dil menüsü şu an elle yazılmış. Klavye + ARIA bedava gelir. Sadece kullanılan primitifleri kur |
| **Ekle** | `sonner` | Form başarı/hata bildirimi. `alert()` invariants'ta yasak; şu an yerine geçen bir şey yok. ~5 KB |
| **Ekle (koşullu)** | `@lottiefiles/dotlottie-react` | Sadece §6 Katman 2'ye geçilirse. Dinamik import zorunlu |
| **Ekleme** | GSAP / ScrollTrigger / Lenis / Locomotive | `docs/20` "ağır scroll library yok" diyor. CSS scroll-driven animations aynı işi 0 KB ile yapıyor |
| **Ekleme** | Yeni UI kit (shadcn tam kurulum, MUI, Chakra) | Token sistemi zaten var ve tutarlı; bütün bir kit taşımak onu bozar. Primitif düzeyinde kalın |
| **Değerlendir** | Next.js View Transitions | Sayfa geçişleri için. Neredeyse sıfır JS. Next 16'daki mevcut API durumunu kurulumdan önce doğrulayın |

**Sıfır JS ile modern hareket:**

```css
/* Scroll-driven — kütüphane yok */
@supports (animation-timeline: view()) {
  .pt-reveal {
    animation: pt-reveal-kf linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 35%;
  }
}
@keyframes pt-reveal-kf {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .pt-reveal { animation: none; opacity: 1; transform: none; }
}
```

> Kurulumdan önce her paketin güncel sürümünü ve React 19 / Next 16 uyumunu doğrulayın — bu tablo yön gösterir, sürüm sabitlemez.

---

# 8) Kabul kriterleri

Tasarım turu ancak hepsi sağlanınca "bitti" sayılır.

**Performans**
- [ ] Initial JS ≤ 200 KB gzip (öncesi/sonrası karşılaştırması yazılı)
- [ ] LCP ≤ 2.5 s (mobil, orta cihaz) — LCP ögesi h1 metni
- [ ] CLS ≤ 0.1 · INP ≤ 200 ms
- [ ] Lighthouse mobil Performance ≥ 85

**Erişilebilirlik**
- [ ] `prefers-reduced-motion: reduce` → tüm anlatı animasyonları kapalı, içerik tam
- [ ] Klavye ile tüm sayfa gezilebilir; `:focus-visible` her yerde görünür
- [ ] Gövde kontrast ≥ 4.5:1 (koyu Kapsam bölümü dahil ölçüldü)
- [ ] Accordion ve dil menüsü ARIA doğru
- [ ] Skip-to-content çalışıyor

**i18n**
- [ ] Yeni metinlerin tamamı `src/content/{tr,pl,en}.ts` üçünde de var
- [ ] Animasyon içi metinler HTML olarak, üç dilde
- [ ] Üç dilde de düzen bozulmuyor (Lehçe kelimeler uzun — taşma testi)

**Ürün sınırı**
- [ ] Hiçbir metin/görsel "hukuki süreci biz yönetiyoruz" izlenimi vermiyor
- [ ] Şerit diyagramında avukat oku POL-TURK şeridine girmiyor
- [ ] `docs/33` kanonik cümlesi ile çelişki yok

**Teknik hijyen**
- [ ] `tsc --noEmit` + `lint` + `build` yeşil
- [ ] Hardcode hex yok; tanımsız `pt-*` sınıfı yok
- [ ] `alert`/`confirm`/`prompt` yok
- [ ] `tailwind.config.js` oluşturulmadı
- [ ] Eklenen her bağımlılık için gzip boyutu + gerekçe yazılı

**Tutarlılık**
- [ ] Site, `/hesabim` ve `/panel` aynı token ölçeğini kullanıyor
- [ ] Buton/kart/rozet varyantları tek yerden (cva)

---

# 9) Önerilen sıra

```
1. Prompt C (Figma Make)        → 2-3 yön konsepti, ucuz    ~yarım gün
2. Yön seçimi                    → siz karar verirsiniz
3. Prompt A Faz 0                → token temizliği (bağımsız, hemen)  ~1 saat
4. Prompt A Faz 1-2              → primitifler + Hero        ~1-2 gün
   └─ burada dur, bak, karar ver
5. Prompt A Faz 3-4              → şerit diyagramı + bölümler ~2-3 gün
6. Prompt A Faz 5-6              → portal + panel             ~2 gün
7. (opsiyonel) Prompt E          → Lottie, Katman 1 yetmezse
8. (opsiyonel) Prompt D          → video, en son
```

**Prompt B (v0/Lovable)** paralel bir keşif hattı: aynı anda çalıştırıp Figma çıktısıyla karşılaştırabilirsiniz. Repoya doğrudan taşınmaz.

## Bir uyarı

Marka adı hâlâ kesinleşmedi (`docs/49`: RELYX düştü, RELY/RELNOR/RELATUM/RELIUS adayları). Logo, favicon, OG görseli ve wordmark tipografisi bu karara bağlı.

**Ama tasarım turunu bekletmeye gerek yok:** yukarıdaki işlerin hiçbiri isme bağımlı değil — düzen, ritim, motion sistemi, token ölçeği, şerit diyagramı, portal ve panel hizalaması hepsi isimden bağımsız. Yalnızca `BrandLockup` bileşeni ve marka varlıkları son adımda değişir. İsim kararı verildiğinde tek bir bileşen ve `public/brand/` klasörü güncellenir.

---

*Bu brief mevcut kod okunarak yazıldı. §1.5'teki bulgular (tanımsız token'lar, kapalı Hero animasyonu, ternary varyant zinciri) doğrudan kaynaktan doğrulandı.*

Sources: [Motion for React — Get started](https://motion.dev/docs/react)
