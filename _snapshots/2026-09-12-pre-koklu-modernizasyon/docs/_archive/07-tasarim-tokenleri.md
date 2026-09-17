# Tasarım Tokenleri & Görsel Kimlik

## Yön

Kurumsal güven (navy) + dönüşüm (emerald/teal). Açık zemin. Mor gradient, cream+terracotta, broadsheet gazete stili **yasak**.

## Renk tokenleri (CSS değişkenleri)

| Token | Hex | Kullanım |
|-------|-----|----------|
| `--pt-navy-950` | `#0B1220` | Metin / koyu blok |
| `--pt-navy-900` | `#0F1C2E` | Header, footer |
| `--pt-navy-800` | `#1A2B42` | Başlık vurgusu |
| `--pt-navy-700` | `#243B5A` | İkincil metin koyu |
| `--pt-slate-600` | `#475569` | Gövde metin |
| `--pt-slate-500` | `#64748B` | Yardımcı metin |
| `--pt-bg` | `#F8FAFC` | Sayfa arka plan |
| `--pt-surface` | `#FFFFFF` | Bölüm / form yüzeyi |
| `--pt-border` | `#E2E8F0` | İnce ayırıcı |
| `--pt-emerald-600` | `#059669` | Birincil CTA |
| `--pt-emerald-500` | `#10B981` | Hover / vurgu |
| `--pt-teal-600` | `#0D9488` | İkincil vurgu |
| `--pt-whatsapp` | `#25D366` | WhatsApp butonu |
| `--pt-danger` | `#DC2626` | Form hata |

Tailwind: `pt-navy-*`, `pt-emerald-*` (prefix `pt-` → `project.invariants.yaml` ile uyumlu).

## Tipografi

| Rol | Font | Not |
|-----|------|-----|
| Display / H1–H2 | **Source Serif 4** veya **Fraunces** (tek seçim Faz 1’de) | Marka hissi; Inter yığınına düşme |
| Gövde / UI | **Source Sans 3** veya **DM Sans** | Okunabilir sans |
| Fallback | `Georgia, serif` / `system-ui, sans-serif` | |

**Faz 1 varsayılanı:** Display = Source Serif 4 · Body = Source Sans 3 (Google Fonts / `next/font`).

Ölçek (yaklaşık):

- H1: `clamp(2rem, 4vw, 3rem)` / 1.15
- H2: `1.75rem` / 1.25
- Body: `1rem` / 1.6
- Small: `0.875rem`

## Spacing & radius

- Bölüm dikey: `py-16`–`py-24` (mobil `py-12`)
- Max içerik genişliği: `72rem` (1152px)
- Radius: `0.5rem` (buton/input), `0.75rem` (hizmet kartı)
- Gölge: tek katman, çok hafif (`shadow-sm`) — çok katmanlı glow yasak

## Bileşen kuralları

- Hero: kart yok; tek kompozisyon; brand güçlü
- Hizmet grid: etkileşimli kart OK (Detaylı Bilgi)
- Rozetler: outline veya soft fill; floating sticker değil
- CTA birincil: emerald dolgu, beyaz yazı
- CTA ikincil: outline navy veya WhatsApp yeşili

## Görsel varlıklar (üretim listesi)

| Varlık | v1 | Not |
|--------|----|-----|
| Logo (SVG) | Placeholder wordmark “POL-TURK” | Gerçek logo sonra |
| Favicon | Basit “PT” monogram | |
| Hero görsel | Atmosfer: belge/şehir/köprü hissi — **tam bleed arka plan** | Stok veya illüstrasyon; inset kart yok |
| OG image | 1200×630, marka + kısa slogan | Faz 1 sonu / Faz 2 |
| Empty state ikonları | Lucide | |

## Motion

- En az 2–3: header scroll shadow, hero fade-up, WhatsApp FAB pulse (hafif)
- `prefers-reduced-motion: reduce` → animasyon kapat / opacity only

## Erişilebilirlik (plan checklist)

- [ ] Kontrast: gövde ≥ 4.5:1, büyük metin ≥ 3:1
- [ ] Focus ring görünür (`:focus-visible`)
- [ ] Skip to content link
- [ ] Form label’ları input’a bağlı
- [ ] Accordion klavye (Enter/Space)
- [ ] Dil `lang` attribute locale’e göre
