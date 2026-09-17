# Agent Workflow (gstack ideas, agent-team-native)

Inspired by [gstack](https://github.com/garrytan/gstack) workflow patterns — **not installed**. Implemented as Cursor skill + shared docs.

## Modes

| Mode | Trigger | Skill file |
|------|---------|------------|
| Checkpoint | Long tur, session switch | `.cursor/skills/dev-workflow/checkpoint-handoff.md` |
| Plan gate | 2+ files, security | `.cursor/skills/dev-workflow/plan-before-code.md` |
| QA-only | "sadece test", pre-ship | `.cursor/skills/dev-workflow/qa-only.md` |
| Ship | Feature done | `.cursor/skills/dev-workflow/ship-release.md` |
| Runtime autonomy | Operator grants mode switching | `.cursor/skills/dev-workflow/runtime-autonomy.md` |

Default pipeline: **Checkpoint (optional) → Plan gate → Implement → QA-only → Ship**.

**Compiled principles:** `knowledge/agents/shared/operating-principles-compiled.md` (boot sequence + R23–R25).

## Cursor integration

Skill path: `.cursor/skills/dev-workflow/SKILL.md`

Cursor loads skills from `.cursor/skills/` when user intent matches description (checkpoint, plan gate, qa-only, ship, handoff).

## Session handoff

File: `knowledge/agents/shared/session-handoff.md`

- Last **5** entries
- Restore: read latest block only + CHANGELOG head + `ARCHITECT_TASKS.md`

## Architect + Sentinel (unchanged core)

```
Developer → plan YAML → Architect-01 (independent session) → PROCEED
         → implement → Sentinel (--diff) → post-flight → learning-log
```

See `docs/wiki/AgentSystem.md`.

## Commands

```bash
node scripts/audit-sentinel.js --diff
node scripts/audit-sentinel.js --architect-persona
node scripts/pre-commit-guard.js
```

## Workspace checkpoints (optional)

If your project adds npm checkpoint scripts, see `docs/guides/WorkspaceCheckpoints.md`.

Starter kit ships the **handoff note** pattern only; checkpoint scripts are project-specific.
