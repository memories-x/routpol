# Operating Principles — Compiled Reference

> **Kaynak:** A-CyberSolutions üretim oturumlarından (2026-06) distill edilmiş, starter kit'e entegre edilmiş çalışma mantığı, kural ve prensipler.
> **Kullanım:** Yeni görev boot sequence'ına ekle; Architect planlarında referans al; proje özel detay için `project.invariants.yaml` + `PROJECT_CHARTER.md`.
> **Referans implementasyon:** `docs/guides/ReferenceProject-ACyberSolutions.md`

---

## 1. Üç Kademeli Kapalı Çevrim (R1)

```
Plan → Architect PROCEED → Implement → Sentinel APPROVED → Architect close
```

- Faz atlama yok.
- Plan yazan onaylayamaz (bağımsız Architect oturumu).
- Her iddia kanıt gerektirir (R14): log, grep, test çıktısı, artifact.

**Kaynak:** `master-rules.md` R1–R4, `team-charter.md`, `handoff-protocol.md`

---

## 2. Scope Kilidi ve Direction Lock

| Mekanizma | Kural |
|-----------|-------|
| `ARCHITECT_TASKS.md → current_focus` | Plan uyumsuzsa **ABORT** (G1) |
| R13 Direction Lock | CLOSED plan dosyaları 30 gün kilitli; ters yön = AUTO-REJECTED |
| Scope genişletme | Archive veya user onaylı `current_focus` değişikliği |
| Atomik değişiklik (R18) | "Hazır buradayken şunu da..." yasak |

**Plan YAML zorunlu alanlar (11):** title, scope, intent, steps, rollback, risk_overall, success_criteria, modify_files, disk_impact (container projelerinde), disk_borrow, disk_return

**Kaynak:** `ARCHITECT_TASKS.md` pattern, playbook `12-direction-lock.md`

---

## 3. Kaynak Disiplini — Borrow and Return (R23)

**Mandate:** Disk ve RAM geçici ödünç alınır; iş bitince **mutlaka iade edilir**.

### Borrow (ne zaman açılır)

| Kaynak | Ne zaman |
|--------|----------|
| Docker / WSL | Container test, Forge deploy, image pull |
| Daemon Node | API test, panel geliştirme, quality gate |
| Panel Vite dev | UI geliştirme |
| MySQL | Herhangi bir backend testi |

### Return (iş bitince zorunlu)

