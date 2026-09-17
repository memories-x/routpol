# Snapshot restore — 2026-09-12 Quiet Authority baseline

**Ne zaman:** Atmosfer + modernizasyon denemeleri geri alındıktan sonra, operatör onaylı görsel hali  
**Klasör:** `_snapshots/2026-09-12-quiet-authority-baseline/`  
**Not:** Ortamda `git` yok; bu klasör geri dönüş noktasıdır.

## Operatör komutu

Sohbette: **"quiet authority baseline'a dön"** / **"2026-09-12 snapshot"** / **"görseli kaydettiğimiz hale dön"**

Agent bu klasörü kaynak kabul eder; `src/`, `public/`, `prisma/`, `docs/`, `scripts/`, `e2e/`, `knowledge/` ve kök config dosyalarını buradan geri yazar. `node_modules`, `.env*`, `.next` dokunulmaz.

## Manuel geri yükleme (PowerShell)

```powershell
cd C:\Users\memories\Desktop\pol-turk
$s = "_snapshots\2026-09-12-quiet-authority-baseline"
Copy-Item -Path "$s\src" -Destination "src" -Recurse -Force
Copy-Item -Path "$s\public" -Destination "public" -Recurse -Force
Copy-Item -Path "$s\prisma" -Destination "prisma" -Recurse -Force
Copy-Item -Path "$s\docs" -Destination "docs" -Recurse -Force
Copy-Item -Path "$s\scripts" -Destination "scripts" -Recurse -Force
Copy-Item -Path "$s\e2e" -Destination "e2e" -Recurse -Force
Copy-Item -Path "$s\knowledge" -Destination "knowledge" -Recurse -Force
Get-ChildItem $s -File | Where-Object { $_.Name -notin @("RESTORE.md","manifest.json") } | ForEach-Object {
  Copy-Item $_.FullName -Destination $_.Name -Force
}
node scripts/pre-commit-guard.js
```

## Bu noktada ne vardı

- Quiet Authority landing (hero light, BrandLockup, Scope navy, Bridge/Process/Packages/FAQ/Lead)
- Beyaz yüzey tokenları (`--pt-bg: #f8fafc`, surface white) — gri sis yok
- Modernizasyon denemesi geri alınmış hali
- Kamu metin temizliği (SKU/checkout ops dili yok)
- SmartLink hash düzeltmeleri

## Bilinçli olarak dahil değil

- `.env` / secrets
- `node_modules` / `.next`
- Git history (repo’da `.git` yoktu)
