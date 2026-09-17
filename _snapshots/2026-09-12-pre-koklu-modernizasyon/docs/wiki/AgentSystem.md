# Agent System — Starter Kit Overview

Three-agent operational model: **Developer → Architect-01 → Sentinel**. This doc is the map; detail in linked wiki nodes.

## Inventory (v1.6.0)

| Component | Count | Path |
|-----------|-------|------|
| Core roles | 3 | Architect, Lead Developer, Sentinel |
| Specialist pool | 31 | `knowledge/agents/skills/` |
| Sentinel skills | 27 | `knowledge/agents/sentinel/skills/` |
| Architect playbooks | 15 | `knowledge/agents/architect/playbooks/` |
| Architect gates | 10 | `knowledge/agents/architect/persona.md` |
| Shared docs | 9 | `knowledge/agents/shared/` |
| Cursor skills | 2 | `dev-workflow`, `team-dispatch` |
| Project templates | 2 | `PROJECT_CHARTER.template.md`, `project.invariants.yaml.example` |

**Start here:** `docs/wiki/TeamRoster.md`

## File map

```
your-project/
├── AGENTS.md                          ← Project charter (customize)
├── ARCHITECT_TASKS.md                 ← Scope lock
├── guard.config.json                  ← Copy from guard.config.example.json
├── scripts/
│   ├── audit-sentinel.js              ← Sentinel CLI
│   └── pre-commit-guard.js            ← Config-driven guard
├── .cursor/
│   ├── skills/dev-workflow/           ← Checkpoint, plan, QA, ship
│   └── rules/agent-team-core.mdc
├── knowledge/agents/
│   ├── sentinel/                      ← persona, 27 skills, reports/
│   ├── architect/                     ← persona, 17 playbooks, reports/
│   ├── skills/                        ← 31 developer role prompts
│   └── shared/                        ← master-rules, handoff, session-handoff, …
└── docs/wiki/
    ├── AgentSystem.md                 ← This file
    ├── AgentWorkflow.md               ← gstack-inspired workflow
    ├── Sentinel.md
    └── Architect-01.md
```

## Three-phase flow

```
Developer (plan YAML)
       │ Geçiş #1
       ▼
Architect-01 (independent session, 10 gates)
       │ PROCEED
       ▼
Developer (implementation)
       │ Geçiş #3
       ▼
Sentinel (27 skills, static + optional LLM)
       │ APPROVED
       ▼
Architect post-flight → learning-log.md
```

## Shared documents

| File | Purpose |
|------|---------|
| master-rules.md | R1–R25 binding rules |
| operating-principles-compiled.md | Distilled session principles |
| team-charter.md | Lane separation |
| handoff-protocol.md | 5 transition formats |
| session-handoff.md | Live context restore (last 5 entries) |
| learning-log.md | Append-only improvements |
| rollback-pattern.md | Snapshot without git |
| pro-performance.md | Small model → Pro discipline |
| severity-calibration.md | BLOCKER / MAJOR / MINOR |
| onboarding-ritual.md | New agent first 5 turns |

## Workflow skill (v1.4.0)

Cursor skill `dev-workflow` adds:

- Checkpoint / handoff
- Plan gate (Architect YAML)
- QA-only verification
- Ship / CHANGELOG

See `docs/wiki/AgentWorkflow.md`.

## Quick CLI

```bash
node scripts/audit-sentinel.js --list-skills
node scripts/audit-sentinel.js --playbook
node scripts/audit-sentinel.js --diff
node scripts/pre-commit-guard.js
```

## Bootstrap checklist

1. Copy starter into project root
2. Customize `AGENTS.md`, `ARCHITECT_TASKS.md`
3. Copy `guard.config.example.json` → `guard.config.json` and set `typescriptProjects`
4. Customize Sentinel skills 03, 04, 06 for your stack
5. Brief AI: read AGENTS + master-rules + onboarding-ritual → `[FRAMEWORK ACK]`
