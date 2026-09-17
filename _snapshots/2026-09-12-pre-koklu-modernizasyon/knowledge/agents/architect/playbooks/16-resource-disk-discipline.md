# Playbook 16 — Resource & Disk Discipline

> Her container/disk/RAM kullanan plan bu playbook ile değerlendirilir.
> Master rule: **R23 Borrow-and-Return**

---

## Ne zaman kullanılır

- Forge deploy test, Docker image pull, WSL işlemi
- Toplu template sweep, gaming soak, integration test
- CI pipeline disk tüketen adımlar
- `disk_impact: light | heavy` içeren her plan

---

## Gate akışı

```
G1  Scope lock (ARCHITECT_TASKS.md)
G2  disk_impact doğru mu? (none/light/heavy)
G3  disk_borrow komutu planlı mı?
G4  disk_return komutu planlı mı? (zorunlu — heavy dahil)
G5  Eşik kontrolü — disk guard PASS? (heavy için block)
G6  Korunan infra listesi ihlal edilmiyor mu?
G7  PROCEED / REVISE / ABORT
```

---

## Plan YAML ek alanları

```yaml
disk_impact: none | light | heavy
disk_borrow: "npm run ac:forge  # veya proje eşdeğeri"
disk_return: "npm run forge:post-test && npm run ac:idle && npm run ac:dev-stop"
disk_verify: "npm run forge:disk-guard"
```

`disk_impact: heavy` → operatör explicit onay + disk guard `-BlockHeavy` PASS olmadan **ABORT**.

---

## Impact sınıflandırması

| Sınıf | Örnek | Docker? | Max images |
|-------|-------|---------|------------|
| none | Static check, TS build, HTTP smoke | Hayır | 0 |
| light | Tek template deploy + purge | Evet | 1 |
| heavy | 10+ template sweep, full catalog | Evet | Many — gated |

---

## Otomatik REVISE nedenleri

- `disk_return` eksik
- Heavy sweep varsayılan script'te guard bypass
- Purge sonrası disk guard doğrulaması yok
- WSL distro unregister veya `docker-desktop` silme önerisi
- E2E test Docker kapalıyken fail (skip policy yok)

---

## Otomatik ABORT nedenleri

- C: free ≤ block threshold
- VHDX ≥ block threshold
- Scope dışı full sweep
- Korunan infra silme talebi

---

## Post-flight (Architect close)

1. `disk_verify` çıktısı artifact olarak kayıt
2. VHDX/C: free önce/sonra karşılaştır
3. `learning-log.md` — heavy iş sonrası entry

---

## Response şablonu

```
[ARCHITECT-16] Resource Disk Discipline
disk_impact: <none|light|heavy>
borrow: <command>
return: <command>
verify: <command>
guard_status: PASS | FAIL | SKIPPED
decision: PROCEED | REVISE | ABORT
reason: <one line>
```

---

*Playbook 16 — A-CyberSolutions disk discipline distill, starter kit generic.*
