# Risk Kaydı

| ID | Risk | Etki | Olasılık | Azaltma | Faz |
|----|------|------|----------|---------|-----|
| R1 | Kanıtsız “resmi onay” iddiası | Yasal / güven | Orta | Yumuşak rozet metni (`04`, `08`) | 0–1 |
| R2 | Danışmanlık ↔ avukatlık karışması | Yasal | Orta | Disclaimer footer + form altı (`09`) | 1 |
| R3 | Form spam | Operasyon | Yüksek | Rate limit + honeypot (`10`) | 1 |
| R4 | WhatsApp numarası yanlış/eksik | Dönüşüm kaybı | Yüksek | Env; yoksa FAB gizle (`16`) | 1 |
| R5 | PL/EN seçici sahte içerik | Güven kaybı | Orta | “Yakında” (`14`) | 1 |
| R6 | Dosya UI “yüklendi” sanılması | KVKK / beklenti | Orta | Açık UI notu (`10`, `16`) | 1 |
| R7 | i18n hardcode borç | Bakım | Yüksek | content/ zorunlu (charter) | 1 |
| R8 | Git yok → versiyon kaybı | Süreç | Yüksek | Git kur (`11`) | 0 |
| R9 | Domain / e-posta gecikmesi | Launch | Orta | Vercel geçici URL ile QA | 1–2 |
| R10 | Performans (ağır hero görsel) | SEO/UX | Orta | next/image, sıkıştırma, LCP bütçesi | 1 |
| R11 | Agent team aşırı süreç | Hız düşüşü | Düşük | Küçük tek dosya işlerde hafif gate | 1 |
| R12 | Kişisel veri e-postasız log | Uyumluluk | Orta | v1 log PII minimize; production’da e-posta/CRM | 1–2 |

## Risk eşiği

**Ship engeli:** R2 metni yok, R3 yok, R4 production’da kırık WA, R6 yanıltıcı upload, build fail.
