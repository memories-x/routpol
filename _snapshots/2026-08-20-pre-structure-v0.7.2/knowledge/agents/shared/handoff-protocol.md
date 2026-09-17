# Handoff Protocol

Architect-01 ↔ Developer ↔ Sentinel arasındaki bilgi geçişinin **kanonik formatı**. Format-dışı handoff = sessiz drift = bilinen kaos kaynağı.

## Geçiş #1: Developer → Architect (Plan Submission)

Developer, plan'ı tek bir markdown bloğu olarak gönderir. Yapı:

````
## Plan Submission — <title>

```yaml
title: <eylem-fiilli kısa başlık>
scope:
  project: ac-panel | ac-daemon | ac-website-restored
  module: <dosya/klasör/domain>
  out_of_scope: [...]
intent:
  what: <bir cümle>
  why: <bir cümle + referans>
  triggered_by: user_request | sentinel_finding | regression | scheduled
steps:
  - { order: 1, action: ..., files: [...], risk: low|medium|high }
dependencies: [...]
side_effects: [...]
rollback:
  trigger: <otomatik tespit edilebilir koşul>
  steps: [...]
success_criteria: [<ölçülebilir>]
stop_conditions: [...]
estimated_effort: <dakika>
risk_overall: low | medium | high | critical
disk_impact: none | light | heavy          # container/disk işlerinde zorunlu (R23)
disk_borrow: "<komut veya n/a>"
disk_return: "<komut — heavy dahil zorunlu>"
disk_verify: "<guard komutu>"
```
````

## Geçiş #2: Architect → Developer (Verdict)

Architect rapor formatı (zorunlu, Architect persona §VI):

```
## Architect-01 Pre-Flight Audit — <plan title>

**Decision:** PROCEED | REVISE | ABORT | DEFER
**Risk Profile:** low | medium | high | critical
**Plan Hash:** <8-char>

### Gate Sonuçları
| G1-G9 sonuçları tablosu |

### Kırmızı Gate'ler (varsa)
...

### Side-Effect Haritası
...

### Rollback Doğrulaması
...

### Sentinel Handoff
Implementation sonrası çalıştırılacak:
node scripts/audit-sentinel.js <files> --tsc

### Karar Gerekçesi
...

— Architect-01 @ <ts> | gates_passed: N/9 | plan_hash: <hash>
```

PROCEED dışı kararlar developer'a geri döner; PROCEED ise Geçiş #3.

## Geçiş #3: Developer → Sentinel (Implementation Done)

Developer implementasyonu bitirir, Sentinel'i çalıştırır:

```bash
# Static engine
node scripts/audit-sentinel.js <files> --tsc --report=md

# Veya LLM auditor (semantik review):
node scripts/audit-sentinel.js --persona > .persona.tmp
# .persona.tmp + diff'i Claude/başka LLM'e ver
```

Sentinel raporu (persona §VI) verdict üretir.

## Geçiş #4: Sentinel → Architect (Post-Flight Close)

Sentinel APPROVED veya APPROVED_WITH_NOTES verdiyse, Architect post-flight kontrol yapar:

```
## Architect-01 Post-Flight Close — <plan title>

**Decision:** CLOSED | REOPEN
**Plan Hash:** <önceki hash, eşleşmeli>
**Sentinel Score:** <Sentinel raporundan>

### Success Criteria Doğrulaması

| Criterion | Beklenen | Gözlemlenen | ✅/❌ |
|-----------|----------|--------------|------|
| tsc 0 hata | 0 | 0 | ✅ |
| sentinel ≥85 | 85 | 92 | ✅ |
| <criterion> | ... | ... | ... |

### Learning Log Entry

(shared/learning-log.md'ye eklenecek özet)

— Architect-01 @ <ts> | sentinel_score: 92 | criteria_passed: N/N
```

CLOSED → döngü tamamlanır, learning log entry eklenir.
REOPEN → Geçiş #1'e geri dön (yeni plan veya revize plan).

## Geçiş #5: Hata Durumlarında

- **Sentinel REJECTED**: Geçiş #3 sonrası, BLOCKER var. Plan otomatik REVISE. Developer kod düzeltir, Sentinel'i tekrar çalıştırır.
- **Plan eksik (Architect DEFER)**: Geçiş #1 reddedilir. Developer eksik alanları tamamlar, tekrar gönderir.
- **Plan dışı dosya değişti**: Architect Geçiş #4'te `git diff` ile tespit eder. REOPEN.
- **Bağımsızlık ihlali (aynı oturum)**: Architect otomatik DEFER. Developer farklı oturum/araç gerekiyor.

## Hash Kullanımı

`plan_hash` (Architect imzasında) **plan'ın canonical YAML'inin SHA-256**'sının ilk 8 hex karakteri. İşlevleri:
- Aynı plan'ın tekrar tekrar gönderilmesini tespit (cache)
- Post-flight close'un doğru plan'a iliştirilmesi
- Learning log'da traceability

Aynı hash ile 3. submission gelirse Architect REJECTED — repeated incomplete submission.

## Format İhlali

Bu protokolün dışında bir handoff (örn. plain text "yapacağım şu" mesajı) **kabul edilmez**. Architect ve Sentinel format-dışı girdiyi reddeder ve developer'a format'ı hatırlatır. Bu sertlik, drift'i en başta keser.
