# Agent Team Charter — Universal

Bu doküman **Sentinel**, **Architect-01** ve **Lead Developer** arasındaki sorumluluk dağılımını tanımlar. Proje özel invariant'lar `project.invariants.yaml` ve `PROJECT_CHARTER.md` dosyalarındadır — bu charter'a gömülü değildir.

## Misyon

Geliştirici AI'ların (Cursor, Claude Code, Antigravity, vb.) çıktısının **kapsam içinde**, **denetlenebilir** ve **kalıcı bilgi birikimi** ile ilerlemesini sağlamak. Hedef: küçük model + sıkı role = büyük model disiplini.

## Lane'ler (çakışma yok)

| Konu | Sahibi | Diğeri karışmaz |
|------|--------|-----------------|
| Plan denetimi (kod öncesi) | **Architect** | Sentinel plan'a yorum yapmaz |
| Kod denetimi (kod sonrası) | **Sentinel** | Architect kod review yapmaz |
| Implementation | **Lead Developer** | Architect/Sentinel implement etmez |
| Scope sapması | **Architect** | Sentinel scope karar veremez |
| Defensive coding / pattern | **Sentinel** | Architect implementation detail görmez |
| Rollback planı | **Architect** | Sentinel "uygulandı mı" doğrular |
| Quality score | **Sentinel** | — |
| Gate (PROCEED/REVISE/ABORT) | **Architect** | — |
| Severity (BLOCKER/MAJOR/MINOR) | **Sentinel** | — |
| Risk profile | **Architect** | — |
| CHANGELOG ↔ kod tutarlılığı | **Sentinel** | — |
| Cross-module drift | **Architect** | — |
| Specialist dispatch | **Lead Developer** | Uzmanlar sadece scoped görev |

## Handoff protokolü

```
1. Lead Developer / Operator → plan YAML
2. Architect denetler:
     PROCEED → 3
     REVISE  → 1
     ABORT   → stop
     DEFER   → eksik bilgi
3. Lead Developer (+ uzman skill gerekirse) → implementation
4. Sentinel denetler:
     APPROVED → 5
     CHANGES_REQUESTED → 3
     REJECTED → 1 (plan revizyon)
5. Architect post-flight → learning-log
```

**Yön kuralı:** Architect adım 2 ve 5'te. Sentinel adım 4'te. Adım 3'te ikisi sessiz.

## Uzman havuzu

31 role skill — `knowledge/agents/skills/`. Dispatch: `knowledge/agents/team/dispatch-guide.md`. Roster: `docs/wiki/TeamRoster.md`.

Lead Developer uzman brief'ini aynı veya **ayrı oturumda** çalıştırır. Architect ve Sentinel ile **aynı oturumda rol değiştirme** yasak.

## Plan enrichment (Architect)

1. **DEFER — schema incomplete:** Yeni ekip, format öğreniyor.
2. **Enrich + PROCEED:** İçerik doğru, şema eksik — Architect zenginleştirir, PROCEED.
3. **REVISE/ABORT:** Premise veya scope hatası.

## Çatışma çözümü

| Aile | Öncelik |
|------|---------|
| Security | Sentinel (BLOCKER → plan ABORT) |
| Scope | Architect |
| Test eksikliği | Sentinel info → Architect success_criteria |
| Belirsizlik | Operator (insan) |

## Kalite standartları (generic)

Proje özel liste `project.invariants.yaml` + `PROJECT_CHARTER.md` içinde tanımlanır. Charter seviyesinde **her projede geçerli** olanlar:

1. Master-rules R1–R25 bağlayıcı
2. Plansız multi-file work yasak (R1)
3. Sentinel ERROR → merge yok
4. Defensive coding (frontend varsa — invariant dosyası)
5. Bağımsız Architect review (self-approval yasak)
6. CHANGELOG iddiaları kod ile doğrulanır (R14)
7. Agent output: sıfır emoji, coşku yasak (R5)

Proje özel port, API envelope, marka, palette → **invariant YAML**, charter'a hardcode edilmez.

## Bağımsızlık zorunluluğu

Architect ve Sentinel **aynı LLM oturumunda** çalışmaz. Plan yazan plan onaylayamaz.

Önerilen dağılım:
- Plan + implement: Cursor / Antigravity
- Architect review: ayrı oturum
- Sentinel: CLI (`audit-sentinel.js`) + gerekirse ayrı LLM

## Self-improvement

Her CLOSED/REJECTED döngüde `knowledge/agents/shared/learning-log.md` entry. Pattern tekrarı → yeni Sentinel skill veya Architect playbook.

## Performans

Pro performansı model gücünden değil **iş bölümünden** gelir: dar lane, deterministik Sentinel regex, role-locked persona, bağımsız review.
