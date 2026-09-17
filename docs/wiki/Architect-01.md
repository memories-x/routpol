# Architect-01 — Pre-Flight Planning Auditor

**Konum:**
- Persona: `knowledge/agents/architect/persona.md`
- Playbooks: `knowledge/agents/architect/playbooks/` (15 plan şablonu)
- Memory: `knowledge/agents/architect/memory.json` (oluşturulduğunda)
- Scope lock: `ARCHITECT_TASKS.md` (proje kökü)
- CLI: `node scripts/audit-sentinel.js --architect-persona`

## Ne Yapar

Sentinel **kod yazıldıktan sonra** kaliteyi denetler. Architect-01 **kod yazılmadan önce planı** denetler. İkisi tamamlayıcı; A-CyberSolutions'da gözlenen iki ana hata sınıfını ayrı katmanlarda kapatırlar:

| Hata sınıfı | Yakalayan |
|---|---|
| Yanlış kod yazıldı (defensive eksik, palette ihlali, security açığı) | Sentinel |
| Yanlış kod **yazılmaya başlandı** (kapsam sapması, eksik rollback, ölçülemez başarı, paralel ajan çakışması) | Architect-01 |

Antigravity'nin geçmiş hatalarına bakınca, drift'in büyük çoğunluğu **plan aşamasında** başlıyor: kullanıcı X istiyor, ajan "tutarlılık adına" Y'ye dokunuyor. Architect bu zinciri başında kırar.

## 10 Pre-Flight Gate

Plan PROCEED alabilmek için 10 gate'in hepsinden geçmeli:

1. **G1 Scope Lock** — `ARCHITECT_TASKS.md → current_focus` ile eşleşme
2. **G2 Out-of-Scope Honored** — plan, dışı bırakılan alanlara dokunmuyor
3. **G3 Sentinel Compat** — plan, Sentinel skill'lerinden birini ihlal etmeye götürmüyor
4. **G4 Sequencing** — adımlar mantıklı sırada
5. **G5 Dependency Closure** — önkoşullar gerçekten var
6. **G6 Rollback Concrete** — somut geri alma adımları
7. **G7 Success Criteria Measurable** — ölçülebilir bitiş kriterleri
8. **G8 Risk Coherence** — overall risk, step risk'leriyle tutarlı
9. **G9 Concurrency Safety** — paralel ajan/kullanıcı dokunması engellemiş
10. **G10 Direction Lock (R13)** — modify_files'ta aktif direction_lock çakışması yok; ters yön ise geçerli unlock_justification var (bkz. `playbooks/12-direction-lock.md`)

## Plan Schema (Kanonik)

Architect denetlettirilen her plan şu YAML yapısında olmalı:

```yaml
title: ...
scope: { project, module, out_of_scope }
intent: { what, why, triggered_by }
steps: [{ order, action, files, risk }]
dependencies: [...]
side_effects: [...]
rollback: { trigger, steps }
success_criteria: [...]
stop_conditions: [...]
estimated_effort: ...
risk_overall: low|medium|high|critical
```

Eksik plan: **DEFER**. Drama ile onaylama yok.

## Memory (Yeni)

`knowledge/agents/architect/memory.json` — Architect'in kalıcı hafızası. İçerik:

```yaml
stats:
  totalAudits, totalDecisions{PROCEED,REVISE,ABORT,DEFER}, totalClosed, totalReopened
patternFrequency:
  scope_drift_while_at_it, stale_finding_premise, risk_underestimation,
  half_migration, wiki_claim_drift, scope_creep_at_close, r5_reflex_relapse,
  silent_changelog_overwrite, missing_canonical_fields, git_rollback_infeasible
learnedReflexAborts:
  - STALE_FINDING_PREMISE (Plan #1 dersi)
  - GIT_ROLLBACK_NO_GIT_ENV (Plan C dersi)
closedPlans:
  - hash, title, turns, finalScore, advisories
```

Memory `--telemetry` komutu ile görüntülenir.

## Yeni CLI Komutları

