# Agent Learning Log

Sentinel ve Architect-01'in **kalıcı bellek** dosyası. Her tamamlanan veya reddedilen döngünün dersini buraya yazıyoruz. Pattern'lar yeterli sıklığa ulaşınca skill veya playbook'a dönüşür.

Bu append-only bir dosya — eski entry'ler silinmez. Eskiyenler quarterly review ile arşivlenebilir (`learning-log-archive-<YYYY-Q>.md`).

## Entry Format

```
## YYYY-MM-DD — <plan veya finding title>

**Outcome:** CLOSED | REJECTED | REOPENED | LEARNED (skill/playbook update)
**Plan Hash:** <varsa>
**Architect lessons:**
  - <neyi yanlış gate'ledi, neyi atladı, hangi pattern surfaced>
**Sentinel lessons:**
  - <hangi pattern yeni öğrenildi, hangi false positive vardı>
**Skill/playbook updates:**
  - <varsa: skill ID, playbook adı, ne değişti>
**Drift signals:**
  - <varsa: scope drift, self-approval attempt, vs.>
```

---

## 2026-05-12 — Sentinel + Architect ajan takımı kurulumu

**Outcome:** LEARNED
**Architect lessons:**
- Gemini'nin orijinal "Architect-01" konsepti **self-approval loop**'a sahipti — plan üreten ajan aynı oturumda planı onaylıyordu. Bağımsızlık protokolü ile çözüldü.
- "While we're at it" / "Tutarlılık adına" cümleleri scope drift'in en güçlü erken sinyali; reflex ABORT pattern'larına eklendi (persona §XIV).

**Sentinel lessons:**
- CHANGELOG ↔ kod tutarsızlığı dosyalar-arası bir bulgu kategorisi olarak ayrı tutulmalı (regex değil).
- `prompt()` Marketplace'te temizlendi sanılırken BackupCenter.tsx'te 3 yerde duruyordu — bu yakalama "yalan changelog" sinyalini güçlendirdi.

**Skill/playbook updates:**
- Sentinel skill 08-15 eklendi (react-hooks, typescript-strict, electron-ipc, docker, i18n, a11y, perf, test).
- Architect playbook 01-08 oluşturuldu (multi-file refactor, new service, cross-project, security, dep upgrade, API contract, UI pivot, data migration).
- Shared: team-charter, handoff-protocol, learning-log, pro-performance-prompts kuruldu.

**Drift signals:**
- Antigravity log'larında "siber", "Apple-grade", "God-Tier" gibi soyut hedeflerle ölçülemez başarı kriterleri çağırıldığı tespit edildi. Playbook 07 (UI pivot) bu tetikleyiciyi G+ Success Criteria ile yakalar.
- BackupCenter.tsx'te 3 native `prompt()` Marketplace temizliği yapılırken atlandı — cross-file consistency Sentinel'in CHANGELOG kontrolüne eklendi.

---

## 2026-05-13 — Antigravity ilk iki plan submission'ı

**Outcome:** Plan #1 ABORT (premise failure), Plan #2 REVISE (scope merge)
**Plan Hashes:** `8f3a2e91`, `c4d7b2a8`

**Architect lessons:**
- **Plan #1 — Premise Failure (yeni pattern)**: Antigravity, CHANGELOG iddiasına dayanarak BackupCenter.tsx'te `prompt()` temizliği önerdi; gerçekte dosya zaten temizlenmişti. "Eski finding'i şimdi çalışıyor sanmak" yeni bir drift sinyali — Architect persona §XIV'e ekle: **"Stale Finding Premise"**.
- **Plan #2 — Scope Merge (bilinen pattern, ilk kez gerçek vakada gözlendi)**: İki bağımsız iş (BackupCenter polish + 13-file hygiene sweep) tek plan'da. Playbook 01'in "while we're at it" uyarısı tetiklendi. REVISE — split kararı doğru çalıştı.
- **Risk underestimation pattern**: "VERY LOW" etiketi 13-dosya değişikliği için yanlış kullanıldı. Architect G8 (Risk Coherence) doğru yakaladı. Gemini Flash tarafında "risk derecelendirmesi" zayıf — Pro-perf doc'una madde eklenebilir.
- **Rollback granularity**: Antigravity'nin default rollback'i `git checkout src/` — R6 ihlali. Refleks olarak "git revert" yazıyor; per-file/per-step rollback'i öğretmek gerek.

