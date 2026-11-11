export interface DialectVocabSample {
  term: string;
  phonetic: string;
  meaning: string;
  register: string;
  jawi?: string;
  status: 'speaker_checked' | 'dictionary_verified' | 'draft';
  sourceCode: string;
}

export interface DialectDetail {
  courseId: 'ms-deli' | 'ms-langkat' | 'ms-palembang';
  name: string;
  regionLabel: string;
  ornamentName: string;
  deliveryMode: 'bundled' | 'downloadable';
  archiveFilename: string;
  sizeBytes: number;
  sizeFormatted: string;
  sha256: string;
  downloadUrl: string;
  hasJawi: boolean;
  wordCount: number;
  dialogueCount: number;
  quizCount: number;
  unitCount: number;
  lessonCount: number;
  referenceCount: number;
  validationSummary: string;
  primaryValidationBadge: 'speaker_checked' | 'dictionary_verified';
  description: string;
  linguisticFeatures: string[];
  culturalHighlights: string[];
  vocabSamples: DialectVocabSample[];
}

export interface AcademicReference {
  id: string;
  courseId: 'ms-deli' | 'ms-langkat' | 'ms-palembang';
  dialectLabel: string;
  title: string;
  author: string;
  year: number;
  publisher: string;
  url?: string;
  notes: string;
}

export const SITE_CONFIG = {
  name: 'KATARA',
  tagline: 'Belajar Bahasa & Budaya Melayu Nusantara Secara Luring',
  packageId: 'id.katara.app',
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://katara-web.vercel.app').replace(/\/$/, ''),
  repoOwner: process.env.GITHUB_REPO_OWNER || 'rynnxz',
  repoName: process.env.GITHUB_REPO_NAME || 'KATARA',
  repoUrl: 'https://github.com/rynnxz/KATARA',
  webRepoUrl: 'https://github.com/rynnxz/katara-web',
  latestReleaseTag: 'v1.1.0',
  minAndroidVersion: 'Android 6.0 (Marshmallow / API 24) ke atas',
  ed25519PublicKey: '57ee50c3b50ecc5775b50a45e6c2d67e3cb03a4a977be93caf156b88cd145466',
  moduleCatalogSha256: '12e574ae6e244916562a4ec93105fa048cabdf9607abc7a4d1e849352cf2389b',
  corpusStats: {
    totalDialects: 3,
    totalCuratedWords: 980,
    deliWords: 364,
    langkatWords: 308,
    palembangWords: 308,
    totalDialogues: 30,
    totalQuizzes: 330,
    totalAcademicSources: 24,
    jawiAdditionalLetters: 6,
    unitsPerDialect: 16,
    lessonsPerDialect: 64,
  },
} as const;

export const JAWI_SPECIAL_LETTERS = [
  { glyph: 'چ', name: 'Ca', latinSound: 'c', exampleJawi: 'چاکڤ', exampleLatin: 'cakap', meaning: 'bicara / bertutur' },
  { glyph: 'ڠ', name: 'Nga', latinSound: 'ng', exampleJawi: 'بوڠا', exampleLatin: 'bunga', meaning: 'bunga' },
  { glyph: 'ڤ', name: 'Pa', latinSound: 'p', exampleJawi: 'ڤيڠݢن', exampleLatin: 'pinggan', meaning: 'piring makan' },
  { glyph: 'ݢ', name: 'Ga', latinSound: 'g', exampleJawi: 'ݢولاي', exampleLatin: 'gulai', meaning: 'hidangan gulai' },
  { glyph: 'ۏ', name: 'Va', latinSound: 'v', exampleJawi: 'ۏيديو', exampleLatin: 'vitamin', meaning: 'serapan huruf v' },
  { glyph: 'ڽ', name: 'Nya', latinSound: 'ny', exampleJawi: 'ڽاموق', exampleLatin: 'nyamuk', meaning: 'nyamuk' },
] as const;

