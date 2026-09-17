# Reference Project — A-CyberSolutions

Maps starter kit principles to the production monorepo at `acybersolutions-server-ready`. Use as **copy-paste template** when bootstrapping similar projects.

---

## Repo layout

| Module | Path | Role |
|--------|------|------|
| ac-daemon | `ac-daemon/` | API :8080, Forge, provisioning |
| ac-panel | `ac-panel/` | Operator panel Vite :5173 |
| contracts | `packages/ac-contracts/` | Shared types |
| scripts | `scripts/` | Gates, resource manager, Forge |

---

## Invariant mapping

| Starter `project.invariants.yaml` | AC value |
|-----------------------------------|----------|
| `canonical_port` | 8080 |
| `forbidden_ports` | 3000, 4000, 5000 |
| API envelope | success, data, error |
| `token_prefix` | ac- |
| `forbidden_strings` | WebGaraj (user-facing) |

Files: `AGENTS.md`, `.cursor/rules/ac-core.mdc`, Sentinel skills 03/04/06.

---

## Resource commands (AC-specific)

| Command | Purpose |
|---------|---------|
| `npm run ac:status` | C: free, VHDX, VmmemWSL, Docker/daemon |
| `npm run ac:idle` | Docker off + WSL shutdown |
| `npm run ac:dev-stop` | Project node :8080/:5173; Cursor tsserver safe |
| `npm run ac:dev` | MySQL + daemon; Docker off |
| `npm run ac:forge` | Docker + daemon for container test |
| `npm run forge:disk-guard` | Pre-flight thresholds |
| `npm run forge:test-one:safe` | Single template + auto purge |
| `npm run forge:purge` | Safe Docker artifact cleanup |
| `npm run forge:compact-disk` | Admin VHDX compact |
| `npm run project:cleanup` | dist/cache only (~423 MB typical) |
| `npm run sales:ready` | Full quality gate; ends idle+dev-stop |

Scripts: `scripts/ac-resource-manager.ps1`, `scripts/ac-dev-stop.ps1`, `scripts/sales-ready-check.ps1`

---

## Disk discipline lessons (2026-06)

| Event | Lesson |
|-------|--------|
| 62-template Forge sweep | VHDX 0 → 68 GB; C: 147 → 62 GB free |
| `docker image prune` alone | Does not shrink VHDX — compact required |
| 62-sweep default block | `forge-closure-gate.ps1 -AllowHeavySweep` + `run-local-tests.ps1` skip Topic 26 |
| E2E forge deploy Docker off | Skip pass, not fail — `e2e-completion-smoke.js` |

Docs: `docs/plans/DiskDiscipline-ArchitectPlan.md`, `docs/guides/DockerDiskPolicy.md`

---

## Workflow files in AC repo

| Starter kit | AC repo equivalent |
|-------------|-------------------|
| `dev-workflow/SKILL.md` | `.cursor/skills/ac-dev-workflow/SKILL.md` |
| `operating-principles-compiled.md` | Distilled from AC session + ARCHITECT_TASKS |
| Playbook 16 | `DiskDiscipline-ArchitectPlan.md` |
| `ARCHITECT_TASKS.md` | Live scope lock (copy pattern) |

---

## Quality gates (AC)

```bash
npm run guard                    # pre-commit-guard.js
npm run sales:ready              # 28 topics, Docker-off E2E skip OK
npm run forge:catalog-check      # 62/62 static, no Docker
node scripts/audit-sentinel.js --diff
```

Last known: **sales:ready 28/28 PASS** (2026-06-29).

---

## Protected (AC)

- Docker Desktop + `docker-desktop` WSL distro
- Native MySQL data, `.env`, source
- `server-registry.json` (UTF-8 no BOM)
- Wiki nodes under `docs/wiki/`

---

## Bootstrap AC project with starter kit

1. Copy `ai-agent-team-starter/knowledge/` + `scripts/audit-*.js` + `.cursor/` into repo (or symlink docs)
2. Fill `project.invariants.yaml` from table above
3. Set `ARCHITECT_TASKS.md → current_focus`
4. Point boot sequence to `operating-principles-compiled.md`
5. Keep AC-native scripts (`ac:*`, `forge:*`) — do not duplicate into starter

---

*Reference snapshot: 2026-06-29 post sales:ready.*
