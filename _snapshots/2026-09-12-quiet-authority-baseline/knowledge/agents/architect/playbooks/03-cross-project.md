# Playbook 03 — Cross-Project Change

**Tetik:** ac-panel + ac-daemon (veya + ac-website-restored) eş zamanlı değişiklik.

## Architect Ekstra Gate'ler

- **G+ Direction**: Backend önce, frontend sonra. Frontend bir endpoint çağırıyorsa endpoint canlı olmadan PR'a girmemeli.
- **G+ Versioning**: Breaking API değişikliği varsa, geçiş döneminde eski endpoint korunmalı (deprecation header).
- **G+ Envelope Sync**: Backend `{success, data, error}` envelope'a uyuyor; frontend `res.success && res.data` ile mi tüketiyor? Plan'da iki tarafın da kontrolü olmalı.
- **G+ Type Sync**: Backend type'ı değiştiyse frontend'in tüketim yerlerinde mirror'lanmış mı?

## Tipik Failure Modes

- Frontend backend'den önce merge olur, prod'a deploy'da 404 kaskadı
- API envelope tek tarafta değişir (panel breaking, daemon eski format)
- Type mirror'sızlık: backend `purl?: string` ekler, panel hâlâ `as any` ile okur
- Web sitesi paneldeki "siber" değişikliklerden etkilenir (palette discipline ihlali)

## Architect'ten Beklenen Çıktı

PROCEED için plan iki sütun:
- **Backend (ac-daemon)** adımları: route, service, audit, test
- **Frontend (ac-panel)** adımları: api.ts service, page consumer, defensive guards
- `dependencies`: Frontend adımları backend adımlarına bağlı (sıra zorunlu)
- `rollback`: Frontend'i geri alırken backend route'un da emniyetle kalmasını sağla (orphan ama zararsız)

## Senior Notlar

Cross-project plan'lar **tek bir kişide bitirilmeli**. "Sen panel'i yap, ben daemon'u" paralelinde envelope drift gerçekleşir. Architect plan'ı tek developer'a kilitlemeli (PR sahibi tek).

Web sitesi neredeyse hiç cross-project değişikliğe dahil olmaz — paneldeki UI patternlerini web sitesine "tutarlılık için" sızdırma talebi geldiğinde Architect refleks **ABORT** (palette discipline farklı, brand independence farklı).
