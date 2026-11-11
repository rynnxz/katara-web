import Link from 'next/link';
import React from 'react';
import { AppShowcaseSection } from '@/components/sections/AppShowcaseSection';
import { MobileFloatingDownloadBar } from '@/components/sections/MobileFloatingDownloadBar';
import { CopyHashButton } from '@/components/ui/CopyHashButton';
import { DialectOrnamentBanner } from '@/components/ui/DialectOrnamentBanner';
import { InstallGuideDialog } from '@/components/ui/InstallGuideDialog';
import { SiRebungMascot } from '@/components/ui/SiRebungMascot';
import { ValidationBadge } from '@/components/ui/ValidationBadge';
import { getLatestKataraRelease } from '@/lib/github';
import { buildHomeJsonLd } from '@/lib/schema';
import {
  DIALECTS_DATA,
  FAQ_ITEMS,
  JAWI_SPECIAL_LETTERS,
  SITE_CONFIG,
} from '@/lib/site';

export const revalidate = 3600;

export default async function HomePage() {
  const release = await getLatestKataraRelease();
  const jsonLd = buildHomeJsonLd(release);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b-2 border-[var(--k-outline)]/50 pb-16 pt-10 sm:py-20">
        {/* Static Pucuk Rebung Geometric Top Banner */}
        <div className="pointer-events-none absolute inset-x-0 top-0 opacity-15 text-[var(--k-primary)]">
          <DialectOrnamentBanner courseId="ms-deli" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full border-2 border-[var(--k-primary)] bg-[var(--k-primary-container)] px-4 py-1.5 text-xs font-extrabold text-[var(--k-on-primary-container)]">
                <span>Rilis Resmi {release.tagName}</span>
                <span aria-hidden="true">•</span>
                <span>100% Luring (Offline-First)</span>
                <span aria-hidden="true">•</span>
                <span>Bebas Iklan</span>
              </div>

              <h1 className="mt-5 text-4xl font-black leading-[1.12] tracking-tight text-[var(--k-ink)] sm:text-5xl lg:text-[3.35rem]">
                Belajar Bahasa &amp; Budaya{' '}
                <span className=" underline decoration-[var(--k-secondary)] decoration-4 underline-offset-4">
                  Melayu Nusantara
                </span>{' '}
                Bersama Si Rebung
              </h1>

              <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-[var(--k-ink-muted)]">
                Pelajari kosakata, sapaan adat, tingkat tutur, hingga{' '}
                <strong>Aksara Jawi</strong> dalam tiga dialek utama:{' '}
                <strong>Melayu Deli</strong>, <strong>Melayu Langkat</strong>,
                dan <strong>Melayu Palembang</strong>. Disusun dari 24 rujukan
                ilmiah Balai Bahasa dan bekerja penuh tanpa sinyal internet.
              </p>

              {/* Primary CTA Group */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={release.apkAsset.downloadUrl}
                  rel="noopener"
                  className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[var(--k-primary)] px-6 py-3.5 text-base font-black text-[var(--k-on-primary)] shadow-[0_5px_0_var(--k-primary-dark)] transition hover:brightness-105 active:translate-y-[2px] active:shadow-[0_2px_0_var(--k-primary-dark)]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 shrink-0 fill-current"
                  >
                    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                  </svg>
                  <span>
                    Unduh APK Android ({release.tagName} •{' '}
                    {release.apkAsset.sizeFormatted})
                  </span>
                </a>

                <InstallGuideDialog
                  apkName={release.apkAsset.name}
                  apkSha256={release.apkAsset.sha256}
                />
              </div>

              {/* Release & SHA-256 Quick Verification Strip */}
              <div className="mt-6 rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[var(--k-ink-muted)]">
                  <span>
                    Berkas: <strong className="text-[var(--k-ink)]">{release.apkAsset.name}</strong> ({release.publishedDateFormatted})
                  </span>
                  <Link
                    href="/download"
                    className="font-extrabold text-[var(--k-primary)] underline underline-offset-2"
                  >
                    Halaman Verifikasi &amp; QR Code →
                  </Link>
                </div>
                {release.apkAsset.sha256 && (
                  <div className="mt-2.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1 rounded-xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] px-3 py-2 font-mono text-xs text-[var(--k-ink)]">
                      <span className="font-extrabold">SHA-256: </span>
                      <span className="break-all">{release.apkAsset.sha256}</span>
                    </div>
                    <CopyHashButton
                      value={release.apkAsset.sha256}
                      label="Salin Hash"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Hero Right: Si Rebung Mascot + Real Android Screen Preview (LCP image) */}
            <div className="flex flex-col items-center justify-center lg:col-span-5">
              <div className="relative flex items-center justify-center">
                <div className="overflow-hidden rounded-[2.4rem] border-4 border-[var(--k-ink)] bg-[var(--k-surface)] p-2 shadow-[0_10px_0_var(--k-outline)]">
                  {/* MANDATORY per optimize-image-priority: fetchpriority="high" on LCP image, no loading="lazy" */}
                  <img
                    src="/screens/01-peta-belajar-light.webp"
                    alt="Pratinjau layar utama aplikasi Android KATARA menampilkan Peta Belajar Melayu Deli, rentetan hari, XP, dan Unit 1 Sapaan"
                    width={300}
                    height={600}
                    fetchPriority="high"
                    className="h-auto w-[270px] rounded-[1.9rem] sm:w-[300px]"
                  />
                </div>

                {/* Floating Si Rebung Badge */}
                <div className=" -bottom-5 -left-4 hidden items-center gap-2.5 rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-3 shadow-lg sm:absolute sm:flex">
                  <SiRebungMascot mood="cheer" size={54} />
                  <div>
                    <p className="text-xs font-black text-[var(--k-ink)]">
                      Si Rebung
                    </p>
                    <p className="text-[11px] font-bold text-[var(--k-ink-muted)]">
                      Teman Belajar Harianmu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED CORPUS FACTS SECTION */}
      <section
        aria-labelledby="corpus-stats-heading"
        className="border-b-2 border-[var(--k-outline)]/40 bg-[var(--k-surface-alt)] py-14"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--k-primary)]">
                Transparansi Data &amp; Korpus Bahasa
              </span>
              <h2
                id="corpus-stats-heading"
                className="mt-1 text-2xl font-black text-[var(--k-ink)] sm:text-3xl"
              >
                Angka Nyata dari Repositori Riset KATARA
              </h2>
            </div>
            <Link
              href="/about"
              className="text-sm font-extrabold text-[var(--k-primary)] underline underline-offset-4"
            >
              Lihat 24 Daftar Pustaka Balai Bahasa &amp; Kampus →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-5 shadow-[0_4px_0_var(--k-outline)]">
              <p className="text-3xl font-black text-[var(--k-primary)]">
                {SITE_CONFIG.corpusStats.totalCuratedWords} Kata
              </p>
              <p className="mt-1 text-base font-extrabold text-[var(--k-ink)]">
                Kosakata Terkurasi
              </p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--k-ink-muted)]">
                364 kata Melayu Deli + 308 kata Melayu Langkat + 308 kata Melayu
                Palembang lengkap dengan kelas kata dan fonetik.
              </p>
            </div>

            <div className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-5 shadow-[0_4px_0_var(--k-outline)]">
              <p className="text-3xl font-black text-[var(--k-primary)]">
                {SITE_CONFIG.corpusStats.totalQuizzes} Kuis &amp;{' '}
                {SITE_CONFIG.corpusStats.totalDialogues} Dialog
              </p>
              <p className="mt-1 text-base font-extrabold text-[var(--k-ink)]">
                Latihan Kontekstual
              </p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--k-ink-muted)]">
                110 soal kuis dan 10 percakapan per dialek dengan penjelasan
                makna serta konteks sosial budaya.
              </p>
            </div>

            <div className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-5 shadow-[0_4px_0_var(--k-outline)]">
              <p className="text-3xl font-black text-[var(--k-primary)]">
                {SITE_CONFIG.corpusStats.totalAcademicSources} Sumber
              </p>
              <p className="mt-1 text-base font-extrabold text-[var(--k-ink)]">
                Rujukan Ilmiah Terlacak
              </p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--k-ink-muted)]">
                Setiap entri memiliki kode rujukan (SRC-0001..0012, SRC-LK,
                SRC-PLG) dan lencana status validasi jujur.
              </p>
            </div>

            <div className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-5 shadow-[0_4px_0_var(--k-outline)]">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-3xl font-black text-[var(--k-primary)]">
                  {SITE_CONFIG.corpusStats.jawiAdditionalLetters} Huruf
                </p>
                <span
                  dir="rtl"
                  lang="ms-Arab"
                  className="font-jawi text-xl font-bold text-[var(--k-ink)]"
                >
                  چ ڠ ڤ ݢ ۏ ڽ
                </span>
              </div>
              <p className="mt-1 text-base font-extrabold text-[var(--k-ink)]">
                Aksara Jawi Nusantara
              </p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--k-ink-muted)]">
                Mendukung penuh huruf Arab-Melayu tambahan menggunakan font
                offline Noto Naskh Arabic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE APP SHOWCASE + SCREENSHOT CAROUSEL */}
      <AppShowcaseSection />

      {/* 4. THREE MELAYU DIALECTS SECTION */}
      <section
        id="tiga-dialek"
        aria-labelledby="dialects-heading"
        className="border-t-2 border-[var(--k-outline)]/40 bg-[var(--k-surface-alt)] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full border border-[var(--k-primary)] bg-[var(--k-primary-container)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
                Arsitektur Multi-Dialek (Pendekatan A)
              </span>
              <h2
                id="dialects-heading"
                className="mt-3 text-3xl font-black tracking-tight text-[var(--k-ink)] sm:text-4xl"
              >
                Tiga Dialek Melayu, Satu Aplikasi Ringan
              </h2>
              <p className="mt-2 text-base font-semibold text-[var(--k-ink-muted)]">
                Melayu Deli langsung aktif begitu APK dipasang. Modul Melayu
                Langkat (~70 KB) dan Melayu Palembang (~73 KB) dapat diunduh
                secara terpisah agar ukuran aplikasi utama tetap hemat.
              </p>
            </div>
            <Link
              href="/dialek"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] px-5 py-2.5 text-sm font-extrabold text-[var(--k-ink)] shadow-[0_3px_0_var(--k-outline)] hover:bg-[var(--k-primary-container)]"
            >
              Bandingkan Ketiga Dialek →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {DIALECTS_DATA.map((dialect) => (
              <article
                key={dialect.courseId}
                className="flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] shadow-[0_5px_0_var(--k-outline)]"
              >
                <div>
                  <div className="border-b border-[var(--k-outline)]/40 bg-[var(--k-surface-alt)] px-4 py-2 text-[var(--k-primary)]">
                    <DialectOrnamentBanner courseId={dialect.courseId} />
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full border border-[var(--k-outline)] bg-[var(--k-surface-alt)] px-3 py-1 text-xs font-extrabold text-[var(--k-ink)]">
                        {dialect.deliveryMode === 'bundled'
                          ? 'Bawaan APK Utama'
                          : `Modul Mandiri (${dialect.sizeFormatted})`}
                      </span>
                      <ValidationBadge
                        status={dialect.primaryValidationBadge}
                      />
                    </div>

                    <h3 className="mt-4 text-2xl font-black text-[var(--k-ink)]">
                      {dialect.name}
                    </h3>
                    <p className="mt-1 text-xs font-extrabold text-[var(--k-ink-muted)]">
                      {dialect.regionLabel}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--k-ink-muted)]">
                      {dialect.description}
                    </p>

                    <dl className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-3 text-center">
                      <div>
                        <dt className="text-[11px] font-bold text-[var(--k-ink-muted)]">
                          Kosakata
                        </dt>
                        <dd className="text-base font-black text-[var(--k-ink)]">
                          {dialect.wordCount}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold text-[var(--k-ink-muted)]">
                          Kuis
                        </dt>
                        <dd className="text-base font-black text-[var(--k-ink)]">
                          {dialect.quizCount}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold text-[var(--k-ink-muted)]">
                          Rujukan
                        </dt>
                        <dd className="text-base font-black text-[var(--k-ink)]">
                          {dialect.referenceCount}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="border-t border-[var(--k-outline)]/40 bg-[var(--k-surface-alt)]/60 px-6 py-4">
                  <Link
                    href={`/dialek#${dialect.courseId}`}
                    className="inline-flex min-h-[44px] items-center text-sm font-extrabold text-[var(--k-primary)] hover:underline"
                  >
                    Pelajari Kosakata &amp; Ciri {dialect.name} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. JAWI SCRIPT HIGHLIGHT + 3-STEP HOW IT WORKS */}
      <section
        aria-labelledby="how-it-works-heading"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--k-primary)]">
                Alur Belajar Sederhana
              </span>
              <h2
                id="how-it-works-heading"
                className="mt-2 text-3xl font-black text-[var(--k-ink)]"
              >
                Mulai Belajar dalam 3 Langkah
              </h2>
              <ol className="mt-6 space-y-4">
                <li className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-5 shadow-[0_4px_0_var(--k-outline)]">
                  <p className="text-base font-black text-[var(--k-ink)]">
                    1. Pasang APK &amp; Pilih Daerah Melayu
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--k-ink-muted)]">
                    Unduh berkas APK resmi dari GitHub Releases. Buka aplikasi
                    dan mulai dari <strong>Melayu Deli</strong> tanpa internet,
                    atau unduh modul <strong>Melayu Langkat</strong> maupun{' '}
                    <strong>Melayu Palembang</strong>.
                  </p>
                </li>
                <li className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-5 shadow-[0_4px_0_var(--k-outline)]">
                  <p className="text-base font-black text-[var(--k-ink)]">
                    2. Selesaikan Pelajaran 3-5 Menit Setiap Hari
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--k-ink-muted)]">
                    Ikuti peta unit bertahap. Di Level 1, nyawa tidak berkurang
                    ketika salah menjawab, ditambah opsi{' '}
                    <strong>Mode Santai</strong> agar Anda fokus memahami bahasa
                    tanpa tekanan.
                  </p>
                </li>
                <li className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-5 shadow-[0_4px_0_var(--k-outline)]">
                  <p className="text-base font-black text-[var(--k-ink)]">
                    3. Latih Kata Lemah &amp; Baca Aksara Jawi
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--k-ink-muted)]">
                    Gunakan kamus luring, bandingkan kosakata antar-dialek, dan
                    kenali 6 huruf tambahan Aksara Jawi yang merangkum bunyi
                    khas bahasa Melayu Nusantara.
                  </p>
                </li>
              </ol>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6 shadow-[0_5px_0_var(--k-outline)]">
                <span className="inline-block rounded-full bg-[var(--k-primary-container)] px-3 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
                  Warisan Aksara Nusantara
                </span>
                <h3 className="mt-3 text-2xl font-black text-[var(--k-ink)]">
                  6 Huruf Tambahan Aksara Jawi (Arab-Melayu)
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
                  Abjad Arab standar tidak memiliki lambang untuk bunyi{' '}
                  <strong>c, ng, p, g, v,</strong> dan <strong>ny</strong>.
                  Para ulama dan pujangga Melayu menciptakan 6 huruf berbubuh
                  titik berikut yang diajarkan secara bertahap di KATARA:
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {JAWI_SPECIAL_LETTERS.map((letter) => (
                    <div
                      key={letter.name}
                      className="rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-[var(--k-ink)]">
                          Huruf {letter.name} [{letter.latinSound}]
                        </span>
                        <span
                          dir="rtl"
                          lang="ms-Arab"
                          className="font-jawi text-3xl font-bold text-[var(--k-primary)]"
                        >
                          {letter.glyph}
                        </span>
                      </div>
                      <div className="mt-2 flex items-baseline justify-between border-t border-[var(--k-outline)]/30 pt-2">
                        <span className="text-xs font-bold text-[var(--k-ink-muted)]">
                          {letter.exampleLatin} ({letter.meaning})
                        </span>
                        <span
                          dir="rtl"
                          lang="ms-Arab"
                          className="font-jawi text-base font-bold text-[var(--k-ink)]"
                        >
                          {letter.exampleJawi}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (<details> / <summary> accessible without JS) */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="border-t-2 border-[var(--k-outline)]/40 bg-[var(--k-surface-alt)] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--k-primary)]">
              Pertanyaan Umum
            </span>
            <h2
              id="faq-heading"
              className="mt-2 text-3xl font-black text-[var(--k-ink)]"
            >
              Hal yang Sering Ditanyakan
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="group rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-5 shadow-[0_3px_0_var(--k-outline)]"
              >
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-[var(--k-ink)]">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] text-sm font-black transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-[var(--k-outline)]/30 pt-3 text-sm leading-relaxed text-[var(--k-ink-muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section
        aria-labelledby="final-cta-heading"
        className="border-t-2 border-[var(--k-outline)]/50 py-16"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="rounded-3xl border-2 border-[var(--k-primary)] bg-[var(--k-primary-container)] p-8 shadow-[0_6px_0_var(--k-primary-dark)] sm:p-12">
            <div className="mx-auto flex justify-center">
              <SiRebungMascot mood="cheer" size={84} />
            </div>
            <h2
              id="final-cta-heading"
              className="mt-4 text-3xl font-black text-[var(--k-on-primary-container)] sm:text-4xl"
            >
              Siap Menjaga Bahasa Melayu Nusantara?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base font-bold text-[var(--k-ink)]">
              Unduh berkas APK resmi KATARA ({release.tagName}), verifikasi
              checksum SHA-256, dan mulai belajar kapan saja tanpa kuota
              internet.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <a
                href={release.apkAsset.downloadUrl}
                rel="noopener"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-[var(--k-primary)] px-7 py-3.5 text-base font-black text-[var(--k-on-primary)] shadow-[0_4px_0_var(--k-primary-dark)] hover:brightness-105"
              >
                Unduh {release.apkAsset.name} ({release.apkAsset.sizeFormatted})
              </a>
              <Link
                href="/download"
                className="inline-flex min-h-[54px] items-center justify-center rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] px-6 py-3.5 text-base font-extrabold text-[var(--k-ink)] hover:bg-[var(--k-surface-alt)]"
              >
                Buka Halaman Verifikasi &amp; Modul
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MobileFloatingDownloadBar
        downloadUrl={release.apkAsset.downloadUrl}
        tagName={release.tagName}
        sizeFormatted={release.apkAsset.sizeFormatted}
      />
    </>
  );
}
