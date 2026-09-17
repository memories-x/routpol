# PROJECT CHARTER — POL-TURK

> Bağlayıcı kimlik + ajan kuralları.  
> İş modeli kanonu: **`docs/33-is-modeli-master.md`**.  
> Olgunluk: **`docs/46-kurumsal-olgunluk-skorkarti.md`**.  
> Ekip: `docs/wiki/TeamRoster.md`.

---

## 1) Proje kimliği

| Alan | Değer |
|------|-------|
| Proje adı | POL-TURK |
| Amaç (1 cümle) | Avukatın yürüttüğü süreçte dil köprüsü, aracı koordinasyon ve takip — hukuk bürosu değil |
| Kanonik cümle | `docs/33` — “Biz avukat değiliz; hukuki süreci yönetmeyiz…” |
| Hedef kullanıcı | Polonya’daki yabancı şirketler ve bireyler (TR/PL/EN bilgilendirme) |
| Repo | Tek repo: Next.js site + sipariş döngüsü + Köprü Operasyon Paneli |

```
docs/                 Ürün + olgunluk + go-live
src/                  Site, API, panel
prisma/               Customer / Case / Document / Note
knowledge/agents/     Architect, Sentinel, skills
.cursor/skills/       dev-workflow, team-dispatch
scripts/              Sentinel, golive check, guards
```

## 2) Mutlak kurallar (proje özel)

`project.invariants.yaml` ile senkron.

### Konum (ürün)

- Avukatlık / hukuki süreç yönetimi / “her şeyi biz hallederiz” **yasak**
- Panel = köprü operasyonu (müşteri, dosya, evrak, checklist, dilde bildirim)
- MOS / form doldurma otomasyonu / saat ücreti **kapsam dışı**

### API

Envelope: `{ success, data, error }`

### Port / host

Geliştirme: `localhost:3000`. Prod: `NEXT_PUBLIC_SITE_URL` https.

### Frontend

- Array guards zorunlu
- Yasak UI: `prompt` / `alert` / `confirm`

### Tasarım

- Token: `pt-*` (`docs/07`)
- Yasak: AI default look kümesi (kullanıcı frontend kuralları)

### Marka

- Görünen isim: **POL-TURK**
- Tagline (kanon): köprü / dilinizde bilgilendirme (`src/content/*`)
- Yasak: agent/vendor stringleri UI’da

### Ürün disiplini

- Plansız multi-file → Architect PROCEED
- Metinler `src/content/`; panoda hukuk iddiası yok
- Olgunluk: sistem vs şirket ayrımı; genel bant **min(sistem, şirket)** (`docs/46`)

## 3) Bilinen açık kapılar (D→C)

Operatör (kod dışı) — runbook: `docs/47-d-to-c-operator-runbook.md`

1. Gerçek iletişim + NIP + unvan (env)
2. Domain + Stripe live + Resend + Blob + DATABASE_URL (`docs/40`)
3. İmzalı avukat ortak sözleşmesi (`docs/41`)
4. Panel güçlü parola
5. ≥3 gerçek dosya smoke
6. Logo / favicon (marka)

## 4) Tech stack

| Bileşen | Not |
|---------|-----|
| Next.js App Router | React 19, TS |
| Tailwind + `pt-*` | |
| Stripe | Ödeme |
| Resend | Mail (link-only) |
| Vercel Blob | Evrak bytes |
| Prisma + Postgres | Müşteri/dosya meta |
| Panel | `/panel` session cookie |

## 5) AI ekip briefing

1. `docs/wiki/TeamRoster.md`
2. `PROJECT_CHARTER.md` (bu dosya)
3. `project.invariants.yaml`
4. **`docs/33-is-modeli-master.md`** (kanon)
5. `docs/45-panel-master-plan.md` / `docs/46` / `docs/40`
6. `knowledge/agents/shared/master-rules.md`
7. `ARCHITECT_TASKS.md` → `current_focus`
8. `[FRAMEWORK ACK]` — plansız kod yok

### Sık dispatch

| Görev | Skill |
|-------|--------|
| Plan | `writing-plans` |
| Panel / UI | `frontend-developer` |
| API / store | `node-api`, `typescript-pro` |
| Güvenlik | `security-auditor` |
| Ship / QA | `verification-before-completion`, Sentinel `--diff` |

---

*POL-TURK charter — hizalı `docs/33` (2026-08-16).*
