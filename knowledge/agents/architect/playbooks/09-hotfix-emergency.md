# Playbook 09 — Hotfix / Emergency Patch

**Tetik:** Üretimde aktif bug, kullanıcı etkileniyor, hızlı patch şart.

## Architect Ekstra Gate'ler — Hotfix Modu

- **G+ Time-Boxed**: Hotfix submission'ı 15 dakika içinde audit edilmeli. Architect bu süreyi geçemez.
- **G+ Scope Minimal**: Hotfix planı SADECE bug'ı düzeltir. "While we're at it" kesinlikle yasak — refactor/cleanup ayrı plana.
- **G+ Root Cause Documented**: Plan'da `intent.root_cause` zorunlu (semptom değil sebep).
- **G+ Reproduction Steps**: Bug'ı tekrar üretme adımları plan'da olmalı.
- **G+ Post-Mortem Required**: Hotfix CLOSE'undan sonra 24 saat içinde post-mortem entry learning-log'a.

## Tipik Failure Modes

- "Hızlı çözeyim" diye disipline atlama → 2. bug üretme
- Root cause yerine semptom temizleme → bug 2 hafta sonra yeniden ortaya çıkar
- Test yazmadan deploy → regresyon
- Hotfix patch sonra rollback gerekirse pattern unutuluyor

## Architect'ten Beklenen Çıktı

Hotfix için PROCEED criteria gevşetilmez, hızlandırılır:

```yaml
intent:
  what: <bug semptomu>
  why: <user impact + severity (P0/P1/P2)>
  root_cause: <gerçek sebep — semptom değil>
  reproduction: <step-by-step>
  triggered_by: production_incident | user_report | monitoring_alert

scope:
  module: <ETKİLENEN TEK DOSYA veya servis>
  out_of_scope:
    - Refactor
    - Cleanup
    - Yan iyileştirmeler
    - "Bunu da düzelteyim" eklemeleri

success_criteria:
  - "Reproduction step'i fail eden test → pass (yeni regression test)"
  - "Bug semptomu observable olarak yok (log/metric/UI)"
  - "tsc + sentinel temiz (yeni regresyon eklenmedi)"
  - "Post-mortem 24 saat içinde learning-log'a yazıldı"

stop_conditions:
  - "Hotfix sırasında ikinci bug çıkar → halt + yeni plan"
  - "Scope dışı dosyaya dokunma ihtiyacı → halt + REVISE"

estimated_effort: <15-60 dk arası tipik>
risk_overall: high (production etkisi var, dikkat şart)
```

## Severity Eşleştirmesi

| Severity | Tepki | Audit süresi |
|---|---|---|
| P0 — outage | Anında, telefon var | < 5 dk |
| P1 — major bug | 15 dk içinde | < 15 dk |
| P2 — minor | 1 saat içinde | normal akış |

## Senior Notlar

Hotfix Architect'in en sıkı denetlediği plan tipi. "Hızlı olsun" ile "doğru olsun" gerilimi var — disiplin doğru olanı seçer her zaman. Hızlı olmak için kural gevşetilmez; hızlı olmak için **gereksiz adımlar atlanır** (yan iyileştirme, dokümantasyon detayı, vs).

Hotfix sonrası 24 saat içinde post-mortem learning-log'a — bu zorunluluk, "tekrar yaşamamak için" hafıza dosyası. Üç hotfix benzer pattern'da olursa AGENTS.md mutlak kuralına yükselir.

## R5 Esnek mi?

**Hayır.** Hotfix bile emoji ve süslü dil yasağına tabi. Acil durum gerekçe değil — drama panik artırır, disiplin sakinleştirir.
