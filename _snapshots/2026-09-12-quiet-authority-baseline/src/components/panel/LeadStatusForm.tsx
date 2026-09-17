"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { QuoteLeadStatus } from "@/lib/leads/store";

const options: { value: QuoteLeadStatus; label: string }[] = [
  { value: "new", label: "Yeni" },
  { value: "contacted", label: "Dönüldü" },
  { value: "closed", label: "Kapalı" },
];

type Props = {
  leadId: string;
  current: QuoteLeadStatus;
};

export function LeadStatusForm({ leadId, current }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<QuoteLeadStatus>(current);
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    try {
      await fetch(`/api/panel/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        className="rounded-md border border-pt-border bg-white px-2 py-1.5 text-sm"
        value={status}
        onChange={(e) => setStatus(e.target.value as QuoteLeadStatus)}
        aria-label="Durum"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={busy || status === current}
        onClick={save}
        className="rounded-md bg-pt-navy-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
      >
        Kaydet
      </button>
    </div>
  );
}
