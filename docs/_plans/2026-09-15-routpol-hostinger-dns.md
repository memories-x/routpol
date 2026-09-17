# routpol.com — Hostinger DNS → kendi Plesk VPS

**Model:** Domain Hostinger’da kalır. Uygulama **kendi Plesk sanal sunucunuzda** çalışır.  
**Domain:** `routpol.com`  
**Şu an DNS:** Hostinger parking (`aster/helios.dns-parking.com`) → A `2.57.91.91` (shared; hedef değil)

---

## Sizden gereken (tek kritik değer)

**Plesk VPS genel (public) IPv4** — örn. `x.x.x.x`  
(Plesk → Tools & Settings → IP Addresses, veya sunucu sağlayıcı panelinden.)

SSH / Plesk URL / şifreleri bu dosyaya yazılmaz; operatör sohbette veya güvenli kanalda verir.

---

## Hostinger’da yapılacak (şimdi)

1. [hpanel.hostinger.com](https://hpanel.hostinger.com) → **Domains** → `routpol.com` → **DNS / DNS Zone**
2. Kayıtları şöyle ayarla (Plesk IP = `VPS_IP`):

| Tip | Ad | Değer | TTL |
|-----|-----|--------|-----|
| **A** | `@` | `VPS_IP` | 300 veya Auto |
| **A** | `www` | `VPS_IP` | 300 (veya CNAME → `@`) |
| Eski parking A / yanlış kayıtlar | sil / güncelle | — | — |

3. **Nameserver:** Hostinger DNS kullanmaya devam (`dns-parking` veya Hostinger NS) — yeterli; domain Hostinger’da kalır, sadece A kaydı Plesk’e bakar.  
   İsteğe bağlı ileri adım: NS’leri Plesk’e taşımak (şimdilik gerekmez).

4. Yayılma: genelde 5–60 dk (TTL’e bağlı). Kontrol: `nslookup routpol.com` → `VPS_IP` dönmeli.

---

## Plesk’te yapılacak (DNS yönlendikten sonra / paralel)

1. **Websites & Domains** → Add Domain → `routpol.com` (varsa sadece doğrula)
2. **SSL/TLS** → Let’s Encrypt (HTTP-01; A kaydı doğru olmalı)
3. Node app + Postgres + env (`NEXT_PUBLIC_SITE_URL=https://routpol.com`) — ayrı tur; kod zaten hazır
4. Firewall: 80 / 443 açık

---

## Bu turda ajan

- DNS hedef şablonunu yazar; Hostinger panelinde A kaydını **VPS_IP gelince** birlikte günceller.
- VPS SSH gelmeden Node deploy yapılamaz.

**Durum:** VPS_IP bekleniyor.
