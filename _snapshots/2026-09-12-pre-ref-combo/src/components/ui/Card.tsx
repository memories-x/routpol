import type { ReactNode } from "react";
import { cardClassName, cx } from "@/lib/ui-classes";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return <Tag className={cx(cardClassName, className)}>{children}</Tag>;
}
