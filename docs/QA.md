# Laporan Jaminan Kualitas & Verifikasi (`docs/QA.md`)

## 1. Pemeriksaan Statis, Tipe & Build Produksi

- **`pnpm lint` & `pnpm typecheck` (`tsc --noEmit`)**: **LULUS (0 galat, 0 peringatan)** dengan konfigurasi TypeScript ketat (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`, `noUnusedLocals: true`, `noUnusedParameters: true`).
- **`pnpm build` (`next build` Next.js 15.5.29)**: **LULUS (14/14 halaman statis/ISR berhasil dibuat)**.

| Rute (`app/`) | Strategi | Ukuran Halaman | First Load JS | Revalidate |
| --- | --- | --- | --- | --- |
| `/` (Beranda) | SSG + ISR | `8,14 kB` | `114 kB` | `1 jam (3600 dtk)` |
| `/download` | SSG + ISR | `2,81 kB` | `109 kB` | `1 jam (3600 dtk)` |
| `/dialek` | SSG Statis | `1,27 kB` | `107 kB` | Statis |
| `/changelog` | SSG + ISR | `1,26 kB` | `104 kB` | `1 jam (3600 dtk)` |
| `/security` | SSG Statis | `1,26 kB` | `104 kB` | Statis |
| `/about` | SSG Statis | `141 B` | `103 kB` | Statis |
| `/privacy` | SSG Statis | `141 B` | `103 kB` | Statis |
| `/opengraph-image` | SSG Statis | `141 B` | `103 kB` | Statis |
| `/manifest.webmanifest` | SSG Statis | `141 B` | `103 kB` | Statis |
| `/sitemap.xml` | SSG Statis | `141 B` | `103 kB` | Statis |
| `/robots.txt` | SSG Statis | `141 B` | `103 kB` | Statis |

- **Anggaran Aset Gambar (`public/screens/` & `public/branding/`)**:
  - Seluruh 6 tangkapan layar aplikasi disimpan dalam format `.webp` dengan dimensi eksplisit `540x1080` dan ukuran berkas antara **45,7 KB hingga 69,5 KB** (jauh di bawah batas anggaran `<= 150 KB` per gambar).
  - Gambar LCP pada Hero (`/screens/01-peta-belajar-light.webp`) menggunakan `fetchpriority="high"` tanpa `loading="lazy"`, sedangkan slide *carousel* di luar tampilan awal menggunakan `loading="lazy"` dan `fetchpriority="low"`.

## 2. Pengujian Otomatis (`pnpm test` / `vitest run`)

Seluruh **3 berkas uji (11 pengujian)** lulus (`0 gagal`):

1. **`tests/tokens.test.ts` (Verifikasi Kontras Matematis WCAG 2.2 AA/AAA)**:
   - Teks utama mode terang (`#221910` di atas `#FFF9EC` / `#FFFFFF`): **16,2:1 hingga 17,4:1 (WCAG AAA)**.
   - Teks sekunder mode terang (`#4A3E2D` di atas `#FFF9EC` / `#FFFFFF`): **8,4:1 hingga 9,0:1 (WCAG AAA)**.
   - Teks utama mode gelap (`#F8F1E3` di atas `#15110C` / `#211B14`): **15,1:1 hingga 16,4:1 (WCAG AAA)**.
   - Teks sekunder mode gelap (`#D8CCB8` di atas `#15110C` / `#211B14`): **10,3:1 hingga 11,2:1 (WCAG AAA)**.
   - Kontras batas komponen non-teks (`outline` `#786954` / `#8C7D68` dan tepi dialek): **>= 3,0:1 hingga 4,9:1 (WCAG 1.4.11)**.
2. **`tests/github.test.ts` (Keamanan Unduhan & Ketahanan API GitHub)**:
   - Menolak URL unduhan yang bukan berasal dari `https://github.com/rynnxz/KATARA/releases/download/`.
   - Mengekstrak checksum `SHA-256` dari `SHA256SUMS.txt` maupun field `digest` (`sha256:...`) GitHub API.
   - Menyanitasi catatan rilis Markdown terhadap injeksi `<script>` dan atribut HTML berbahaya.
   - Beralih otomatis ke `FALLBACK_LATEST_RELEASE` (`v1.1.0`) apabila GitHub API mengembalikan `403 Rate Limit` atau galat jaringan.
3. **`tests/a11y-and-corpus.test.ts` (Audit `axe-core` Seluruh Halaman Prerender & Kejujuran Korpus)**:
   - Memverifikasi 7 halaman prerender (`index.html`, `download.html`, `dialek.html`, `changelog.html`, `about.html`, `privacy.html`, `security.html`) menggunakan **`axe-core`**: **0 pelanggaran WCAG 2.2 AA**.
   - Memastikan setiap halaman memiliki `<html lang="id">`, tepat satu `<h1>`, dan bebas dari karakter *em dash* (`—`).
   - Memastikan angka korpus cocok 100% dengan repositori: `364 + 308 + 308 = 980` kosakata, `30` dialog, `330` kuis, `24` rujukan ilmiah, dan `6` huruf Jawi tambahan (`چ ڠ ڤ ݢ ۏ ڽ`).

## 3. Daftar Periksa Aksesibilitas & Keamanan

- [x] *Skip link* (`Langsung ke konten utama`) muncul saat menerima fokus `Tab`.
- [x] Elemen `<dialog>` natif digunakan untuk modal panduan pemasangan APK (`showModal()`, `closedby="any"` dengan *fallback* klik latar, serta aturan `overscroll-behavior: contain` tanpa mengunci scrollbar `body`).
- [x] *Carousel* tangkapan layar menggunakan CSS `scroll-snap-type: x mandatory`, tombol HTML `<button>` Sebelumnya/Berikutnya sebelum *track*, penanda slide `[aria-current="true"]`, dan pengumuman `aria-live="polite"`.
- [x] Dukungan penuh `@media (prefers-reduced-motion: reduce)` dan `@media (forced-colors: active)`.
- [x] Header keamanan dikonfigurasi di `next.config.ts`: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, dan `X-Frame-Options: DENY`.
