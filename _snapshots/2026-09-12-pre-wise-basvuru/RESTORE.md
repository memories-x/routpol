# Restore: pre Wise-quality basvuru

Phrase: `wise basvuru öncesi` · `pre-wise-basvuru`

Also: `quiet authority baseline'a dön`

## File-scoped restore

Do **not** run `node scripts/restore-snapshot.js 2026-09-12-pre-wise-basvuru` — this snapshot is partial and would wipe `src`.

Copy these paths from `_snapshots/2026-09-12-pre-wise-basvuru/` back over the repo root:

- `src/components/cases/OrderStepIndicator.tsx`
- `src/components/cases/OrderForm.tsx`
- `src/components/cases/OrderSummaryCard.tsx`
- `src/components/customer/CustomerLoginBanner.tsx`
- `src/app/[locale]/basvuru/page.tsx`
- `src/content/order-form.ts`
- `src/lib/ui-classes.ts`
- `src/components/ui/PageShell.tsx`
