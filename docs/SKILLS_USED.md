# Daftar Skill yang Digunakan (`web-vercel`)

| Skill | Dipakai untuk | Ya/Tidak | Alasan |
| --- | --- | --- | --- |
| `modern-web-guidance` | Pola HTML/CSS modern: `<dialog>` modal instalasi APK, carousel `scroll-snap`, `color-scheme: light dark`, kontras non-teks & `forced-colors`, serta `fetchpriority="high"` untuk LCP | **Ya** | Wajib dipanggil untuk tugas HTML/CSS/JS sisi klien agar mengikuti standar web modern tanpa pola usang. |
| `antislop` | Filter inti anti-slop (mode `during`), larangan *em dash*, larangan klaim/metrik palsu, dan disiplin struktur kode | **Ya** | Menjaga kualitas antarmuka, salinan teks, dan kejujuran data sesuai korpus aplikasi KATARA. |
| `antislop-ui` | Sistem desain Material 3 KATARA, palet warna `KataraPalette`, hierarki tipografi `Nunito` + `Noto Naskh Arabic`, dan batasan dekorasi | **Ya** | Memastikan halaman web terasa identik dengan aplikasi Android KATARA. |
| `antislop-human` | Standar aksesibilitas manusia nyata: rasio kontras >= 7:1 (minimum 4,5:1), kontras elemen UI >= 3:1, navigasi papan ketik, `focus-visible`, dan area sentuh >= 48px | **Ya** | Menjamin kepatuhan WCAG 2.2 AA dan keterbacaan di layar terang maupun gelap. |
| `antislop-copywriting` | Penulisan bahasa Indonesia yang lugas, berfokus pada fakta terverifikasi dari repositori, tanpa *buzzword* AI atau *em dash* | **Ya** | Menghindari klaim hiperbolik, testimoni fiktif, atau statistik unduhan karangan. |
| `antislop-layoutmobile` | Tata letak responsif 320px hingga 1440px, pencegahan *horizontal overflow*, dan bilah unduh mengambang di layar ponsel | **Ya** | Pengunjung utama halaman unduh APK berasal dari perangkat seluler Android. |
| `brainstorming` / `writing-plans` | Penyusunan rencana arsitektur, struktur rute, manajemen risiko, dan kriteria keberterimaan di `docs/PLAN.md` | **Ya** | Memastikan seluruh spesifikasi Tahap 0 hingga Tahap 7 terpetakan sebelum penulisan kode. |
| `test-driven-development` / `verification-before-completion` | Pengujian unit `lib/github.ts`, audit kontras otomatis `lib/tokens.ts`, pemeriksaan aksesibilitas `axe`, dan build produksi | **Ya** | Memastikan seluruh klaim kualitas dibuktikan dengan keluaran pengujian nyata. |
| `chrome-devtools` / `a11y-debugging` / `debug-optimize-lcp` | Audit aksesibilitas, pemeriksaan performa LCP/CLS, dan verifikasi tampilan laman | **Ya** | Digunakan pada tahap verifikasi kualitas (`docs/QA.md`). |
| `firebase-*` / `gcloud` / `flutter-*` / `roblox-*` | Integrasi layanan cloud khusus platform lain | **Tidak** | Proyek `web-vercel` adalah situs statis/ISR Next.js mandiri yang dideploy ke Vercel tanpa ketergantungan runtime pada Firebase atau Flutter. |

## Versi Perkakas Lingkungan Build

- **Node.js**: `v26.12.0`
- **pnpm**: `12.16.1`
- **Git**: `git version 2.56.0.windows.2`
- **GitHub CLI (`gh`)**: Terautentikasi sebagai akun `rynnxz` (`https://github.com/rynnxz`)