```bash
# Plan submission yazımını kolaylaştır
node scripts/audit-sentinel.js --new-plan <playbook>
   # → Boş plan YAML stub'ı stdout'a basar
   # → .bak snapshot Step 0 + mtime check default

# Plan hash hesapla (SHA-256 ilk 8 hex of canonical YAML)
node scripts/audit-sentinel.js --plan-hash plan.yaml
echo "title: ..." | node scripts/audit-sentinel.js --plan-hash

# Telemetri
node scripts/audit-sentinel.js --telemetry
```

## Kullanım

```bash
# 1) Persona'yı stdout'a bas
node scripts/audit-sentinel.js --architect-persona

# 2) Bunu Claude / Cursor / başka bir araca system prompt olarak yapıştır
#    (Plan yazan ajandan FARKLI bir oturumda — bağımsızlık zorunlu)

# 3) Plan'ı (YAML formatında) audit'e gönder
# 4) Architect tablo + karar üretir: PROCEED | REVISE | ABORT | DEFER

# 5) PROCEED ise geliştirici implement eder
# 6) Bitince Sentinel post-flight çalışır:
node scripts/audit-sentinel.js <files> --tsc

# 7) Architect son adımda success_criteria karşılandı mı diye CLOSE der
```

## Bağımsızlık Kuralı (Kritik)

**Plan'ı yazan ajan, planı onaylayan ajan olamaz.** Self-approval = rubber stamp = drama. Gemini'nin başlangıç versiyonundaki en büyük yapısal kusur buydu.

Üç doğru konfigürasyon:
- Antigravity (Gemini) plan yazar → Claude Code Architect persona'sıyla denetler
- Claude Code plan yazar → Antigravity Architect persona'sıyla denetler
- Aynı LLM kullanılıyorsa: farklı/temiz oturum, plan'ı context olarak ver

Aynı oturumda plan + onay durumunda Architect otomatik **DEFER — independence violation** verir.

## Scope Drift Sinyalleri (Reflex ABORT)

- Plan başlığı X projesi, `steps[].files` Y projesi
- Kullanıcı son net direktifi X, plan Y yapıyor
- "While we're at it..." / "Tutarlılık adına..." cümleleri
- "Küçük bir ek" başlayıp 7 dosyaya yayılan değişiklikler

## Sentinel ↔ Architect Handoff Zinciri

```
Developer → Architect-01 (plan audit) → PROCEED
         ↓
       Implementation
         ↓
       Sentinel (code audit) → APPROVED + Score >= 85
         ↓
       Architect-01 (post-flight close) → success_criteria measured → CLOSED
```

Herhangi bir adımda fail: önceki adıma geri dönüş, plan revize, döngü kapatılır.

## Çırak → Usta Karşılaştırması

Gemini'nin orijinal konsepti üç sorumlulukla başladı: hedef muhafızı, mantık denetçisi, risk analisti. İyi niyetli ama eksik. Usta versiyonu üç ekstra katman ekler:

1. **Yapısal disiplin** — plan schema, gate hierarchy, output format
2. **Anti self-approval** — bağımsızlık protokolü (en kritik kazanç; Gemini'nin örnek log'unda her plan'ı kendisi onaylıyordu)
3. **Drift hafızası** — Antigravity'nin bilinen 10 hata pattern'ı, reflex ABORT

## Bilinen Sınırlar

- Plan schema'yı YAML olarak yazmak geliştirici disiplini gerektirir; serbest metinden YAML çıkarmak Architect'in işi değil — geliştiriciye yapılandırılmış girdi sorumluluğu.
- Architect yalnızca **statik plan**'a bakar; runtime drift'i yakalayamaz (Sentinel orada).
- Bağımsızlık LLM düzeyinde değil oturum düzeyinde gevşek korunur — operator dikkati gerekir.
- `ARCHITECT_TASKS.md` `current_focus` güncel tutulmadıysa Architect yanlış ABORT verebilir; operator sorumluluğu.

## Sonraki Adımlar

- `ARCHITECT_TASKS.md` için JSON Schema validation (plan formatı katı doğrulansın)
- Plan hash kalıcı log (tekrar gönderilen eksik planları tespit)
- Sentinel + Architect ortak rapor şablonu
- GitHub Actions / pre-commit: planı denetlemeden push engelleme
