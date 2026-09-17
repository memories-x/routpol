# Changelog

## POL-TURK Application

### [Unreleased]

- `telefon-gorusme` kamu satış ve pazarlamadan kaldırıldı (KVKK / kayıt ertelendi); legacy dosyalar için slug + fiyat + panel kalır; checkout üç SKU

### [0.8.8-exp] - 2026-09-11 — Saatlik telefon SKU

- Checkout: `telefon-gorusme` — 150 zł / 1 saat; tarih/saat (Europe/Warsaw) + konu notu; ilgili evrak isteğe bağlı
- Slot: `pricingMeta.callRequestedAt` (UTC ISO); müşteri dosyası, mail, Stripe metadata, panel kuyruk
- `ek-form` slot + portal/başarı sayfası; kanon ve kamu metin hizalı
- Yerinde eşlik form hattı durur; telefon satışı siteden

### [0.8.7-exp] - 2026-09-11 — Telefon / uzaktan satış yolu

- Ana sayfa «Nasıl işler»: eşlik ve telefon form → kapsam → üç paket; ayrı SKU yok
- `/hizmetler/eslik` ve form girişi aynı dil; `docs/01-is-modeli.md`

### [0.8.6-exp] - 2026-09-11 — Hakkımızda

- `/hakkimizda` (TR/PL/EN): kimiz, ne yapıyoruz, rol ayrımı, sınırlar; menü + footer
- Kanon `docs/01-is-modeli.md` ile aynı dil

### [0.8.5-exp] - 2026-09-11 — Canlı öncesi kapı + metin

- `local-bootstrap` Docker açmaz; canlı DB = Plesk PostgreSQL (`docs/04-go-live.md`)
- Prod `checkGoliveConfig`: iletişim, unvan, NIP, adres, `CRON_SECRET` yoksa fail-close (`golive:check --strict` ile aynı)
- Kamu SSS / işletme / kuruluş / müşteri maili: üyelik e-posta + şifre; magic link = sıfırlama
- Kanon: `docs/03`, `04`, `05`, `52`; `.env.example` go-live referansı

### [0.8.4-exp] - 2026-09-11 — Müşteri üyeliği (bireysel / kurumsal)

- `/hesabim`: üye ol + şifre ile giriş; bireysel (ad soyad) / kurumsal (şirket adı)
- Profilde her zaman Satın al (üç SKU) + açık işler / geçmiş; tek yazı da hesapta kalır
- Magic link yalnızca şifre sıfırlama; `Customer.passwordHash` (argon2)
- Header **Giriş**; misafir `/basvuru` durur
- Başvuru: 1 hizmet (Tek yazı — şahıs/şirket yok) → 2 Bireysel/Kurumsal ekranı → 3 türe göre bilgiler

### [0.8.3-exp] - 2026-09-11 — İş masası (portföy takip)

- `/hesabim` dosya listesi: açık işler + yıl yıl geçmiş; kullanıcı adı / üyelik yok
- Üst menüden giriş kapısı kalktı (hesap gibi durmasın); footer «Önceki dosyalar»
- Müşteri postası iki kapı: bu dosya + e-posta linki (testlerde Hesabım ifadesi durur)

### [0.8.2-exp] - 2026-09-10 — Yatırım / kuruluş danışmanlığı (kurumsal dil)

- Landing + `/hizmetler/kurulum`: TR işletmecilerin Polonya yatırım, şirket kuruluşu ve faaliyet açılışında idari danışmanlık ve süreç başlatma
- Tescil / KRS / hukuki sonuç taahhüdü yok; avukat–noter akışı ortağa bağlanır
- Lead `yatirimci` etiketi: TR işletmeci — Polonya yatırım / şirket kuruluşu (TR/PL/EN)
- Kapsam listesi + paket rozeti + `docs/01-is-modeli.md` aynı dilde hizalandı
- Go-live: prod/`--strict` `sk_test_` reddi; RODO unvan/NIP/cron `--strict` zorunlu; `docs/04-go-live.md` operatör sırası
- Satış hunisi: hizmet kartlarında ücretli paket → Başvur; sıra paketler önce; hero «Paket al»

