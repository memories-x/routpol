import { PanelChrome } from "@/components/panel/PanelChrome";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "POL-TURK Panel",
};

export default function PanelLayout({ children }: { children: ReactNode }) {
  return <PanelChrome>{children}</PanelChrome>;
}