| İş tipi | Return komutları (proje script'leri) |
|---------|----------------------------------------|
| Forge tek template | post-test purge + disk guard |
| Quality gate | idle + dev-stop + disk guard |
| Gün sonu panel dev | dev-stop (Docker kapalı kalır) |
| VHDX şişmesi | purge → compact (Admin) |

### Asla (varsayılan)

- Toplu container sweep (62 template vb.) açık onay olmadan
- WSL `docker-desktop` distro unregister
- Test artifact'lerini kalıcı bırakma
- `docker image prune` ile VHDX küçülmez sanma — compact gerekir

### Eşikler (örnek — `project.invariants.yaml` ile özelleştir)

| Metrik | Warn | Block |
|--------|------|-------|
| docker_data.vhdx | 15 GB | 30 GB |
| C: boş alan | ≤60 GB | ≤40 GB |

**Architect planında:** `disk_impact`, `disk_borrow`, `disk_return` + bitiş doğrulaması.

**Kaynak:** playbook `16-resource-disk-discipline.md`, `docs/guides/ResourceDiscipline.md`

---

## 4. Agent Runtime Otonomisi (R24)

Operatör, ajanın talebe göre **en uygun çalışma modunu kendisi seçmesine** izin verir. Her mod değişimi için onay istenmez.

| Mod | Ne zaman seçilir |
|-----|------------------|
| **Agent** | Net iş: kod, script, gate çalıştırma, fix |
| **Plan** | Büyük mimari karar, çoklu geçerli yol, trade-off |
| **Debug** | Hata, beklenmeyen davranış, kanıt toplama |
| **Ask** | Sadece açıklama/inceleme, değişiklik yok |
| **Multitask** | Birbirinden bağımsız paralel iş paketleri |

### Dev-workflow alt modları (gstack-inspired)

```
Checkpoint (opsiyonel) → Plan gate → Implement → QA-only → Ship
```

| Alt mod | Tetikleyici |
|---------|-------------|
| Checkpoint | Uzun tur, agent switch, "context kaydet" |
| Plan gate | 2+ dosya, güvenlik, multi-step |
| QA-only | Sadece doğrula; yeni scope yok |
| Ship | CHANGELOG + wiki + guard aynı tur |

### Otonomi sınırları

| Otonom yapılabilir | Operatör gerekir |
|--------------------|------------------|
| PROCEED sonrası implement | Plan onayı (bağımsız Architect) |
| Guard/sentinel fix (QA-only) | Yeni feature, refactor, scope creep |
| Test sonrası idle/dev-stop | `current_focus` değişikliği, R13 unlock |
| Checkpoint save/restore | Git commit/push (sadece istenince) |

**Kaynak:** playbook `17-agent-runtime-autonomy.md`, `.cursor/skills/dev-workflow/runtime-autonomy.md`

---

## 5. Süreç Hijyeni — Node ve IDE Ayrımı (R25)

### Kritik ayrım

| Süreç | Kaynak | Kapatılır mı? |
|-------|--------|---------------|
| Cursor `node.exe` (tsserver) | `Programs\cursor\resources` | **Hayır** — IDE bozulur |
| Proje `node.exe` (daemon, panel, nodemon) | Repo path altında | **Evet** — iş bitince |

### Proje süreç yönetimi prensipleri

1. `npm run dev` / nodemon yerine gate'lerde `npm run start` (tek süreç, kolay durdurma).
2. Test/gate sonrası proje Node'u durdur; Cursor node'a dokunma.
3. Docker sadece container testi için; günlük panel/daemon dev'de kapalı tut.
4. `ac:status` benzeri status komutu ile önce durumu oku, sonra mod seç.

### Cursor performans notları (operatör bilgisi)

- `state.vscdb` büyüdükçe (sohbet geçmişi) disk I/O artar → eski chat sil, yeni chat aç.
- Agent dosya tarama + TS analizi CPU/RAM tüketir — scope dar tut (plan `modify_files`).
- VmmemWSL yalnızca Docker Desktop açıkken görünür; `idle` ile kapanır.

**Kaynak:** `docs/guides/ResourceDiscipline.md` § Process hygiene

---

## 6. Geliştirme Konvansiyonları (proje invariant'ları)

`project.invariants.yaml` ile tanımlanır. Tipik A-CyberSolutions örneği:

| Alan | Kural |
|------|-------|
| API envelope | `{ success, data, error }` |
| Port | Tek canonical port (8080); yasak port listesi |
| Frontend HTTP | Tek apiClient; sayfa düzeyi fetch yasak |
| Defensive UI | `Array.isArray` before `.map()`; `typeof` before `.toFixed()` |
| Route order | Static before dynamic (Express) |
| Provisioning | Registry üzerinden; raw dockerode bypass yasak |
| Palette | Design token prefix; raw hex bg yasak |
| Brand | Yasak internal string'ler user-facing'de yok |
| UI feedback | alert/prompt/confirm yasak → toast/modal |
| Secrets | `process.env` / `import.meta.env` only (R20) |
| Hatalar | Sessiz catch yasak (R21) |
| TODO | Kodda yasak — backlog wiki'de (R17) |

**Kaynak:** `project.invariants.yaml.example`, Sentinel skills 03/04/06/11

---

## 7. Forge / Container Test Politikası

| Katman | Docker? | Ne zaman |
|--------|---------|----------|
| Static catalog check | Hayır | Her commit |
| Tek template test | Evet, 1 image | Önerilen doğrulama |
| Gaming soak | Evet, sıralı | Release öncesi; sonra purge |
| Full sweep (62+) | Evet, ağır | **Sadece** explicit release gate + disk guard PASS |

### E2E / quality gate Docker politikası

- Docker kapalıyken live deploy testi **fail etmez** — `skipped — Docker not running` olarak geçer.
- Bu, disk disiplini ile uyumludur; gerçek deploy kanıtı ayrı light test ile alınır.

**Kaynak:** playbook `16-resource-disk-discipline.md`, ReferenceProject § Forge

---

## 8. Korunan vs Güvenle Silinebilir

### Asla silme / bozma

- Docker Desktop programı ve `docker-desktop` WSL distro
- WSL2 / VM Platform Windows özellikleri
- Kaynak kod, `.env`, production veri
- API envelope contract, audit hash chain
- Express static-before-dynamic sırası
- Wiki node'ları (silme — güncelle/taşı)

### Güvenle regenerate (project cleanup)

- `dist`, build artifact'leri
- Vite/node cache
- Eski zip/checkpoint (etiketli olanlar hariç)
- Scratch log dosyaları

### Yanlış varsayım yasağı

- Server Forge = operatör paneli (müşteri websitesi değil)
- Frontend mock yerine daemon stub route
- `docker image prune` ≠ VHDX küçültme

---

## 9. Session Handoff ve Checkpoint

### Workspace checkpoint (proje script'leri varsa)

```bash
npm run checkpoint:save -- <project> "label"
npm run checkpoint:last -- <project>
npm run checkpoint:restore -- <project> <id>
# Restore sonrası: guard
```

### Session handoff notu

Dosya: `knowledge/agents/shared/session-handoff.md`

- Son **5** entry tut
- Restore: sadece son entry + CHANGELOG head + `ARCHITECT_TASKS.md`
- Tüm repoyu yeniden okuma

### Rollback (git olmadan)

- Pre-flight: `.bak` + mtime baseline
- tsc fail veya mtime mismatch → restore
- PASS sonrası `.bak` sil

**Kaynak:** `checkpoint-handoff.md`, `session-handoff.md`, `rollback-pattern.md`

---

## 10. Kalite Kapıları

| Gate | Komut / araç |
|------|--------------|
| Pre-commit | `node scripts/pre-commit-guard.js` |
| Sentinel diff | `node scripts/audit-sentinel.js --diff` |
| Architect persona | `node scripts/audit-sentinel.js --architect-persona` |
| Sales-ready (örnek) | Proje `sales:ready` script — exit 0 |

Sentinel ERROR = 0 zorunlu. QA-only modda Quality Score < 85 → "tamam" deme.

---

## 11. Ton ve İletişim (R5)

- Sıfır emoji
- Coşku / övgü yasak
- `[INFO]` `[WARN]` `[CRITICAL]` `[SUCCESS]` `[ERROR]` kullan
- İddia = grep/log kanıtı (R14)

---

## 12. Boot Sequence (R16 + genişletilmiş)

Yeni görevde oku (sırayla):

1. `knowledge/agents/shared/master-rules.md` (R1–R25)
2. `knowledge/agents/shared/operating-principles-compiled.md` (bu dosya)
3. `ARCHITECT_TASKS.md` → current_focus
4. `project.invariants.yaml` + `PROJECT_CHARTER.md` (varsa)
5. `knowledge/agents/shared/session-handoff.md` (son entry)

---

## Hızlı Komut Matrisi (referans proje)

```bash
# Kalite
node scripts/pre-commit-guard.js
node scripts/audit-sentinel.js --diff

# Kaynak modları (proje script isimleri — özelleştirilebilir)
npm run ac:status
npm run ac:idle          # Docker/WSL kapat
npm run ac:dev-stop      # Proje node durdur; Cursor node dokunma
npm run ac:dev           # Panel/daemon dev; Docker kapalı
npm run ac:forge         # Docker + daemon; sonra light test

# Forge light
npm run forge:catalog-check
npm run forge:test-one:safe -- -Template <id>
npm run forge:disk-guard

# Checkpoint
npm run checkpoint:save -- daemon "label"
```

---

*Son güncelleme: 2026-06-29 — A-CyberSolutions sales:ready 28/28 PASS sonrası distill.*
