export function Hero({ content, locale }: HeroProps) {
  const reduce = useReducedMotion();
  const wa = buildWhatsAppUrl(content.system.whatsappPrefill);
  const badges = Array.isArray(content.hero.badges) ? content.hero.badges : [];

  return (
    <section className="relative overflow-hidden border-b border-pt-border">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--pt-emerald-500)_0%,_transparent_45%),linear-gradient(160deg,_var(--pt-navy-900)_0%,_var(--pt-navy-800)_42%,_#13233a_100%)] opacity-95"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_width%3D%2260%22_height%3D%2260%22_viewBox%3D%220_0_60_60%22_xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg_fill%3D%22none%22_fill-rule%3D%22evenodd%22%3E%3Cg_fill%3D%22%23ffffff%22_fill-opacity%3D%220.04%22%3E%3Cpath_d%3D%22M36_34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6_34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6_4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pt-emerald-500">
            {content.brand.name}
            <span className="mx-2 text-white/40">|</span>
            <span className="tracking-normal text-white/80 normal-case">
              {content.brand.tagline}
            </span>
          </p>
          <h1 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
            {content.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            {content.hero.subtitle}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm md:text-sm"
              >
                {badge}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`/${locale}/basvuru`}
              className="inline-flex items-center justify-center rounded-md bg-pt-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-pt-emerald-500"
            >
              {content.hero.ctaPrimary}
            </a>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/25 bg-pt-whatsapp/15 px-5 py-3 text-sm font-semibold text-white hover:bg-pt-whatsapp/25"
              >
                {content.hero.ctaSecondary}
              </a>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}