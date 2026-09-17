# QA-Only Mode (verify, do not expand)

Inspired by gstack `qa` / `qa-only` / `careful`. No new features; close the quality loop.

## When

- User says "sadece test", "qa", "dogrula", "sentinel calistir"
- After implementation before "tamam"
- CI/pre-commit failed

## Checklist (run in order)

```text
[ ] 1. node scripts/pre-commit-guard.js   (if configured)
[ ] 2. node scripts/audit-sentinel.js --diff
[ ] 3. Project build/test (see guard.config.json or README)
[ ] 4. If HTTP route added: probe endpoint
[ ] 5. grep CHANGELOG for claims vs code (no false "removed X")
```

## Rules

- **Do not** add features, refactors, or "while we're here" cleanups
- Fix only: ERROR from sentinel/guard, TS errors, contract breaks
- WARN: fix or document under CHANGELOG → "Known open items"
- Quality Score < 85 on touched files: do not report "tamam" to operator

## Output format

```markdown
## QA Report

**Guard:** PASS | FAIL
**Sentinel diff:** N errors, M warns
**Build:** PASS | SKIP | FAIL
**Runtime probe:** PASS | SKIP | FAIL

### Fixed
- ...

### Open (if any)
- ...

### Verdict:** SHIP_READY | NEEDS_FIX
```

## Escalation

If root cause unclear after 2 fix attempts → stop; write finding to session-handoff; ask operator.
