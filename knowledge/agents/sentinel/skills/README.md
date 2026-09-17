# Sentinel Skills

Sentinel kurallarÄ± kodda **gÃ¶mÃ¼lÃ¼ deÄŸil**, bu klasÃ¶rdeki JSON dosyalarÄ±nda. Yeni kural eklemek = yeni skill dosyasÄ± yazmak. HiÃ§ kod deÄŸiÅŸtirmiyorsun.

## Skill ÅžemasÄ±

```jsonc
{
  "id": "kebab-case-id",            // benzersiz
  "title": "Ä°nsanca isim",
  "description": "Bu skill ne kontrol eder (1-2 cÃ¼mle)",
  "reference": "AGENTS.md veya docs/wiki/Foo.md",
  "scope": "panel | daemon | website | any",   // ops.
  "ext": [".tsx", ".ts"],                       // ops. â€” hangi uzantÄ±lar
  "rules": [
    {
      "id": "RULE_ID_UPPER",
      "pattern": "regex-as-string",   // backslash kaÃ§Ä±ÅŸÄ±: "\\b"
      "flags": "g",                   // ops., g zorunlu (otomatik eklenir)
      "severity": "error | warn | info",
      "message": "Operator-friendly kÄ±sa mesaj",
      "remediation": "NasÄ±l dÃ¼zeltilir â€” somut adÄ±m, dosya/fonksiyon ismi",
      "reference": "Spesifik wiki linki veya AGENTS.md bÃ¶lÃ¼mÃ¼",
      "scope": "panel | daemon | any",   // ops. â€” rule-bazlÄ± override
      "ext": [".tsx"],                   // ops.
      "allowInComment": false             // ops. â€” true ise yorum iÃ§inde de tetiklenir
    }
  ]
}
```

## Severity Skoru

| Severity | Penalty per finding |
|----------|---------------------|
| error    | 5 puan              |
| warn     | 1 puan              |
| info     | 0.25 puan           |

Toplam puan 100'den dÃ¼ÅŸÃ¼lÃ¼r. >20 dosya taranÄ±yorsa dosya sayÄ±sÄ±na gÃ¶re normalize edilir.

## Mevcut Skill'ler

| # | ID | Kapsam |
|---|----|--------|
| 01 | ui-blocking | Native prompt/alert/confirm yasak |
| 02 | defensive-frontend | toFixed/array guard'sÄ±z eriÅŸim |
| 03 | palette-discipline | Legacy hex renk, raw-hex bg sÄ±nÄ±flarÄ± |
| 04 | api-contract | {success,data,error} envelope, port 8080, route ordering |
| 05 | security | SSRF, eval, shell injection, missing auth |
| 06 | brand-independence | WebGaraj kullanÄ±cÄ± tarafÄ±na sÄ±zmamalÄ± |
| 07 | workflow-hygiene | console.log, TODO, debugger, `as any`, empty catch |

## False Positive Ä°ÅŸaretleme

```bash
node scripts/audit-sentinel.js --learn-fp 42 path/to/file.tsx
```

`knowledge/agents/sentinel/memory.json` iÃ§ine yazÄ±lÄ±r, sonraki taramada bu snippet iÃ§in tetiklenmez.

## SatÄ±r-bazlÄ± Ignore

Bir satÄ±rÄ± tek-seferlik atlatmak iÃ§in bir Ã¼stÃ¼ne yorum at:

```ts
// sentinel-ignore-next: bu prompt sadece dev fixture'Ä±nda
const x = prompt('debug');
```

## Severity Override

Acil bir kural canlÄ±dan kaldÄ±rÄ±lmalÄ±ysa skill dosyasÄ±na dokunmadan:

```jsonc
// knowledge/agents/sentinel/memory.json
{
  "severityOverrides": {
    "UNGUARDED_ARRAY_METHOD": "info"
  }
}
```

## Skill Yazma Rehberi

1. **Tek bir konuya odaklan.** "Defensive coding" 4 rule olur, "her ÅŸey" 40 rule deÄŸil.
2. **Remediation somut olsun.** "DÃ¼zelt" deÄŸil "useToast.error(err.message) Ã§aÄŸÄ±r".
3. **Reference ver.** Operator wiki'ye bakÄ±p Ã¶ÄŸrenebilmeli â€” `docs/wiki/Foo.md` veya `AGENTS.md` bÃ¶lÃ¼m adÄ±.
4. **Severity gerÃ§ekÃ§i olsun.** Ã‡oÄŸu ÅŸey `warn`. Sadece kesinlikle bozar/gÃ¼venlik aÃ§ar ise `error`.
5. **Regex'i kapsayÄ±cÄ± yap ama dar tut.** False positive >5% ise rule'u daralt veya `allowInComment: false` bÄ±rak (default).

## Test

Skill ekledikten sonra:

```bash
node scripts/audit-sentinel.js --list-skills           # yÃ¼klÃ¼ gÃ¶rÃ¼nÃ¼yor mu
node scripts/audit-sentinel.js --all                    # tÃ¼m proje, yeni kural ne yakalÄ±yor
node scripts/audit-sentinel.js --all --report=md        # markdown rapor Ã¼ret
```