export const DIALECTS_DATA: DialectDetail[] = [
  {
    courseId: 'ms-deli',
    name: 'Melayu Deli',
    regionLabel: 'Medan, Labuhan Deli & Deli Serdang, Sumatera Utara',
    ornamentName: 'Motif Pucuk Rebung Kesultanan Deli',
    deliveryMode: 'bundled',
    archiveFilename: 'Dibundel di dalam APK utama',
    sizeBytes: 0,
    sizeFormatted: 'Bawaan APK (0 KB unduhan tambahan)',
    sha256: 'd329304b3cc468b9307e632be437ad9d5c26e648d4eee41345b4d56c6f480d84',
    downloadUrl: 'https://github.com/rynnxz/KATARA/releases/download/v1.1.0/katara-v1.1.0-release.apk',
    hasJawi: true,
    wordCount: 364,
    dialogueCount: 10,
    quizCount: 110,
    unitCount: 16,
    lessonCount: 64,
    referenceCount: 12,
    validationSummary:
      'Diverifikasi silang dengan 12 rujukan ilmiah (Kamus Melayu Deli-Indonesia 1985, Kamus Melayu Sumut 2018, monograf Pusat Bahasa, dan riset USU). Sebagian entri telah dicek penutur, sedangkan 4 kata ragam baku dan 1 ungkapan kolokial tetap ditandai Draf secara transparan.',
    primaryValidationBadge: 'speaker_checked',
    description:
      'Bahasa Melayu pesisir timur Sumatera Utara yang berkembang di wilayah Kesultanan Deli (Medan, Labuhan Deli, dan Deli Serdang). Dikenal dengan pelemahan vokal akhir /-a/ menjadi /-e/ (pepet), sapaan kekerabatan khas (Atok, Uwak, Yong, Ngah), serta tradisi berbalas pantun.',
    linguisticFeatures: [
      'Perubahan vokal terbuka akhir /-a/ menjadi vokal pepet /-e/ pada posisi akhir kata (misalnya: apa -> ape, kita -> kite, kemana -> kemane).',
      'Sistem sapaan urutan kelahiran dalam keluarga besar: Along/Yong (sulung), Angah/Ngah (tengah), Alang, Andak, hingga Acik/Busu (bungsu).',
      'Penggunaan partikel penegas wacana lisan seperti pulak, kan, dan lah dalam percakapan harian.',
      'Dukungan penuh latihan dan pembacaan Aksara Jawi (Arab-Melayu) termasuk 6 huruf tambahan Nusantara.',
    ],
    culturalHighlights: [
      'Arsitektur Istana Maimun dan Masjid Raya Al-Mashun Medan.',
      'Tradisi pantun Telangkai dalam adat pernikahan Melayu Deli.',
      'Kuliner khas Anyang Pakis, Bubur Pedas Deli, dan Kue Rasidah.',
    ],
    vocabSamples: [
      {
        term: 'Ape kabo?',
        phonetic: 'a-pə ka-bo',
        meaning: 'Apa kabar? (sapaan ramah menanyakan keadaan)',
        register: 'Harian / Akrab',
        jawi: 'اڤ کابو',
        status: 'speaker_checked',
        sourceCode: 'SRC-0002',
      },
      {
        term: 'Atok',
        phonetic: 'a-tok',
        meaning: 'Kakek (sapaan hormat kepada orang tua laki-laki)',
        register: 'Hormat / Kekerabatan',
        jawi: 'اتوق',
        status: 'speaker_checked',
        sourceCode: 'SRC-0006',
      },
      {
        term: 'Pinggan',
        phonetic: 'ping-gan',
        meaning: 'Piring makan',
        register: 'Baku / Harian',
        jawi: 'ڤيڠݢن',
        status: 'dictionary_verified',
        sourceCode: 'SRC-0002',
      },
      {
        term: 'Seluar',
        phonetic: 'sə-lu-ar',
        meaning: 'Celana panjang (ragam Melayu baku, ditandai Draf untuk tinjauan lisan Deli)',
        register: 'Baku',
        jawi: 'سلوار',
        status: 'draft',
        sourceCode: 'SRC-0001',
      },
    ],
  },
  {
    courseId: 'ms-langkat',
    name: 'Melayu Langkat',
    regionLabel: 'Tanjung Pura, Stabat, Secanggang & Pangkalan Brandan',
    ornamentName: 'Motif Tampuk Manggis Songket Langkat',
    deliveryMode: 'downloadable',
    archiveFilename: 'module_langkat.zip',
    sizeBytes: 71391,
    sizeFormatted: '71.391 byte (~69,7 KB)',
    sha256: '3ed866afaeb72c1354d4927e651ca9c7fd1e4adf21d6810e462dacbb58562f6f',
    downloadUrl: 'https://github.com/rynnxz/KATARA/releases/download/v1.1.0/module_langkat.zip',
    hasJawi: true,
    wordCount: 308,
    dialogueCount: 10,
    quizCount: 110,
    unitCount: 16,
    lessonCount: 64,
    referenceCount: 6,
    validationSummary:
      'Dihimpun dari 6 rujukan resmi Balai Bahasa Sumatera Utara, Pusat Pembinaan dan Pengembangan Bahasa (1985), serta penelitian lapangan USU dan UNIMED. Seluruh entri saat ini berstatus Sumber Kamus (dictionary_verified) dan belum diklaim selesai dicek penutur lapangan.',
    primaryValidationBadge: 'dictionary_verified',
    description:
      'Bahasa Melayu yang dituturkan di wilayah historis Kesultanan Langkat (Tanjung Pura, Stabat, Secanggang, Hinai, hingga Pangkalan Brandan). Mempertahankan kekayaan sastra pantun, syair, leksikon muara sungai, serta tradisi kuliner halua.',
    linguisticFeatures: [
      'Realisasi vokal pepet akhir [-ə] dan peluluhan konsonan akhir tertentu pada ragam lisan pesisir Tanjung Pura dan Secanggang.',
      'Kekayaan kosakata ekologi sungai, pasang-surut muara, dan perahu tradisional.',
      'Tradisi pantun nasihat dan adat kerapatan Kesultanan Langkat.',
      'Dilengkapi transliterasi Aksara Jawi untuk kosakata budaya dan sastra.',
    ],
    culturalHighlights: [
      'Sejarah pusat pendidikan dan sastra Masjid Azizi Tanjung Pura.',
      'Seni pembuatan manisan buah tradisional Halua Langkat dan Bubur Pedas Langkat.',
      'Upacara adat Tepung Tawar sebagai ungkapan syukur dan doa keselamatan.',
    ],
    vocabSamples: [
      {
        term: 'Apakabo',
        phonetic: 'a-pa-ka-bo',
        meaning: 'Apa kabar (sapaan pembuka percakapan)',
        register: 'Harian',
        jawi: 'اڤکابو',
        status: 'dictionary_verified',
        sourceCode: 'SRC-LK-0001',
      },
      {
        term: 'Halua',
        phonetic: 'ha-lu-a',
        meaning: 'Manisan buah atau sayuran khas Melayu Langkat yang disajikan saat hari besar',
        register: 'Budaya / Kuliner',
        jawi: 'حلوا',
        status: 'dictionary_verified',
        sourceCode: 'SRC-LK-0005',
      },
      {
        term: 'Tepung tawar',
        phonetic: 'tə-pung ta-war',
        meaning: 'Prosesi adat menaburkan beras kunyit dan air sejuk untuk doa restu',
        register: 'Adat / Halus',
        jawi: 'تڤوڠ تاور',
        status: 'dictionary_verified',
        sourceCode: 'SRC-LK-0004',
      },
    ],
  },
  {
    courseId: 'ms-palembang',
    name: 'Melayu Palembang',
    regionLabel: 'Seberang Ilir, Seberang Ulu & Tepian Sungai Musi, Sumatera Selatan',
    ornamentName: 'Motif Songket Lepus Sriwijaya Palembang',
    deliveryMode: 'downloadable',
    archiveFilename: 'module_palembang.zip',
    sizeBytes: 74307,
    sizeFormatted: '74.307 byte (~72,6 KB)',
    sha256: 'f75c27e1f28c06bece0cfe5a6deea6f40d40457b614a986d431dde22cabc2095',
    downloadUrl: 'https://github.com/rynnxz/KATARA/releases/download/v1.1.0/module_palembang.zip',
    hasJawi: false,
    wordCount: 308,
    dialogueCount: 10,
    quizCount: 110,
    unitCount: 16,
    lessonCount: 64,
    referenceCount: 6,
    validationSummary:
      'Disusun dari 6 rujukan utama Balai Bahasa Provinsi Sumatera Selatan (Kamus Bahasa Palembang-Indonesia 2016), monograf Pusat Bahasa (1981, 1986), serta kajian UNSRI dan UIN Raden Fatah. Berstatus Sumber Kamus (dictionary_verified).',
    primaryValidationBadge: 'dictionary_verified',
    description:
      'Bahasa Melayu Palembang memiliki ciri khas koeksistensi dua tingkat tutur: Baso Palembang Alus (Bebaso) yang santun untuk menghormati orang tua/tetua adat, serta Baso Palembang Sari-sari yang lugas dengan vokal akhir /-o/ untuk pergaulan sehari-hari.',
    linguisticFeatures: [
      'Koeksistensi dua tingkat tutur: Baso Palembang Alus (Bebaso) dan Baso Palembang Sari-sari.',
      'Korespondensi bunyi vokal akhir /-a/ dalam bahasa Melayu baku menjadi /-o/ pada ragam Sari-sari (misalnya: apa -> apo, kemana -> kemano, siapa -> siapo).',
      'Penggunaan partikel penegas khas seperti nian (sangat/sekali), bae (saja), dan pulo (pula).',
      'Leksikon kaya seputar kehidupan perairan Sungai Musi (ketek, jukung, ulu, ilir, pasang, lebak).',
    ],
    culturalHighlights: [
      'Arsitektur Rumah Limas dengan filosofi tingkatan Kekijing.',
      'Wastra Songket Lepus dan tradisi jamuan makan bersama Ngobeng.',
      'Kuliner perairan Musi: Pempek, Pindang Patin, Celimpungan, dan Kue Maksuba.',
    ],
    vocabSamples: [
      {
        term: 'Apo kabar?',
        phonetic: 'a-po ka-bar',
        meaning: 'Apa kabar? (sapaan harian dalam ragam Sari-sari)',
        register: 'Sari-sari (Harian)',
        status: 'dictionary_verified',
        sourceCode: 'SRC-PLG-0001',
      },
      {
        term: 'Lemak nian',
        phonetic: 'lə-mak ni-an',
        meaning: 'Enak sekali / nyaman sekali',
        register: 'Sari-sari (Harian)',
        status: 'dictionary_verified',
        sourceCode: 'SRC-PLG-0001',
      },
      {
        term: 'Kilap / Lali',
        phonetic: 'ki-lap',
        meaning: 'Lupa (ragam halus Bebaso saat berbicara kepada orang yang dihormati)',
        register: 'Bebaso (Alus)',
        status: 'dictionary_verified',
        sourceCode: 'SRC-PLG-0004',
      },
    ],
  },
];

