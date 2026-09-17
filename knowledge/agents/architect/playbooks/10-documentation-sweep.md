# Playbook 10 — Documentation Sweep

**Tetik:** Wiki/CHANGELOG bilinçli olarak güncellenmesi gereken durum (büyük feature serisi sonu, ay sonu retrospektif, yeni AI ajanı onboarding).

## Architect Ekstra Gate'ler

- **G+ No Code Changes**: Bu plan sıfır kod değişikliği yapar. Sadece `.md` dosyaları. Kod değişikliği önerisi çıkarsa ABORT.
- **G+ Source-of-Truth Inventory**: Plan başlamadan önce wiki + AGENTS.md + CHANGELOG'da hangi iddiaların hâlâ doğru olduğu envantere alınır.
- **G+ Cross-Reference Update**: Bir dosyaya entry eklemek diğer dosyalardaki linkleri etkiliyor mu? `Map.md`, `registry.md` güncel mi?
- **G+ Drift Detection**: Doc'lardaki "X kaldırıldı" / "Y eklendi" iddiaları kodla tutarlı mı? Sentinel CHANGELOG cross-check çalıştır.

## Tipik Failure Modes

- Wiki güncellendi dendi ama eski iddialar değiştirilmedi (claim drift)
- Yeni entry eklenirken eski entry'ler güncelliğini kaybediyor — eskimişler işaretlenmedi
- Map.md güncellenmiyor — yeni dokuman index'te yok
- CHANGELOG yeni version eklerken eski version'lara yanlışlıkla overwrite

## Plan Şablonu

```yaml
title: Documentation Sweep — <kapsam>

scope:
  project: docs (cross-cutting)
  module: docs/wiki/ + CHANGELOG.md + knowledge/agents/*/
  out_of_scope:
    - Source code (ac-panel/src, ac-daemon/src)
    - Config files (tsconfig, package.json)
    - Test fixtures

intent:
  what: <hangi doc'lar güncellenecek + neden>
  why: <onboarding mu, retrospektif mi, feature serisi sonu mu>
  triggered_by: scheduled | feature_complete | new_agent_onboarding

steps:
  - order: 0
    action: source_of_truth_audit
    description: |
      a. AGENTS.md'deki mutlak kuralları listele
      b. CHANGELOG son 3 sürümün iddialarını grep ile kodla doğrula
      c. Map.md ve registry.md'deki tüm linkleri çalışıyor mu kontrol et
      d. Sentinel CHANGELOG cross-check skill çalıştır
    risk: low
    
  - order: 1
    action: update_wiki_entries
    files: [<güncellenecek doc dosyaları>]
    risk: low
    
  - order: 2
    action: update_index_files
    files: [docs/wiki/Map.md, docs/wiki/registry.md]
    risk: low
    
  - order: 3
    action: changelog_entry
    files: [CHANGELOG.md]
    risk: low

rollback:
  trigger: "Update sonrası link kırıldı veya yanlış iddia eklendi"
  steps:
    - "Copy-Item <file>.bak <file> -Force"
  cleanup_on_success:
    - ".bak dosyaları sil"

success_criteria:
  - "Tüm güncellenen doc'larda iddialar grep ile doğrulanabilir"
  - "Map.md + registry.md yeni dosyaları içeriyor"
  - "CHANGELOG son version entry'si Değişim/Neden/Teknik Detay üçlüsü"
  - "Sentinel CHANGELOG cross-check: 0 inconsistency"

estimated_effort: 30-60 dk
risk_overall: low
```

## Senior Notlar

Dokümantasyon plan'ı en sık ihmal edilen plan tipi — "kod plan'ının bir parçası" olarak kalıyor, ayrı disiplin almıyor. Aslında onboarding kalitesinin %80'i wiki kalitesinden geliyor.

Bu playbook'un en kritik adımı **Step 0 source-of-truth audit**. Yeni doc yazmadan önce eski doc'ların ne kadar doğru olduğunu bilmek şart. Drift biriken doc, drift yazmaktan daha kötü.

## Architect Sentinel ile Handoff

Documentation sweep sonrası Sentinel handoff farklı:

```bash
node scripts/audit-sentinel.js --all 2>&1 | grep CHANGELOG_INCONSISTENCY
# Beklenen: 0 finding
```

Çünkü doc sweep'in temel kanıtı "iddiaların kodla tutarlı olması". Skor düşmedi mi değil, claim drift sıfır mı önemli.
