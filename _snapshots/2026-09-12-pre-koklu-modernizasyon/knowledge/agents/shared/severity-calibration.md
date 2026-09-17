# Severity Calibration Guide

> Sentinel ve Architect severity kararlarında tutarlılık için referans. Belirsizlik varsa **yukarı yuvarla**.

## Sentinel Severity Karar Tablosu

| Severity | Kriterler (en az biri) | Verdict Etkisi |
|---|---|---|
| **BLOCKER** | Veri kaybı / korupsiyon riski | REJECTED — tek tane yeterli |
| | Güvenlik açığı (auth bypass, RCE, secret leak) | |
| | Üretim crash riski (NPE, infinite loop) | |
| | Mutlak invariant ihlali (R7 listesi) | |
| | Hash chain bozulması | |
| **MAJOR** | İşlev hatası (bug ama veri sağlam) | CHANGES_REQUESTED |
| | Defensive coding eksik (NPE değil ama riskli) | |
| | Performans regresyonu (>2x yavaşlama) | |
| | Test eksikliği (yüksek-risk modülde) | |
| | R5 ihlali (yasaklı dil/emoji) | |
| **MINOR** | Stil tutarsızlığı | APPROVED_WITH_NOTES |
| | Naming convention | |
| | Dead code | |
| | Yorum eksikliği | |
| **NIT** | Sübjektif tercih | Yorum, blokaj yok |
| | Stil mikro-detay | |

## Architect Risk Karar Tablosu

| Risk | Kriter | Decision Etkisi |
|---|---|---|
| **critical** | Production etkisi geri alınamaz | OPERATIONAL HALT — user onayı şart |
| | Auth/secret manipülasyonu | |
| | Multi-tenant veri sızıntısı | |
| **high** | 5+ dosya cross-cut | Detaylı side-effect haritası şart |
| | Backend + frontend birlikte | Sentinel handoff zorunlu |
| | Schema migration | Rollback test edilmiş olmalı |
| **medium** | 2-4 dosya | Per-file atomic strategy |
| | Tek modül ama core (auth, audit, registry) | |
| **low** | Tek dosya | Standart süreç |
| | Localized cosmetic | |

## Kararsızlık Halinde Kurallar

1. **İki severity arası kalıyorsa yukarı git.** Yanlış-yüksek düzeltilir; yanlış-düşük canlıya kaçar.
2. **Family belirsizliği**: 
   - Security family → en yüksek
   - Data integrity → ikinci
   - User experience → üçüncü
   - Style → en düşük
3. **Bilgi eksikse DEFER** (kalibre etmek yerine bilgi iste).

## Skill 16'ya Özel Kalibrasyon

`catch (e: unknown)` sonrası property erişimi:
- `e?.message` (TS strict'te TS2339 verir) → BLOCKER (production crash)
- `e.code` veya başka property → MAJOR (type guard eksikliği)
- `String(e)` veya `errMessage(e)` → değil

## R5 İhlali Kalibrasyonu

- Emoji çıktıda → MAJOR (disiplin erozyonu)
- Yasaklı sıfat (siber/lüks/God-Tier) → MINOR (uyarı)
- "Bana göre / belki / muhtemelen" → MINOR
- "While we're at it" / "Tutarlılık adına" → MAJOR (scope creep tetikleyici)
- Self-approval (aynı oturum) → DEFER (independence violation)

## Architect 9 Gate Kalibrasyonu

| Gate | Soft fail (warning) | Hard fail (red) |
|---|---|---|
| G1 Scope Lock | scope eksik tanım | scope yanlış proje |
| G2 Out-of-Scope | out_of_scope eksik liste | explicit listede varolan alana dokunma |
| G3 Sentinel Compat | warn-level skill ihlali yönü | error-level skill ihlali yönü |
| G4 Sequencing | adım açıklaması zayıf | yanlış sıra (X-Y bağımlılık ihlali) |
| G5 Dependencies | dependency boş liste | dependency mevcut değil |
| G6 Rollback | step muğlak | git checkout (git-free env) veya boş |
| G7 Success Criteria | bir kriter ölçülemez | hiçbir kriter ölçülemez |
| G8 Risk Coherence | overall risk biraz uyumsuz | LOW etiket high-risk işe |
| G9 Concurrency | mtime check eksik | stop_condition concurrency yok |

Hard fail 1+ → REVISE veya ABORT. 3+ hard fail → ABORT.

## Anti-Pattern: Severity Inflation

Her şeyi BLOCKER yapmak da hata — disiplin gevşer, gerçek BLOCKER'lar görünmez olur. Kalibrasyon ortayı bulmak demek:
- 60-80% NIT/MINOR (kabul edilebilir noise)
- 15-30% MAJOR (gerçek iş)
- 5-10% BLOCKER (acil)

Bir audit'in **çoğu** BLOCKER ise ya kod gerçekten yangında ya da kalibrasyon kaçmış.

## Anti-Pattern: Severity Deflation

Her şeyi NIT yapmak da hata — gerçek MAJOR'lar fark edilmez. Sentinel'in iddialı olması gerek — BLOCKER demekten korkmadan, ama her şeye değil.

## Belirsizlik Protokolü

Sentinel veya Architect bir bulgunun severity'sinden emin değilse:

1. Memory'deki benzer geçmiş pattern'a bak
2. Master Rules R7 invariant'lara karşı çapraz kontrol
3. Hâlâ belirsizse: **yukarı yuvarla + raporda gerekçe**

```
Note: Severity MAJOR yerine BLOCKER seçildi — emin değildim, security family olduğu için yukarı yuvarladım.
```

Bu şeffaflık operatöre kalibrasyon imkanı verir.