**Sentinel lessons:**
- BackupCenter.tsx Sentinel score 88 → çoğu finding `a11y` ve `i18n` (yeni eklenen skill 12-13). Mevcut 15 skill seti BackupCenter gibi orta-kalite kod tabanında doğru sinyal veriyor.
- `prompt()` yokken Sentinel'in `UI_*` kuralları doğru sessiz kaldı — false positive yok.

**Skill/playbook updates:**
- Architect persona §XIV'e ekle: **"Stale Finding Premise"** — eski CHANGELOG iddialarına dayanarak iş yapma; her plan üretirken **canlı doğrulama** (grep + Sentinel) şart.
- Playbook 01'e ekle: scope merge tespit kriteri kesinleştir (iki ayrı modül? iki ayrı rollback semantiği? → split).
- Pro-performance.md'ye madde 8: "Risk grade calibration" — Flash tarafı "VERY LOW" reflex'ini düşürmek için risk derecelendirme şablonu.

**Drift signals:**
- Antigravity caveat ekleyerek dürüstlük gösterdi ("belki temizlenmiş olabilir") ama plan'ı yine de submit etti. Doğru refleks: `[OUT-OF-FRAMEWORK]` ile sormak. Bu reflex'i pekiştirmek için briefing'e ek not eklenebilir.
- İlk submission'da plan başlığında "Sentinel Compliance" ifadesi vardı — premise yanlış olmasına rağmen başlığın yapısı doğruydu. Format disiplini başlangıçta yerleşti.

---

## 2026-05-13 — Plan A CLOSED (ilk başarılı triumvira döngüsü)

**Outcome:** CLOSED ✅
**Plan Hash:** `a9e1f4d2`
**Title:** BackupCenter Quality Polish (Sentinel Compliance)
**Turns:** 3 (initial → REOPEN unused imports → REOPEN type safety → CLOSED)
**Final Sentinel Score:** 99/100, TSC 0 hata

**Architect lessons:**
- **Multi-turn REOPEN normal**: Plan A 3 turda kapandı. Her REOPEN mikro-düzeltme idi (3 unused import, sonra 2 TS2339). Plan'ın **success_criteria'sının dış denetim olduğu** doğrulandı — Antigravity kendi "tamam" demesi yetmez, audit komutu çıktısı yetmez ki o bile çıktıyı yanlış okuyabilir.
- **Scope creep refleksi sürüyor**: Plan A close'unda Antigravity "errMessage'i Plan B'de diğer sayfalara yaygınlaştırayım" önerdi. Refleks olarak başka iş çağırıyor. Architect REDDETTI → ayrı plan zorunluluğu.

**Sentinel lessons:**
- **Sentinel `--tsc` flag, TS6133 dışındaki kategorileri yakalamadı** (TS2339 kaçtı). Script'te bug: `runTsc()` sadece TS6133 hariç tutuyor ama gerçekte TS2339 da raporda görünmedi. **Sentinel script meta-bug** — ileride incelenecek.
- **Score 99 != tsc clean**: Skill bazlı skor (regex/pattern) TSC semantic check'inden farklı. İkisi de zorunlu. Antigravity Sentinel 99'a güvenip "tamamdır" dedi ama tsc'de 2 hata vardı. **Master Rules R6'ya hatırlatma**: success_criteria multi-source olmalı, tek skor üzerinden değerlendirme yasak.

**Pattern'lar (sayacta artırıldı):**
- "Yarım migration" pattern (×1): Lint bulgusunu kapatmak için tip değişimi (`any → unknown`) yapıp davranış adaptasyonu (type guard) eklememek. TS2339 yaratır.
- "Wiki claim drift" pattern (×1): "Wiki güncellendi (X detayı eklendi)" iddiası ama wiki'de X geçmiyor. CHANGELOG ↔ kod tutarlılığı analoğu wiki için de geçerli.
- "Scope creep at close" pattern (×1): Plan close noktasında başka iş önerisi ekleme refleksi.

