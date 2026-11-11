'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ValidationBadge } from '../ui/ValidationBadge';

interface ShowcaseTab {
  id: 'belajar' | 'latihan' | 'budaya' | 'misi' | 'profil';
  label: string;
  badge: string;
  headline: string;
  description: string;
  screenImage: string;
  screenAlt: string;
  highlights: string[];
  sampleCard: {
    dialect: string;
    term: string;
    jawi?: string;
    meaning: string;
    note: string;
    status: 'speaker_checked' | 'dictionary_verified';
    source: string;
  };
}

const SHOWCASE_TABS: ShowcaseTab[] = [
  {
    id: 'belajar',
    label: 'Belajar',
    badge: 'Peta 16 Unit • 64 Pelajaran',
    headline: 'Peta Belajar Bertahap Seperti Bermain Gim',
    description:
      'Setiap dialek disusun ke dalam 16 unit tematik (Sapaan, Keluarga, Kuliner, Adat, Sungai & Pesisir, hingga Pantun) dengan pelajaran singkat 3 sampai 5 menit. Di Level 1, nyawa tidak berkurang saat salah menjawab agar pemula bebas bereksplorasi.',
    screenImage: '/screens/01-peta-belajar-light.webp',
    screenAlt:
      'Tampilan Peta Belajar KATARA menampilkan Unit 1 Sapaan dan Perkenalan Melayu Deli, indikator rentetan hari, XP, dan simpul pelajaran.',
    highlights: [
      '16 unit dan 64 pelajaran terstruktur per dialek.',
      'Aturan Nyawa ramah pemula: Level 1 bebas pengurangan nyawa + opsi Mode Santai di Pengaturan.',
      'Tersimpan otomatis di database SQLite lokal (drift) tanpa perlu sinyal internet.',
    ],
    sampleCard: {
      dialect: 'Melayu Deli • Unit 1',
      term: 'Ape kabo, Wak?',
      jawi: 'اڤ کابو، واق؟',
      meaning: 'Apa kabar, Paman/Bibi (Uwak)?',
      note: 'Vokal akhir /-a/ pada kata "apa" melemah menjadi pepet /-e/ ("ape") dalam tuturan lisan Medan & Deli Serdang.',
      status: 'speaker_checked',
      source: 'SRC-0002',
    },
  },
  {
    id: 'latihan',
    label: 'Latihan',
    badge: '330 Soal Kuis • 30 Dialog',
    headline: 'Latihan Kontekstual & Ulasan Kata Lemah',
    description:
      'Latih penguasaan kosakata melalui soal pilihan ganda, penyusunan kalimat, pencocokan arti, dan simulasi percakapan nyata. Algoritma penguasaan kata mencatat kosakata yang sering keliru untuk diulas kembali.',
    screenImage: '/screens/02-latihan-kuis-light.webp',
    screenAlt:
      'Tampilan layar Latihan Kuis KATARA menampilkan pertanyaan ungkapan Melayu Deli, aksara Jawi, lencana Dicek Penutur, dan umpan balik penjelasan linguistik.',
    highlights: [
      '110 soal kuis terkurasi dan 10 percakapan kontekstual pada setiap dialek (total 330 kuis & 30 dialog).',
      'Setiap soal menyertakan penjelasan fonologi atau sosiolinguistik saat selesai dijawab.',
      'Fitur Ulasan Kata Lemah untuk memperkuat daya ingat jangka panjang.',
    ],
    sampleCard: {
      dialect: 'Melayu Palembang • Tingkat Tutur',
      term: 'Lemak nian pempeknyo',
      meaning: 'Enak sekali pempeknya (Ragam Sari-sari)',
      note: 'Partikel "nian" berfungsi sebagai penguat makna ("sekali/sangat") dalam Baso Palembang Sari-sari.',
      status: 'dictionary_verified',
      source: 'SRC-PLG-0001',
    },
  },
  {
    id: 'budaya',
    label: 'Budaya',
    badge: 'Aksara Jawi • Sastra & Adat',
    headline: 'Ruang Budaya, Kamus Luring & Aksara Jawi',
    description:
      'Bahasa tidak pernah lepas dari budayanya. Jelajahi artikel sejarah Kesultanan Deli, Langkat, dan Sriwijaya-Palembang, baca bait pantun Telangkai, serta pelajari 6 huruf tambahan Aksara Jawi Nusantara.',
    screenImage: '/screens/03-kamus-jawi-light.webp',
    screenAlt:
      'Tampilan Kamus dan Aksara Jawi KATARA dengan 6 huruf Arab-Melayu tambahan serta lencana validasi Sumber Kamus dan Draf.',
    highlights: [
      'Pengenalan 6 huruf tambahan Aksara Jawi (چ Ca, ڠ Nga, ڤ Pa, ݢ Ga, ۏ Va, ڽ Nya) dengan arah baca kanan-ke-kiri (RTL).',
      'Kamus luring lengkap dengan filter dialek, pencarian instan, dan lencana status validasi ilmiah.',
      'Fitur Bandingkan Dialek untuk melihat kognat kosakata antara Deli, Langkat, dan Palembang.',
    ],
    sampleCard: {
      dialect: 'Melayu Langkat • Kuliner Adat',
      term: 'Halua & Tepung Tawar',
      jawi: 'حلوا دان تڤوڠ تاور',
      meaning: 'Manisan buah khas hari besar & prosesi adat doa keselamatan',
      note: 'Tercatat dalam dokumentasi Warisan Budaya Takbenda Kabupaten Langkat.',
      status: 'dictionary_verified',
      source: 'SRC-LK-0005',
    },
  },
  {
    id: 'misi',
    label: 'Misi',
    badge: 'Misi Harian • Lencana & Koin',
    headline: 'Misi Harian, Rentetan Belajar & Toko Maskot',
    description:
      'Bangun kebiasaan belajar setiap hari bersama Si Rebung. Selesaikan misi harian untuk meraih XP dan Koin Diraja yang dapat ditukar dengan Pembeku Streak atau busana adat Tanjak & Teluk Belanga untuk Si Rebung.',
    screenImage: '/screens/06-mode-gelap-dark.webp',
    screenAlt:
      'Tampilan Misi Harian KATARA dalam Mode Gelap Malam Songket dengan kontras tinggi WCAG AAA.',
    highlights: [
      'Misi harian otomatis diperbarui setiap hari secara lokal tanpa membutuhkan server eksternal.',
      'Notifikasi pengingat belajar lokal (flutter_local_notifications) yang sopan dan dapat diatur jadwalnya.',
      'Tema Terang (Kertas Lontar) dan Tema Gelap (Malam Songket) yang mematuhi kontras WCAG AA+.',
    ],
    sampleCard: {
      dialect: 'Gamifikasi Ramah Pelajar',
      term: 'Pembeku Rentetan (Streak Freeze)',
      meaning: 'Melindungi rentetan hari belajar ketika Anda sedang sibuk',
      note: 'Dapat diperoleh menggunakan Koin dari hasil menyelesaikan pelajaran, tanpa transaksi uang nyata.',
      status: 'speaker_checked',
      source: 'SRC-0001',
    },
  },
  {
    id: 'profil',
    label: 'Profil',
    badge: 'Modul Mandiri • Cloud Opsional',
    headline: 'Manajemen Modul Dialek & Cadangan Cloud Opsional',
    description:
      'Unduh atau hapus modul dialek tambahan kapan saja agar penyimpanan ponsel tetap hemat. Anda dapat belajar sepenuhnya dalam mode tamu lokal, atau menautkan akun Google untuk mencadangkan progres ke Cloud Firestore.',
    screenImage: '/screens/04-pilih-dialek-light.webp',
    screenAlt:
      'Tampilan layar Pilih Daerah dan Modul Unduhan Mandiri Melayu Deli, Melayu Langkat, dan Melayu Palembang.',
    highlights: [
      'Pendekatan A: Melayu Deli dibundel di APK utama; Melayu Langkat (~70 KB) & Palembang (~73 KB) diunduh terpisah sesuai pilihan.',
      'Verifikasi berlapis Ed25519 + SHA-256 sebelum modul diekstrak ke penyimpanan aplikasi.',
      'Penyelesaian konflik sinkronisasi cloud deterministik (mengambil nilai tertinggi stars, best_score, dan gabungan xp_events).',
    ],
    sampleCard: {
      dialect: 'Keamanan & Integritas Modul',
      term: 'Ed25519 + SHA-256 Verified',
      meaning: 'Katalog dan arsip ZIP diverifikasi secara kriptografis sebelum dipasang',
      note: 'Menolak pengalihan ke host luar dan mencegah ekstraksi jalur tidak sah (anti-Zip-Slip).',
      status: 'speaker_checked',
      source: 'SECURITY.md',
    },
  },
];

