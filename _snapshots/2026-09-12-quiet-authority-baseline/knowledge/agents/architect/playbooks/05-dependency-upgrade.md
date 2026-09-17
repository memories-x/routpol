# Playbook 05 — Dependency Upgrade

**Tetik:** package.json'da version bump, lockfile değişikliği, yeni paket ekleme/silme.

## Architect Ekstra Gate'ler

- **G+ Lockfile Discipline**: package-lock.json / pnpm-lock.yaml plan'a dahil mi? Lockfile'sız bump non-reproducible.
- **G+ Major Bump Risk**: SemVer major (X.0.0) bump'lar breaking. Migration notes ezbere değil okunarak değerlendirilmeli.
- **G+ Bundle Impact**: Yeni paket frontend bundle'a ekleniyorsa, boyut farkı plan'da: `npx vite build` öncesi/sonrası gzip diff.
- **G+ Transitive CVE**: Yeni paket OSV.dev'de advisory taşıyor mu? CVE feed sorgusu plan'da kanıtlanmalı.
- **G+ Type Definitions**: TypeScript projesi için @types/* aynı plan'da. Hatalı tip hayaleti istemiyoruz.

## Tipik Failure Modes

- Patch bump (~1.2.3) sandıklan değişiklik, transitive dependency yüzünden breaking
- node_modules silinmeden upgrade → eski symlink hayaleti
- Frontend paketinin server-side rendering davranışı değişir, Vite build kırılır
- `@types/foo` versiyon driftine girer, tsc çıktısı patlar

## Architect'ten Beklenen Çıktı

PROCEED için plan:
- `intent.why`: "Hangi feature/CVE için bu upgrade"
- `steps[]`:
  1. CVE feed sorgusu sonucu ekle
  2. Migration notes (CHANGELOG) okumayı belgele
  3. node_modules clean
  4. install + lockfile commit
  5. tsc + build + test regression
- `rollback`: lockfile geri al + `npm ci`
- `success_criteria`:
  - tsc 0 hata
  - vite build temiz
  - bundle size delta < %5 (ya da gerekçe)
  - tüm mevcut testler geçer

## Senior Notlar

"Latest is best" yanılgısı. Upgrade reaktif değil reaktif olmalı: CVE, ihtiyaç, ya da uyumluluk. Sırf "yeni sürüm çıkmış" diye upgrade Architect'ten **DEFER** alır.
