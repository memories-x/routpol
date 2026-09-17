# Rollback Pattern — Filesystem Snapshot (Git-Free)

> Bu projede git mevcut değil. `git checkout` rollback'i çalışmaz. Tüm planlar bu pattern'ı **default** kullanır.

## Pre-Flight Snapshot (Step 0)

Her plan, multi-file modifikasyon yapıyorsa Step 0 olarak:

```yaml
- order: 0
  action: pre_flight_snapshot
  description: |
    For each target file in steps[]:
      Copy-Item <file> <file>.bak
    Record mtime baseline:
      Get-ItemProperty <file> | Select-Object -ExpandProperty LastWriteTime
      → Save to .mtime-baseline.json
  risk: low
```

## Rollback Block (Zorunlu Şema)

```yaml
rollback:
  trigger: "tsc exit code != 0 after any per-file edit, OR mtime mismatch"
  steps:
    - "Copy-Item <failed_file>.bak <failed_file> -Force"
    - "Halt sweep — sonraki dosyaya geçme"
    - "Diagnose root cause, raporla, yeni mikro-plan gönder"
  cleanup_on_success:
    - "Final verification PASS sonrası tüm .bak dosyalarını sil"
  cleanup_on_failure:
    - ".bak dosyalarını sakla (recovery artifact)"
```

## Concurrency Detection (mtime)

Sweep başlamadan önce her dosyanın mtime'ı kaydet. Implementation sırasında dosya başka bir ajan (Claude, user, IDE auto-save) tarafından dokunulursa mtime değişir → halt.

```yaml
stop_conditions:
  - "any target file mtime != baseline (concurrent agent or user edit detected)"
```

## Why This Pattern

- **Time-bounded**: `Copy-Item` instant (< 1 sec per file)
- **Tested**: PowerShell idempotent operation
- **Observable**: `.bak` dosyasının varlığı + içeriği
- **Idempotent**: ikinci restore zararsız (aynı bytes)

Git introduce edildiğinde bu pattern'ı `git stash` veya `git reset --hard HEAD` ile değiştirebiliriz. Ama şimdi: filesystem snapshot tek yol.

## Anti-Pattern (Yapma)

- `rollback: git checkout` — git yok, çalışmaz, REVISE alır
- Rollback alanı boş — Architect REVISE
- "Manuel revert" — observable değil, tekrarlanamaz
- `rm -rf <file> && restore from memory` — atomic değil

## Playbook Bağlantısı

- Playbook 01 (multi-file refactor) — bu pattern'ı default kullanır
- Playbook 02 (new service) — yeni dosya için .bak gerekmez, ama route registration için ana service.ts dosyalarını yedek al
- Playbook 04 (security) — security-critical dosyalarda **2 kopya**: `.bak` + `.bak-security-<ts>` (audit trail için)
- Playbook 08 (data migration) — `.bak`'a ek olarak JSON dump (data integrity için)

## Architect Doğrulaması

Plan submission'da Architect şu G6 kontrolünü uygular:
- `rollback.steps` `git`'e referans veriyorsa → REVISE (infeasible)
- `Copy-Item` veya equivalent yoksa → REVISE (Master Rules R6 ihlali)
- `cleanup_on_*` blokları eksikse → REVISE
- `trigger` observable değilse ("manuel kontrol" gibi) → REVISE
