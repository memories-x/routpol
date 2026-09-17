# AI Agent Team Entegrasyonu

Kaynak: `C:\Users\memories\Desktop\ai-agent-team-starter`  
Tarih: 2026-08-05  
Durum: **Entegre** (Faz 0 ile uyumlu)

## Neden dahil edildi?

POL-TURK fazlı ve plansız kod istemeyen bir süreçle ilerliyor. Starter kit:

1. **Architect plan gate** — multi-file işten önce scope kilidi  
2. **Sentinel** — UI, i18n, güvenlik, TypeScript skill pack’leri  
3. **Uzman dispatch** — frontend / form API / security için hazır skill’ler  
4. **Charter + invariants** — ürün kurallarını ajanlara bağlayan tek kaynak  

Bu, mevcut `docs/00`–`05` planını bozmaz; üzerine süreç disiplini ekler.

## Ne kopyalandı?

- `AGENTS.md`, `knowledge/`, `scripts/`, `skills/`, `.cursor/`
- `docs/wiki/`, `docs/guides/`
- Şablonlar → doldurulmuş: `PROJECT_CHARTER.md`, `project.invariants.yaml`, `ARCHITECT_TASKS.md`, `guard.config.json`

## Ne korundu?

- Ürün planı: `docs/00-ozet.md` … `docs/05-acik-kararlar.md`
- Kod yok kuralı: `product.code_allowed: false`

## Çalışma kuralı (özet)

```
Operator kararı → Architect plan → PROCEED → Lead Dev (+ uzman) → Sentinel → ship
```

Faz 0’da kod yazılmaz; sadece karar ve doküman.