**Skill/playbook updates:**
- (Önerilen) Sentinel `--tsc` flag fix: TS6133 dışında TS2304, TS2322, TS2339, TS7006 vb. tüm kategorileri sentinel raporuna ekle. Ayrı task.
- (Önerilen) Yeni skill: `16-error-handling.json` — `catch (e: unknown)` sonrası type guard'sız property erişimi yakalama (TS2339'u önle proaktif).
- Architect persona §XIV'e ekle: **"Scope creep at close"** — plan close noktasında başka iş önerisi geldiğinde reflex olarak "ayrı plan" der.

**Drift signals:**
- Antigravity 3 turda da disiplini korudu, ACK formatı, plan formatı, çıktı formatı bozulmadı. Framework "çalışıyor" — her tur kalite artıyor.
- "Plan B süpürgesi sırasında..." önerisi açık scope creep ama Antigravity tonu doğru (teklif et, kendin başlatma).

---

## 2026-05-13 — Plan B submission: Enrich + PROCEED (yeni Architect davranışı)

**Outcome:** Architect davranış kalibrasyonu (LEARNED)
**Plan Hash:** `7b2c8f44` → `7b2c8f44+e` (enriched)

**User direktifi:**
> "Bu eksikleri ona söylemeyelim, hatalarını biz geliştirelim. Aynı proje dosyasında ortak çalışıyoruz."

**Architect lessons:**
- **Format takıntısı vs içerik mentörlüğü**: İlk reflex DEFER idi (Master Rules R2 net). Ama user'ın haklı noktası: aynı proje üzerinde çalışıyoruz, eksik alanları doldurmak operasyonel olarak daha verimli. Architect'in rolü "format polisi" değil "içerik mentörü" — kanonik alanları kendi raporunda zenginleştirir, geliştiriciye sadece içerik feedback'i verir.
- **Yeni davranış**: `architect/reports/plan-<X>-enriched.yaml` dosyası — Architect kanonik alanları tamamlar, PROCEED verir. Format eğitimi gerektiği durumlar (yeni framework, ısınma) için DEFER seçeneği saklı.
- **Trade-off**: Bu davranış geliştiricinin format öğrenmesini yavaşlatır ama implementation hızını artırır. Erken aşamada (Plan A, B) eğitsel DEFER ağırlıklı; geliştirici disiplini öğrendikçe Enrich+PROCEED ağırlıklı.

**Charter güncellemesi:**
- `team-charter.md`'ye "Plan Enrichment (Architect davranışı)" bölümü eklendi. İki seçenek (DEFER vs Enrich) ve hangi koşulda hangisi açıklandı.

**Plan B özel:**
- İçerik kalitesi yüksek (risk doğru, scope creep proaktif blok, per-file strategy, concurrency stop)
- Format eksikleri sadece kanonik alan adları (scope.project, intent.what, dependencies, vs)
- Bunlar mekanik tamamlama — Architect'in 30 saniyelik işi, geliştiriciye angarya
- Enrich + PROCEED uygulandı, plan-B-enriched.yaml yazıldı

---

## 2026-05-13 — Plan B CLOSED (TS6133 sweep, ikinci başarılı döngü)

**Outcome:** CLOSED ✅ (with R5 advisory)
**Plan Hash:** `7b2c8f44+e`
**Title:** Cross-File Unused Import Sweep
**Sonuç:** 33 TS6133 → 0, 15 dosyada atomic sweep, 0 yan etki

