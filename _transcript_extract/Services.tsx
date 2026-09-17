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