### [0.8.1-exp] - 2026-09-10 — Landing ritim + emerald token

- `pt-emerald-*` tekrar yeşil skala (`#059669`); BPO mavisi butonlardan kalktı
- Kök metadata BPO / “uçtan uca yönetiyoruz” kaldırıldı
- Eşlik bandı açık zemin; sıra: kim için → hizmetler → eşlik
- Header sade (süreç/rehber footer + mobil); hizmet kartında eşlik tekrarı yok
- `golive:check` `.env` + `.env.local` okur
- Yerel bootstrap: `node scripts/local-bootstrap.mjs` (panel `local-dev-only`)
- Kamu hizmetler: KOBİ/lojistik, şahıs (ehliyet, oturum, telefon), diller TR/PL/EN/RU/UK; hukuk avukat ortağında

### [0.8.0-exp] - 2026-08-20 — BPO landing (yapısal prompt, keşif)

[WARN] `PROJECT_CHARTER` ile çelişen konumlandırma — geri dönüş: `node scripts/restore-snapshot.js 2026-08-20-pre-structure-v0.7.2`

- Ana sayfa: Hero + 4 sütun + süreç + ROI calculator + dashboard tabs + lead form/modal
- Design: Plus Jakarta Sans, midnight navy `#0B132B`, accent `#2563EB`
- Panel / portal / başvuru API’leri dokunulmadı
- Footer disclaimer: keşif landing notu

### [0.7.2] - 2026-08-20 — Ana sayfa yapı ve görsel sadeleştirme

