# Gebze Şehir Rehberi — CLAUDE.md

Bu dosya projenin bağlamını, yapısını ve geliştirme kurallarını özetler.
Claude Code bu dosyayı okuyarak projeyi daha iyi anlar.

---

## Proje Özeti

**Gebze Şehir Rehberi** — Kocaeli/Gebze için mobil-first PWA şehir rehberi.
React + Vite ile yazılmış, Vercel'e deploy edilmiş, GitHub'da barındırılmaktadır.

**Repo:** `aksedigitalg/Claude-gebzemapp`
**Branch:** `claude/explain-claude-features-NEvDh`

---

## Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | React 18 + Vite 8 |
| Harita | Leaflet.js + react-leaflet |
| İkonlar | lucide-react |
| PWA | vite-plugin-pwa |
| Auth | Context API + localStorage (simüle SMS OTP) |
| Deploy | Vercel (otomatik, branch push ile) |
| Paket | npm (`legacy-peer-deps=true` — `.npmrc`'de) |

---

## Klasör Yapısı

```
src/
├── main.jsx                  # Giriş noktası, AuthProvider sarmalayıcısı
├── App.jsx                   # Root — onboarding/auth/ana uygulama yönlendirmesi
├── App.css                   # Tüm uygulama stilleri (tek CSS dosyası)
├── index.css                 # Global reset + font
│
├── context/
│   └── AuthContext.jsx       # Auth state, login/logout, OTP simülasyonu
│
├── data/
│   ├── pharmacies.js         # Gebze eczane verisi (6 eczane)
│   └── historicalPlaces.js   # Tarihi yerler verisi (6 yer)
│
└── components/
    ├── auth/
    │   ├── auth.css           # Auth ekranlarına özel stiller
    │   ├── OnboardingScreen.jsx  # İlk açılış, 3 slayt
    │   ├── PhoneScreen.jsx       # Telefon numarası girişi
    │   ├── OTPScreen.jsx         # 6 haneli SMS kodu doğrulama
    │   ├── RegisterScreen.jsx    # Yeni kullanıcı — ad/soyad
    │   └── ResetScreen.jsx       # Şifre sıfırlama (3 adım)
    │
    ├── TopBar.jsx            # Üst logo bar (navigasyonsuz)
    ├── BottomNav.jsx         # Alt navigasyon (4 sekme)
    ├── HomePage.jsx          # Anasayfa
    ├── PharmaciesPage.jsx    # Eczaneler listesi
    ├── HistoricalPage.jsx    # Tarihi yerler listesi
    ├── MapPage.jsx           # Leaflet harita
    ├── SearchPage.jsx        # Global arama
    ├── CategoriesPage.jsx    # Kategori listesi
    └── ProfilePage.jsx       # Profil + çıkış
```

---

## Uygulama Akışı

```
İlk açılış → OnboardingScreen (3 slayt)
    ↓ (bir kez, localStorage'a kaydedilir)
PhoneScreen (telefon numarası)
    ↓
OTPScreen (6 haneli SMS kodu — DEMO: kod ekranda gösterilir)
    ↓
  Yeni kullanıcı → RegisterScreen (ad/soyad)
  Mevcut kullanıcı → Ana Uygulama
    ↓
Ana Uygulama:
  Alt menü: Anasayfa | Arama | Kategoriler | Profil
  İç sayfalar: Eczaneler | Tarihi Yerler | Harita
```

---

## Auth Sistemi Notları

- **SMS OTP gerçek değil** — demo amaçlı simüle edilmiştir.
  Gerçek SMS için Firebase Auth veya Supabase entegre edilebilir.
- `sendOTP(phone)` → 6 haneli rastgele kod üretir, `sessionStorage`'a yazar, kodu döndürür.
- `verifyOTP(phone, code)` → `sessionStorage`'daki kodla karşılaştırır.
- Kullanıcı listesi `localStorage`'da `gebze_users` key'inde tutulur.
- Aktif kullanıcı `localStorage`'da `gebze_user` key'inde tutulur.
- Onboarding durumu `localStorage`'da `gebze_onboarding` key'inde tutulur.

---

## Veri

### Eczaneler (`src/data/pharmacies.js`)
- 6 eczane, her birinde: `id, name, address, phone, hours, onDuty, neighborhood, lat, lng`
- `onDuty: true` olanlar nöbetçi rozeti alır

### Tarihi Yerler (`src/data/historicalPlaces.js`)
- 6 tarihi yer: Çoban Mustafa Paşa Külliyesi, Eskihisar Kalesi, Hannibal Anıtı,
  Hereke Saray Halı Müzesi, Darıca Hayvanat Bahçesi, Gebze Ulu Camii
- Her biri: `id, name, category, description, period, location, emoji, lat, lng, visitHours, entryFee`

---

## Tasarım Kuralları

- **Renk paleti:** Koyu tema, ana arka plan `#0b1120`, kart arka plan `#141f35`
- **Container:** `max-width: 540px`, `padding: 0 24px`, ortalanmış
- **Alt menü:** `position: fixed`, `bottom: 20px`, container içinde, `border-radius: 24px`
- **Aktif nav öğesi:** `background: #3b82f6` (mavi)
- **Pasif nav öğesi:** renk `#475569` (soluk gri)
- **İçerik padding:** Ana içerik `padding-bottom: 110px` (alt menünün üstünde kalması için)

---

## Geliştirme Komutları

```bash
npm run dev          # Geliştirme sunucusu (localhost:5173)
npm run dev -- --host  # Ağa aç (telefon testi için)
npm run build        # Production build
```

---

## Deploy

- Vercel otomatik deploy — `claude/explain-claude-features-NEvDh` branch'ına push yeterli.
- `.npmrc` dosyasında `legacy-peer-deps=true` var — vite-plugin-pwa uyumluluk için zorunlu.

---

## Yapılacaklar / Gelecek Özellikler

- [ ] Gerçek SMS OTP (Firebase Auth veya Supabase)
- [ ] Kullanıcı profil fotoğrafı
- [ ] Favori eczane/yer kaydetme
- [ ] Anlık nöbetçi eczane API entegrasyonu
- [ ] Push notification (nöbetçi değişimi bildirimi)
- [ ] Hava durumu API (OpenWeatherMap)
- [ ] Dil desteği (TR/EN)
