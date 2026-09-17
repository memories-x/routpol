# Plan Gate (before implementation)

Inspired by gstack `plan-*-review` + `autoplan`. Native: **Architect-01** + `handoff-protocol.md` R1.

## When (mandatory)

- 2+ files or new service/module
- Security, auth, tenant scope, AI policy
- User says "planla", "once plan", multi-step feature

## When (skip with operator OK)

- Single-line typo, comment-only, doc-only (still run sentinel on touched files)

## Steps

### 1. Scope lock

Read `ARCHITECT_TASKS.md` → `current_focus`. Plan must match or ABORT.

### 2. Write YAML plan

Use schema from `knowledge/agents/shared/handoff-protocol.md` Geçiş #1:

```yaml
title: <verb phrase>
scope:
  project: <repo module name>
  module: <path/domain>
  out_of_scope: [...]
intent:
  what: <one sentence>
  why: <one sentence>
  triggered_by: user_request
steps:
  - { order: 1, action: ..., files: [...], risk: low }
dependencies: []
side_effects: []
rollback:
  trigger: pre-commit-guard fails
  steps: [restore checkpoint or git checkout]
success_criteria: [measurable]
stop_conditions: [...]
estimated_effort: <minutes>
risk_overall: low | medium | high
```

### 3. Independent review

Plan author **cannot** approve. Options:

- Paste plan + `node scripts/audit-sentinel.js --architect-persona` into **new** chat
- Or operator verbal PROCEED

### 4. PROCEED only if

- 9 Architect gates green (`knowledge/agents/architect/persona.md`)
- No R13 direction_lock conflict without `unlock_justification`
- Project invariants from `AGENTS.md` preserved

### 5. Then implement

Touch only `steps[].files`. No scope creep.

## Anti-patterns

- Code first, plan after → REJECTED (R1)
- "Small change" spanning multiple modules without plan → REJECTED
- Skipping security/tenant guards on scoped features → REJECTED
