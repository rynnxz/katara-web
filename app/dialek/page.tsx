import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { CopyHashButton } from '@/components/ui/CopyHashButton';
import { DialectOrnamentBanner } from '@/components/ui/DialectOrnamentBanner';
import { ValidationBadge } from '@/components/ui/ValidationBadge';
import { buildBreadcrumbJsonLd } from '@/lib/schema';
import { DIALECTS_DATA, JAWI_SPECIAL_LETTERS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tiga Dialek Melayu Nusantara (Deli, Langkat, Palembang)',
  description:
    'Pelajari karakteristik fonologi, tingkat tutur, kosakata, Aksara Jawi, dan motif budaya Bahasa Melayu Deli, Melayu Langkat, serta Melayu Palembang di aplikasi KATARA.',
  alternates: {
    canonical: '/dialek',
  },
};

export default function DialekPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Tiga Dialek Melayu', path: '/dialek' },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl">
        <span className="inline-block rounded-full border border-[var(--k-primary)] bg-[var(--k-primary-container)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
          Kurikulum Multi-Dialek Berbasis Riset
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--k-ink)] sm:text-4xl">
          Tiga Dialek Bahasa Melayu Nusantara di KATARA
        </h1>
        <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--k-ink-muted)]">
          Bahasa Melayu tumbuh dengan kekayaan ragam lisan, adat sapaan, dan
          ekologi yang khas di setiap pesisir serta aliran sungai Sumatera.
          KATARA menghadirkan tiga dialek utama lengkap dengan penjelasan
          status validasi ilmiah pada setiap kosakata.
        </p>
      </div>

      {/* Honest Validation Status Legend */}
      <section
        aria-labelledby="validation-legend-heading"
        className="mt-8 rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6 shadow-[0_4px_0_var(--k-outline)]"
      >
        <h2
          id="validation-legend-heading"
          className="text-lg font-black text-[var(--k-ink)]"
        >
          Arti Lencana Status Validasi Kosakata
        </h2>
        <p className="mt-1 text-sm text-[var(--k-ink-muted)]">
          Kami tidak pernah mengklaim seluruh entri telah selesai diverifikasi
          penutur lapangan bila masih bersumber dari literatur tertulis.
          Berikut adalah tiga lencana transparan yang tampil di kamus dan
          pelajaran KATARA:
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4">
            <ValidationBadge status="speaker_checked" />
            <p className="mt-2 text-xs font-semibold leading-relaxed text-[var(--k-ink-muted)]">
              Kosakata telah diverifikasi silang dari kamus resmi sekaligus
              dikonfirmasi kewajaran pemakaian lisannya bersama penutur jati.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4">
            <ValidationBadge status="dictionary_verified" />
            <p className="mt-2 text-xs font-semibold leading-relaxed text-[var(--k-ink-muted)]">
              Kosakata terverifikasi dari kamus resmi Balai Bahasa dan monograf
              Pusat Bahasa Kemendikbud, menunggu tahap verifikasi lisan
              komunitas.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4">
            <ValidationBadge status="draft" />
            <p className="mt-2 text-xs font-semibold leading-relaxed text-[var(--k-ink-muted)]">
              Entri draf atau ragam Melayu baku (seperti 4 kata pada draf awal
              Melayu Deli) yang ditandai terbuka untuk peninjauan penutur.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Dialect Sections */}
      <div className="mt-12 space-y-12">
        {DIALECTS_DATA.map((dialect) => (
          <section
            key={dialect.courseId}
            id={dialect.courseId}
            aria-labelledby={`heading-${dialect.courseId}`}
            className="overflow-hidden rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] shadow-[0_6px_0_var(--k-outline)]"
          >
            <div className="border-b border-[var(--k-outline)]/40 bg-[var(--k-surface-alt)] px-6 py-3 text-[var(--k-primary)]">
              <DialectOrnamentBanner courseId={dialect.courseId} />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[var(--k-outline)] bg-[var(--k-surface-alt)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-ink)]">
                    {dialect.ornamentName}
                  </span>
                  <span className="rounded-full border border-[var(--k-primary)] bg-[var(--k-primary-container)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
                    {dialect.deliveryMode === 'bundled'
                      ? 'Bundel Bawaan APK'
                      : `Modul Unduhan: ${dialect.sizeFormatted}`}
                  </span>
                </div>
                <ValidationBadge status={dialect.primaryValidationBadge} />
              </div>

              <h2
                id={`heading-${dialect.courseId}`}
                className="mt-4 text-2xl font-black text-[var(--k-ink)] sm:text-3xl"
              >
                {dialect.name}
              </h2>
              <p className="mt-1 text-sm font-extrabold text-[var(--k-ink-muted)]">
                Wilayah Tutur: {dialect.regionLabel}
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--k-ink-muted)]">
                {dialect.description}
              </p>

              {/* Stats Grid */}
              <dl className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4 sm:grid-cols-5">
                <div>
                  <dt className="text-xs font-bold text-[var(--k-ink-muted)]">
                    Kosakata
                  </dt>
                  <dd className="text-xl font-black text-[var(--k-ink)]">
                    {dialect.wordCount} kata
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-[var(--k-ink-muted)]">
                    Percakapan
                  </dt>
                  <dd className="text-xl font-black text-[var(--k-ink)]">
                    {dialect.dialogueCount} dialog
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-[var(--k-ink-muted)]">
                    Bank Kuis
                  </dt>
                  <dd className="text-xl font-black text-[var(--k-ink)]">
                    {dialect.quizCount} soal
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-[var(--k-ink-muted)]">
                    Struktur Unit
                  </dt>
                  <dd className="text-xl font-black text-[var(--k-ink)]">
                    {dialect.unitCount} unit / {dialect.lessonCount} pelajaran
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-[var(--k-ink-muted)]">
                    Sumber Ilmiah
                  </dt>
                  <dd className="text-xl font-black text-[var(--k-ink)]">
                    {dialect.referenceCount} rujukan
                  </dd>
                </div>
              </dl>

              {/* Linguistic Features & Cultural Highlights */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-5">
                  <h3 className="text-base font-black text-[var(--k-ink)]">
                    Ciri Khas Bahasa &amp; Fonologi
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
                    {dialect.linguisticFeatures.map((feat) => (
                      <li key={feat}>• {feat}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-5">
                  <h3 className="text-base font-black text-[var(--k-ink)]">
                    Konteks Budaya &amp; Status Validasi
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
                    {dialect.culturalHighlights.map((hl) => (
                      <li key={hl}>• {hl}</li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-[var(--k-outline)]/40 pt-3 text-xs font-semibold leading-relaxed text-[var(--k-ink)]">
                    <strong>Catatan Validasi:</strong>{' '}
                    {dialect.validationSummary}
                  </p>
                </div>
              </div>

              {/* Vocabulary Samples */}
              <div className="mt-6">
                <h3 className="text-base font-black text-[var(--k-ink)]">
                  Contoh Kosakata &amp; Ungkapan {dialect.name}
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {dialect.vocabSamples.map((sample) => (
                    <div
                      key={sample.term}
                      className="rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <ValidationBadge status={sample.status} />
                        <span className="font-mono text-xs font-bold text-[var(--k-ink-muted)]">
                          {sample.sourceCode} • {sample.register}
                        </span>
                      </div>
                      <div className="mt-2.5 flex items-baseline justify-between gap-2">
                        <p className="text-lg font-black text-[var(--k-ink)]">
                          {sample.term}{' '}
                          <span className="text-xs font-bold text-[var(--k-ink-muted)]">
                            [{sample.phonetic}]
                          </span>
                        </p>
                        {sample.jawi && (
                          <span
                            dir="rtl"
                            lang="ms-Arab"
                            className="font-jawi text-xl font-bold text-[var(--k-primary)]"
                          >
                            {sample.jawi}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-semibold text-[var(--k-ink-muted)]">
                        {sample.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Integrity Footer */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--k-outline)]/40 pt-5">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold text-[var(--k-ink)]">
                    Berkas Distribusi: {dialect.archiveFilename} (
                    {dialect.sizeFormatted})
                  </p>
                  <p className="mt-0.5 truncate font-mono text-xs text-[var(--k-ink-muted)]">
                    SHA-256: {dialect.sha256}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <CopyHashButton
                    value={dialect.sha256}
                    label="Salin SHA-256"
                  />
                  <a
                    href={dialect.downloadUrl}
                    rel="noopener"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[var(--k-primary)] px-4 py-2.5 text-xs font-extrabold text-[var(--k-on-primary)]"
                  >
                    {dialect.deliveryMode === 'bundled'
                      ? 'Unduh APK Utama'
                      : `Unduh ${dialect.archiveFilename}`}
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Jawi Script Section */}
      <section
        aria-labelledby="jawi-section-heading"
        className="mt-14 rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6 shadow-[0_5px_0_var(--k-outline)] sm:p-8"
      >
        <h2
          id="jawi-section-heading"
          className="text-2xl font-black text-[var(--k-ink)]"
        >
          Tabel 6 Huruf Tambahan Aksara Jawi (Arab-Melayu)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
          Pada modul Melayu Deli dan Melayu Langkat, pelajar dapat berlatih
          membaca dan menyusun kata dalam Aksara Jawi. Enam huruf tambahan
          berikut wajib tampil utuh dengan font <strong>Noto Naskh Arabic</strong>:
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {JAWI_SPECIAL_LETTERS.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-black text-[var(--k-ink)]">
                    Huruf {item.name}
                  </p>
                  <p className="text-xs font-bold text-[var(--k-ink-muted)]">
                    Padanan Latin: [{item.latinSound}]
                  </p>
                </div>
                <span
                  dir="rtl"
                  lang="ms-Arab"
                  className="font-jawi text-4xl font-bold text-[var(--k-primary)]"
                >
                  {item.glyph}
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-[var(--k-outline)]/40 pt-2.5">
                <span className="text-xs font-bold text-[var(--k-ink)]">
                  Contoh: {item.exampleLatin} ({item.meaning})
                </span>
                <span
                  dir="rtl"
                  lang="ms-Arab"
                  className="font-jawi text-lg font-bold text-[var(--k-ink)]"
                >
                  {item.exampleJawi}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/about"
            className="text-sm font-extrabold text-[var(--k-primary)] underline"
          >
            Lihat Metodologi Kurasi &amp; 24 Rujukan Akademik →
          </Link>
        </div>
      </section>
    </div>
  );
}
