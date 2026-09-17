# Runtime Autonomy (mode self-selection)

When the operator grants autonomy ("switch modes as needed for best result"), use this guide with playbook `17-agent-runtime-autonomy.md`.

## Cursor / IDE modes

| Mode | Select when |
|------|-------------|
| **Agent** | Implementation, scripts, gates, focused fixes |
| **Plan** | Architecture, trade-offs, 2+ valid approaches |
| **Debug** | Errors, failures, unexpected behavior — gather evidence first |
| **Ask** | Explain or review only — no file edits |
| **Multitask** | Independent parallel work packages |

Announce briefly: `[INFO] Mode: debug — checking daemon logs on :8080`

Do **not** ask permission for each switch.

## Dev-workflow sub-modes (same session)

| Sub-mode | File |
|----------|------|
| Checkpoint | [checkpoint-handoff.md](checkpoint-handoff.md) |
| Plan gate | [plan-before-code.md](plan-before-code.md) |
| QA-only | [qa-only.md](qa-only.md) |
| Ship | [ship-release.md](ship-release.md) |

Default pipeline: Checkpoint (optional) → Plan gate → Implement → QA-only → Ship.

Small single-file fix with clear scope → Agent directly (skip plan gate).

## Hard stops (never autonomous)

- R13 direction lock conflict
- `ARCHITECT_TASKS.md` scope change
- Git commit/push
- Heavy Docker/disk (playbook 16) without guard PASS
- Killing Cursor internal `node.exe` (tsserver)

## Resource hygiene after work

If Docker or project Node was started for the task:

```
# project-specific — example names
npm run ac:idle
npm run ac:dev-stop
npm run forge:disk-guard
```

See `docs/guides/ResourceDiscipline.md`.
