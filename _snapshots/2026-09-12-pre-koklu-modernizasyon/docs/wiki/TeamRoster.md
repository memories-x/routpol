# Agent Team Roster — Universal Professional Structure

Bu doküman **herhangi bir projeye** drop-in edilebilir ana AI ekibini tanımlar. A-CyberSolutions veya başka bir ürün adına bağlı değildir. Proje özel kurallar `project.invariants.yaml` dosyasında tutulur.

## Organizasyon şeması

```
                    ┌─────────────────────┐
                    │  Operator (İnsan)   │
                    │  Tek karar verici   │
                    └──────────┬──────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Architect-01   │  │ Lead Developer  │  │    Sentinel     │
│  Plan & scope   │  │  Implementation │  │  Code quality   │
│  10 gate        │  │  Plan executor  │  │  27 skill       │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                     │
         │         ┌──────────┴──────────┐          │
         │         │   Specialist Pool   │          │
         │         │  (31 role skill)    │          │
         │         └─────────────────────┘          │
         └──────────────── handoff ─────────────────┘
```

## Katman 1 — Çekirdek trio (her projede zorunlu)

| Rol | Kim | Ne zaman devreye girer | Çıktı |
|-----|-----|------------------------|-------|
| **Operator** | İnsan (sen) | Scope, öncelik, PROCEED/ABORT | Karar |
| **Architect-01** | Bağımsız LLM oturumu | 2+ dosya, güvenlik, yeni modül | PROCEED / REVISE / ABORT |
| **Lead Developer** | Ana kod ajanı | Architect onayı sonrası | Kod + test |
| **Sentinel** | CLI + opsiyonel LLM | Her commit / tur sonu | APPROVED / CHANGES_REQUESTED |

**Lane kuralı:** Architect plan yazar/denetler, kod yazmaz. Sentinel kod denetler, plan yazmaz. Lead Developer sadece onaylı planı uygular.

Detay: `knowledge/agents/shared/team-charter.md`

## Katman 2 — Uzmanlık havuzu (göreve göre dispatch)

31 markdown role skill: `knowledge/agents/skills/`. Dispatch rehberi: `knowledge/agents/team/dispatch-guide.md`.

### Planlama ve koordinasyon

| Uzmanlık | Skill dosyası | Tipik görev |
|----------|---------------|-------------|
| Plan yazımı | `writing-plans.md` | YAML plan taslağı |
| Blueprint | `blueprint-mode.md` | Mimari eskiz, ADR öncesi |
| Plan uygulama | `executing-plans.md` | Adım adım implementasyon |
| Paralel ekip | `dispatching-parallel-agents.md` | Bağımsız alt görevler |
| Subagent | `subagent-driven-development.md` | İzole feature branch mantığı |

### Mimari ve backend

| Uzmanlık | Skill dosyası | Tipik görev |
|----------|---------------|-------------|
| Sistem mimarisi | `backend-architect.md` | Servis sınırları, modül tasarımı |
| API / Node | `node-api.md` | REST, middleware, routing |
| TypeScript | `typescript-pro.md`, `typescript-expert.md` | Tip tasarımı, strict mode |
| Veritabanı | `database-architect.md` | Şema, migration, indeks |

### Frontend ve istemci

| Uzmanlık | Skill dosyası | Tipik görev |
|----------|---------------|-------------|
| UI geliştirme | `frontend-developer.md` | Component, state, layout |
| React | `react-best-practices.md` | Hook, render, performans |
| Electron | `electron-development.md` | Desktop shell, IPC |
| Mobile | `mobile-developer.md` | iOS/Android / cross-platform |

### Güvenlik

| Uzmanlık | Skill dosyası | Tipik görev |
|----------|---------------|-------------|
| Güvenlik denetimi | `security-auditor.md` | OWASP, auth, secrets |
| Tehdit modeli | `threat-modeling-expert.md` | STRIDE, abuse case |
| Backend güvenlik | `backend-security-coder.md` | Injection, SSRF, ACL |
| Frontend güvenlik | `frontend-security-coder.md` | XSS, CSP, token storage |
| Mobile güvenlik | `mobile-security-coder.md` | Keychain, cert pinning |
| Güvenlik checklist | `security-audit.md`, `security-best-practices.md` | Release öncesi sweep |

### Kalite, test, debug

| Uzmanlık | Skill dosyası | Tipik görev |
|----------|---------------|-------------|
| Kod inceleme | `code-reviewer.md` | Logic flaw, coupling |
| TDD | `test-driven-development.md` | Red-green-refactor |
| Test otomasyon | `test-automator.md` | E2E, integration |
| Doğrulama | `verification-before-completion.md` | Ship öncesi checklist |
| Debug | `debugger.md`, `systematic-debugging.md` | Root cause |
| Log analizi | `error-detective.md` | Stack trace, correlation |

### Operasyon

| Uzmanlık | Skill dosyası | Tipik görev |
|----------|---------------|-------------|
| DevOps | `devops-troubleshooter.md` | CI/CD, container, deploy |
| Olay müdahale | `incident-responder.md` | Outage, rollback, comms |
| JavaScript genel | `javascript-pro.md` | Legacy JS, tooling |

## Katman 3 — Workflow modları (Cursor skill)

`.cursor/skills/dev-workflow/` — proje bağımsız süreç:

| Mod | Ne işe yarar |
|-----|--------------|
| Checkpoint | Oturum kaydet / devam |
| Plan gate | Architect onayı zorunlu |
| QA-only | Sadece doğrula, feature ekleme |
| Ship | CHANGELOG + wiki + guard |

## Tipik görev → ekip eşlemesi

| Senaryo | Çekirdek | + Uzman(lar) |
|---------|----------|--------------|
| Yeni REST modülü | Architect → Lead Dev → Sentinel | `backend-architect`, `node-api`, `test-automator` |
| Auth / OAuth | Architect → Lead Dev → Sentinel | `security-auditor`, `backend-security-coder`, `threat-modeling-expert` |
| React dashboard | Architect → Lead Dev → Sentinel | `frontend-developer`, `react-best-practices` |
| Production outage | Operator | `incident-responder`, `debugger`, `devops-troubleshooter` |
| Pre-release audit | Sentinel (full) | `security-audit`, `verification-before-completion`, `code-reviewer` |
| Büyük refactor | Architect (15 playbook #01) | `code-reviewer`, `test-automator` |
| Paralel 3 feature | Architect (scope split) | `dispatching-parallel-agents` × 3 Lead Dev oturumu |

## Escalation yolu

```
1. Specialist takılırsa → Lead Developer özet + session-handoff
2. Scope belirsizse    → Architect REVISE / DEFER
3. BLOCKER bulgu       → Sentinel REJECTED → plan revizyon (Architect)
4. Güvenlik çelişkisi → Sentinel öncelik (team-charter)
5. Scope çelişkisi     → Architect öncelik
6. Karar verilemiyorsa → Operator (insan)
```

## Yeni projeye bootstrap

1. Starter kit'i proje root'a kopyala
2. `project.invariants.yaml.example` → `project.invariants.yaml` doldur
3. `PROJECT_CHARTER.md` oluştur (şablondan)
4. `ARCHITECT_TASKS.md` → `current_focus`
5. Sentinel skill 03/04/06'yı invariant dosyana göre güncelle (opsiyonel)
6. AI briefing: bu dosya + `team-charter.md` + `onboarding-ritual.md`

## Bağımsızlık kuralı

Aynı LLM oturumunda **Architect + Sentinel** veya **plan yazan + plan onaylayan** olma. Rubber stamp riski — master-rules R1.
