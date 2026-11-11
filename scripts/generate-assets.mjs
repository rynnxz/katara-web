import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = path.resolve(process.cwd(), '..');
const publicBrandingDir = path.resolve(process.cwd(), 'public', 'branding');
const publicScreensDir = path.resolve(process.cwd(), 'public', 'screens');

await fs.mkdir(publicBrandingDir, { recursive: true });
await fs.mkdir(publicScreensDir, { recursive: true });

// 1. Optimize branding icons from ../assets/branding/
const appIconSrc = path.join(rootDir, 'assets', 'branding', 'app_icon_1024.png');
const splashMascotSrc = path.join(rootDir, 'assets', 'branding', 'splash_mascot.png');

await sharp(appIconSrc)
  .resize(512, 512)
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicBrandingDir, 'app_icon_512.png'));

await sharp(appIconSrc)
  .resize(192, 192)
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicBrandingDir, 'app_icon_192.png'));

await sharp(appIconSrc)
  .resize(256, 256)
  .webp({ quality: 90 })
  .toFile(path.join(publicBrandingDir, 'app_icon_256.webp'));

await sharp(splashMascotSrc)
  .resize(320, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 90 })
  .toFile(path.join(publicBrandingDir, 'splash_mascot.webp'));

// 2. Write SVG mascot files matching `lib/app/widgets/mascot_view.dart`
const siRebungCheerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" role="img" aria-label="Si Rebung maskot KATARA">
  <circle cx="100" cy="108" r="84" fill="#F6EEDC" stroke="#786954" stroke-width="3"/>
  <path d="M100 32 Q160 90 148 164 Q100 180 52 164 Q40 90 100 32 Z" fill="#186B4C"/>
  <path d="M50 124 Q84 144 100 172 L52 164 Z" fill="#114D36"/>
  <path d="M150 124 Q116 144 100 172 L148 164 Z" fill="#114D36"/>
  <rect x="62" y="80" width="76" height="60" rx="30" fill="#FFF3D6"/>
  <path d="M48 72 L108 26 L154 68 L148 82 L52 82 Z" fill="#F5B700"/>
  <rect x="52" y="72" width="96" height="11" rx="4" fill="#A62B2B"/>
  <path d="M77 104 A7 6 0 0 1 91 104" fill="none" stroke="#221910" stroke-width="5" stroke-linecap="round"/>
  <path d="M109 104 A7 6 0 0 1 123 104" fill="none" stroke="#221910" stroke-width="5" stroke-linecap="round"/>
  <path d="M88 118 Q100 130 112 118" fill="none" stroke="#221910" stroke-width="5" stroke-linecap="round"/>
  <circle cx="28" cy="52" r="8" fill="#F5B700"/>
  <circle cx="172" cy="48" r="9" fill="#F5B700"/>
