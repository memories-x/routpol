---
name: dev-workflow
description: >-
  Generic dev workflow (gstack-inspired). Context checkpoint/handoff, Architect
  plan gate, QA-only verification, ship/release docs, runtime mode autonomy.
  Use when starting multi-step work, resuming after context loss, user says
  checkpoint, plan gate, qa-only, ship, handoff, release, or grants mode autonomy.
---

# Dev Workflow (gstack ideas, agent-team-native)

Do **not** install [gstack](https://github.com/garrytan/gstack). Use this skill + `knowledge/agents/` + `scripts/audit-sentinel.js`.

## Mode picker

| User intent | Mode | File |
|-------------|------|------|
| Save/resume session | **Checkpoint** | [checkpoint-handoff.md](checkpoint-handoff.md) |
| New feature, 2+ files | **Plan gate** | [plan-before-code.md](plan-before-code.md) |
| Verify only | **QA-only** | [qa-only.md](qa-only.md) |
| Close tur | **Ship** | [ship-release.md](ship-release.md) |
| "Switch modes as needed" | **Runtime autonomy** | [runtime-autonomy.md](runtime-autonomy.md) |

Default: **Checkpoint (optional) → Plan gate → Implement → QA-only → Ship**.

When operator grants autonomy: pick Agent / Plan / Debug / Ask / Multitask per [runtime-autonomy.md](runtime-autonomy.md) (R24).

## Non-negotiables

Read project `AGENTS.md` first. Boot: `operating-principles-compiled.md` + `master-rules.md` R1–R25.

Typical invariants (customize per project):

- API envelope shape (if backend exists)
- Port / env conventions
- Defensive frontend (array guards, optional chaining)
- Resource borrow-and-return after Docker/Node use (R23, R25)
- No emoji in agent output — `[INFO]` / `[WARN]` / `[CRITICAL]` only
- After code: `node scripts/audit-sentinel.js --diff` (or project guard script)

## Token discipline

1. Read only plan `scope` files.
2. Checkpoint before long tur.
3. QA-only: no new features.
4. Ship: docs same tur as code.

## Quick commands

```bash
node scripts/audit-sentinel.js --list-skills
node scripts/audit-sentinel.js --diff
node scripts/audit-sentinel.js --architect-persona
node scripts/pre-commit-guard.js   # if configured
```

## References

- [checkpoint-handoff.md](checkpoint-handoff.md)
- [plan-before-code.md](plan-before-code.md)
- [qa-only.md](qa-only.md)
- [ship-release.md](ship-release.md)
- [runtime-autonomy.md](runtime-autonomy.md)
- `knowledge/agents/shared/operating-principles-compiled.md`
- `knowledge/agents/shared/handoff-protocol.md`
- `knowledge/agents/shared/master-rules.md`
- `docs/guides/ResourceDiscipline.md`
