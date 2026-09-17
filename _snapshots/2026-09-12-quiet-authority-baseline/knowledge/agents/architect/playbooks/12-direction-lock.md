# Playbook 12 — Direction Lock Protocol (DLP)

> **Tip:** Cross-cutting / her plan için aktif gate (G10)
> **Norm:** master-rules.md R13
> **Amaç:** Aynı dosyada ters yönlü "kapris kaynaklı" plan salınımını **sıfıra indirmek**. Meşru fikir değişikliklerine kanıt zorunluluğu ile geçit verir.

## Ne zaman tetiklenir

Bu playbook **her plan submission'da** Architect-01 tarafından **otomatik** çalıştırılır. Diğer 11 playbook gibi opt-in değildir.

## G10 Gate Akışı

```
1. Plan YAML'ından modify_files listesini al
2. memory.json → directionLocks oku
3. Her modify_file için:
     a. Aktif lock var mı? (locked_until > now AND lock_status == "active")
        - YOK → bu dosya için geçit açık, sonraki gate
        - VAR → adım (b)
     b. Plan'ın direction_hash'i lock'un direction_hash'i ile eşleşiyor mu?
        - EŞLEŞİYOR (aynı yön) → izin var, lock yenilenir (+30 gün)
        - EŞLEŞMİYOR → adım (c)
     c. Plan YAML'ında `unlock_justification` alanı var mı?
        - YOK → AUTO-REJECTED, response template aşağıda
        - VAR → adım (d)
     d. Justification kategorisi geçerli mi?
        - 6 kategoriden biri (bug_report, user_feedback, security, performance, external_dep, compliance)
        - Kanıt alanı dolu mu? (issue link / metric / CVE / vb.)
        - GEÇERLİ → lock unlock'lanır, plan G11'e geçer
        - GEÇERSİZ → REJECTED, response template aşağıda
```

## Direction Hash Hesaplama

`direction_hash` = `SHA256(canonical_direction_summary).slice(0, 8)`

`canonical_direction_summary`:
```
<file_path>|<intent_verb>|<target_state_summary>
```

Örnek:
```
ac-panel/src/pages/Marketplace.tsx|migrate|catch_unknown_errMessage_axios_envelope
→ SHA8: a3f12b8c
```

`intent_verb` enum: `migrate`, `refactor`, `add`, `remove`, `restyle`, `relocate`, `rename`, `optimize`, `harden`.

İki plan aynı dosyaya **farklı intent_verb** veya **çelişen target_state_summary** ile dokunursa direction_hash farklı olur → ters yön sayılır.

## Lock Yazma (Plan CLOSED olduğunda)

Architect post-flight CLOSED kararı verirken **her modify_file için**:

```json
{
  "file": "ac-panel/src/pages/Marketplace.tsx",
  "direction_hash": "a3f12b8c",
  "direction_summary": "migrate to catch(e:unknown) + errMessage + axios envelope guard",
  "locked_by_plan": "2287d611",
  "locked_at": "2026-05-13",
  "locked_until": "2026-06-12",
  "lock_status": "active"
}
```

`memory.json → directionLocks` array'ine append.

## Lock Tetikleyince Plan'a Response

**Senaryo 1 — Justification yok (AUTO-REJECTED):**

```
[DIRECTION LOCK VIOLATION]
Plan: <plan_hash>
Çatışan dosya: <file>
Aktif lock: <locked_by_plan> @ <locked_at>
Lock yönü: <direction_summary>
Lock bitiş: <locked_until> (kalan: N gün)

Yeni planın yönü: <new_direction_summary>
Bu ters yön — `unlock_justification` alanı zorunlu.

Karar: AUTO-REJECTED
Aksiyon: 
  (a) Planı aynı yönde revize et (mevcut lock ile uyumlu olacak şekilde)
  (b) unlock_justification ekle — 6 kategoriden biri + kanıt
  (c) <locked_until> tarihini bekle, lock otomatik düşer
  (d) Master Rules R13 güncelleme talebi (user onayı zorunlu)

— Architect-01 | gate: G10 (DLP) | lock_id: <plan_hash>
```

**Senaryo 2 — Justification var ama kategori yasaklı/yetersiz (REJECTED):**

```
[DIRECTION LOCK — INSUFFICIENT JUSTIFICATION]
Plan: <plan_hash>
Sunulan justification: <verbatim>
Tespit: <yasaklı kalıp veya boş kanıt nedeni>

Geçerli kategoriler: bug_report | user_feedback | security | performance | external_dep | compliance
Her kategori somut kanıt ister (R13 tablosu).

Karar: REJECTED
Aksiyon: justification'ı kanıtlı kategoriye dönüştür veya planı geri çek.

— Architect-01 | gate: G10 (DLP) | lock_id: <plan_hash>
```

**Senaryo 3 — Justification geçerli (UNLOCKED, plan devam):**

```
[DIRECTION LOCK — UNLOCK ACCEPTED]
Plan: <plan_hash>
Önceki lock: <old_plan_hash> (yön: <old_summary>)
Justification kategorisi: <category>
Kanıt: <evidence_snippet>

Lock arşivlendi: lock_status = "unlocked_by_<new_plan_hash>"
Yeni yön onaylandı, G11'e geçiliyor.

— Architect-01 | gate: G10 (DLP) | unlock_reason: <category>
```

## Lock Yaşam Döngüsü Olayları

| Olay | Etki |
|---|---|
| Plan CLOSED | Modify_files için yeni lock yazılır (locked_until = +30 gün) |
| Aynı yönde yeni plan CLOSED | Mevcut lock yenilenir (locked_until güncellenir) |
| `locked_until` geçti | `lock_status: "expired"` — yeni planlar serbest |
| Justification ile unlock | `lock_status: "unlocked_by_<hash>"`, arşiv |
| User manuel iptal | `lock_status: "revoked_by_user"`, log'a kayıt |

## CLI Desteği (planlı)

```
node scripts/audit-sentinel.js --list-locks              # aktif lockları tablo halinde
node scripts/audit-sentinel.js --check-lock <file>       # tek dosya lock durumu
node scripts/audit-sentinel.js --direction-hash <yaml>   # plan'dan direction_hash üret
```

CLI implementasyonu hazır olana kadar Architect-LLM `memory.json` dosyasını **doğrudan okur** ve gate'i mental olarak işletir.

## Anti-Pattern (Bypass Denemeleri)

Şunlar tespit edilirse plan **REJECTED + learning-log entry**:

- `direction_summary`'yi yapay olarak farklı yazıp aynı yönde plan üretme (Sentinel review'da yakalanır)
- Justification kategorisi "user_feedback" yazıp kanıt olarak "kullanıcı istedi" yazma (somut metrik yok = red)
- "external_dep" yazıp gerçek breaking change olmadan refactor talep etme
- Aynı turda hem lock atma hem unlock yapma (independence ihlali, R5+R13)

## Felsefe

DLP "polis değil filtre"dir. Hedef:
- Kapris → sıfır
- Meşru değişim → kanıtla geçit
- Kayıt → her unlock learning-log'a entry, pattern frequency'ye tick

3 unlock aynı dosyada kısa sürede → "bu modül mimari olarak istikrarsız" sinyali → user'a otomatik uyarı + AGENTS.md'ye not düşme önerisi.
