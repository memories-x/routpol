# Sentinel — Quality-Lead Audit Engine

**Konum:** `scripts/audit-sentinel.js`
**Skill'ler:** `knowledge/agents/sentinel/skills/*.json`
**Memory:** `knowledge/agents/sentinel/memory.json`
**Raporlar:** `knowledge/agents/sentinel/reports/`

## Ne İçin Var

Sentinel projenin **kalite-kontrol mentörü**: hangi kuralın ihlal edildiğini söylemekle kalmıyor, *neden önemli*, *nasıl düzeltilir* ve *hangi wiki/AGENTS.md bölümüne bak* diye yönlendiriyor. Skor üretiyor. Diff ve all modunda çalışıyor. Yeni kural eklemek için kod değiştirmek gerekmiyor — skill JSON ekleniyor.

## İki Katmanlı Mimari

Sentinel iki ayaklı çalışır:

1. **Static Engine** (`audit-sentinel.js`) — Deterministik regex + cross-file kontrolleri. Hızlı, ucuz, CI'da çalışır. Bu sayfadaki komutların hepsi bunu çalıştırır.
2. **LLM Auditor** (`knowledge/agents/sentinel/persona.md`) — Semantik / niyet bazlı denetim. Sentinel'in *usta seviyesi* persona'sı; Claude/Antigravity/Cursor'a system prompt olarak verilir. `node scripts/audit-sentinel.js --persona | clip` ile kopyala.

İkisi tamamlayıcı: static engine "şu kod kuralı bozdu" der, LLM auditor "şu kod yanlış soruyu çözmeye çalışıyor" der.

## Skill Kataloğu (27 paket)

| # | Skill | Kapsam | Ana Kurallar |
|---|---|---|---|
| 01 | ui-blocking | panel | prompt/alert/confirm yasak |
| 02 | defensive-frontend | panel | toFixed/array guards |
| 03 | palette-discipline | panel | legacy hex, raw bg |
| 04 | api-contract | any | envelope, port 8080, route order |
| 05 | security | daemon | SSRF, eval, shell inj, missing auth |
| 06 | brand-independence | any | WebGaraj sızıntısı |
| 07 | workflow-hygiene | any | console.log, TODO, debugger, as any |
| 08 | react-hooks | panel | useEffect deps, missing cleanup |
| 09 | typescript-strict | any | `as unknown as`, non-null `!.`, any param |
| 10 | electron-ipc | panel | nodeIntegration, contextIsolation |
| 11 | docker-discipline | daemon | privileged, image latest, bind paths |
| 12 | i18n-completeness | panel | hardcoded JSX strings |
| 13 | accessibility | panel | aria-label, label htmlFor |
| 14 | performance | any | inline object props, wildcard import |
| 15 | test-discipline | daemon | catch logs only, risky module no test |
| **16** | **error-handling** | **any** | **catch (e: unknown) + property access without guard, errMessage usage** |
| **17** | **async-concurrency** | **any** | **floating promise, Promise.all no catch, setState after await, race interval** |
| **18** | **state-management** | **panel** | **derived state, setState in render, context inline object, useState should be useRef** |
| **19** | **logging-discipline** | **any** | **console.log prod, PII/secret in logs, log injection, missing context** |
| **20** | **complexity-budget** | **any** | **deep nesting, long params, big switch, function body too long, nested ternary** |
| **21** | **dead-code** | **any** | **commented blocks, deprecated markers, unused exports, mock leak, empty functions** |
| **22** | **react-effect-hygiene** | **panel** | **async callback in useEffect, missing cleanup, listener/interval leak** |
| **23** | **react-keys-renders** | **panel** | **missing/unstable key prop, inline object/array in JSX** |
| **24** | **react-coupling-drilling** | **panel** | **deep prop chains, excessive prop count, context misuse** |
| **25** | **tone-professionalism** | **any** | **emoji ban, forbidden enthusiasm phrases, praise in comments** |
| **26** | **tdd-compliance** | **any** | **vague test names, mock-over-real, skip markers, empty catch in tests** |
| **27** | **test-regression-tracing** | **any** | **direct err.message, array[0] unguarded, hardcoded timeouts, barrel exports** |

## Komutlar