const CAROUSEL_SLIDES = [
  {
    src: '/screens/01-peta-belajar-light.webp',
    title: 'Peta Belajar & Unit Bertahap',
    caption: '16 unit dan 64 pelajaran dengan indikator XP, rentetan hari, dan nyawa bebas di Level 1.',
  },
  {
    src: '/screens/02-latihan-kuis-light.webp',
    title: 'Latihan Interaktif & Penjelasan',
    caption: 'Umpan balik instan lengkap dengan penjelasan fonologi serta kode rujukan ilmiah.',
  },
  {
    src: '/screens/03-kamus-jawi-light.webp',
    title: 'Kamus Luring & 6 Huruf Jawi',
    caption: 'Transliterasi Arab-Melayu (RTL) dan lencana jujur Sumber Kamus, Dicek Penutur, atau Draf.',
  },
  {
    src: '/screens/04-pilih-dialek-light.webp',
    title: 'Pilih Daerah & Modul Mandiri',
    caption: 'Melayu Deli bawaan APK + unduhan ringan Melayu Langkat (~70 KB) dan Palembang (~73 KB).',
  },
  {
    src: '/screens/05-ruang-budaya-light.webp',
    title: 'Ruang Budaya & Sastra Pantun',
    caption: 'Artikel sejarah Kesultanan Deli, Langkat, dan Palembang beserta pantun Telangkai.',
  },
  {
    src: '/screens/06-mode-gelap-dark.webp',
    title: 'Mode Gelap Malam Songket',
    caption: 'Tampilan nyaman di malam hari dengan rasio kontras teks utama 16,4:1 (WCAG AAA).',
  },
];