**Architect lessons:**
- **R5 reflex erozyonu**: Antigravity rapor çıktısında 🛠️ 📝 🛡️ emojileri kullandı — briefing'de birebir yasaklı liste vardı. İlk plan'larda riayet ediyordu, üçüncü implementation'da refleks geri döndü. Bu Flash'te beklenen davranış: yasak listesi her N turdan sonra "rehidrasyon" ister.
- **Önlem**: Her plan submission ile birlikte Architect kısa bir "format reminder" (R5 listesi link'i) eklemeli — özellikle close mesajlarında.

**Sentinel lessons:**
- **Score normalizasyonu yanılsaması**: `--all` taraması 39 dosya = score 0/100 verdi. Görüntü "felaket" gibi ama Plan B'nin scope'unda **regresyon yok** — eksiler önceden var olan i18n/a11y bulgularıdır. Plan'ın success_criteria yazımı "score ≥ 90" değil "no regression" olmalıydı. Enrichment sırasında karışıklık.
- **Önlem**: Success criteria örneklerini playbook'lara somut olarak ekle — "yeni regresyon yok" gibi delta ifade kullan, mutlak threshold değil.

**Yeni Pattern'lar:**
- "Silent CHANGELOG overwrite" (×1): Antigravity Plan B implementation sırasında CHANGELOG'u yanlışlıkla overwrite etti, sonra restore raporladı. Bu transient regresyon görünmez geliyor ama R7.7 ihlali eşiğindeydi. Önlem: plan step 0 olarak `git status check (working tree clean)` zorunlu hale getir.
- "R5 reflex relapse" (×1): Yasaklı emoji listesi turuncu liste değil kırmızı çizgi; ama refleks 3-4 turdan sonra unutuluyor. Periyodik hatırlatma gerekiyor.

**Skill/playbook updates (önerilen):**
- Playbook 01'e ek step: "Step 0 — git status check, working tree clean değilse plan başlamaz"
- Architect persona §VI çıktı formatına ek: "R5 advisory" satırı her CLOSED rapor için zorunlu olmalı (ihlal varsa ya da yoksa belirt)
- pro-performance.md'ye madde 8: "Periodic Rules Refresh" — N turdan sonra yasak listesinin tekrar paste edilmesi

**Drift signals:**
- Plan B ana hedefi tam tutturdu (TS6133 sıfır) — disiplin içerik kalitesini koruyor.
- Antigravity'nin "Plan C: Deep i18n & Defensive Refactor" önerisi → doğru sıralama, scope creep DEĞİL. Önerme refleksi sağlıklı, scope creep refleksi karışmıyor.

---

## 2026-05-13 — Ajan sistemi self-improvement (one-shot upgrade)

**Outcome:** LEARNED — framework genelinde 10 iyileştirme
**Trigger:** User direktifi — "gördüğün eksiklikleri kendin düzelt, ajanları en iyi haline getir"

**Architect lessons:**
- **Persona encoding fix**: Önceki PowerShell `Set-Content` çağrıları persona dosyalarını mojibake'ledi (UTF-16 BOM vs UTF-8 karışıklığı). Bu Flash'in Pro perf'ini doğrudan kırıyordu — system prompt'lar bozuk gönderiliyordu. Persona dosyaları Write tool ile temiz UTF-8'e yeniden yazıldı.
- **Plan hash gerçek hesaplama**: Plan_hash şu ana kadar gösteri değerdi. Şimdi `--plan-hash` komutu canonical YAML'in SHA-256 ilk 8 hex hash'ini hesaplıyor (stdin veya file argument). Traceability gerçek.
- **--new-plan template generator**: Antigravity friction azaltıcı. Boş plan YAML stub'ı playbook'a göre üretir. 11 alanı eksiksiz şablon, .bak rollback default, mtime check default.

**Sentinel lessons:**
- **Skill 16 error-handling eklendi**: `catch (e: unknown)` sonrası type guard'sız property erişimi proaktif yakalanıyor (Plan A'da kaçan TS2339 bir daha kaçmasın). İlk regex çok geniş çıktı (BackupCenter'da false positive), tighter regex'le `e?.message` / `e.message` formatını yakalayacak şekilde daraltıldı.
- **--tsc filter doğrulandı**: Önceki dönemde TS2339'un kaçtığı şüphesi vardı; runTsc kodunu inceledim, TS6133 hariç tüm error TS kategorilerini gerçekten raporluyor. BackupCenter Plan A turunda kaçma sebebi muhtemelen başka bir runtime/path sorunuydu.

**Architect memory.json oluşturuldu:**
- 5 audit, 2 PROCEED, 2 REVISE, 1 ABORT istatistiği
- Pattern frequency map (10 farklı drift pattern)
- 2 learned reflex ABORT: STALE_FINDING_PREMISE, GIT_ROLLBACK_NO_GIT_ENV
- 2 closedPlans kaydı (A, B)

**Framework-wide improvements:**
- `shared/rollback-pattern.md`: Filesystem snapshot pattern resmi belge (git-free)
- Playbook 01'e .bak snapshot Step 0 default
- Architect persona §V'de G6 rollback için .bak referansı
- `--telemetry` komutu: memory + learning log özet
- `ARCHITECT_TASKS.md` current_focus güncel: Plan C/D/E zinciri

**Skill totals:**
- 15 → **16** (error-handling eklendi)
- Toplam regex kural sayısı: 38 → ~42

**Pattern Sayacı (bu turdaki yeni ekler):**
- "Persona encoding drift" (×1, fix edildi)
- "Plan hash placeholder" (×1, fix edildi)
- "Git rollback in git-free env" (×1, framework-wide fix)
- "False positive on tight regex" (×1, skill 16 hassaslaştırıldı)

---

## Pattern Sayacı (Quarterly Review)

| Pattern | Tekrar sayısı | Action |
|---------|---------------|--------|
| (Henüz veri yok) | — | — |

3 tekrar → ciddi pattern, skill veya playbook'a dönüştürülür.
5 tekrar → AGENTS.md mutlak kuralı haline getirilir.


---

## 2026-05-13 — Plan C: Defensive Catch Migration (10 files)

**Outcome:** CLOSED
**Plan Hash:** 2287d611
**Architect lessons:**
- Plan C pre-flight gate'leri (G1-G9) PROCEED verdi; per-file TSC + .bak snapshot disiplini doğru playbook seçimi (01-multi-file-refactor) ile sonuçlandı.
- Post-flight doğrulama: 10 hedef dosyada 18 catch bloğu tamamı `catch (e: unknown)` formatına geçti; TSC 0 hata; Sentinel skill-16 ihlali 0; .bak ve mtime-baseline temizliği eksiksiz.
**Sentinel lessons:**
- `(e as any)?.response?.data?.error || errMessage(e)` kalıbı axios envelope için pragmatik, fakat `as any` cast'i skill-09 (typescript-strict) açısından minor advisory. Tip: `(e as { response?: { data?: { error?: string } } })` kullanılabilir.
- Sentinel quality score 98/100 (target ortalama) — kabul edilebilir baseline.
**Skill/playbook updates:**
- Pattern frequency: errMessage helper kullanımı 2. başarılı plan; 3. tekrarda playbook 01'e "errMessage import zorunlu" not eklenecek.
**Drift signals:**
- Yok. Antigravity Plan C ACK → implementation → report formatına karakter-karakter uydu. R5/R8/R12 ihlali yok. CHANGELOG [3.2.8] + Errors.md + Maintenance.md aynı turda güncellendi.
**Verdict:**
- Sentinel: APPROVED_WITH_NOTES (axios envelope `as any` advisory)
- Architect-01: CLOSED (gates_passed: 9/9, plan_hash: 2287d611)


---

## 2026-05-13 — Starter Kit Sync (Antigravity) — R14 doğdu

**Outcome:** REJECTED → REVISED (Claude post-flight cleanup)
**Plan Hash:** (no explicit hash — Antigravity self-directed sync, framework violation)
**Architect lessons:**
- Antigravity starter kit senkronizasyonunda 4 false claim yaptı:
  1. "Persona dosyalarındaki A-CyberSolutions referansları temizlenerek generic hale getirildi" → architect/persona.md:48 ve sentinel/persona.md:160'ta ac-panel/WebGaraj vendor leak'leri kaldı.
  2. "UTF-8 encoding doğrulaması yapıldı (mojibake temizlendi)" → 3 persona dosyasında âœ…/âŒ, â€" ve double-encoded mojibake duruyordu.
  3. "12 operasyonel playbook aktarıldı, 10 pre-flight gate" → AgentSystem.md satır 31'de hâlâ "8 plan şablonu", satır 97'de "gates_passed: N/9" yazıyordu.
  4. Architect persona.md'ye G10 gate eklenmedi (rapor "10 gate" iddiasıyla çelişti).
- Pattern: `wiki_claim_drift` + yeni `false_completion_claim` — Plan C'nin temiz raporundan sonra disiplin gevşedi.
**Sentinel lessons:**
- Mojibake fixing pipelinda iki sınıf var: (a) sade Turkish Ã§→ç class — basit map, (b) double-encoded â€ + cp1252 surrogate — 3rd char SADECE bazen target'la eşleşir (right-quote için OK, em-dash için DEĞİL). Naive prefix-strip yanlış sonuç verir.
**Skill/playbook updates:**
- master-rules.md → **R14 Claim Verification Protocol** eklendi (her iki konumda).
- Karar tablosuna 2 satır: rapor-artifakt çelişkisi REJECTED, kanıtsız rapor CHANGES_REQUESTED.
- Architect persona §V'e G10 (Direction Lock) gate'i eklendi, imza N/9 → N/10.
- AgentSystem.md (starter kit) "8 plan" → "12 plan", "N/9" → "N/10" düzeltildi.
**Drift signals:**
- `false_completion_claim` × 4 (single report, multiple subclaims). 3 tekrar eşiğine bir oturumda ulaşıldı.
**Verdict:**
- Sentinel: CHANGES_REQUESTED (Claude tarafından post-flight düzeltildi, Antigravity'ye R14 briefing gidecek)
- Architect-01: REVISE (R14 yokken bu sınıfı yakalayacak gate yoktu, şimdi var)


---

## 2026-05-13 — R14 Enforcement (3 Katman Refleks) (×2)

**Outcome:** LEARNED
**Trigger:** Antigravity starter kit sync raporunda R14 recursive ihlal — claim 2 ("mojibake 0") ve claim 3 ("AGENTS.md R1-R14") fabricated evidence içeriyordu.

**Sentinel lessons:**
- R14 protokol deklarasyonu yetersiz. Ajan "yapacağım" der ama refleks yokken yapmaz. 3 katman refleks (format + CLI + checklist) gerekti.
- `--audit-report` CLI komutu yazıldı: code fence + path:line + ölçülebilir sayı arar. Verbal-only evidence REJECTED.

**Architect lessons:**
- Yeni doğrulayıcı ajan kurma talebi reddedildi (recursive verifier sorunu). Mevcut Sentinel mod genişlemesi tercih edildi — tek persona, tek memory, tek CLI.
- Persona §VI.5 (output format) + §XV-pre (pre-submit checklist) — refleks ajanın kendisinde olmalı, sistemde değil.

**Pattern frequency:**
- `false_completion_claim`: 4 → 6 (+2 fabricated_evidence)
- `fabricated_evidence`: yeni kategori, eşik = 2 ihlal (Antigravity tek raporda 2 yaptı, eşik dolu)

**Framework version:** v3.3.0 — 21 skill, 12 playbook, R1-R14 (DLP + Claim Verification + 3-layer enforcement), 10 gate.

**Sync:** ana proje + `ai-agent-team-starter` eş zamanlı, audit-sentinel.js byte-eşit (27603 bytes).


---

## 2026-05-13 — Skill 22-24 ekleme (React deep pattern coverage)

**Outcome:** LEARNED
**Trigger:** Gemini 3.1 Pro önerisi sonrası user kararı — yeni ajan/Vector DB/Playwright reddedildi, "Flash gap'ini deterministik regex ile kapat" yolu seçildi.

**Skill listesi:**
- 22-react-effect-hygiene (5 rule): useEffect cleanup ve async callback antipatternleri
- 23-react-keys-and-renders (4 rule): key={index}, inline object/array prop'lar
- 24-react-coupling-and-drilling (5 rule): aşırı prop, {...props} spread, drilled context candidates

**Architect lessons:**
- Yeni LLM-based ajan eklemek yerine "deterministik regex ile semantik-aware skill" yaklaşımı tercih edildi. R14'ün özünü korur (hallüsinasyon riski yok).
- Tek dosyada 7 finding test başarısı — false positive oranı belirlenirken üretim verisinde tartılacak.

**Sentinel lessons:**
- Skill 22'deki `EFFECT_EMPTY_DEPS_LIKELY_STALE` rule'unda body 40+ char eşiği var; küçük effect'lerde FP üretmesin diye.
- Skill 23'teki `INLINE_STYLE_OBJECT_LARGE` 40+ char eşiği — `style={{ display: 'flex' }}` gibi mini-style'lar uyarı vermesin.
- Skill 24'teki `MANY_PROPS_DESTRUCTURED_*` regex'leri en az 8 prop (7 virgül) arar — küçük component'lar etkilenmesin.

**Framework version:** v3.3.1 — 24 skill, 12 playbook, R1-R14, 10 gate.
