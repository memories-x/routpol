# Snapshot — 2026-09-16 pre-hostinger-tur2

Tur 2 (audiences grid + packages Plans rhythm) oncesi.
Restore: `pre-hostinger-tur2'ye don`

```powershell
$s = "_snapshots\2026-09-16-pre-hostinger-tur2"
Copy-Item "$s\src\components\landing\*" "src\components\landing\" -Force
node scripts/pre-commit-guard.js
```
