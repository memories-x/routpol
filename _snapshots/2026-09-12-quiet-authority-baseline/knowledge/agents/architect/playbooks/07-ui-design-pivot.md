# Playbook 07 — UI Design Pivot

**Tetik:** Palette değişimi, font sistemi değişimi, layout taxonomy değişimi, tema sistemi (dark/light) eklenmesi.

## Architect Ekstra Gate'ler

- **G+ Palette Discipline**: Yeni renkler `tailwind.config.js → ac` token sistemi içinde mi tanımlanıyor? Raw hex literal yasak. Sentinel `03-palette-discipline` skill'ine takılırsa REVISE.
- **G+ Theme Consistency**: Dark + light her ikisi de planda. Sadece dark "şimdilik" yok.
- **G+ Component Inventory**: `docs/wiki/registry.md`'deki tüm bileşenler etkileniyor mu? Etkilenenlerin listesi planda.
- **G+ Cross-Project Lock**: Panel design pivot otomatik olarak web sitesini etkilemez. Web sitesi ayrı plan. Architect bunu G1 (scope lock) ile yakalar.
- **G+ Brand Continuity**: A-CyberSolutions cyan (#3da4ff) ve purple accent kalıyor mu? Tamamen yeni palette'a geçiş user onayı ile yapılır.

## Tipik Failure Modes

- "Tek bir bileşeni değiştirelim" başlar, palette ve typography'e yayılır
- Raw hex enjeksiyonu (`bg-[#abcdef]`) Tailwind config bypass eder
- Light mode düşünülmez → kontrast 4.5:1 ihlali
- "Apple-grade" / "God-Tier" gibi soyut hedefler ölçülemez → success criteria fail
- Web sitesine sızıntı (palette discipline ihlali)

## Architect'ten Beklenen Çıktı

PROCEED için plan:
- `intent.scope_explicit`: "ac-panel only" veya "ac-website-restored only" — ikisi aynı plan'da değil
- `steps[]`:
  1. Token tanımları (tailwind.config + index.css variables)
  2. Bileşen bazlı geçiş listesi (önce ac-card, sonra ac-btn, vs)
  3. Light + dark her ikisi smoke test
  4. Sentinel `03-palette-discipline` taraması
- `success_criteria`:
  - Sentinel score ≥ 85 (palette skill 0 error)
  - Manual light mode toggle test
  - Contrast ratio AA: 4.5:1 (manuel kontrol veya axe)
- `rollback`: CSS variable system sayesinde root değişkenler eskiye çevrilince tüm panel eski haline döner

## Senior Notlar

UI pivot, en sık scope-drift kaynağı. Architect'in refleksi: plan içinde "while we're at..." gibi cümle gördüyse **REVISE - split**. Apple-grade ifadesi gördüyse success criteria sorar: "ölçülebilir hale getir veya kelimeyi at."

Bu playbook'un en önemli işlevi: panel'in cyan/dark estetiği web sitesinin Accenture-style minimalism'inden ayrı tutulmalı. Architect, panel pivot'unu web sitesine bulaştırma talebine refleks olarak ABORT verir.
