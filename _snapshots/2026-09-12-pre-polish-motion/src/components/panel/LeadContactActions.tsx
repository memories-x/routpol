"use client";

import type { QuoteLeadStatus } from "@/lib/leads/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  leadId: string;
  status: QuoteLeadStatus;
  whatsappUrl: string | null;
  email: string;
  serviceLabel: string;
};

export function LeadContactActions({
  leadId,
  status,
  whatsappUrl,
  email,
  serviceLabel,
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function markContactedIfNew() {
    if (status !== "new") return;
    setBusy(true);
    try {
      await fetch(`/api/panel/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "contacted" }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  function onWhatsAppClick() {
    if (!whatsappUrl) return;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    void markContactedIfNew();
  }

  function onMailtoClick() {
    void markContactedIfNew();
  }

  return (
    <div className="flex flex-wrap gap-2 pt-0.5">
      {whatsappUrl ? (
        <button
          type="button"
          disabled={busy}
          onClick={onWhatsAppClick}
          className="inline-flex rounded-md bg-[#25D366] px-2.5 py-1 text-xs font-semibold text-white hover:brightness-105 disabled:opacity-50"
        >
          WhatsApp
        </button>
      ) : (
        <span className="text-xs text-pt-slate-400">WhatsApp yok</span>
      )}
      <a
        href={`mailto:${email}?subject=${encodeURIComponent(`POL-TURK — ${serviceLabel}`)}`}
        onClick={onMailtoClick}
        className="inline-flex rounded-md border border-pt-border px-2.5 py-1 text-xs font-semibold text-pt-navy-800 hover:bg-pt-bg"
      >
        E-posta
      </a>
    </div>
  );
}