```bash
# Yüklü skill'leri listele
node scripts/audit-sentinel.js --list-skills

# LLM auditor persona'sını stdout'a bas (Claude/Antigravity/Cursor system prompt'una yapıştır)
node scripts/audit-sentinel.js --persona

# Tek dosya
node scripts/audit-sentinel.js ac-panel/src/pages/Marketplace.tsx

# Glob pattern
node scripts/audit-sentinel.js "ac-panel/src/pages/**/*.tsx"

# Sadece git'de değişen dosyalar
node scripts/audit-sentinel.js --diff

# Tüm panel + daemon, markdown rapor, TS check dahil
node scripts/audit-sentinel.js --all --tsc --report=md

# False positive öğret
node scripts/audit-sentinel.js path/to/file.tsx --learn-fp 42
```

## Çıkış Kodu

- `0` — hiç `error` yok (warn/info olabilir)
- `1` — en az bir `error` bulundu

Pre-commit hook / CI için doğrudan kullanılabilir.

## Skill Mimarisi

Her skill bağımsız JSON dosyası. Yeni kural eklemek isteyince:
1. `knowledge/agents/sentinel/skills/NN-kategori.json` yaz
2. Şemayı [README](../../knowledge/agents/sentinel/skills/README.md)'e göre doldur
3. `--list-skills` ile doğrula

Yüklü 7 skill kümesi: ui-blocking, defensive-frontend, palette-discipline, api-contract, security, brand-independence, workflow-hygiene.

## Cross-File Check'ler

Regex ötesinde, Sentinel dosyalar-arası tutarlılık da kontrol ediyor:

- **CHANGELOG ↔ kod**: `[Removed/Replaced] X` iddiası varsa kodda X aranıyor. Bulunursa `CHANGELOG_INCONSISTENCY` error'ı.

İleride eklenebilir: route ↔ frontend service tutarlılığı, wiki ↔ component tutarlılığı.

## Self-Learning

3 mekanizma:
1. **`falsePositives`** — `--learn-fp` ile işaretlenen `{file, snippet}` çiftleri kalıcı, sonraki taramada atlanır.
2. **`learnedRules`** — Manuel olarak `sentinel_memory.json`'a eklenen kurallar; skill'lerle birlikte yüklenir.
3. **`severityOverrides`** — Skill'i değiştirmeden bir rule'un severity'sini override etmek için: `{ "UNGUARDED_ARRAY_METHOD": "info" }`.

## Skor Sistemi

Başlangıç 100. Penalty:
- `error` = 5 puan
- `warn` = 1 puan
- `info` = 0.25 puan

`>20 dosya` taranıyorsa normalize edilir (büyük taramalar otomatik sıfıra düşmesin diye). Skor `90+` yeşil, `70-89` sarı, `<70` kırmızı.

## Satır-bazlı Ignore

```ts
// sentinel-ignore-next
const debugOnly = prompt('dev fixture');
```

## Pre-commit Hook (örnek)

`.git/hooks/pre-commit`:
```bash
#!/bin/sh
node scripts/audit-sentinel.js --diff || exit 1
```

## Mentor Çıktısı Örneği

```
ERROR 42:18  UI_PROMPT  [ui-blocking]
  Native prompt() is forbidden — blocks the renderer and breaks i18n.
  const path = prompt('Path:');
  → Replace with <Modal> + controlled input state. See ServerSelectModal pattern in Marketplace.tsx.
  ref: docs/wiki/registry.md
```

Sıradan linter "no-alert" derdi. Sentinel **neden** yasak (`blocks renderer + breaks i18n`), **ne ile değiştir** (`Modal pattern`), **örnek nerede** (`Marketplace.tsx`) söylüyor. Mentor.

## Bilinen Sınırlar

- Regex tabanlı — AST anlamıyor. `prompt(` string'i jsdoc içinde varsa yakalar (genelde `allowInComment: false` default'u korur ama % 100 değil).
- TS check sadece `error` (warn yok). `TS6133` (unused) gürültü olarak çıkarıldı.
- Pattern testlerinde lookbehind sınırlı; bazı kuralları daraltırken regex hack'lemek gerekebilir.

## Sonraki Adım

- AST-based plugin (typescript-eslint API) opsiyonel sürüm
- HTML / Tailwind class linter
- Sentinel-CI workflow (GitHub Actions): PR'da otomatik rapor yorumu
- Skill marketplace: paylaşılan skill'leri başka projelerde kullanmak
