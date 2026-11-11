# Rencana Arsitektur & Implementasi Web KATARA (`web-vercel`)

## 1. Tujuan Proyek

Membangun situs web resmi sekaligus halaman unduhan produksi untuk aplikasi Android **KATARA** (`id.katara.app`) yang siap dideploy ke **Vercel (Hobby Plan)** dan terhubung ke repositori Git mandiri `https://github.com/rynnxz/katara-web.git`. Situs ini dirancang agar memiliki identitas visual, palet warna, tipografi, maskot (**Si Rebung**), serta kejujuran data ilmiah yang sama persis dengan aplikasi Android KATARA.

## 2. Arsitektur & Tumpukan Teknologi

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript (`strict: true`).
- **Styling**: Tailwind CSS + variabel CSS semantik (`color-scheme: light dark`) yang diturunkan langsung dari `lib/app/theme/katara_colors.dart`.
- **Strategi Rendering**: Static Site Generation (SSG) dengan Incremental Static Regeneration (`revalidate = 3600` detik / 1 jam) pada pengambilan data GitHub Releases (`rynnxz/KATARA`).
- **Minimisasi JavaScript Klien**: Seluruh halaman dirender sebagai React Server Components secara bawaan; Client Components hanya dipakai untuk pulau interaktif kecil:
  1. `HeaderNav` (pengalih tema terang/gelap & laci navigasi seluler).
  2. `AppShowcaseSection` (simulasi *bottom navigation bar* 5 tab bergaya aplikasi KATARA + *carousel* tangkapan layar berbasis CSS `scroll-snap`).
  3. `CopyHashButton` (penyalinan checksum `SHA-256` dan URL unduhan dengan *snackbar* Material 3).
  4. `InstallGuideDialog` (panduan pemasangan APK berbasis elemen `<dialog>` natif).

## 3. Struktur Halaman & Rute

1. **`/` (`app/page.tsx` - Beranda)**:
   - *Hero Section*: Maskot **Si Rebung** (`cheer`/`happy`), pratinjau aplikasi pada perangkat Android, tombol CTA primer unduh APK langsung dari GitHub Release terbaru beserta versi, ukuran berkas, dan lencana terverifikasi `SHA-256`.
   - *Fakta Korpus Terverifikasi*: Menampilkan statistik nyata dari repositori (980 kosakata terkurasi, 30 percakapan kontekstual, 330 soal kuis, 24 rujukan akademik & Balai Bahasa, 6 huruf Jawi tambahan `چ ڠ ڤ ݢ ۏ ڽ`).
   - *Simulasi Antarmuka Aplikasi*: Komponen interaktif dengan *bottom navigation bar* Material 3 (`Belajar`, `Latihan`, `Budaya`, `Misi`, `Profil`) dan galeri layar aplikasi nyata dalam mode terang serta gelap.
   - *Tiga Dialek Melayu*: Kartu Melayu Deli (`#F5B700`, bundel bawaan APK), Melayu Langkat (`#186B4C`, modul unduhan mandiri `71.391 byte`), dan Melayu Palembang (`#8B1E24`, modul unduhan mandiri `74.307 byte`).
   - *Cara Kerja 3 Langkah*: Pilih dialek, pelajari pelajaran singkat 3-5 menit secara luring, dan pantau penguasaan kata serta aksara Jawi.
   - *Keamanan & Privasi*: Penjelasan penyimpanan lokal SQLite (`drift`), sinkronisasi cloud opsional, tanda tangan katalog `Ed25519`, dan verifikasi `SHA-256`.
   - *FAQ*: Menggunakan elemen `<details>` / `<summary>` yang dapat diakses tanpa JavaScript.
2. **`/download` (`app/download/page.tsx` - Pusat Unduhan & Verifikasi)**:
   - Kartu rilis utama (`katara-v1.1.0-release.apk`, ukuran, tanggal rilis, tautan unduh langsung GitHub Releases).
   - Kotak checksum `SHA-256` dengan tombol salin + *snackbar* Material 3 serta perintah verifikasi terminal untuk Windows PowerShell (`Get-FileHash`), macOS (`shasum -a 256`), dan Linux (`sha256sum`).
   - Deteksi/panduan pengunjung desktop: kode QR SVG yang dibuat saat build untuk memindai tautan unduh langsung dari ponsel Android.
   - Daftar unduhan modul dialek mandiri (`module_langkat.zip` dan `module_palembang.zip`) lengkap dengan ukuran byte dan hash `SHA-256`.
   - Panduan pemasangan APK langkah demi langkah (termasuk dialog `<dialog>` interaktif).
   - Persyaratan sistem (`Android 6.0+ / API 24`, ruang penyimpanan `~100 MB`, status iOS & Google Play Store dijelaskan secara jujur).
