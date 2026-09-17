---
name: public-visual-qa
description: >-
  POL-TURK public site visual development discipline: Browser QA mandatory,
  one surface at a time, reference sites, snapshot before experiments, no
  invented trust metrics. Use when changing landing/hub/hero/header/footer/
  packages/process/FAQ/lead visuals, redesign, modernizasyon, UI polish,
  spacing, typography, CTA, or when operator says görsel, tasarım, browser QA,
  baseline, Quiet Authority visual work.
---

# Public Visual QA (POL-TURK)

## Non-negotiables (do not skip)

1. **Browser QA** — After any visual change, use `cursor-ide-browser`: navigate to the touched routes, `browser_take_screenshot` (desktop + narrow/mobile width if possible), fix what you see. Code-only “looks fine” is **REJECTED**.
2. **One surface** — Change **one** primary surface per tur (e.g. Hero only, or Packages only). Multi-surface redesign only if operator lists surfaces explicitly.
3. **References** — Before implementing a new look, ask for **2–3 reference URLs** (or reuse last agreed set). No “generic premium B2B” from memory alone.
4. **Snapshot first** — Before a visual experiment: ensure restore point exists (`_snapshots/2026-09-12-quiet-authority-baseline/` or new snapshot). State restore phrase in the plan.
5. **No fake trust** — Do not invent clients, stats, awards, testimonials, offices, years, partnerships.
6. **Brand lock** — Quiet Authority / belge köprüsü. No purple glow, cream-terracotta cliché, glassmorphism stacks, green consumer WhatsApp bubble as primary chrome, or grey “mist atmosphere” unless operator explicitly asks and accepts rollback risk.
7. **Ship gate** — `node scripts/pre-commit-guard.js` after code; Browser QA notes in the final reply (routes + what was checked).

## Workflow (mandatory order)

```text
BRIEF → SNAPSHOT CHECK → PLAN (1 surface) → IMPLEMENT → BROWSER QA → FIX → GUARD → REPORT
```

### BRIEF (ask if missing)

- Surface: which section/page?
- Keep / change: what must stay?
- References: 2–3 URLs or “same as last”
- Success: how operator will judge (e.g. “hero feels less SaaS”)

### SNAPSHOT CHECK

- Default restore: `_snapshots/2026-09-12-quiet-authority-baseline/`
- Phrase: `quiet authority baseline'a dön`
- If experimenting far from baseline: create a new `_snapshots/YYYY-MM-DD-<slug>/` first

### PLAN

- YAML under `docs/_plans/` for 2+ files
- `out_of_scope` must list other landing sections
- `success_criteria` must include Browser QA routes

### IMPLEMENT

- Reuse existing components; no full app rewrite
- Prefer tokens in `globals.css` + `ui-classes.ts` over one-off magic
- Keep checkout paths and sale rule intact

### BROWSER QA checklist

| Route | Check |
|-------|--------|
| `/tr` | Hero first viewport, CTA hierarchy, section rhythm |
| `/tr/hizmetler` | Packages list, hub spacing (if touched) |
| Mobile width | Nav, hero stack, CTA tap targets |

Record: what looked wrong → what you fixed. If browser MCP unavailable, say `[WARN]` and stop claiming visual sign-off.

### REPORT (operator)

- Surface changed
- References used
- Screenshots/routes checked
- Restore phrase if they dislike it

## Anti-patterns (STOP)

- Whole-site “premium redesign” prompts applied in one tur
- Shipping without Browser QA
- Atmosphere/token sweeps “because it was too white”
- Dual equal CTAs everywhere / card walls / emoji / invented metrics
- Ignoring Quiet Authority baseline without operator OK
- Re-applying rejected looks without ask: grey mist, whole-site premium B2B, Quiet Authority 2.0 soft-blur card polish

## Related

- Rule: `.cursor/rules/public-visual-discipline.mdc`
- Baseline: `_snapshots/2026-09-12-quiet-authority-baseline/RESTORE.md`
- Brand canvas (if present): `canvases/kurumsal-marka-duzen.canvas.tsx`
- Dev workflow: `.cursor/skills/dev-workflow/`
