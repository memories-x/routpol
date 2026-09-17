---
## [MANDATORY PRE-RESPONSE CHECKPOINT]

1. **Emoji yok** — `[INFO]` / `[WARN]` / `[CRITICAL]` kullan.
2. **Coşku yok** — veri odaklı ifade.
3. **Proje kuralları** — `project.invariants.yaml` + `PROJECT_CHARTER.md`
4. **Defensive frontend** — `Array.isArray` guard
5. **Lane disiplini** — plan → kod → Sentinel

---

# AGENTS.md — POL-TURK (ürün)

Köprü operasyonu: kamu site + müşteri portalı + operatör paneli.

## Kanon dokümanlar

`docs/00-kanon-indeks.md` — yalnızca `docs/01`…`06` kanoniktir; `docs/_archive/` değil.

## Stack

- Next.js 16 App Router · Prisma/Postgres · Stripe · Plesk standalone
- Müşteri: magic link (`/hesabim`) · Panel: parola cookie

## Mutlak kurallar

- API envelope: `{ success, data?, error? }`
- Prod: `DATABASE_URL` zorunlu (aylık paket + portal)
- Para yolu: idempotency (`StripeEventReceipt`, `StripeCheckoutReceipt`)
- Kod sonrası: `node scripts/audit-sentinel.js --diff` + `node scripts/pre-commit-guard.js`
- Test: `npm test`

## Odak

`ARCHITECT_TASKS.md` → `current_focus`

## Agent framework (ayrı)

Starter kit kuralları: `knowledge/agents/shared/master-rules.md` (referans; ürün kanonu öncelikli).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
