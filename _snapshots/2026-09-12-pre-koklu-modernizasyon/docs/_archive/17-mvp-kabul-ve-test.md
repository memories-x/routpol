# MVP / Faz Kabul — Hizalama

Detaylı Faz 1–3 DoD artık **`03-fazlar.md`** içinde. Bu dosya test ve kontrol listelerini tutar.

## Faz 1 kapısı (iskelet)

- [ ] `next build` OK  
- [ ] `/tr` layout render  
- [ ] `pl`/`en` route + soon davranışı  
- [ ] `content` tipleri + tr dolu iskelet, pl/en stub  
- [ ] `pt-*` token + fontlar  
- [ ] `/api/teklif` stub envelope  
- [ ] `.env.example`  

## Faz 2 kapısı (TR yüzey)

- [ ] 9 section + footer disclaimer + gizlilik  
- [ ] Anchor’lar  
- [ ] FAB (numara varsa)  
- [ ] SEO meta TR  
- [ ] Responsive 390/768/1440  
- [ ] Reduced-motion  

## Faz 3 kapısı (ship TR) = eski “MVP DoD”

- [ ] Form E2E (S1) + KVKK + honeypot + rate limit  
- [ ] Başarı/hata UI (alert yok)  
- [ ] Dosya UI notu doğru  
- [ ] Lighthouse mobil P≥85  
- [ ] Vercel preview  
- [ ] Sentinel/tsc  
- [ ] `18` ship engelleri kapalı  
- [ ] Çıkış raporu: Ship Evet/Hayır  

## Test matrisi (manuel) — Faz 3

| # | Cihaz | Senaryo |
|---|--------|---------|
| T1 | Chrome 390 | Form submit |
| T2 | Safari iOS | FAB safe-area |
| T3 | Desktop 1440 | Header + dil |
| T4 | Keyboard | Focus / accordion |
| T5 | Slow 3G | Loading state |
| T6 | Dil PL | Yakında |

## Çıkış raporu şablonu

```
Faz X QA:
- Build: OK/FAIL
- Kapı checklist: …
- Lighthouse: P= / A= / S= / SEO=
- Bilinen kusurlar: …
- Sonraki faz: …
- Ship/Geçiş: Evet/Hayır
```
