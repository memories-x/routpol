# Playbook 06 — API Contract Change

**Tetik:** Mevcut endpoint'in shape değişimi, yeni zorunlu field, status code semantik değişimi.

## Architect Ekstra Gate'ler

- **G+ Envelope Stability**: `{success, data, error}` üst seviye envelope **asla** değişmez. Sadece `data` içi değişir. İhlal = REJECTED.
- **G+ Versioning Strategy**: Breaking değişiklik için iki seçenek: (a) yeni path `/v2/...`, (b) eski path geriye uyumlu kalır + deprecation header. Üçüncü seçenek yok.
- **G+ Consumer Inventory**: Kim tüketiyor? `grep -r "serverService.xxx" ac-panel/src` → her consumer adımda update.
- **G+ Audit Field Stability**: Audit log shape değişirse hash chain regenerasyonu gerekebilir — Playbook 04 ile cross-check.

## Tipik Failure Modes

- Frontend deploy edilir, backend henüz değil → 404 patlaması
- Status code sessizce değişir (404 → 200 with error envelope) → consumer'lar `res.success` kontrol etmiyorsa false success
- Yeni zorunlu field eski client'ları kırar (400 dönüşler artar)
- Audit log details format'ı değişir, eski log'lar parse edilemez

## Architect'ten Beklenen Çıktı

PROCEED için plan:
- `intent.breaking`: yes/no — yes ise versioning strategy zorunlu
- `steps[]`:
  1. Yeni shape'i backend'de ekle (eski paralel kalır)
  2. Consumer'ları yeni shape'e geçir
  3. Eski shape'i deprecation header ile işaretle
  4. (N hafta sonra) eski shape'i kaldır — ayrı plan
- `success_criteria`: tüm consumer'lar yeni endpoint'e bakıyor, eski endpoint deprecation log'larda
- `rollback`: Yeni endpoint feature flag arkasında olmalı, kapatılarak eskiye dön

## Senior Notlar

API contract A-CyberSolutions'da iki şeyle korunur: (1) envelope shape, (2) port 8080. Bu iki invariant'ı kıran her plan REJECTED. Diğer her şey müzakere edilebilir.