export const ACADEMIC_REFERENCES: AcademicReference[] = [
  // Melayu Deli (12 sources)
  {
    id: 'SRC-0001',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Draf Konten Awal Aplikasi KATARA / LinguaNusa Bahasa Melayu Deli v0.1',
    author: 'Tim Pengembang KATARA (LinguaNusa)',
    year: 2026,
    publisher: 'Proyek Internal KATARA (Budaya Go 2026)',
    notes: 'Fondasi awal struktur unit, pelajaran, dan latihan dasar Melayu Deli.',
  },
  {
    id: 'SRC-0002',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Kamus Melayu Deli-Indonesia',
    author: 'Hayati Chalil, Masindan, T. Sita Syaritsa, T. Sylviana Sinar, & Oliviana Harahap',
    year: 1985,
    publisher: 'Pusat Pembinaan dan Pengembangan Bahasa, Depdikbud (Jakarta)',
    url: 'https://repositori.kemdikbud.go.id/',
    notes: 'Rujukan leksikografi utama kosakata Bahasa Melayu Deli.',
  },
  {
    id: 'SRC-0003',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Bahasa Melayu Dialek Deli Medan',
    author: 'Syahdan Manurung & Zubeirsyah',
    year: 1984,
    publisher: 'Pusat Pembinaan dan Pengembangan Bahasa, Depdikbud (Jakarta)',
    url: 'https://repositori.kemdikbud.go.id/',
    notes: 'Deskripsi fonologi, morfologi, dan variasi lisan Melayu Deli di Kota Medan.',
  },
  {
    id: 'SRC-0004',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Kata Benda dan Kata Sipat Bahasa Melayu Deli',
    author: 'Muhizar Muchtar, Nurhayati Lubis, Namsyah Hot, & Asiah Taty',
    year: 1993,
    publisher: 'Pusat Pembinaan dan Pengembangan Bahasa, Depdikbud (Jakarta)',
    url: 'https://repositori.kemdikbud.go.id/',
    notes: 'Klasifikasi nomina dan adjektiva dalam struktur kalimat Melayu Deli.',
  },
  {
    id: 'SRC-0005',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Kamus Melayu Sumatera Utara - Indonesia',
    author: 'Chairani Nasution, Sriasrianti, Anharuddin Hutasuhut, Zufri Hidayat, & Edizal Hatmi',
    year: 2018,
    publisher: 'Balai Bahasa Provinsi Sumatera Utara, Kemendikbud (Medan)',
    url: 'https://balaibahasasumut.kemdikbud.go.id/',
    notes: 'Kamus komprehensif kosakata Melayu pesisir timur Sumatera Utara.',
  },
  {
    id: 'SRC-0006',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Sistem Sapaan dan Istilah Kekerabatan dalam Bahasa Melayu Deli: Tinjauan Sosiolinguistik',
    author: 'Tengku Syarfina',
    year: 2004,
    publisher: 'Sekolah Pascasarjana Universitas Sumatera Utara (USU), Medan',
    url: 'https://repository.usu.ac.id/',
    notes: 'Rujukan istilah sapaan kekerabatan (Atok, Uwak, Yong, Ngah, Andak, Busu).',
  },
  {
    id: 'SRC-0007',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Metafora Binatang dalam Peribahasa Dialek Melayu Deli',
    author: 'Astari & Mulyadi',
    year: 2022,
    publisher: 'Basastra: Jurnal Bahasa, Sastra, dan Pengajarannya, Vol. 10, No. 2 (UNS)',
    notes: 'Kajian semantik peribahasa dan ungkapan tradisional Melayu Deli.',
  },
  {
    id: 'SRC-0008',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Representasi Nilai Kearifan Lokal pada Pantun Melayu Deli dan Pelestariannya Melalui Telangkai',
    author: 'Ibnu Hajar, Kristiawan Indriyanto, & Dian Syahfitri',
    year: 2024,
    publisher: 'Jurnal GERAM, Vol. 12, No. 2 (Universitas Islam Riau)',
    notes: 'Rujukan tradisi berbalas pantun dan adat Telangkai.',
  },
  {
    id: 'SRC-0009',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Pencatatan Warisan Budaya Takbenda Indonesia: Budaya, Kuliner, dan Tradisi Melayu Deli',
    author: 'Direktorat Pelindungan Kebudayaan & Dinas Kebudayaan Provinsi Sumatera Utara',
    year: 2023,
    publisher: 'Kemendikbudristek RI',
    url: 'https://warisanbudaya.kemdikbud.go.id/',
    notes: 'Dokumentasi budaya takbenda, kuliner Anyang Pakis, dan Kue Rasidah.',
  },
  {
    id: 'SRC-0010',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Sejarah Medan Tempo Doeloe & Kronik Kesultanan Deli',
    author: 'Tengku Luckman Sinar',
    year: 1996,
    publisher: 'Lembaga Pembinaan dan Pengembangan Seni Budaya Melayu / Perpusnas RI',
    notes: 'Rujukan sejarah Kesultanan Deli, Istana Maimun, dan Masjid Raya Al-Mashun.',
  },
  {
    id: 'SRC-0011',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Ensiklopedia Terbuka Bahasa Melayu Deli & Daftar Kosakata Melayu Medan/Deli',
    author: 'Kontributor Wikipedia & Wiktionary Bahasa Indonesia',
    year: 2024,
    publisher: 'Wikimedia Foundation',
    notes: 'Pembanding variasi kosakata populer Melayu Medan.',
  },
  {
    id: 'SRC-0012',
    courseId: 'ms-deli',
    dialectLabel: 'Melayu Deli',
    title: 'Pusat Rujukan Persuratan Melayu (PRPM) - Kamus Bahasa Melayu & Perbandingan Dialek Nusantara',
    author: 'Dewan Bahasa dan Pustaka (DBP)',
    year: 2020,
    publisher: 'Dewan Bahasa dan Pustaka',
    notes: 'Rujukan perbandingan ejaan Jawi dan kognat bahasa Melayu serumpun.',
  },

  // Melayu Langkat (6 sources)
  {
    id: 'SRC-LK-0001',
    courseId: 'ms-langkat',
    dialectLabel: 'Melayu Langkat',
    title: 'Kamus Melayu Sumatera Utara - Indonesia (Lema Dialek Langkat)',
    author: 'Chairani Nasution, Sriasrianti, Anharuddin Hutasuhut, Zufri Hidayat, & Edizal Hatmi',
    year: 2018,
    publisher: 'Balai Bahasa Provinsi Sumatera Utara, Kemendikbud (Medan)',
    url: 'https://balaibahasasumut.kemdikbud.go.id/',
    notes: 'Memuat lema berlabel dialek Langkat (Stabat, Tanjung Pura, Pangkalan Brandan, Secanggang).',
  },
  {
    id: 'SRC-LK-0002',
    courseId: 'ms-langkat',
    dialectLabel: 'Melayu Langkat',
    title: 'Struktur Bahasa Melayu Langkat',
    author: 'Tim Peneliti Proyek Penelitian Bahasa dan Sastra Indonesia dan Daerah Sumatera Utara',
    year: 1985,
    publisher: 'Pusat Pembinaan dan Pengembangan Bahasa, Depdikbud (Jakarta)',
    url: 'https://repositori.kemdikbud.go.id/',
    notes: 'Monograf deskriptif fonologi, morfologi, sintaksis, dan kosakata dasar Melayu Langkat.',
  },
  {
    id: 'SRC-LK-0003',
    courseId: 'ms-langkat',
    dialectLabel: 'Melayu Langkat',
    title: 'Kajian Kosakata dan Fonologi Bahasa Melayu Dialek Langkat di Kecamatan Tanjung Pura dan Secanggang',
    author: 'Program Studi Sastra Melayu / Magister Linguistik FIB Universitas Sumatera Utara',
    year: 2019,
    publisher: 'Repositori Institusi Universitas Sumatera Utara (USU), Medan',
    url: 'https://repository.usu.ac.id/',
    notes: 'Penelitian lapangan vokal pepet akhir [-ə] dan leksikon pesisir-sungai.',
  },
  {
    id: 'SRC-LK-0004',
    courseId: 'ms-langkat',
    dialectLabel: 'Melayu Langkat',
    title: 'Sastra Lisan Melayu Langkat: Pantun, Syair, dan Tradisi Lisan Kesultanan Langkat',
    author: 'Tengku Syarfina, Rozanna Mulyani, & Tim Peneliti Sastra Daerah Sumatera Utara',
    year: 2002,
    publisher: 'Pusat Bahasa Departemen Pendidikan Nasional (Jakarta)',
    url: 'https://repositori.kemdikbud.go.id/',
    notes: 'Dokumentasi sastra lisan, pantun nasihat, dan kosakata adat Tanjung Pura.',
  },
  {
    id: 'SRC-LK-0005',
    courseId: 'ms-langkat',
    dialectLabel: 'Melayu Langkat',
    title: 'Warisan Budaya Takbenda Kabupaten Langkat: Adat, Kuliner, dan Tradisi Melayu Langkat',
    author: 'Direktorat Pelindungan Kebudayaan & BPK Wilayah II Sumatera Utara',
    year: 2022,
    publisher: 'Kemendikbudristek RI',
    url: 'https://warisanbudaya.kemdikbud.go.id/',
    notes: 'Dokumentasi kuliner halua, bubur pedas Langkat, tepung tawar, dan Masjid Azizi.',
  },
  {
    id: 'SRC-LK-0006',
    courseId: 'ms-langkat',
    dialectLabel: 'Melayu Langkat',
    title: 'Variasi Sosiolinguistik Sapaan Kekerabatan Masyarakat Melayu di Stabat dan Hinai Kabupaten Langkat',
    author: 'Jurnal Bahasa dan Sastra Universitas Negeri Medan (UNIMED) / Balai Bahasa Sumut',
    year: 2021,
    publisher: 'Universitas Negeri Medan (UNIMED)',
    url: 'https://jurnal.unimed.ac.id/',
    notes: 'Kajian sosiolinguistik sapaan kekerabatan dan partikel wacana Melayu Langkat.',
  },

  // Melayu Palembang (6 sources)
  {
    id: 'SRC-PLG-0001',
    courseId: 'ms-palembang',
    dialectLabel: 'Melayu Palembang',
    title: 'Kamus Bahasa Palembang - Indonesia',
    author: 'Tim Penyusun Balai Bahasa Provinsi Sumatera Selatan',
    year: 2016,
    publisher: 'Balai Bahasa Provinsi Sumatera Selatan, Kemendikbud (Palembang)',
    url: 'https://balaibahasasumsel.kemdikbud.go.id/',
    notes: 'Kamus acuan utama leksikon Baso Palembang Sari-sari dan Baso Palembang Alus (Bebaso).',
  },
  {
    id: 'SRC-PLG-0002',
    courseId: 'ms-palembang',
    dialectLabel: 'Melayu Palembang',
    title: 'Struktur Bahasa Palembang',
    author: 'R.M. Arif, Zainal Abidin Gani, & Tim Peneliti FKIP Universitas Sriwijaya',
    year: 1981,
    publisher: 'Pusat Pembinaan dan Pengembangan Bahasa, Depdikbud (Jakarta)',
    url: 'https://repositori.kemdikbud.go.id/',
    notes: 'Monograf deskriptif fonologi (perubahan vokal akhir /a/ -> /o/), morfologi, dan sintaksis.',
  },
  {
    id: 'SRC-PLG-0003',
    courseId: 'ms-palembang',
    dialectLabel: 'Melayu Palembang',
    title: 'Morfologi dan Sintaksis Bahasa Melayu Palembang',
    author: 'Muslimin & Tim Peneliti Bahasa dan Sastra Indonesia dan Daerah Sumatera Selatan',
    year: 1986,
    publisher: 'Pusat Pembinaan dan Pengembangan Bahasa, Depdikbud (Jakarta)',
    url: 'https://repositori.kemdikbud.go.id/',
    notes: 'Rujukan afiksasi, reduplikasi, dan partikel penegas nian, bae, serta pulo.',
  },
  {
    id: 'SRC-PLG-0004',
    courseId: 'ms-palembang',
    dialectLabel: 'Melayu Palembang',
    title: 'Pemertahanan Bahasa Palembang Alus (Bebaso) di Kalangan Masyarakat Palembang',
    author: 'Peneliti Program Studi Pendidikan Bahasa dan Sastra Indonesia FKIP UNSRI',
    year: 2020,
    publisher: 'Repositori Universitas Sriwijaya (UNSRI), Palembang',
    url: 'https://repository.unsri.ac.id/',
    notes: 'Kajian diglosia tingkat tutur Bebaso (Alus) dan Sari-sari di Seberang Ilir & Ulu.',
  },
  {
    id: 'SRC-PLG-0005',
    courseId: 'ms-palembang',
    dialectLabel: 'Melayu Palembang',
    title: 'Warisan Budaya Takbenda Sumatera Selatan: Kuliner, Wastra Songket, Rumah Limas, dan Adat Palembang',
    author: 'Direktorat Pelindungan Kebudayaan & Dinas Kebudayaan dan Pariwisata Sumsel',
    year: 2022,
    publisher: 'Kemendikbudristek RI',
    url: 'https://warisanbudaya.kemdikbud.go.id/',
    notes: 'Dokumentasi budaya Pempek, Pindang, Songket Lepus, Rumah Limas, dan tradisi Ngobeng.',
  },
  {
    id: 'SRC-PLG-0006',
    courseId: 'ms-palembang',
    dialectLabel: 'Melayu Palembang',
    title: 'Leksikon Ekologi Sungai Musi dan Budaya Perairan dalam Bahasa Melayu Palembang',
    author: 'Jurnal Ilmiah Kebahasaan dan Kesastraan UIN Raden Fatah Palembang',
    year: 2021,
    publisher: 'UIN Raden Fatah Palembang',
    url: 'https://jurnal.radenfatah.ac.id/',
    notes: 'Mendokumentasikan kosakata perairan Sungai Musi (ketek, jukung, ulu, ilir, pasang, lebak).',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Apakah aplikasi KATARA benar-benar gratis dan bebas iklan?',
    answer:
      'Ya. KATARA dirancang sebagai proyek pelestarian bahasa daerah yang sepenuhnya gratis, tanpa iklan, tanpa langganan berbayar, dan tanpa pelacak analitik komersial pihak ketiga.',
  },
  {
    question: 'Apakah saya memerlukan koneksi internet untuk belajar setiap hari?',
    answer:
      'Tidak. Seluruh materi Melayu Deli (364 kata, pelajaran, kuis, kamus, dan aksara Jawi) sudah dibundel di dalam APK dan tersimpan pada database SQLite lokal. Koneksi internet hanya dipakai satu kali apabila Anda ingin mengunduh modul tambahan Melayu Langkat (~70 KB) atau Melayu Palembang (~73 KB), atau jika Anda memilih menyalakan cadangan akun ke cloud.',
  },
  {
    question: 'Mengapa ukuran unduhan modul Melayu Langkat dan Melayu Palembang sangat kecil (~70 KB)?',
    answer:
      'KATARA menggunakan Pendekatan A (Bundled Primary + Separate Downloadable Modules). Mesin aplikasi, font Nunito serta Noto Naskh Arabic, dan ilustrasi vektor sudah ada di aplikasi utama, sehingga paket modul dialek hanya berisi berkas JSON kosakata, dialog, dan kuis terkompresi yang diverifikasi dengan tanda tangan Ed25519 serta SHA-256.',
  },
  {
    question: 'Apa perbedaan lencana "Sumber Kamus", "Dicek Penutur", dan "Draf" di dalam aplikasi?',
    answer:
      'Lencana tersebut menunjukkan kejujuran tingkat verifikasi ilmiah setiap kosakata. "Sumber Kamus" berarti kata tersebut telah diverifikasi dari kamus resmi Balai Bahasa atau monograf Kemendikbud. "Dicek Penutur" berarti pemakaian harian dan lafalnya telah dikonfirmasi bersama penutur jati. "Draf" menandakan entri yang masih menunggu peninjauan lanjutan.',
  },
  {
    question: 'Bagaimana cara memastikan berkas APK yang saya unduh asli dan aman?',
    answer:
      'Setiap berkas APK dan modul ZIP diunduh langsung dari GitHub Releases resmi (https://github.com/rynnxz/KATARA/releases). Anda dapat mencocokkan nilai hash SHA-256 yang tertera di halaman Unduh menggunakan perintah Get-FileHash di Windows PowerShell atau sha256sum di Linux/macOS.',
  },
  {
    question: 'Apakah KATARA tersedia untuk iOS atau Google Play Store?',
    answer:
      'Saat ini KATARA tersedia untuk perangkat Android (Android 6.0 / API 24 ke atas) dan didistribusikan secara langsung melalui GitHub Releases resmi. Dukungan iOS dan publikasi di Google Play Store masih dalam tahap perencanaan berikutnya.',
  },
] as const;
