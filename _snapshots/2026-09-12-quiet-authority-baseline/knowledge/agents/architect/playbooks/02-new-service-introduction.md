# Playbook 02 — New Service / Module Introduction

**Tetik:** Yeni dosya kategorisi ekleme (yeni service, yeni route grubu, yeni context provider).

## Architect Ekstra Gate'ler

- **G+ Naming**: Yeni servis ismi `<Domain><Verb>Service.ts` kalıbına uyuyor mu? (MarketplaceService, CVEFeedService, AuditLogger gibi)
- **G+ Singleton Pattern**: Servis static class veya `export const x = new X()` mı? Mevcut servislerle tutarlı olmalı.
- **G+ Audit Hook**: Servis state değiştiren bir aksiyon yapacaksa `auditLogger.log(...)` çağrısı plan'da var mı?
- **G+ Route Registration**: Eğer HTTP route ekliyorsa `server.ts` içinde middleware sırası planda belirtilmiş mi?

## Tipik Failure Modes

- Singleton vs static method karışıklığı (panel context'i hooks ile, daemon servisi class.staticMethod ile)
- Audit hook unutulması (compliance kanıtı kaybolur)
- Route static vs dynamic ordering ihlali (404 üretir, bilinen tarihi hata)
- API envelope unutulması (`{success, data, error}` yerine raw response)

## Architect'ten Beklenen Çıktı

PROCEED için plan şu kalemleri kapsasın:
- `intent.what`: "X domain'ini Y operasyonuyla yönetir"
- `steps[]`:
  1. Servis dosyasını oluştur (state + public method)
  2. Type definition export et
  3. Route'u kaydet (varsa) — static before dynamic
  4. Frontend service'i ekle (varsa) — api.ts altına
  5. Frontend consumer (sayfa/komponent) bağla
  6. Smoke test fixture (scratch/test-*.js)
  7. Wiki belgesi (docs/wiki/<Service>.md)
- `success_criteria`:
  - `tsc 0 hata` her iki tarafta
  - `vite build` temiz
  - smoke fixture geçti
  - audit log entry üretiliyor (manuel curl ile doğrula)

## Senior Notlar

Yeni servis tek başına anlamlı bir birim olmalı. "Sonra entegre ederiz" mantığı yarım iş bırakır. Servis + en az bir consumer (route veya hook) **aynı plan** içinde olmalı; "boş duran kütüphane" PR'ı yok.
