# Architect-01 — Operasyonel Odak Kilidi

## current_focus

```yaml
project: pol-turk
brand: ROUTEPOL
domain_dns: routpol.com
tagline_tr: "Polonya’da yol gösteren rota."
focus: "ROUTEPOL — kod riskleri kapandı; go-live Plesk + Hostinger DNS (VPS_IP) bekliyor"
locked_at: 2026-09-15
locked_by: operator
active_plan: "docs/_plans/2026-09-15-open-risk-order.yaml"
roadmap_status: "docs/07-yol-haritasi-durum.md"
brand_lock: "docs/08-marka-kilidi.md"
restore_snapshot: "_snapshots/2026-09-12-quiet-authority-baseline"
restore_command: "node scripts/restore-snapshot.js 2026-09-12-quiet-authority-baseline"
restore_phrase: "quiet authority baseline'a dön"
charter_warning: ""
completed_phases:
  - "Faz 1–3 (tamam)"
  - "Faz 4–5 kod (tamam)"
  - "Faz 6 ertelendi"
  - "0.7.2 / Quiet Authority snapshot"
  - "0.8.0 kanon landing + hizmet hub"
  - "ROUTEPOL marka kilidi + open-risk P0–P5 kod"
pending_design_qa:
  - "Opsiyonel: logo yenileme (ROUTEPOL)"
pending_operator:
  - "Plesk VPS_IP → Hostinger A kaydı (routpol.com)"
  - "Plesk deploy + secrets (DATABASE_URL, Stripe, Resend)"
  - "golive:check --strict yeşil"
  - "Stripe live smoke (3)"
  - "RODO: NEXT_PUBLIC_OPERATOR_* + imzalı belgeler"
  - "Plesk cron günlük"
```
