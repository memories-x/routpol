# Playbook 01 — Multi-File Refactor

**Tetik:** 3+ dosyada eş zamanlı değişiklik (rename, signature change, pattern unification).

## Architect Ekstra Gate'ler

- **G+ Dependency Graph**: Etkilenen her dosyanın import/export grafiği çıkarılmalı. Plan'da `side_effects` bölümünde tüm consumer'lar listelenir. Eksik consumer = REVISE.
- **G+ Atomicity**: Refactor yarıda kalırsa build kırılır mı? Kırılırsa "atomic switch" stratejisi gerekir (yeni isim eklenir → consumer'lar geçer → eski isim silinir, 3 ayrı commit).
- **G+ Test Smoke**: Refactor öncesi mevcut testler yeşilse, sonrası da yeşil olmalı. Hiç test yoksa, refactor öncesi 1 smoke fixture eklenmesi şart.

## Tipik Failure Modes

- "Search and replace" ile rename → string match yan etkileri (CSS classnames, audit log details içindeki gömülü isimler)
- TypeScript "Rename Symbol" güvenli ama doc/comment'lere dokunmaz
- Re-export zincirleri (`export * from './foo'`) atlandığında bir consumer eski path'i kullanmaya devam eder

## Architect'ten Beklenen Çıktı

PROCEED için plan şu satırları içermeli:
- `intent.why`: "Cosmetic rename değil — şu davranış değişikliği"
- `steps[]`: en az 3 adım (introduce → migrate → deprecate)
- `rollback.steps`: her adımdan sonra çalışabilen ara durum
- `success_criteria`: "tsc 0 hata + sentinel score >=85 + tüm consumer'lar yeni API kullanıyor (grep ile doğrula)"

## Senior Notlar

Multi-file refactor en sık scope creep tetikleyicisi. Architect'in refleksi: "while we're at it" cümlesi geldiyse plan'ı **ikiye böl**.

## Rollback Stratejisi — Git Yoksa .bak Snapshot

Bu projede **git mevcut değil** (Windows ortamı, repo henüz init edilmemiş). `git checkout` rollback'i çalışmaz. Multi-file refactor için filesystem snapshot pattern'ı zorunlu:

```yaml
- order: 0
  action: pre_flight_snapshot
  description: |
    For each target file:
      Copy-Item <file> <file>.bak
    Bu .bak dosyaları rollback için recovery noktası.
    Ek: her dosyanın mtime'ını kaydet (concurrent agent tespiti için).

rollback:
  trigger: "tsc fail veya mtime mismatch"
  steps:
    - "Copy-Item <file>.bak <file> -Force  (idempotent restore)"
    - "Halt sweep — sonraki dosyaya geçme"
  cleanup_on_success:
    - "Final verification pass sonrası .bak dosyalarını sil"
  cleanup_on_failure:
    - ".bak dosyalarını sakla (recovery artifact)"
```

**Bu pattern git introduce edilince eski hale dönülebilir, ama şimdilik filesystem snapshot zorunlu.**
