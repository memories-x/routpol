const SENTRY_DSN = process.env.SENTRY_DSN?.trim();

let initialized = false;

export async function initSentry(): Promise<void> {
  if (!SENTRY_DSN || initialized) return;
  try {
    const Sentry = await import("@sentry/node");
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: process.env.NODE_ENV ?? "development",
      tracesSampleRate: 0.05,
    });
    initialized = true;
  } catch (err) {
    console.error("[sentry:init]", err);
  }
}

export async function captureException(err: unknown): Promise<void> {
  if (!SENTRY_DSN) return;
  try {
    await initSentry();
    const Sentry = await import("@sentry/node");
    Sentry.captureException(err);
  } catch (captureErr) {
    console.error("[sentry:capture]", captureErr);
  }
}
