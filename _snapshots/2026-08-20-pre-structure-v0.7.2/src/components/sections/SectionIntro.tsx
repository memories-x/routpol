import { cx } from "@/lib/ui-classes";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  dark?: boolean;
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  intro,
  dark = false,
  className,
}: SectionIntroProps) {
  return (
    <header className={className}>
      {eyebrow ? (
        <p
          className={cx(
            "text-sm font-semibold uppercase tracking-wide",
            dark ? "text-pt-emerald-400" : "text-pt-emerald-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cx(
          "font-display text-3xl leading-tight md:text-4xl",
          eyebrow ? "mt-2" : "",
          dark ? "text-white" : "text-pt-navy-900",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cx(
            "mt-4 max-w-2xl text-base leading-relaxed",
            dark ? "text-pt-slate-300" : "text-pt-slate-600",
          )}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}
