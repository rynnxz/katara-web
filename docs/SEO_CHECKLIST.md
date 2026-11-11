# Daftar Periksa SEO & Indeksasi (`docs/SEO_CHECKLIST.md`)

## 1. Metadata & Struktur Halaman (Selesai Diimplementasikan)

- [x] `<html lang="id">` pada `app/layout.tsx`.
- [x] `title` dan `description` unik pada setiap halaman (`/`, `/download`, `/dialek`, `/changelog`, `/privacy`, `/security`, `/about`).
- [x] URL kanonis (`alternates.canonical`) dan `hreflang` (`id-ID`) diatur melalui `metadataBase` (`NEXT_PUBLIC_SITE_URL`).
- [x] Hierarki heading semantik: tepat satu `<h1>` per halaman, diikuti `<h2>` dan `<h3>` berurutan tanpa loncat level.
- [x] Gambar Open Graph dinamis (`app/opengraph-image.tsx`, 1200x630 PNG) dan kartu Twitter (`summary_large_image`).
- [x] Web App Manifest (`app/manifest.ts` -> `/manifest.webmanifest`) dengan ikon 192x192 dan 512x512.
- [x] Peta situs otomatis (`app/sitemap.ts` -> `/sitemap.xml`) dan aturan perayap (`app/robots.ts` -> `/robots.txt`).
- [x] File keamanan standar RFC 9116 (`public/.well-known/security.txt`).

## 2. Data Terstruktur JSON-LD (`lib/schema.ts`)

- [x] `Organization`: Informasi proyek KATARA, logo, dan tautan repositori GitHub resmi (`rynnxz/KATARA` & `rynnxz/katara-web`).
- [x] `MobileApplication`: Sistem operasi `Android 6.0+`, kategori `EducationalApplication`, harga `0 IDR`, versi rilis dinamis, ukuran byte APK, dan `downloadUrl` langsung ke GitHub Releases. Tidak mencantumkan `aggregateRating` palsu.
- [x] `FAQPage`: Daftar pertanyaan dan jawaban nyata pada beranda.
- [x] `BreadcrumbList`: Jejak navigasi pada halaman `/download`, `/dialek`, `/changelog`, `/privacy`, `/security`, dan `/about`.

## 3. Langkah Manual Pasca-Deploy (Google Search Console & Bing Webmaster)

Setelah situs dideploy ke Vercel:

1. **Google Search Console (GSC)**:
   - Buka [Google Search Console](https://search.google.com/search-console) dan tambahkan properti domain/URL prefix situs Vercel Anda.
   - Pilih metode verifikasi **HTML tag** dan salin nilai `content="..."`.
   - Tambahkan variabel lingkungan `NEXT_PUBLIC_GSC_VERIFICATION=<nilai_token>` di pengaturan proyek Vercel, lalu *redeploy*.
   - Kirimkan URL peta situs: `https://<domain-anda>/sitemap.xml`.
2. **Bing Webmaster Tools**:
   - Buka [Bing Webmaster Tools](https://www.bing.com/webmasters), tambahkan situs, atau impor langsung dari Google Search Console.
   - Bila menggunakan tag meta, isi `NEXT_PUBLIC_BING_VERIFICATION=<nilai_token>` di Vercel.
3. **Pengujian Rich Results**:
   - Uji URL produksi di [Google Rich Results Test](https://search.google.com/test/rich-results) untuk memastikan skema `MobileApplication`, `FAQPage`, dan `BreadcrumbList` terbaca bersih tanpa peringatan.
