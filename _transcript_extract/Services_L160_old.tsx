        <div className="mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = getServiceIcon(item.icon);
            const featured = item.slug === "aylik-paket";
            return (
              <article
                key={item.slug}
                className={
                  featured
                    ? "flex flex-col rounded-xl border-2 border-pt-emerald-600 bg-pt-surface p-6 shadow-sm"
                    : "flex flex-col rounded-xl border border-pt-border bg-pt-surface p-6 shadow-sm"
                }
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pt-navy-900/5 text-pt-navy-800">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                {featured ? (
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-pt-emerald-600">
                    {locale === "pl"
                      ? "Główny produkt"
                      : locale === "en"
                        ? "Main product"
                        : "Ana ürün"}
                  </p>
                ) : null}
                <h3
                  className={
                    featured
                      ? "mt-1 text-lg font-semibold text-pt-navy-900"
                      : "mt-4 text-lg font-semibold text-pt-navy-900"
                  }
                >