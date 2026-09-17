export async function register() {
  if (process.env.SENTRY_DSN?.trim()) {
    const { initSentry } = await import("@/lib/sentry");
    await initSentry();
  }

  if (process.env.NODE_ENV !== "production") return;
  const { checkGoliveConfig, isProductionRuntime } = await import("@/lib/golive");
  if (!isProductionRuntime()) return;
  const check = checkGoliveConfig();
  if (!check.ok) {
    console.error("[CRITICAL] Production boot blocked — missing env:", check.missing);
    process.exit(1);
  }
}
