"use client";

import { useState } from "react";

type Props = {
  locale: string;
  caseId: string;
  token: string;
};

export function CopyCustomerLink({ locale, caseId, token }: Props) {
  const [copied, setCopied] = useState(false);
  const path = `/${locale}/basvuru/basarili?case=${caseId}&token=${token}`;

  async function copy() {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const value = `${origin}${path}`;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-md border border-pt-border px-3 py-2 text-xs font-medium text-pt-aws-ink hover:bg-pt-bg"
    >
      {copied ? "Kopyalandı" : "Müşteri linkini kopyala"}
    </button>
  );
}
