# Snapshot restore — 2026-08-20 pre-structure (v0.7.2)

**Ne zaman:** Yapısal prompt değişikliklerinden **önce**  
**Sürüm:** `package.json` → `0.7.2`  
**Klasör:** `_snapshots/2026-08-20-pre-structure-v0.7.2/`

## Operatör komutu

Sohbette: **"geri dön"** / **"snapshot'a dön"** / **"0.7.2'ye dön"**

Agent şu klasörü kaynak kabul eder ve `src/`, `public/`, `prisma/`, `docs/`, `scripts/`, kök config dosyalarını buradan geri yazar. `node_modules`, `.env`, `.next` dokunulmaz.

## Manuel geri yükleme (PowerShell)

```powershell
$s = "_snapshots\2026-08-20-pre-structure-v0.7.2"
Copy-Item -Path "$s\src" -Destination "src" -Recurse -Force
Copy-Item -Path "$s\public" -Destination "public" -Recurse -Force
Copy-Item -Path "$s\prisma" -Destination "prisma" -Recurse -Force
Copy-Item -Path "$s\docs" -Destination "docs" -Recurse -Force
Copy-Item -Path "$s\scripts" -Destination "scripts" -Recurse -Force
Copy-Item -Path "$s\e2e" -Destination "e2e" -Recurse -Force
Get-ChildItem $s -File | ForEach-Object { Copy-Item $_.FullName -Destination $_.Name -Force }
npm install
npm test
npm run build
```

## Bu noktada ne vardı

- Yol haritası Faz 1–5 kodu
- Tasarım: analiz öncesi görsel + 0.7.1 shell + 0.7.2 ana sayfa ritmi
- Panel koyu navy ray
- Başvuru 3 adım + özet kartı
- Header Hesabım linki

## Not

Ortamda `git` yoktu; bu yüzden snapshot klasörü kullanıldı. Git kurulursa bu klasör yerine `git commit` tercih edilir.