/**
 * Interactive app feature showcase + accessible CSS scroll-snap screenshot carousel.
 * Implements `modern-web-guidance` carousel rules:
 * - Named region with `aria-roledescription="carousel"`.
 * - Each slide has `role="group"`, `aria-roledescription="slide"`, and localized `aria-label="N dari M"`.
 * - Previous/Next HTML `<button>` controls placed before the track in DOM order.
 * - Live marker updates via `requestAnimationFrame` and polite status announcements after `scrollend`.
 */
export function AppShowcaseSection() {
  const [activeTabId, setActiveTabId] = useState<ShowcaseTab['id']>('belajar');
  const activeTab =
    SHOWCASE_TABS.find((t) => t.id === activeTabId) ?? SHOWCASE_TABS[0];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [politeStatus, setPoliteStatus] = useState('');
  const pendingTargetRef = useRef<number | null>(null);
  const settledIndexRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const getClosestSlideIndex = (): number => {
      const children = Array.from(track.children) as HTMLElement[];
      if (children.length === 0) return 0;
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      children.forEach((child, idx) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const dist = Math.abs(childCenter - trackCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });
      return bestIdx;
    };

    const handleSettled = () => {
      const idx = getClosestSlideIndex();
      pendingTargetRef.current = null;
      setActiveSlideIndex(idx);
      if (idx !== settledIndexRef.current) {
        settledIndexRef.current = idx;
        const slide = CAROUSEL_SLIDES[idx];
        if (slide) {
          setPoliteStatus(
            `Layar ${idx + 1} dari ${CAROUSEL_SLIDES.length}: ${slide.title}`
          );
        }
      }
    };

    const onScroll = () => {
      if (pendingTargetRef.current === null) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const nearest = getClosestSlideIndex();
          setActiveSlideIndex((prev) => (prev === nearest ? prev : nearest));
        });
      }
      if (!('onscrollend' in window)) {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(handleSettled, 140);
      }
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    if ('onscrollend' in window) {
      track.addEventListener('scrollend', handleSettled);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (debounceTimer) clearTimeout(debounceTimer);
      track.removeEventListener('scroll', onScroll);
      if ('onscrollend' in window) {
        track.removeEventListener('scrollend', handleSettled);
      }
    };
  }, []);

  function scrollToSlide(targetIdx: number) {
    const track = trackRef.current;
    if (!track) return;
    const count = CAROUSEL_SLIDES.length;
    const wrappedIdx = ((targetIdx % count) + count) % count;
    const children = Array.from(track.children) as HTMLElement[];
    const targetEl = children[wrappedIdx];
    if (!targetEl) return;

    pendingTargetRef.current = wrappedIdx;
    setActiveSlideIndex(wrappedIdx);

    const trackRect = track.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const delta =
      targetRect.left +
      targetRect.width / 2 -
      (trackRect.left + trackRect.width / 2);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    track.scrollBy({
      left: delta,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  function stepSlide(direction: -1 | 1) {
    const baseIdx =
      pendingTargetRef.current !== null
        ? pendingTargetRef.current
        : activeSlideIndex;
    scrollToSlide(baseIdx + direction);
  }

  return (
    <section
      id="fitur-aplikasi"
      aria-labelledby="showcase-heading"
      className="py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-[var(--k-primary)] bg-[var(--k-primary-container)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
            Antarmuka Material 3 Identik dengan Aplikasi
          </span>
          <h2
            id="showcase-heading"
            className="mt-3 text-3xl font-black tracking-tight text-[var(--k-ink)] sm:text-4xl"
          >
            Jelajahi 5 Menu Utama di Dalam Aplikasi KATARA
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--k-ink-muted)]">
            Ketuk bilah navigasi bawah di bawah ini untuk merasakan alur belajar
            di dalam aplikasi Android KATARA, mulai dari Peta Belajar hingga
            pengelolaan modul dialek mandiri.
          </p>
        </div>

        {/* Interactive App Bottom Navigation Bar Selector */}
        <div className="mt-8 rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-4 shadow-[0_6px_0_var(--k-outline)] sm:p-8">
          <div
            role="tablist"
            aria-label="Pilih tab fitur aplikasi KATARA"
            className="grid grid-cols-5 gap-1.5 rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-1.5"
          >
            {SHOWCASE_TABS.map((tab) => {
              const selected = tab.id === activeTab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex min-h-[52px] flex-col items-center justify-center rounded-xl px-2 py-2 text-xs font-extrabold transition sm:flex-row sm:gap-2 sm:text-sm ${
                    selected
                      ? 'border-2 border-[var(--k-primary)] bg-[var(--k-primary-container)] text-[var(--k-on-primary-container)] shadow-sm'
                      : 'text-[var(--k-ink-muted)] hover:bg-[var(--k-surface)] hover:text-[var(--k-ink)]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${
                      selected
                        ? 'bg-[var(--k-primary)]'
                        : 'bg-[var(--k-outline)]'
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div
            role="tabpanel"
            id={`panel-${activeTab.id}`}
            aria-labelledby={`tab-${activeTab.id}`}
            className="mt-6 grid items-center gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <span className="inline-block rounded-full border border-[var(--k-outline)] bg-[var(--k-surface-alt)] px-3 py-1 text-xs font-extrabold text-[var(--k-ink)]">
                {activeTab.badge}
              </span>
              <h3 className="mt-3 text-2xl font-black text-[var(--k-ink)] sm:text-3xl">
                {activeTab.headline}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--k-ink-muted)]">
                {activeTab.description}
              </p>

              <ul className="mt-5 space-y-2.5 text-sm font-bold text-[var(--k-ink)]">
                {activeTab.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--k-primary-container)] text-xs font-black text-[var(--k-on-primary-container)]"
                    >
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Authentic Sample Card from Corpus */}
              <div className="mt-6 rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--k-ink-muted)]">
                    {activeTab.sampleCard.dialect}
                  </span>
                  <div className="flex items-center gap-2">
                    <ValidationBadge status={activeTab.sampleCard.status} />
                    <span className="rounded-full border border-[var(--k-outline)] bg-[var(--k-surface)] px-2.5 py-0.5 font-mono text-xs font-bold text-[var(--k-ink)]">
                      {activeTab.sampleCard.source}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
                  <p className="text-xl font-black text-[var(--k-ink)]">
                    {activeTab.sampleCard.term}
                  </p>
                  {activeTab.sampleCard.jawi && (
                    <p
                      dir="rtl"
                      lang="ms-Arab"
                      className="font-jawi text-2xl font-bold text-[var(--k-primary)]"
                    >
                      {activeTab.sampleCard.jawi}
                    </p>
                  )}
                </div>
                <p className="mt-1 text-sm font-extrabold text-[var(--k-ink)]">
                  Arti: {activeTab.sampleCard.meaning}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--k-ink-muted)]">
                  {activeTab.sampleCard.note}
                </p>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5">
              <div className="overflow-hidden rounded-[2rem] border-4 border-[var(--k-ink)] bg-[var(--k-bg)] shadow-xl">
                <img
                  src={activeTab.screenImage}
                  alt={activeTab.screenAlt}
                  width={270}
                  height={540}
                  loading="lazy"
                  className="h-auto w-[260px] sm:w-[280px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Accessible CSS Scroll-Snap Carousel for All 6 App Screens */}
        <section
          aria-roledescription="carousel"
          aria-label="Galeri tampilan layar aplikasi KATARA"
          className="mt-14"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-[var(--k-ink)]">
                Galeri Layar Aplikasi (Mode Terang &amp; Mode Gelap)
              </h3>
              <p className="mt-1 text-sm font-bold text-[var(--k-ink-muted)]">
                Geser atau gunakan tombol navigasi untuk melihat 6 layar utama
                KATARA.
              </p>
            </div>

            {/* Controls placed BEFORE track in DOM order per modern-web-guidance */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => stepSlide(-1)}
                aria-label="Layar sebelumnya"
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] px-4 py-2 text-sm font-extrabold text-[var(--k-ink)] shadow-[0_3px_0_var(--k-outline)] hover:bg-[var(--k-surface-alt)]"
              >
                ← Sebelumnya
              </button>
              <button
                type="button"
                onClick={() => stepSlide(1)}
                aria-label="Layar berikutnya"
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] px-4 py-2 text-sm font-extrabold text-[var(--k-ink)] shadow-[0_3px_0_var(--k-outline)] hover:bg-[var(--k-surface-alt)]"
              >
                Berikutnya →
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            tabIndex={0}
            role="group"
            aria-label="Daftar tangkapan layar"
            className="carousel-track mt-6 flex gap-6 overflow-x-auto pb-4 pt-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--k-primary)]"
          >
            {CAROUSEL_SLIDES.map((slide, idx) => (
              <div
                key={slide.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} dari ${CAROUSEL_SLIDES.length}: ${slide.title}`}
                className="w-[280px] shrink-0 snap-center rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-4 shadow-[0_4px_0_var(--k-outline)] sm:w-[310px]"
              >
                <div className="overflow-hidden rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-bg)]">
                  <img
                    src={slide.src}
                    alt={`${slide.title} - ${slide.caption}`}
                    width={540}
                    height={1080}
                    loading={idx === 0 ? undefined : 'lazy'}
                    fetchPriority={idx === 0 ? undefined : 'low'}
                    className="h-auto w-full"
                  />
                </div>
                <p className="mt-3 text-base font-black text-[var(--k-ink)]">
                  {idx + 1}. {slide.title}
                </p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--k-ink-muted)]">
                  {slide.caption}
                </p>
              </div>
            ))}
          </div>

          {/* Visually hidden polite status region for screen readers */}
          <p className="sr-only" role="status" aria-live="polite">
            {politeStatus}
          </p>

          {/* Slide marker buttons */}
          <nav
            aria-label="Pilih tangkapan layar"
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
          >
            {CAROUSEL_SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeSlideIndex;
              return (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Ke layar ${idx + 1}: ${slide.title}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={() => scrollToSlide(idx)}
                  className={`inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl border-2 px-3 text-xs font-extrabold transition ${
                    isCurrent
                      ? 'border-[var(--k-primary)] bg-[var(--k-primary)] text-[var(--k-on-primary)]'
                      : 'border-[var(--k-outline)] bg-[var(--k-surface)] text-[var(--k-ink)] hover:bg-[var(--k-surface-alt)]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </nav>
        </section>
      </div>
    </section>
  );
}
