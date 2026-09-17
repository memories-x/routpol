# Playbook 11 — Performance Optimization

**Tetik:** Profil çıktısı veya kullanıcı raporu spesifik bir darboğaz gösteriyor (render, request latency, bundle size, memory).

## Architect Ekstra Gate'ler

- **G+ Baseline Measurement First**: Optimizasyon başlamadan önce **somut sayı**. "Daha hızlı" değil "300ms → 80ms".
- **G+ Bottleneck Evidence**: Plan'ın `intent.bottleneck` alanında profile/log kanıtı olmalı.
- **G+ Hypothesis Discipline**: "Şunu değiştirirsek N% hızlanır" hipotezi yazılı + ölçülecek.
- **G+ Premature Optimization Refleks ABORT**: Kanıtsız "şu daha hızlı olur" planları reddedilir.

## Tipik Failure Modes

- "useMemo ekleyelim hızlanır" → ölçülmedi, useMemo overhead ile yavaşlıyor olabilir
- N+1 query "fix"i tek-batch'e dönüştürür ama transactional consistency bozar
- Lazy load "iyileştirme" UX'i bozar (initial paint geç)
- Bundle size çekmek için tree-shake değişikliği — runtime error gizler

## Plan Şablonu

```yaml
title: Performance Optimization — <somut darboğaz>

scope:
  project: ac-panel | ac-daemon
  module: <etkilenen dosyalar>
  out_of_scope:
    - Diğer perf sorunları (ayrı plan)
    - Feature ekleme
    - Refactor (saf optimizasyon)

intent:
  what: <hangi metric optimize edilecek>
  why: <kullanıcı etkisi: "1000 server'lı sayfa 5sn yükleniyor">
  bottleneck: |
    Profil çıktısı:
      - Component X re-render: 2400ms (8 re-render × 300ms)
      - Network: 200ms (kabul edilebilir)
      - Bundle parse: 500ms
    Hipotez: X komponenti gereksiz re-render — useMemo ile %75 düşer
  baseline_measurement: |
    Chrome DevTools → Performance → 1000-server load
    P50: 4800ms, P95: 6200ms (3 ölçüm ortalama)
  triggered_by: profile_data | user_report | monitoring_alert

steps:
  - order: 0
    action: pre_flight_baseline
    description: |
      Aynı senaryoda 3 ölçüm al, P50/P95 kaydet.
      .perf-baseline.json'a yaz.
    risk: low

  - order: 1
    action: apply_optimization
    files: [<etkilenen>]
    risk: medium
    description: |
      Hipotezi uygula. Tek bir değişiklik — A/B karşılaştırması mümkün olsun.

  - order: 2
    action: post_flight_measurement
    description: |
      Aynı senaryo 3 ölçüm. P50/P95 karşılaştır.
      Hedef: P50 < baseline P50 * 0.5

success_criteria:
  - "P50 latency: <baseline_p50> → <target_p50> (delta yazılı)"
  - "P95 latency: regression yok (< baseline_p95)"
  - "tsc + sentinel: yeni finding eklenmedi"
  - "Functional smoke: feature aynı davranışı sergiliyor"
  - "Hipotez doğrulandı mı: yes/no (rapor + sayı)"

rollback:
  trigger: "P50 ölçümü baseline'dan kötü (hipotez yanlış)"
  steps:
    - "Copy-Item .bak → file (optimizasyon revert)"
    - "Hipotezi learning-log'a yaz, gelecek planlar bilsin"
  cleanup_on_success:
    - ".bak dosyaları sil"
    - ".perf-baseline.json'ı .perf-result-<ts>.json olarak arşivle"

estimated_effort: 60-90 dk (ölçüm dahil)
risk_overall: medium (perf optimizasyonu bazen davranış değişikliği üretir)
```

## Hipotez Defteri

Her optimizasyon plan'ı bir hipotez içerir. Hipotez yanlış çıkabilir — bu **başarısızlık değil**, öğrenme. Plan rollback ile kapanır, learning-log'a yazılır, gelecek planlar hipotezi tekrarlamasın.

Doğru hipotez örnekleri:
- "X komponentinde useMemo gereksiz re-render'ı %75 keser" → ölçülebilir
- "API endpoint Y'de DB index eksik, query 200ms → 20ms iner" → ölçülebilir
- "Bundle X chunk'a lazy split edersek initial paint 800ms düşer" → ölçülebilir

Yanlış hipotez örnekleri:
- "Daha temiz olur" — measurable değil
- "Best practice" — sebepsiz değişiklik
- "Belki yardımcı olur" — guesswork

## Senior Notlar

Performance optimization sıkı disiplin gerektirir — ölçüm olmadan "iyileştirme" yapmak random change'tir. Architect bu kategoride **özellikle sert**: profil çıktısı olmayan optimizasyon plan'larını DEFER veya ABORT verir.

Pre-optimization rule: "Önce yavaş ol, sonra hızlı ol." Functional kalitesi olmayan kodu hızlandırmak hatayı hızlandırmak demek.
