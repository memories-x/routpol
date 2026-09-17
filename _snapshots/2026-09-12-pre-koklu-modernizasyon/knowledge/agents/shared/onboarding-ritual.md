# Onboarding Ritual — Yeni Ajan İlk 5 Tur

> Herhangi bir projede yeni çalışan AI ajanı bu ritüeli uygular. Framework proje bağımsızdır; proje detayı `PROJECT_CHARTER.md` ve `project.invariants.yaml` dosyalarındadır.

## Tur 1 — Framework içselleştirme (pasif okuma)

Kod değiştirme yok.

**Sırayla oku:**

1. `AGENTS.md` — meta framework (5 dk)
2. `docs/wiki/TeamRoster.md` — ekip yapısı, 31 uzman (10 dk)
3. `knowledge/agents/shared/master-rules.md` — R1–R25 (10 dk)
4. `knowledge/agents/shared/operating-principles-compiled.md` — distill prensipler (5 dk)
4. `knowledge/agents/shared/team-charter.md` — lane ayrımı (5 dk)
5. `knowledge/agents/shared/handoff-protocol.md` — plan format (5 dk)
6. `knowledge/agents/team/dispatch-guide.md` — uzman seçimi (5 dk)
7. `docs/wiki/AgentSystem.md` — dosya haritası (5 dk)

**Proje varsa ek:**

8. `PROJECT_CHARTER.md`
9. `project.invariants.yaml`
10. `ARCHITECT_TASKS.md`

ACK:

```
[ONBOARDING TUR 1 ACK]
- TeamRoster: çekirdek trio + 31 uzman anlaşıldı
- master-rules: R1–R25 internalize
- operating-principles-compiled: disk + runtime autonomy özeti
- team-charter: Architect=plan, Lead Dev=impl, Sentinel=audit
- dispatch-guide: keyword → skill eşlemesi okundu
- Proje charter: <var/yok>
- Tur 2'ye hazırım
```

## Tur 2 — Pasif explore (read-only)

- `ARCHITECT_TASKS.md` current_focus
- `CHANGELOG.md` son 3 sürüm (proje varsa)
- `knowledge/agents/architect/playbooks/` — 17 playbook
- `knowledge/agents/sentinel/skills/` — 27 skill
- `knowledge/agents/skills/README.md` — uzman index

CLI:

```bash
node scripts/audit-sentinel.js --list-skills
node scripts/audit-sentinel.js --playbook
node scripts/audit-sentinel.js --telemetry
```

ACK:

```
[ONBOARDING TUR 2 ACK]
- Current focus: <ARCHITECT_TASKS veya N/A>
- 17 playbook, 27 sentinel skill envanterli
- Tur 3: ilk plan submission bekliyorum
```

## Tur 3 — İlk plan (Architect gate)

- Küçük görev bile olsa **plan YAML** yaz (handoff-protocol Geçiş #1)
- Architect persona **ayrı oturumda** review
- PROCEED almadan kod yok

## Tur 4 — İlk implementation

- Lead Developer lane
- Gerekirse dispatch-guide'dan uzman skill
- Tur sonu: `node scripts/audit-sentinel.js --diff`

## Tur 5 — İlk closed loop

- Sentinel APPROVED
- learning-log entry (Architect + Sentinel dersleri)
- session-handoff güncelle
- `[ONBOARDING COMPLETE]`

## Performans notları

- Rol kilidi: bir turda tek lane
- Token: sadece plan scope dosyalarını oku
- Restore: session-handoff son entry + CHANGELOG head

Detay: `knowledge/agents/shared/pro-performance.md`
