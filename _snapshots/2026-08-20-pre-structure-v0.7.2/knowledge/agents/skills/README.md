# Developer Role Skills (canonical)

31 markdown role prompts for **developer agents** (Cursor subagents, Antigravity personas, etc.).

These are **not** Sentinel JSON skills. Sentinel rules live in `knowledge/agents/sentinel/skills/` (27 packs).

## Usage

- Pick a role file when dispatching a focused task (e.g. `security-auditor.md` for audit-only tur).
- Combine with `knowledge/agents/shared/master-rules.md` — master rules always win.

## Index

| File | Role |
|------|------|
| backend-architect.md | API / service design |
| backend-security-coder.md | Secure backend patterns |
| blueprint-mode.md | Structured planning |
| code-reviewer.md | Review-only pass |
| database-architect.md | Schema / migrations |
| debugger.md | Root-cause analysis |
| devops-troubleshooter.md | CI / deploy / infra |
| dispatching-parallel-agents.md | Multi-agent orchestration |
| electron-development.md | Electron IPC / shell |
| error-detective.md | Log / stack trace triage |
| executing-plans.md | Plan execution discipline |
| frontend-developer.md | UI implementation |
| frontend-security-coder.md | XSS / CSP / client security |
| incident-responder.md | Outage / rollback |
| javascript-pro.md | JS patterns |
| mobile-developer.md | Mobile UI |
| mobile-security-coder.md | Mobile hardening |
| node-api.md | Express / REST |
| react-best-practices.md | React patterns |
| security-audit.md | Audit checklist |
| security-auditor.md | Threat-focused review |
| security-best-practices.md | General security |
| subagent-driven-development.md | Subagent workflow |
| systematic-debugging.md | Debug methodology |
| test-automator.md | Test generation |
| test-driven-development.md | TDD loop |
| threat-modeling-expert.md | STRIDE / abuse cases |
| typescript-expert.md | TS advanced |
| typescript-pro.md | TS daily use |
| verification-before-completion.md | Pre-ship verification |
| writing-plans.md | YAML plan authoring |

## Duplicate at repo root

Legacy path `skills/` mirrors this folder. Prefer **`knowledge/agents/skills/`** for new projects.
