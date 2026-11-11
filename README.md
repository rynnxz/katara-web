# KATARA Web (`katara-web`)

Situs web resmi dan pusat unduhan aplikasi Android **KATARA** (`id.katara.app`) untuk belajar bahasa dan budaya Melayu Nusantara (**Melayu Deli**, **Melayu Langkat**, dan **Melayu Palembang**) secara luring (*offline-first*).

## Fitur Utama Situs Web

- **Desain Identik dengan Aplikasi Android**: Menggunakan palet warna `KataraPalette` (Kertas Lontar `#FFF9EC` / Malam Songket `#15110C`, Hijau Rebung `#186B4C`, Kuning Diraja `#F5B700`, Merah Songket `#A62B2B`), tipografi `Nunito` + `Noto Naskh Arabic` (`dir="rtl"`), maskot vektor **Si Rebung**, serta motif geometri *Pucuk Rebung*, *Tampuk Manggis*, dan *Songket Lepus*.
- **Distribusi APK & Modul Aman**: Mengambil data rilis terbaru dari GitHub API (`https://api.github.com/repos/rynnxz/KATARA/releases`) dengan ISR (`revalidate: 3600` detik), memvalidasi daftar putih URL unduhan GitHub Releases, menampilkan checksum `SHA-256` dengan tombol salin + *snackbar*, serta kode QR SVG untuk pengunjung desktop.
- **Transparansi Ilmiah**: Menampilkan statistik nyata dari repositori (980 kosakata terkurasi, 30 dialog, 330 soal kuis, 24 rujukan akademik Balai Bahasa & perguruan tinggi) serta penjelasan jujur lencana validasi **Sumber Kamus**, **Dicek Penutur**, dan **Draf**.
- **Standar Aksesibilitas & Keamanan**: Mematuhi kontras warna WCAG 2.2 AA/AAA (diuji secara otomatis), navigasi papan ketik, `prefers-reduced-motion`, `forced-colors`, serta header keamanan ketat (`Content-Security-Policy`, `HSTS`, `X-Content-Type-Options`, `X-Frame-Options`).

## Menjalankan Secara Lokal

Prasyarat: **Node.js >= 20** dan **pnpm**.

```bash
# 1. Pasang dependensi
pnpm install

# 2. Salin konfigurasi environment opsional
cp .env.example .env.local

# 3. Jalankan server pengembangan
pnpm dev
```

Buka `http://localhost:3000` di peramban Anda.

## Pengujian & Verifikasi Build

```bash
# Pemeriksaan tipe TypeScript strict
pnpm typecheck

# Jalankan unit test (GitHub API parser, kontras warna WCAG, sanitasi XSS, dan axe-core)
pnpm test

# Build produksi Next.js
pnpm build
```

## Deploy ke Vercel (Hobby Plan)

1. Buka dasbor [Vercel](https://vercel.com/new) dan impor repositori GitHub **`rynnxz/katara-web`**.
2. Biarkan pengaturan *Framework Preset* pada **Next.js** (Root Directory: `./`).
3. Atur variabel lingkungan (*Environment Variables*) opsional:
   - `NEXT_PUBLIC_SITE_URL`: URL domain produksi Vercel Anda (misalnya `https://katara-web.vercel.app`).
   - `GITHUB_REPO_OWNER`: `rynnxz`
   - `GITHUB_REPO_NAME`: `KATARA`
   - `GITHUB_TOKEN` *(opsional, server-only)*: Personal Access Token GitHub tanpa scope tulis untuk menaikkan batas *rate limit* API GitHub saat *revalidation*.
   - `NEXT_PUBLIC_GSC_VERIFICATION` *(opsional)*: Kode verifikasi Google Search Console.
4. Klik **Deploy**. Setiap *push* ke cabang `main` akan memicu *deployment* produksi otomatis.
