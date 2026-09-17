# Playbook 04 — Security-Critical Change

**Tetik:** Auth, SSRF guard, secret management, audit chain, network policy değişiklikleri.

## Architect Ekstra Gate'ler — Hepsi BLOCKER

- **G+ Threat Model**: Plan, hangi tehdidi (STRIDE) hangi mekanizmayla azaltıyor? Tehdit ↔ mitigation eşlemesi olmadan PROCEED yok.
- **G+ Test First**: Security değişikliği test fixture **önce** yazılır, sonra implementasyon. Mevcut güvenlik testleri (test-ssrf.js, test-sha256.js, test-audit-chain.js) regresyon olarak çalıştırılmalı.
- **G+ Secret Hygiene**: Plan, gizli bilgiyi diff'e sokuyor mu? `.env` örneği commit ediliyorsa **REDACTED** placeholder şart.
- **G+ Backward Compat**: Auth değişikliği eski JWT'leri geçersiz kılıyorsa, geçiş penceresi planlanmış mı?
- **G+ Audit Integrity**: AuditLogger'a dokunuyorsa, hash chain regenerasyonu sırasında eski entry'lere ne olur?

## Tipik Failure Modes

- "DNS rebinding closure" gibi guard sıkılaştırması, meşru hostname'leri de bloke eder
- Audit chain'i değiştirirken eski entry'lerin `prevHash`'i hesaplanamaz hale gelir
- Secret rotation eski clients'a haber vermeden yapılır
- "Sadece dev için" diye bir bypass eklenir, prod'a sızar (env check unutulur)

## Architect'ten Beklenen Çıktı

PROCEED için plan:
- `intent.threat_model`: STRIDE kategorisi (Spoofing/Tampering/Repudiation/Info Disclosure/DoS/Elevation)
- `steps[]`: Test fixture → implementation → regression suite
- `rollback`: Otomatik tetiklenebilir (örn. audit verify fail edince eski binary'e geç)
- `success_criteria`:
  - Yeni test geçer
  - Mevcut güvenlik test'leri geçer (regresyon yok)
  - Sentinel security skill (05-security) skor düşürmedi
  - Manuel attack senaryosu: <somut ne deneneceği>

## Eskalasyon

Plan kullanıcı verisi taşıyorsa, secret rotation içeriyorsa veya audit immutability'ye dokunuyorsa, Architect raporunun başına şu satırı yazar:

```
🚨 OPERATIONAL HALT — Security-critical scope, requires user explicit acknowledgment.
```

User onayı olmadan PROCEED verilmez (bağımsızlık protokolü dahi yetmez).

## Senior Notlar

Bu kategoride Architect ile Sentinel **yakın işbirliği**. Sentinel'in `05-security` skill'i implementation sonrası BLOCKER alırsa, Architect'in plan'ı **REOPEN** etmesi ve sebep analizine girmesi gerekir. "Sentinel false positive demiş" diye geçilemez — security'de false positive ispatı zor, kanıt yükü yüksek.
