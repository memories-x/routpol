# Task Dispatch Guide — Hangi uzman ne zaman?

Lead Developer veya Operator görev aldığında bu tabloya bakarak `knowledge/agents/skills/<file>.md` içeriğini system prompt / subagent brief olarak kullan.

## Dispatch algoritması

```
1. Görev tek dosya + düşük risk mi? → Lead Developer doğrudan (Architect skip — operator OK ile)
2. 2+ dosya veya güvenlik mi?      → Architect plan gate ZORUNLU
3. Domain belliyse mi?              → Aşağıdaki tablodan skill seç
4. Belirsizse                       → blueprint-mode.md → Architect'e plan yazdır
5. Kod bitti mi?                    → Sentinel --diff + verification-before-completion.md
6. Ship mi?                         → dev-workflow/ship-release.md
```

## Anahtar kelime → skill

| Kullanıcı / görev sinyali | Skill |
|---------------------------|-------|
| plan, mimari, yeni servis | `writing-plans.md` + Architect persona |
| API, endpoint, Express | `node-api.md` |
| React, component, UI | `frontend-developer.md` + `react-best-practices.md` |
| TypeScript tip hatası | `typescript-pro.md` |
| güvenlik, audit, OWASP | `security-auditor.md` |
| SSRF, injection, auth bug | `backend-security-coder.md` |
| XSS, CSP, client token | `frontend-security-coder.md` |
| tehdit modeli, STRIDE | `threat-modeling-expert.md` |
| test yaz, coverage | `test-automator.md` |
| TDD, önce test | `test-driven-development.md` |
| review, incele | `code-reviewer.md` |
| bug, neden çöküyor | `systematic-debugging.md` + `debugger.md` |
| log, stack trace | `error-detective.md` |
| CI, deploy, Docker | `devops-troubleshooter.md` |
| production down, outage | `incident-responder.md` |
| DB, migration, schema | `database-architect.md` |
| Electron, desktop | `electron-development.md` |
| mobile, iOS, Android | `mobile-developer.md` |
| paralel, aynı anda 3 iş | `dispatching-parallel-agents.md` |
| ship öncesi son kontrol | `verification-before-completion.md` |

## Paralel dispatch örneği

```yaml
task: "Auth refactor + dashboard widget + CI fix"
dispatch:
  - id: auth
    skill: backend-security-coder.md
    scope: src/auth/**
    session: independent
  - id: widget
    skill: frontend-developer.md
    scope: src/components/Dashboard/**
    session: independent
  - id: ci
    skill: devops-troubleshooter.md
    scope: .github/**
    session: independent
merge_gate: Sentinel --diff on all touched files
architect: single plan with 3 steps, PROCEED once
```

## Sentinel vs specialist overlap

| Konu | Birincil | İkincil |
|------|----------|---------|
| Regex / pattern ihlali | Sentinel skill | — |
| Mimari karar | Architect | backend-architect (input) |
| Logic bug | code-reviewer | Sentinel 16-error-handling |
| Security CVE pattern | security-auditor | Sentinel 05-security |

Specialist önerisi Sentinel ERROR ile çelişirse: **Sentinel ERROR kazanır** (kod merge edilmez).

## Prompt şablonu (subagent)

```markdown
You are dispatched as: <role from skill frontmatter name>

Read and follow:
- knowledge/agents/skills/<skill>.md (full body)
- knowledge/agents/shared/master-rules.md
- project.invariants.yaml (if exists)
- ARCHITECT_TASKS.md current_focus

Scope lock: only files listed in plan step N.
Do not expand scope. Report blockers to session-handoff.md.
```