</svg>`;

await fs.writeFile(path.join(publicBrandingDir, 'si-rebung-cheer.svg'), siRebungCheerSvg, 'utf8');

// 3. Render 6 authentic 540x1080 WebP app screens representing the real KATARA Android screens
function escapeXml(str) {
  return String(str).replace(/&(?!amp;|quot;|lt;|gt;|apos;)/g, '&amp;');
}

function wrapPhoneScreenSvg({
  dark = false,
  topStatusRight = '100% Luring',
  headerTitle,
  headerSub,
  accentHex = '#186B4C',
  bodySvg,
  activeNavIndex = 0,
}) {
  headerTitle = escapeXml(headerTitle);
  headerSub = escapeXml(headerSub);
  const bg = dark ? '#15110C' : '#FFF9EC';
  const surface = dark ? '#211B14' : '#FFFFFF';
  const surfaceAlt = dark ? '#2C241A' : '#F6EEDC';
  const ink = dark ? '#F8F1E3' : '#221910';
  const inkMuted = dark ? '#D8CCB8' : '#4A3E2D';
  const outline = dark ? '#8C7D68' : '#786954';
  const primary = dark ? '#3FBF8A' : '#186B4C';
  const primaryContainer = dark ? '#132E23' : '#E2F5EC';
  const onPrimaryContainer = dark ? '#CFFAE6' : '#0D3B29';

  const navItems = ['Belajar', 'Latihan', 'Budaya', 'Misi', 'Profil'];
  const navSvg = navItems
    .map((label, idx) => {
      const x = 18 + idx * 102;
      const isSelected = idx === activeNavIndex;
      return `
        <g transform="translate(${x}, 994)">
          ${
            isSelected
              ? `<rect x="8" y="0" width="84" height="36" rx="18" fill="${primaryContainer}" stroke="${primary}" stroke-width="1.5"/>`
              : ''
          }
          <circle cx="50" cy="18" r="7" fill="${isSelected ? onPrimaryContainer : inkMuted}"/>
          <text x="50" y="54" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="${
            isSelected ? '800' : '600'
          }" fill="${isSelected ? ink : inkMuted}">${label}</text>
        </g>
      `;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 1080" width="540" height="1080">
    <rect width="540" height="1080" fill="${bg}"/>
    <!-- Subtle Pucuk Rebung Geometric Top Ornament -->
    <g stroke="${accentHex}" stroke-opacity="${dark ? '0.16' : '0.10'}" stroke-width="1.5" fill="none">
      <polygon points="60,60 90,115 30,115"/>
      <polygon points="150,60 180,115 120,115"/>
      <polygon points="240,60 270,115 210,115"/>
      <polygon points="330,60 360,115 300,115"/>
      <polygon points="420,60 450,115 390,115"/>
      <polygon points="510,60 540,115 480,115"/>
    </g>

    <!-- Android Status Bar -->
    <rect x="0" y="0" width="540" height="44" fill="${surfaceAlt}"/>
    <text x="28" y="28" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="${ink}">09:41 • KATARA</text>
    <text x="512" y="28" text-anchor="end" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="${primary}">${topStatusRight}</text>

    <!-- App Header Card -->
    <rect x="20" y="58" width="500" height="96" rx="24" fill="${surface}" stroke="${outline}" stroke-width="2"/>
    <rect x="20" y="62" width="500" height="96" rx="24" fill="none" stroke="${outline}" stroke-width="2"/>
    <text x="44" y="100" font-family="Arial, sans-serif" font-size="23" font-weight="800" fill="${ink}">${headerTitle}</text>
    <text x="44" y="130" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">${headerSub}</text>

    <!-- Screen Body -->
    ${bodySvg({ bg, surface, surfaceAlt, ink, inkMuted, outline, primary, primaryContainer, onPrimaryContainer })}

    <!-- Bottom Navigation Bar (Material 3 NavigationBar) -->
    <rect x="0" y="978" width="540" height="102" fill="${surface}"/>
    <line x1="0" y1="978" x2="540" y2="978" stroke="${outline}" stroke-width="2"/>
    ${navSvg}
  </svg>`;
}

