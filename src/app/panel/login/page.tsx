"use client";

import { usePanelStrings } from "@/components/panel/PanelLocaleSwitcher";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PanelLoginPage() {
  const router = useRouter();
  const strings = usePanelStrings();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/panel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message ?? "Login failed");
      }
      router.push("/panel");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-pt-border bg-pt-surface p-6 shadow-sm">
      <h1 className="font-display text-2xl text-pt-navy-900">{strings.loginTitle}</h1>
      <p className="mt-2 text-sm text-pt-slate-600">{strings.loginHint}</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm">
          <span className="sr-only">{strings.passwordPlaceholder}</span>
          <input
            type="password"
            className="w-full rounded-md border border-pt-border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={strings.passwordPlaceholder}
            autoFocus
          />
        </label>
        {error ? <p className="text-sm text-pt-danger">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-pt-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-pt-emerald-500 disabled:opacity-60"
        >
          {busy ? strings.loginBusy : strings.loginButton}
        </button>
      </form>
    </div>
  );
}
