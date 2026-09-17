---
name: team-dispatch
description: >-
  Route tasks to the right specialist from the 31-role pool. Use when user asks
  who should do this, dispatch, uzman, ekip, görev dağılımı, hangi ajan,
  parallel agents, or starting work on an unfamiliar domain.
---

# Team Dispatch

Universal AI team — **not tied to any product**. Full roster: `docs/wiki/TeamRoster.md`.

## Quick pick

| Domain | Skill path |
|--------|--------------|
| Plan / scope | Architect persona + `writing-plans.md` |
| Backend API | `node-api.md`, `backend-architect.md` |
| Frontend | `frontend-developer.md`, `react-best-practices.md` |
| **Public visual / landing** | **`.cursor/skills/public-visual-qa/`** (Browser QA · one surface · refs · snapshot) |
| Security | `security-auditor.md`, `threat-modeling-expert.md` |
| Tests | `test-driven-development.md`, `test-automator.md` |
| Debug | `systematic-debugging.md`, `error-detective.md` |
| DevOps | `devops-troubleshooter.md` |
| Incident | `incident-responder.md` |
| Pre-ship | `verification-before-completion.md` + Sentinel `--diff` |

Full matrix: `knowledge/agents/team/dispatch-guide.md`

## Core trio (always)

1. **Architect-01** — plan gate (2+ files)
2. **Lead Developer** — `knowledge/agents/team/lead-developer.md`
3. **Sentinel** — `node scripts/audit-sentinel.js --diff`

## Before any work

```text
[ ] project.invariants.yaml exists (or example copied)
[ ] PROJECT_CHARTER.md filled
[ ] ARCHITECT_TASKS.md current_focus matches task
```

## Subagent brief template

Load skill body from `knowledge/agents/skills/<name>.md` + master-rules + project invariants. Scope = plan step files only.