- Hero: iki sütun + örnek özet kartı, kısa metin, avukat disclaimer
- Bölüm sırası: Hero → Hizmetler → Kapsam → Süreç → Neden → Sosyal kanıt → SSS → İletişim
- Nav düzeltildi (#ne-yapiyoruz kaldırıldı, menü sırası = sayfa akışı)
- Ortak `SectionIntro`; hizmet kartlarında doğrudan Başvur CTA
- WhyUs sade kart grid; SocialProof’ta karışık sinyaller kaldırıldı

### [0.7.1] - 2026-08-20 — Müşteri yüzeyi birleştirme

- Hafif UI shell: `PageShell`, `Card`, `ui-classes` (0.8 brief’siz)
- Başvuru: 3 adım + masaüstü özet kartı + footer disclaimer
- Header: Hesabım linki (TR/PL/EN)
- Portal `/hesabim`: muted shell + kart ritmi
- Panel özet: “Bugün öncelik” bloğu üstte
- Ana sayfa: Scope erken (Hero → Hizmetler → Neden → Kapsam → Süreç → Sosyal kanıt → SSS)
- Hizmet detay: fiyat bandı + `PageShell`

### [0.7.0] - 2026-08-19 — Yol haritası kod kapanışı

**Tasarım geri alma (2026-08-19):** 0.8.0 (tasarım brief) ve 0.8.1 (AWS TR) arayüz değişiklikleri kaldırıldı. Koyu gradient Hero, Source Sans/Serif, açık header, navy footer, `max-w-6xl`, banner iletişim formu geri yüklendi.

- Gizlilik sayfası 3 dil (RODO bölümleri)
- Sosyal kanıt bandı (uydurma sayı yok)
- Panel TR/PL/EN (nav + login + locale cookie)
- MOS 90 gün gözden geçirme uyarısı + cron ops mail
- Portal login → `services/portal-login-request.ts`
- `docs/07-yol-haritasi-durum.md` — harici yol haritası kapanış özeti
- `docs/06-olgunluk.md` — Sistem ~B, Şirket ~C−

### [0.6.3] - 2026-08-19 — PanelUser, payment kolonları, 8 test, Playwright

- `PanelUser` + argon2 — env parolasından bootstrap; oturum `passwordVersion` ile iptal
- `Case` payment kolonları + `stripeSessionId @unique` (JSON geri uyum)
- Yol haritası §3'teki 8 kritik akış testi (`critical-flows.test.ts` + period-planning)
- Playwright smoke: landing + health + panel login (`npm run test:e2e`)
- Opsiyonel Sentry (`SENTRY_DSN`) + `/api/health` DB ping + outbox failed
- Panel ayarlar: gönderilemeyen outbox listesi

### [0.6.2] - 2026-08-19 — Mutabakat, purge, analytics, katman ayrımı

- Stripe↔case checkout mutabakatı + ops mail (cron)
- `markCasePaid` yan etkileri → `src/lib/services/case-paid-effects.ts`
- Kapalı dosya 24 ay purge (`data_purged`) + upload bytes silme
- Çerezsiz `AnalyticsEvent` + `/api/analytics/event` (teklif, WA, ödeme)
- ROPA / hak prosedürü şablonları (`docs/05-uyum-rodo.md`)
- Vitest: mutabakat, eligibility, saklama süreleri

### [0.6.1] - 2026-08-19 — Yenileme hatırlatma + checkout idempotency

- Dönem bitimine 5 gün kala yenileme e-postası (`renewalReminderSentAt`)
- `CaseCheckoutReceipt` — aynı Stripe session ile çift yan etki önleme
- Legacy case token: kapalı dosyada 90 gün sonra geçersiz
- Panel ayarlar: golive + outbox durumu
- `docker-compose.yml` — yerel Postgres
- Cron: renewal + outbox + purge birleşik

### [0.6.0] - 2026-08-19 — Yol haritası Faz 1–3 (güvenlik + kanon + test)

- **Faz 1 güvenlik:** proxy-aware IP, panel global kilit, `StripeEventReceipt`, atomik DB rate limit, POSIX storagePath, ölü Stripe abonelik kolları kaldırıldı, `secureCompare`
- **Faz 2 kanon:** `docs/01`–`06`, konumlandırma kararı (köprü + idari vekalet koordinasyonu), MOS `verifiedAt`
- **Faz 3:** Vitest + CI, outbox mail kuyruğu, boot env fail-fast (`instrumentation.ts`), `/api/health`, `CUSTOMER_AUTH_SECRET` fallback kaldırıldı, aylık paket file-mode engeli
- **Faz 4 (kısmi):** `AuditLog`, panel giriş audit, müşteri `DELETE /api/customer/account`, `purgeExpiredData` cron
- Panel oturumu: parola sürümü (`pv`) — parola değişince oturumlar düşer

### [0.5.5] - 2026-08-18 — Müşteri portalı + akış sertleştirme

- `/hesabim` magic link portal, profil, tam geçmiş, aylık dönem + aşım
- Kota atomikliği, dönem kuyruğu, webhook idempotency (checkout receipt)
- Plesk standalone deploy + disk storage

### [0.5.4] - 2026-08-17 — Muhasebeci teslim paketi

- Stripe tahsilat; yasal fatura muhasebeci (KSeF). Otomatik Fakturownia varsayılan kapalı (çift kesim yok)
- Faturalar: ay seçimi + ZIP (`excel/firma.csv`, `excel/sahis.csv`, `pdf/`)
- Stripe makbuzu yasal fatura değil; müşteriye gönderilmez (`docs/51`)

### [0.5.3] - 2026-08-17 — Stripe tahsilat + yasal fatura

- Siparişte alıcı NIP (firma zorunlu); ödeme sonrası Fakturownia kesimi + KSeF gönderimi
- Panel Faturalar: numara / KSeF / durum / tekrar kes; Ödemeler tahsilat olarak kaldı
- Stripe Checkout `invoice_creation` kapalı; Dashboard makbuz e-postası kapatılmalı (`docs/51`)
- Token veya `INVOICE_VAT_RATE` yokken fatura “bekliyor” (canlı kesim yok)

### [0.5.2] - 2026-08-17 — Kamu site kaydırma / kurumsal iskelet

- Sabit yükseklik sticky header + kaydırınca gölge; mobil menü overlay (sayfayı itmez)
- Dil uyarı bandı sticky dışı; smooth scroll + scroll-padding; WA nabız kaldırıldı
- Bölüm zemin ritmi ve footer iki kolon

### [0.5.1] - 2026-08-17 — Avukat ortak dizini

- Ortaklar sade iş akışı: telefon defteri + dosyada atama; kartta Ara/E-posta; CRM gürültüsü kaldırıldı
- Panel görsel: tablo boşluğu/min-width, üst bar hizası, mobil menü kapat, taşan metin, hata rengi
- Ortaklar çalışma masası: KPI, tablo, sözleşme/dil/uzmanlık, karttan dosya bağlama
- Panel Avukat ortakları: Yeni ortak formu + kart (ad, kancelaria, iletişim, NIP, baro)
- Dosya masasında ortak dizinden seçilir; avukat site hesabı yok
- Panel sol menü kaydırmada sabit (kabuk viewport; içerik kayar)

### [0.5.0] - 2026-08-17 — Panel çalışma masası

- Süreç yönetimi: özet/kuyrukta müşteri kartı (aynı e-posta); firma hubda süreç vs tek yazı/aylık ayrı; sipariş kayıtları birleşmez
- Operator panel: dark navy rail, header search, table lists, status badges, aging days
- Case page: identity / files / actions workbench; human pricing line; copy customer link
- TR package/status filter labels; invoices remain honest skeleton (no KSeF)
- Aging uses paidAt for paid queue; attention scans full queue; payments/partners share case table columns
- Shared note emails the identity address with a link to the customer file page; result upload auto-ticks checklist; lists show wait days + next step
- Brand rename deferred (POL-TURK unchanged)

### [0.4.0] - 2026-08-05 — Faz 4 i18n + depth

- Full PL + EN content (`content/pl.ts`, `en.ts`)
- Service detail pages `/[locale]/hizmetler/[slug]` (18 SSG paths)
- Resend-ready mail adapter (`RESEND_API_KEY` + `CONTACT_EMAIL_TO`)
- Sitemap expanded for 3 locales + services; hreflang on home/detail
- `?hizmet=` preselects form service type

### [0.3.0] - 2026-08-05 — Faz 3 lead hardening

- Rate limit (5 / 15 dk / IP) on `POST /api/teklif`
- Contact form: React Hook Form + Zod, ülke kodu, FileDropzone UI-only
- Quote mail adapter interface (noop default)
- `robots.txt` + `sitemap.xml` + `vercel.json`
- Build green

### [0.2.0] - 2026-08-05 — Faz 2 TR surface

- Hero, Services, WhyUs, Process, Faq, Contact, WhatsApp FAB
- Lucide + Framer Motion

### [0.1.0] - 2026-08-05 — Faz 1 foundation

- Next.js 16 App Router, `[locale]`, `pt-*` tokens, content layer, API stub

---

# Changelog — AI Agent Team Starter Kit

Event-oriented release notes for the starter kit itself (not your application).

---

## [1.6.0] - 2026-06-29 - Operating principles distill (A-CyberSolutions session)

### [CHANGE] What Changed

- **operating-principles-compiled.md** — master derleme: disk disiplini, workflow gates, konvansiyonlar, handoff, kalite kapıları
- **Playbook 16** — resource & disk discipline (borrow-and-return)
- **Playbook 17** — agent runtime autonomy (Agent/Plan/Debug/Ask/Multitask)
- **runtime-autonomy.md** — Cursor dev-workflow alt modu
- **ResourceDiscipline.md** — generic disk/RAM/process hygiene guide
- **ReferenceProject-ACyberSolutions.md** — referans proje komut ve dersler matrisi
- **master-rules R23–R25** — borrow-return, runtime autonomy, IDE vs project Node
- **project.invariants.yaml.example** — `resource_discipline` section
- **Boot sequence** — operating-principles-compiled + ARCHITECT_TASKS
- **agent-team-core.mdc** — R23/R25 resource discipline pointer

### [REASON] Why

A-CyberSolutions üretim oturumlarında kanıtlanmış çalışma mantığı (disk melt, sales:ready 28/28, Cursor lag, Node hijyeni) evrensel starter kit'e distill edildi — yeni projeler aynı dersleri sıfırdan öğrenmesin.

### [TECHNICAL] Technical Detail

- Starter generic kalır; AC özel script isimleri `ReferenceProject` + invariants `commands` altında
- Playbook count: 15 → 17
- Master rules: R22 → R25 (R22 project.invariants referansına güncellendi)

---

## [1.5.0] - 2026-06-01 - Universal team roster (project-agnostic)

### [CHANGE] What Changed

- **TeamRoster.md** — org chart, 31 specialist matrix, escalation path
- **dispatch-guide.md** — keyword → skill routing, parallel dispatch
- **lead-developer.md** — implementation lead persona
- **team-dispatch** Cursor skill — uzman seçimi
- **PROJECT_CHARTER.template.md** — per-project charter (not product-specific)
- **project.invariants.yaml.example** — API, port, brand, design config
- **team-charter.md** — generic lanes, no hardcoded port/brand
- **onboarding-ritual.md** — TeamRoster-first, 27/15 counts
- **AGENTS.md** — meta framework (starter itself, not a product repo)
- **Sentinel 03/04/06** — generic design token, API contract, brand rules

### [REASON] Why

Starter kit must work as **main AI team for any new project** — professional role distribution without binding to one codebase.

### [TECHNICAL] Technical Detail

- Proje kuralları `project.invariants.yaml` — starter'a embed edilmez
- Specialist skills unchanged (31 files); wired via dispatch-guide
- Bootstrap: copy kit → fill charter + invariants → briefing via TeamRoster

---

## [1.4.0] - 2026-06-01 - Dev workflow + generic bootstrap

### [CHANGE] What Changed

- **Cursor skill:** `.cursor/skills/dev-workflow/` (checkpoint, plan gate, qa-only, ship)
- **Cursor rule:** `.cursor/rules/agent-team-core.mdc`
- **AGENTS.md:** Generic template (removed A-CyberSolutions hardcoded anatomy)
- **ARCHITECT_TASKS.md:** Generic scope-lock template
- **pre-commit-guard.js:** Config-driven via `guard.config.json` / `guard.config.example.json`
- **session-handoff.md:** Context restore template in `knowledge/agents/shared/`
- **Developer role skills:** `knowledge/agents/skills/` (31 files) + README index
- **Docs:** `docs/wiki/AgentWorkflow.md`, `docs/guides/WorkspaceCheckpoints.md`
- **AgentSystem.md:** Updated counts (27 Sentinel, 15 playbook, 10 gate, 9 shared)
- **sentinel/reports/.gitkeep:** Report output directory
- **audit-sentinel.js:** Synced from production project

### [REASON] Why

Production learnings (gstack-inspired workflow, session handoff, generic guard) should ship in the reusable starter — not only in one app repo.

### [TECHNICAL] Technical Detail

- Root `skills/` kept for backward compatibility; canonical path `knowledge/agents/skills/`
- Guard skips missing `typescriptProjects` when `skipIfMissing: true`
- No emoji in guard console output (R5 / skill 25 aligned)

---

## [1.3.0] - 2026-05-12 - Sentinel 27 + Architect 15

### [CHANGE] What Changed

- Sentinel skills 25–27 (tone, TDD, regression tracing)
- Architect playbooks 13–15
- R13 Direction Lock, R14 claim verification

### [REASON] Why

Closed-loop discipline from A-CyberSolutions production use.

### [TECHNICAL] Technical Detail

- Initial generic extraction from acybersolutions-server-ready