const screens = [
  {
    filename: '01-peta-belajar-light.webp',
    svg: wrapPhoneScreenSvg({
      dark: false,
      headerTitle: 'Melayu Deli • Peta Belajar',
      headerSub: 'Medan &amp; Deli Serdang • 16 Unit • 64 Pelajaran',
      accentHex: '#F5B700',
      activeNavIndex: 0,
      bodySvg: ({ surface, surfaceAlt, ink, inkMuted, outline, primary, primaryContainer, onPrimaryContainer }) => `
        <!-- Gamification Stats Row -->
        <g transform="translate(20, 172)">
          <rect x="0" y="0" width="156" height="58" rx="18" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="78" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="${inkMuted}">RENTETAN HARI</text>
          <text x="78" y="47" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#B84A00">7 Hari Aktif</text>

          <rect x="172" y="0" width="156" height="58" rx="18" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="250" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="${inkMuted}">TOTAL XP</text>
          <text x="250" y="47" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="${primary}">420 XP</text>

          <rect x="344" y="0" width="156" height="58" rx="18" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="422" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="${inkMuted}">MODE LEVEL 1</text>
          <text x="422" y="47" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#1B6B3A">Nyawa Bebas</text>
        </g>

        <!-- Unit 1 Banner -->
        <g transform="translate(20, 250)">
          <rect x="0" y="0" width="500" height="114" rx="24" fill="${primaryContainer}" stroke="${primary}" stroke-width="2.5"/>
          <text x="26" y="36" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="${onPrimaryContainer}">UNIT 1 • TINGKAT DASAR</text>
          <text x="26" y="66" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="${ink}">Sapaan &amp; Perkenalan Melayu Deli</text>
          <text x="26" y="94" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">Ape kabo, Atok, Uwak, Yong, Ngah • 4/4 Pelajaran</text>
        </g>

        <!-- Lesson Nodes Path -->
        <g transform="translate(20, 386)">
          <rect x="0" y="0" width="500" height="390" rx="24" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <line x1="250" y1="64" x2="180" y2="156" stroke="${primary}" stroke-width="6"/>
          <line x1="180" y1="156" x2="290" y2="248" stroke="${primary}" stroke-width="6"/>
          <line x1="290" y1="248" x2="230" y2="332" stroke="${outline}" stroke-width="4" stroke-dasharray="8 6"/>

          <circle cx="250" cy="64" r="34" fill="${primary}" stroke="#114D36" stroke-width="4"/>
          <text x="250" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">1.1 ★3</text>
          <text x="304" y="70" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="${ink}">Sapaan Harian</text>

          <circle cx="180" cy="156" r="34" fill="${primary}" stroke="#114D36" stroke-width="4"/>
          <text x="180" y="162" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">1.2 ★3</text>
          <text x="234" y="162" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="${ink}">Keluarga &amp; Sapaan</text>

          <circle cx="290" cy="248" r="38" fill="#F5B700" stroke="#7A5700" stroke-width="4"/>
          <text x="290" y="254" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#221910">MULAI</text>
          <text x="64" y="254" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="${ink}">1.3 Bertamu Sopan</text>

          <circle cx="230" cy="332" r="30" fill="${surfaceAlt}" stroke="${outline}" stroke-width="3"/>
          <text x="230" y="338" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="${inkMuted}">1.4</text>
          <text x="278" y="338" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="${inkMuted}">Ulasan Unit 1</text>
        </g>

        <!-- Dictionary & Dialect Comparison Quick Card -->
        <g transform="translate(20, 796)">
          <rect x="0" y="0" width="500" height="156" rx="24" fill="${surfaceAlt}" stroke="${outline}" stroke-width="2"/>
          <text x="28" y="42" font-family="Arial, sans-serif" font-size="19" font-weight="800" fill="${ink}">Kamus &amp; Bandingkan 3 Dialek</text>
          <text x="28" y="72" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">364 kata Melayu Deli • Lencana Sumber Kamus &amp; Dicek Penutur</text>
          <rect x="28" y="94" width="212" height="44" rx="14" fill="${primary}"/>
          <text x="134" y="122" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF">Buka Kamus Luring</text>
          <rect x="256" y="94" width="216" height="44" rx="14" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="364" y="122" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="800" fill="${ink}">Aksara Jawi (6 Huruf)</text>
        </g>
      `,
    }),
  },
  {
    filename: '02-latihan-kuis-light.webp',
    svg: wrapPhoneScreenSvg({
      dark: false,
      headerTitle: 'Latihan 1.3 • Pilihan Ganda & Konteks',
      headerSub: 'Soal 4 dari 8 • Nyawa Level 1 Tidak Berkurang',
      accentHex: '#186B4C',
      activeNavIndex: 1,
      bodySvg: ({ surface, surfaceAlt, ink, inkMuted, outline, primary, primaryContainer, onPrimaryContainer }) => `
        <!-- Progress Bar -->
        <rect x="20" y="172" width="500" height="18" rx="9" fill="${surfaceAlt}" stroke="${outline}" stroke-width="1.5"/>
        <rect x="20" y="172" width="280" height="18" rx="9" fill="${primary}"/>

        <!-- Question Card with Validation Badge -->
        <g transform="translate(20, 210)">
          <rect x="0" y="0" width="500" height="224" rx="24" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <rect x="24" y="22" width="156" height="32" rx="16" fill="#DCF5E4" stroke="#1B6B3A" stroke-width="1.5"/>
          <text x="102" y="43" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#0F3D22">✓ Dicek Penutur</text>
          <rect x="192" y="22" width="110" height="32" rx="16" fill="${surfaceAlt}" stroke="${outline}" stroke-width="1.5"/>
          <text x="247" y="43" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="${ink}">SRC-0002</text>

          <text x="24" y="92" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="${inkMuted}">Pilih arti ungkapan Melayu Deli berikut:</text>
          <text x="24" y="138" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="${ink}">&quot;Ape kabo, Wak?&quot;</text>
          <text x="24" y="174" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="${inkMuted}">Lafal: [a-pə ka-bo wak] • Ragam: Sapaan Hormat / Akrab</text>
          <text x="476" y="138" text-anchor="end" font-family="serif" font-size="28" font-weight="700" fill="${primary}">اڤ کابو، واق؟</text>
        </g>

        <!-- 3D Option Cards -->
        <g transform="translate(20, 454)">
          <rect x="0" y="0" width="500" height="78" rx="20" fill="${primaryContainer}" stroke="${primary}" stroke-width="3"/>
          <text x="28" y="46" font-family="Arial, sans-serif" font-size="19" font-weight="800" fill="${onPrimaryContainer}">A. Apa kabar, Paman/Bibi (Uwak)?</text>

          <rect x="0" y="96" width="500" height="78" rx="20" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="28" y="142" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="${ink}">B. Mau pergi ke mana pagi ini?</text>

          <rect x="0" y="192" width="500" height="78" rx="20" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="28" y="238" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="${ink}">C. Silakan duduk di serambi depan</text>
        </g>

        <!-- Feedback Bottom Banner -->
        <g transform="translate(20, 748)">
          <rect x="0" y="0" width="500" height="206" rx="24" fill="#DCF5E4" stroke="#1B6B3A" stroke-width="2.5"/>
          <text x="28" y="44" font-family="Arial, sans-serif" font-size="21" font-weight="800" fill="#0F3D22">Mantap! Jawaban Benar (+15 XP)</text>
          <text x="28" y="78" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="#0F3D22">Dalam Melayu Deli, vokal akhir /-a/ pada &quot;apa&quot; melemah</text>
          <text x="28" y="102" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="#0F3D22">menjadi pepet /-e/ (&quot;ape&quot;), dan &quot;Uwak/Wak&quot; dipakai untuk</text>
          <text x="28" y="126" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="#0F3D22">menyapa kakak dari ayah atau ibu dengan hormat.</text>
          <rect x="28" y="144" width="444" height="46" rx="16" fill="#186B4C"/>
          <text x="250" y="173" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="#FFFFFF">LANJUTKAN LATIHAN</text>
        </g>
      `,
    }),
  },
  {
    filename: '03-kamus-jawi-light.webp',
    svg: wrapPhoneScreenSvg({
      dark: false,
      headerTitle: 'Kamus &amp; Aksara Jawi Nusantara',
      headerSub: '980 Kosakata Terkurasi • 6 Huruf Jawi Tambahan',
      accentHex: '#186B4C',
      activeNavIndex: 2,
      bodySvg: ({ surface, surfaceAlt, ink, inkMuted, outline, primary, primaryContainer, onPrimaryContainer }) => `
        <!-- 6 Jawi Letters Grid -->
        <g transform="translate(20, 172)">
          <rect x="0" y="0" width="500" height="236" rx="24" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="24" y="38" font-family="Arial, sans-serif" font-size="19" font-weight="800" fill="${ink}">6 Huruf Tambahan Aksara Jawi (dir=&quot;rtl&quot;)</text>
          <text x="24" y="64" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="${inkMuted}">Huruf Arab-Melayu untuk bunyi khas fonem Nusantara</text>

          ${[
            { g: 'چ', n: 'Ca [c]', ex: 'cakap' },
            { g: 'ڠ', n: 'Nga [ng]', ex: 'bunga' },
            { g: 'ڤ', n: 'Pa [p]', ex: 'pinggan' },
            { g: 'ݢ', n: 'Ga [g]', ex: 'gulai' },
            { g: 'ۏ', n: 'Va [v]', ex: 'vitamin' },
            { g: 'ڽ', n: 'Nya [ny]', ex: 'nyamuk' },
          ]
            .map((item, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              const x = 22 + col * 156;
              const y = 82 + row * 72;
              return `
                <rect x="${x}" y="${y}" width="144" height="62" rx="16" fill="${primaryContainer}" stroke="${primary}" stroke-width="1.5"/>
                <text x="${x + 30}" y="${y + 42}" text-anchor="middle" font-family="serif" font-size="30" font-weight="700" fill="${onPrimaryContainer}">${item.g}</text>
                <text x="${x + 62}" y="${y + 28}" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="${ink}">${item.n}</text>
                <text x="${x + 62}" y="${y + 48}" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="${inkMuted}">${item.ex}</text>
              `;
            })
            .join('')}
        </g>

        <!-- Dictionary Entries with Honest Validation Badges -->
        <g transform="translate(20, 428)">
          <rect x="0" y="0" width="500" height="162" rx="24" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="24" y="42" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="${ink}">pinggan</text>
          <text x="476" y="44" text-anchor="end" font-family="serif" font-size="26" font-weight="700" fill="${primary}">ڤيڠݢن</text>
          <text x="24" y="72" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="${ink}">piring makan besar (Melayu Deli &amp; Langkat)</text>
          <rect x="24" y="96" width="164" height="34" rx="17" fill="#FFF0BD" stroke="#7A5700" stroke-width="1.5"/>
          <text x="106" y="118" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#221910">Sumber Kamus</text>
          <text x="204" y="118" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="${inkMuted}">Kamus Melayu Deli 1985 (SRC-0002)</text>
        </g>

        <g transform="translate(20, 608)">
          <rect x="0" y="0" width="500" height="162" rx="24" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="24" y="42" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="${ink}">lemak nian</text>
          <text x="476" y="42" text-anchor="end" font-family="Arial, sans-serif" font-size="15" font-weight="800" fill="#8B1E24">Melayu Palembang</text>
          <text x="24" y="72" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="${ink}">enak sekali / nyaman sekali (Ragam Sari-sari)</text>
          <rect x="24" y="96" width="164" height="34" rx="17" fill="#FFF0BD" stroke="#7A5700" stroke-width="1.5"/>
          <text x="106" y="118" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#221910">Sumber Kamus</text>
          <text x="204" y="118" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="${inkMuted}">Balai Bahasa Sumsel 2016 (SRC-PLG-0001)</text>
        </g>

        <g transform="translate(20, 788)">
          <rect x="0" y="0" width="500" height="164" rx="24" fill="${surfaceAlt}" stroke="${outline}" stroke-width="2"/>
          <text x="24" y="42" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="${ink}">seluar</text>
          <text x="24" y="72" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="${ink}">celana panjang (ragam baku, menunggu tinjauan lisan Deli)</text>
          <rect x="24" y="96" width="184" height="34" rx="17" fill="${surface}" stroke="${outline}" stroke-width="1.5"/>
          <text x="116" y="118" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="${ink}">Draf • Perlu Tinjauan</text>
          <text x="224" y="118" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="${inkMuted}">Transparansi Validasi Ilmiah</text>
        </g>
      `,
    }),
  },
  {
    filename: '04-pilih-dialek-light.webp',
    svg: wrapPhoneScreenSvg({
      dark: false,
      headerTitle: 'Pilih Daerah &amp; Modul Dialek',
      headerSub: 'Pendekatan A • APK Utama Ramping + Modul Mandiri',
      accentHex: '#186B4C',
      activeNavIndex: 4,
      bodySvg: ({ surface, ink, inkMuted, outline, primary }) => `
        <!-- Melayu Deli Card (Bundled) -->
        <g transform="translate(20, 172)">
          <rect x="0" y="0" width="500" height="236" rx="24" fill="#FFF4CC" stroke="#7A5700" stroke-width="2.5"/>
          <text x="26" y="40" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#3B2800">AKTIF • BUNDEL BAWAAN APK (0 KB UNDUHAN)</text>
          <text x="26" y="74" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#221910">Bahasa Melayu Deli</text>
          <text x="26" y="102" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="#3B2800">Medan, Labuhan Deli &amp; Deli Serdang • Motif Pucuk Rebung</text>
          <text x="26" y="134" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#221910">364 Kata • 10 Dialog • 110 Kuis • 12 Rujukan • Aksara Jawi</text>
          <rect x="26" y="158" width="448" height="50" rx="16" fill="#186B4C"/>
          <text x="250" y="190" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">SIAP DIPELAJARI TANPA INTERNET</text>
        </g>

        <!-- Melayu Langkat Card (Downloadable ZIP) -->
        <g transform="translate(20, 428)">
          <rect x="0" y="0" width="500" height="248" rx="24" fill="${surface}" stroke="${primary}" stroke-width="2.5"/>
          <text x="26" y="40" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#0C3D2A">MODUL UNDUHAN MANDIRI • 71.391 BYTE (~69,7 KB)</text>
          <text x="26" y="74" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="${ink}">Bahasa Melayu Langkat</text>
          <text x="26" y="102" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">Tanjung Pura, Stabat &amp; Pesisir Langkat • Motif Tampuk Manggis</text>
          <text x="26" y="132" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="${ink}">308 Kata • 10 Dialog • 110 Kuis • 6 Rujukan • Sumber Kamus</text>
          <text x="26" y="158" font-family="monospace" font-size="12" font-weight="700" fill="${inkMuted}">SHA-256: 3ed866afaeb72c1354d4927e651ca9c7...</text>
          <rect x="26" y="176" width="448" height="48" rx="16" fill="#DFF5EB" stroke="${primary}" stroke-width="2"/>
          <text x="250" y="206" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#0C3D2A">UNDUH MODUL LANGKAT (69,7 KB)</text>
        </g>

        <!-- Melayu Palembang Card (Downloadable ZIP) -->
        <g transform="translate(20, 696)">
          <rect x="0" y="0" width="500" height="256" rx="24" fill="${surface}" stroke="#8B1E24" stroke-width="2.5"/>
          <text x="26" y="40" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#4F0D11">MODUL UNDUHAN MANDIRI • 74.307 BYTE (~72,6 KB)</text>
          <text x="26" y="74" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="${ink}">Bahasa Melayu Palembang</text>
          <text x="26" y="102" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">Seberang Ilir, Seberang Ulu &amp; Musi • Bebaso &amp; Sari-sari</text>
          <text x="26" y="132" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="${ink}">308 Kata • 10 Dialog • 110 Kuis • 6 Rujukan • Sumber Kamus</text>
          <text x="26" y="158" font-family="monospace" font-size="12" font-weight="700" fill="${inkMuted}">SHA-256: f75c27e1f28c06bece0cfe5a6deea6f4...</text>
          <rect x="26" y="178" width="448" height="48" rx="16" fill="#FCE8E9" stroke="#8B1E24" stroke-width="2"/>
          <text x="250" y="208" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#4F0D11">UNDUH MODUL PALEMBANG (72,6 KB)</text>
        </g>
      `,
    }),
  },
  {
    filename: '05-ruang-budaya-light.webp',
    svg: wrapPhoneScreenSvg({
      dark: false,
      headerTitle: 'Ruang Budaya &amp; Sastra Melayu',
      headerSub: 'Artikel Sejarah, Pantun Telangkai &amp; Koleksi Kartu',
      accentHex: '#A62B2B',
      activeNavIndex: 2,
      bodySvg: ({ surface, surfaceAlt, ink, inkMuted, outline, primary, primaryContainer, onPrimaryContainer }) => `
        <!-- Pantun Card -->
        <g transform="translate(20, 172)">
          <rect x="0" y="0" width="500" height="250" rx="24" fill="${primaryContainer}" stroke="${primary}" stroke-width="2.5"/>
          <text x="26" y="40" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="${onPrimaryContainer}">SASTRA LISAN • PANTUN NASEHAT MELAYU DELI</text>
          <text x="26" y="82" font-family="Arial, sans-serif" font-size="18" font-weight="700" font-style="italic" fill="${ink}">&quot;Pulau Pandan jauh di tengah,</text>
          <text x="26" y="110" font-family="Arial, sans-serif" font-size="18" font-weight="700" font-style="italic" fill="${ink}">Gunung Daik bercabang tiga;</text>
          <text x="26" y="142" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="${onPrimaryContainer}">Hancur badan dikandung tanah,</text>
          <text x="26" y="170" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="${onPrimaryContainer}">Budi yang baik dikenang juga.&quot;</text>
          <text x="26" y="214" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="${inkMuted}">Sumber: Tradisi Telangkai &amp; Sastra Melayu (SRC-0008)</text>
        </g>

        <!-- Cultural Cards -->
        <g transform="translate(20, 444)">
          <rect x="0" y="0" width="500" height="156" rx="24" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="26" y="40" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#7A5700">MELAYU DELI • WARISAN ARSITEKTUR</text>
          <text x="26" y="72" font-family="Arial, sans-serif" font-size="21" font-weight="800" fill="${ink}">Istana Maimun &amp; Masjid Raya Al-Mashun</text>
          <text x="26" y="102" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">Perpaduan ornamen Pucuk Rebung Melayu, Timur Tengah, dan</text>
          <text x="26" y="126" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">Eropa pada pusat sejarah Kesultanan Deli di Kota Medan.</text>
        </g>

        <g transform="translate(20, 620)">
          <rect x="0" y="0" width="500" height="156" rx="24" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="26" y="40" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="${primary}">MELAYU LANGKAT • KULINER TRADISIONAL</text>
          <text x="26" y="72" font-family="Arial, sans-serif" font-size="21" font-weight="800" fill="${ink}">Halua Langkat &amp; Adat Tepung Tawar</text>
          <text x="26" y="102" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">Manisan buah pepaya, cabai, dan kundur khas Tanjung Pura</text>
          <text x="26" y="126" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">yang diwariskan lintas generasi (WBTb SRC-LK-0005).</text>
        </g>

        <g transform="translate(20, 796)">
          <rect x="0" y="0" width="500" height="156" rx="24" fill="${surfaceAlt}" stroke="${outline}" stroke-width="2"/>
          <text x="26" y="40" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#8B1E24">MELAYU PALEMBANG • TATA KRAMA &amp; WASTRA</text>
          <text x="26" y="72" font-family="Arial, sans-serif" font-size="21" font-weight="800" fill="${ink}">Rumah Limas, Songket Lepus &amp; Ngobeng</text>
          <text x="26" y="102" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">Filosofi tingkatan Kekijing Rumah Limas serta diglosia</text>
          <text x="26" y="126" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">tutur santun Bebaso (Alus) dan Sari-sari di tepian Musi.</text>
        </g>
      `,
    }),
  },
  {
    filename: '06-mode-gelap-dark.webp',
    svg: wrapPhoneScreenSvg({
      dark: true,
      topStatusRight: 'Mode Gelap AA+',
      headerTitle: 'Misi Harian &amp; Profil Belajar',
      headerSub: 'Tema Malam Songket (#15110C) • Kontras >= 11:1',
      accentHex: '#3FBF8A',
      activeNavIndex: 3,
      bodySvg: ({ surface, surfaceAlt, ink, inkMuted, outline, primary, primaryContainer, onPrimaryContainer }) => `
        <!-- Daily Quests Card -->
        <g transform="translate(20, 172)">
          <rect x="0" y="0" width="500" height="276" rx="24" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="26" y="42" font-family="Arial, sans-serif" font-size="21" font-weight="800" fill="${ink}">Misi Harian Si Rebung</text>
          <text x="26" y="70" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">Selesaikan target harian untuk mengumpulkan Koin Diraja</text>

          <rect x="26" y="92" width="448" height="72" rx="16" fill="${primaryContainer}" stroke="${primary}" stroke-width="1.5"/>
          <text x="46" y="124" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="${onPrimaryContainer}">✓ Selesaikan 2 Pelajaran Dialek (2/2)</text>
          <text x="46" y="148" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="${inkMuted}">Hadiah: +25 Koin • Selesai</text>

          <rect x="26" y="180" width="448" height="72" rx="16" fill="${surfaceAlt}" stroke="${outline}" stroke-width="1.5"/>
          <text x="46" y="212" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="${ink}">Latih 10 Kosakata Lemah di Ruang Ulasan (7/10)</text>
          <text x="46" y="236" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="${inkMuted}">Hadiah: +30 XP • 3 kata lagi</text>
        </g>

        <!-- Offline SQLite + Optional Cloud Sync Card -->
        <g transform="translate(20, 470)">
          <rect x="0" y="0" width="500" height="236" rx="24" fill="${surface}" stroke="${outline}" stroke-width="2"/>
          <text x="26" y="42" font-family="Arial, sans-serif" font-size="21" font-weight="800" fill="${ink}">Penyimpanan Luring &amp; Keamanan Data</text>
          <text x="26" y="74" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">• Database SQLite lokal (drift) bekerja 100% tanpa sinyal.</text>
          <text x="26" y="102" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">• Cadangan Cloud opsional dengan penggabungan cerdas</text>
          <text x="26" y="126" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">  (max stars, max best_score, union xp_events).</text>
          <text x="26" y="154" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">• Tanpa iklan, tanpa pelacak analitik pihak ketiga.</text>
          <rect x="26" y="174" width="448" height="44" rx="14" fill="#3D2E05" stroke="#FFC933" stroke-width="1.5"/>
          <text x="250" y="202" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="800" fill="#FFE799">Katalog Modul Terverifikasi Ed25519 &amp; SHA-256</text>
        </g>

        <!-- Accessibility & Relaxed Mode Card -->
        <g transform="translate(20, 728)">
          <rect x="0" y="0" width="500" height="224" rx="24" fill="${surfaceAlt}" stroke="${outline}" stroke-width="2"/>
          <text x="26" y="42" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="${ink}">Pengaturan Nyaman &amp; Ramah Pengguna</text>
          <text x="26" y="76" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">• Mode Santai: belajar bebas tekanan tanpa kehabisan nyawa.</text>
          <text x="26" y="106" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">• Pengingat belajar lokal (tanpa server push eksternal).</text>
          <text x="26" y="136" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="${inkMuted}">• Kontras teks #F8F1E3 di atas #15110C (16,4:1 WCAG AAA).</text>
          <rect x="26" y="158" width="212" height="44" rx="14" fill="${primary}"/>
          <text x="132" y="186" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="800" fill="#0F1F18">Mode Santai: Aktif</text>
        </g>
      `,
    }),
  },
];

for (const screen of screens) {
  await sharp(Buffer.from(screen.svg))
    .webp({ quality: 90 })
    .toFile(path.join(publicScreensDir, screen.filename));
}

console.log('Generated branding and 6 WebP screen assets successfully.');
