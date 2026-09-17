"use client";

import { usePathname } from "next/navigation";

/** Soft enter on menu route changes — CSS only (hydration-safe). */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="pt-page-enter">
      {children}
    </div>
  );
}
