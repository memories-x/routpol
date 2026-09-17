# Ship / Release (document + close tur)

Inspired by gstack `document-release` / `ship`. Native: CHANGELOG + wiki + guard.

## When

- Feature complete and QA-only verdict SHIP_READY
- User says "ship", "release notes", "changelog yaz"

## Steps

### 1. Version bump

Next version in project `CHANGELOG.md`. Date: **today** (YYYY-MM-DD). One entry per logical release.

### 2. Entry template (three blocks)

```markdown
## [x.y.z] - YYYY-MM-DD - Short title

### [CHANGE] What Changed
- **Component:** bullet with file/service names

### [REASON] Why
- One paragraph max

### [TECHNICAL] Technical Detail
- Config, env vars, API routes, migrations
- Wiki node path (if applicable)
```

Verify claims: `grep` code before writing "X removed".

### 3. Wiki (same tur)

Update `docs/wiki/<Component>.md` for behavioral changes when your project uses wiki.

### 4. Final gate

```bash
node scripts/pre-commit-guard.js
node scripts/audit-sentinel.js --diff
```

### 5. Git

Commit **only** if operator asks. Never force-push.

### 6. Session handoff

Trim `session-handoff.md`: mark tur **SHIPPED** with version x.y.z.

## Semver guidance

| Change | Bump |
|--------|------|
| Bugfix, small UI | patch |
| New module | patch or minor (operator decision) |
| Breaking API contract | minor + migration note |
