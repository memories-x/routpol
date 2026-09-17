# Resource Discipline Guide

Generic borrow-and-return policy for disk, RAM, and long-running dev processes. Product-specific scripts live in each project; this guide defines **behavior**.

Master rule: **R23**. Architect gate: playbook **16-resource-disk-discipline.md**.

---

## Principle

```
Borrow → Do work → Return → Verify
```

Never leave Docker, WSL, or project Node running "just in case" after a task ends.

---

## Resource modes (naming pattern)

Projects may implement scripts like:

| Mode | Typical behavior |
|------|-------------------|
| `status` | Report disk free, container runtime RAM, daemon ports |
| `idle` | Stop Docker + WSL; optional daemon stop |
| `dev` | Native DB + daemon; Docker off |
| `forge` | Docker on + daemon for container tests |
| `dev-stop` | Kill **project** Node only — not IDE internals |

Configure names in `project.invariants.yaml → resource_discipline.commands`.

---

## Docker / WSL notes (Windows)

| Observation | Meaning |
|-------------|---------|
| `VmmemWSL` high | Docker Desktop or WSL distro running |
| `docker image prune` | Removes images but **may not shrink** `docker_data.vhdx` |
| VHDX compact | Requires Docker quit + Admin script |
| `docker-desktop` WSL distro | **Protected** — never unregister in routine cleanup |

---

## Process hygiene (R25)

### IDE vs project Node

| Process path | Action |
|--------------|--------|
| `cursor\resources\...\node.exe` | **Do not kill** — TypeScript language service |
| Repo path `node.exe` / nodemon | **Stop after task** via `dev-stop` script |

### Dev server preference

- Quality gates: `start` (single process) over `dev` (nodemon/file watcher)
- After gate: auto `idle` + `dev-stop` in gate script

---

## Test tiers vs Docker

| Tier | Docker required? |
|------|------------------|
| Static catalog / TS build | No |
| HTTP API smokes | No (daemon + DB only) |
| Single container deploy | Yes, 1 image max |
| Full catalog sweep | Yes, heavy — gated |

E2E tests should **skip** live deploy when Docker unavailable (not fail) if disk discipline is active.

---

## Protected infrastructure

Never delete or unregister in routine cleanup:

- Container runtime program install
- Default WSL distro used by Docker Desktop
- VM Platform / WSL2 Windows features
- Source code, `.env`, databases
- API contracts and audit chains

---

## Thresholds (configure per machine)

Example in `project.invariants.yaml`:

```yaml
resource_discipline:
  vhdx_warn_gb: 15
  vhdx_block_gb: 30
  disk_free_warn_gb: 60
  disk_free_block_gb: 40
```

Run disk guard before heavy work; ABORT if block threshold hit.

---

## Architect plan checklist

- [ ] `disk_impact` set
- [ ] `disk_borrow` command documented
- [ ] `disk_return` command documented (mandatory)
- [ ] Post-step `disk_verify` planned
- [ ] Heavy work has operator approval

---

## Reference implementation

Full command matrix and lessons learned: `docs/guides/ReferenceProject-ACyberSolutions.md`

Compiled principles: `knowledge/agents/shared/operating-principles-compiled.md`