3. **`/dialek` (`app/dialek/page.tsx` - Eksplorasi 3 Dialek Melayu & Metodologi Validasi)**:
   - Profil mendalam Melayu Deli, Melayu Langkat, dan Melayu Palembang beserta ornamen budaya (*Pucuk Rebung*, *Tampuk Manggis*, *Songket Lepus*).
   - Contoh kosakata nyata, tingkat tutur (*Sari-sari* vs *Bebaso*), contoh aksara Jawi (`dir="rtl"`), ukuran modul, dan penjelasan transparan mengenai lencana **"Sumber Kamus"** (`dictionary_verified`), **"Dicek Penutur"** (`speaker_checked`), serta **"Draf"** (`draft`).
4. **`/changelog` (`app/changelog/page.tsx` - Riwayat Rilis)**:
   - Daftar rilis dari GitHub API `rynnxz/KATARA/releases` dengan catatan perubahan yang telah disanitasi, daftar aset per rilis, dan tautan ke tag GitHub.
5. **`/privacy` (`app/privacy/page.tsx` - Kebijakan Privasi)**:
   - Kebijakan privasi lengkap yang selaras dengan arsitektur aplikasi (`drift` SQLite lokal, Firebase Anonymous/Google Sign-In opsional, tidak ada iklan atau pelacak pihak ketiga).
6. **`/security` (`app/security/page.tsx` - Keamanan & Pelaporan Celah)**:
   - Penjelasan arsitektur keamanan distribusi APK dan modul (`SHA-256`, `Ed25519` public key `57ee50c3b50ecc5775b50a45e6c2d67e3cb03a4a977be93caf156b88cd145466`, daftar putih host GitHub, kebijakan pengungkapan kerentanan selaras `SECURITY.md` dan `/.well-known/security.txt`).
7. **`/about` (`app/about/page.tsx` - Tentang, Riset & 24 Rujukan Ilmiah)**:
   - Latar belakang proyek KATARA (Budaya Go 2026), metodologi kurasi korpus, dan daftar lengkap 24 sumber pustaka (Balai Bahasa Sumut, Balai Bahasa Sumsel, Pusat Bahasa Kemendikbud, USU, UNSRI, UNIMED, UIN Raden Fatah).
8. **Rute Metadata & SEO**:
   - `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/opengraph-image.tsx`, `app/not-found.tsx`, `public/.well-known/security.txt`.

## 4. Mitigasi Risiko

| Risiko | Mitigasi |
| --- | --- |
| *Rate limit* GitHub API (60 req/jam tanpa token) | Menggunakan ISR (`revalidate: 3600`), mendukung `GITHUB_TOKEN` sisi server bila tersedia, dan menyediakan *static fallback* terverifikasi dari rilis `v1.1.0` agar build/render tidak pernah gagal. |
| Kontras warna rendah (teks abu-abu di atas latar krem/hijau muda) | Mengikat seluruh token ke `KataraPalette` (`ink: #221910`, `inkMuted: #4A3E2D`, `primary: #186B4C`) dan memverifikasi semua pasangan warna melalui pengujian otomatis WCAG (>= 7:1 untuk teks utama, >= 4,5:1 minimum, >= 3:1 untuk komponen). |
| Keamanan tautan unduhan & XSS dari catatan rilis | Memvalidasi setiap URL unduhan agar wajib diawali `https://github.com/rynnxz/KATARA/releases/download/`, serta melakukan sanitasi HTML ketat pada catatan rilis Markdown. |
| Batas kuota *bandwidth* Vercel Hobby | Tidak pernah mem-proxy berkas `.apk` atau `.zip` melalui fungsi Vercel; seluruh unduhan diarahkan langsung ke CDN GitHub Releases dengan `rel="noopener"`. |

## 5. Urutan Eksekusi & Kriteria Keberterimaan

1. **Tahap 0**: Dokumentasi `docs/SKILLS_USED.md`, `docs/PLAN.md`, dan pembaruan `.gitignore` serta `docs/DECISIONS.md` di root.
2. **Tahap 1**: Inisialisasi proyek Next.js + TypeScript ketat + Tailwind CSS beserta konfigurasi header keamanan di `next.config.ts`.
3. **Tahap 2**: Implementasi sistem token `lib/tokens.ts`, ilustrasi SVG **Si Rebung** & motif budaya, tangkapan layar aplikasi di `public/screens/`, serta komponen UI Material 3.
4. **Tahap 3**: Implementasi `lib/github.ts`, `lib/qr.ts`, `lib/site.ts`, dan halaman `/download` serta `/changelog`.
5. **Tahap 4**: Implementasi metadata SEO, Open Graph image dinamis, `sitemap.ts`, `robots.ts`, `manifest.ts`, JSON-LD (`lib/schema.ts`), dan `docs/SEO_CHECKLIST.md`.
6. **Tahap 5 & 6**: Pengujian unit (`vitest`), uji rasio kontras otomatis, uji aksesibilitas `axe-core`, pemeriksaan `lint` + `typecheck` + `build`, serta pencatatan hasil di `docs/QA.md`.
7. **Tahap 7**: Inisialisasi Git di `web-vercel/`, *commit* bertahap sesuai Conventional Commits, pemeriksaan kebocoran rahasia, dan `git push -u origin main` ke `https://github.com/rynnxz/katara-web.git`.
