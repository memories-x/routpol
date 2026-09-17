# Checkpoint & Handoff (context-save / restore)

Inspired by gstack `context-save` / `context-restore`. Native: **Workspace Checkpoints** (if configured) + session note.

## When

- Before a large AI tur (5+ files or 30+ min expected)
- Before switching agent or IDE session
- User says "context kaydet", "devam edeceğiz", "oturumu kaydet"

## Save (operator or agent)

If your project has checkpoint scripts (see `docs/guides/WorkspaceCheckpoints.md`):

```bash
npm run checkpoint:save -- "feature-slug"
```

Otherwise: git stash / branch / commit WIP — project-specific.

## Handoff note (optional, low token)

Append to `knowledge/agents/shared/session-handoff.md`:

```markdown
## YYYY-MM-DD HH:mm — <short title>

- **Scope:** frontend | backend | both | docs
- **Done:** bullet list
- **Next:** single next action
- **Blockers:** none | describe
- **Checkpoint IDs:** optional
- **Do not touch:** files or decisions locked
```

Keep last **5** entries; delete older blocks.

## Return resources (optional)

If Docker or project dev servers were started during the session, stop them before handoff:

```bash
# project-specific — see project.invariants.yaml resource_discipline.commands
npm run ac:idle
npm run ac:dev-stop
```

Do **not** kill Cursor/IDE internal `node.exe` processes.

See `docs/guides/ResourceDiscipline.md` (R23, R25).

## Restore (agent start)

1. Read `session-handoff.md` last entry only.
2. Read project `CHANGELOG.md` top 3 versions (if exists).
3. Read `ARCHITECT_TASKS.md` / backlog if task-related.
4. Do **not** re-read entire codebase.

## Restore from bad tur

Use project checkpoint restore or `git checkout -- <files>`, then:

```bash
node scripts/pre-commit-guard.js
```
