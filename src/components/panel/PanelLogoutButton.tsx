"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  tone?: "on-light" | "on-dark";
};

export function PanelLogoutButton({ tone = "on-light" }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/panel/logout", { method: "POST" });
      router.push("/panel/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={logout}
      className={
        tone === "on-dark"
          ? "shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-50"
          : "shrink-0 rounded-md border border-pt-border px-2.5 py-1.5 text-xs font-medium text-pt-slate-600 hover:bg-pt-bg hover:text-pt-aws-ink disabled:opacity-50"
      }
    >
      Çıkış
    </button>
  );
}
