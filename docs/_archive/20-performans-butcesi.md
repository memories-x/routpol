# Performans Bütçesi & Kalite Kapıları

## Bütçe (mobil, orta cihaz)

| Metrik | Bütçe |
|--------|--------|
| JS (initial) | ≤ 200 KB gzip (hedef); kritik yol mümkün olduğunca az |
| Hero görsel | ≤ 200 KB (WebP/AVIF); width doğru |
| Fontlar | max 2 family; `next/font` subset; swap |
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |

## Uygulama kuralları

- Framer Motion: sadece above-fold hafif + FAB; ağır scroll library yok
- Lucide: tree-shakeable named imports
- Dinamik import: ağır olmayan form zaten client; gereksiz “use client” yayma
- CSS: Tailwind; kullanılmayan animasyon keyframe şişirmesi yok

## Kalite kapıları (ship)

1. `next build` OK  
2. Manuel T1–T4 (`17`)  
3. Lighthouse mobilde P≥85  
4. Sentinel score ≥ `quality.min_sentinel_score` (85) — kod varken  
5. PII/secret grep temiz  

## Monitoring (Faz 3)

- Vercel Analytics veya Plausible  
- Hata: opsiyonel Sentry (PII scrub)
