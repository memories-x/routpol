# Playbook 08 — Data Migration (JSON, Registry, Audit)

**Tetik:** ServerRegistry shape değişimi, AuditLogger format değişimi, Marketplace catalog yapısı, CVE feed snapshot format.

## Architect Ekstra Gate'ler

- **G+ Backup First**: Her veri migration'ı backup adımıyla başlar. Backup dosya yolu plan'da somut: `cve-scan.json.bak-<ts>`.
- **G+ Forward Compat**: Yeni field ekleme: `optional + default value`. Zorunlu field ekleme: migration script şart.
- **G+ Backward Compat**: Eski reader yeni dosyayı parse edebilmeli (graceful degradation), eski writer'lar arada kalmasın.
- **G+ Hash Chain Integrity**: Audit log dokunuluyorsa, `verifyChain()` migration sonrası kırılırsa BLOCKER. Migration script chain'i regenerate edebilmeli.
- **G+ Atomic Write**: `writeFileSync` doğrudan yazma yerine `write → fsync → rename` pattern'i. Yarım dosya yasak.

## Tipik Failure Modes

- Migration script tek seferlik, idempotent değil — ikinci çalıştırma data corrupt eder
- Eski snapshot okuma "field undefined" hatası fırlatır, defaults yok
- Backup unutulur, migration başarısız olur, geri dönüş yok
- Audit chain regenerate ederken seq numbers bozulur
- Concurrent writer yazarken migration başlar — race condition

## Architect'ten Beklenen Çıktı

PROCEED için plan:
- `intent.data_target`: hangi dosya/dizin etkileniyor (PROGRAMDATA path)
- `steps[]`:
  1. Mevcut veriyi backup'a kopyala (timestamped)
  2. Yeni shape için reader'da defaults ekle (forward compat)
  3. Migration script yaz (idempotent: 2x çalışınca aynı sonuç)
  4. Dry-run (read-only): kaç entry etkileniyor raporla
  5. Apply (write)
  6. Verify (yeni reader migrated dosyayı sorunsuz okur, audit chain valid)
- `rollback`:
  - Backup'tan restore
  - Reader compat layer'ı bir süre tut (sürpriz)
- `success_criteria`:
  - Migration script idempotent (test ile kanıtla: aynı script 2x = aynı sonuç)
  - `auditLogger.verifyChain()` ok döner
  - Eski snapshot da okunabilir (compat test)

## Senior Notlar

Veri migrasyonu A-CyberSolutions'da seyrek olur ama hata yapınca kalıcı. Architect bu kategoride **her zaman** test fixture talep eder, hiç istisna yok. "Tek seferlik yaman bir migration" diye yapılan iş genelde production'da iki kez çalışır.
