import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: ComponentProps<"a">["onClick"];
};

/**
 * Hash içeren URL’lerde Next <Link> bazen kaydırmayı atlar / tıklama bozulur.
 * Hash varsa native <a>, yoksa App Router Link.
 */
export function SmartLink({ href, children, className, onClick }: Props) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
