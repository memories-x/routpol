# Snapshot — 2026-09-16 pre-hostinger-layout

Header mega-nav deneyi öncesi. Restore: `pre-hostinger-layout'a dön` / `2026-09-16-pre-hostinger-layout`.
Default Quiet Authority: `quiet authority baseline'a dön`.

## Restore (PowerShell)

```powershell
$s = "_snapshots\2026-09-16-pre-hostinger-layout"
Copy-Item "$s\src\components\landing\LandingHeader.tsx" "src\components\landing\LandingHeader.tsx" -Force
Copy-Item "$s\src\content\landing\*" "src\content\landing\" -Force
node scripts/pre-commit-guard.js
```
