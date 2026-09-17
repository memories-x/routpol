# Workspace Checkpoints (optional template)

Starter kit does **not** ship checkpoint npm scripts. Copy this guide into your project if you want git-free workspace snapshots (inspired by gstack context-save/restore).

## When to use

- Before 5+ file changes
- Before switching AI agents
- Pair with `knowledge/agents/shared/session-handoff.md`

## Minimal design

1. **Save:** zip or copy tracked dirs to `.checkpoints/<timestamp>-<slug>/`
2. **List:** read manifest JSON in `.checkpoints/`
3. **Restore:** copy back + run guard

## Example package.json scripts (project-specific)

```json
{
  "scripts": {
    "checkpoint:save": "node scripts/checkpoint.js save",
    "checkpoint:list": "node scripts/checkpoint.js list",
    "checkpoint:restore": "node scripts/checkpoint.js restore"
  }
}
```

Implement `scripts/checkpoint.js` in your app repo — not in this starter.

## Handoff without checkpoints

Minimum viable restore:

1. `session-handoff.md` latest entry
2. `git status` / `git diff`
3. `CHANGELOG.md` top entries

## Reference implementation

See production project that uses full checkpoint flow (e.g. A-CyberSolutions `docs/guides/WorkspaceCheckpoints.md`) after you bootstrap this starter there.
