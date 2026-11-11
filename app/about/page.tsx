import type { Metadata } from 'next';
import React from 'react';
import { SiRebungMascot } from '@/components/ui/SiRebungMascot';
import { buildBreadcrumbJsonLd } from '@/lib/schema';
import { ACADEMIC_REFERENCES, SITE_CONFIG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tentang KATARA, Metodologi Riset & 24 Rujukan Ilmiah',
  description:
    'Pelajari latar belakang proyek KATARA (Budaya Go 2026), metodologi kurasi kosakata bahasa Melayu Nusantara, serta daftar lengkap 24 sumber rujukan Balai Bahasa dan perguruan tinggi.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Tentang & Riset', path: '/about' },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="grid items-center gap-8 rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6 shadow-[0_6px_0_var(--k-outline)] sm:p-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <span className="inline-block rounded-full border border-[var(--k-primary)] bg-[var(--k-primary-container)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
            Proyek Pelestarian Bahasa Daerah • Budaya Go 2026
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--k-ink)] sm:text-4xl">
            Tentang KATARA &amp; Metodologi Riset Linguistik
          </h1>
          <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--k-ink-muted)]">
            KATARA dibangun agar generasi muda dapat mempelajari bahasa dan
            budaya Melayu Nusantara (Melayu Deli, Melayu Langkat, dan Melayu
            Palembang) secara interaktif, gratis, dan 100% dapat diakses tanpa
            internet.
          </p>
        </div>
        <div className="flex justify-center md:col-span-4">
          <SiRebungMascot mood="cheer" size={120} />
        </div>
      </div>

      {/* Methodology Section */}
      <section
        aria-labelledby="methodology-heading"
        className="mt-12 grid gap-6 md:grid-cols-3"
      >
        <div className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2
            id="methodology-heading"
            className="text-lg font-black text-[var(--k-ink)]"
          >
            1. Ekstraksi Leksikon Resmi
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Seluruh {SITE_CONFIG.corpusStats.totalCuratedWords} entri kosakata
            diekstrak dari kamus dwibahasa Balai Bahasa, monograf Pusat
            Pembinaan dan Pengembangan Bahasa, serta tesis/jurnal linguistik
            terakreditasi tanpa mengarang kosakata fiktif.
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2 className="text-lg font-black text-[var(--k-ink)]">
            2. Pelacakan Kode Sumber (Provenans)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Setiap kata, ungkapan, dan dialog di dalam database ditautkan ke
            kode sumber pustaka spesifik (<code>SRC-0001..0012</code>,{' '}
            <code>SRC-LK-0001..0006</code>, dan <code>SRC-PLG-0001..0006</code>)
            sehingga dapat diaudit kembali ke buku rujukannya.
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2 className="text-lg font-black text-[var(--k-ink)]">
            3. Kejujuran Status Validasi
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Kami memisahkan secara tegas lencana{' '}
            <strong>&quot;Sumber Kamus&quot;</strong> (terverifikasi literatur
            Balai Bahasa), <strong>&quot;Dicek Penutur&quot;</strong>{' '}
            (terkonfirmasi lisan penutur jati), dan <strong>&quot;Draf&quot;</strong>.
          </p>
        </div>
      </section>

      {/* Complete 24 Academic References List */}
      <section
        aria-labelledby="references-heading"
        className="mt-14"
      >
        <h2
          id="references-heading"
          className="text-2xl font-black text-[var(--k-ink)] sm:text-3xl"
        >
          Daftar Lengkap 24 Sumber Pustaka &amp; Rujukan Ilmiah
        </h2>
        <p className="mt-2 text-sm font-semibold text-[var(--k-ink-muted)]">
          Berikut adalah 24 referensi akademik (12 Melayu Deli, 6 Melayu
          Langkat, dan 6 Melayu Palembang) yang menjadi fondasi konten aplikasi
          KATARA:
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {ACADEMIC_REFERENCES.map((ref) => (
            <article
              key={ref.id}
              className="flex flex-col justify-between rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-5"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full border border-[var(--k-primary)] bg-[var(--k-primary-container)] px-3 py-0.5 text-xs font-extrabold text-[var(--k-on-primary-container)]">
                    {ref.dialectLabel}
                  </span>
                  <span className="rounded-full border border-[var(--k-outline)] bg-[var(--k-surface-alt)] px-2.5 py-0.5 font-mono text-xs font-bold text-[var(--k-ink)]">
                    {ref.id} • {ref.year}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-black text-[var(--k-ink)]">
                  {ref.title}
                </h3>
                <p className="mt-1 text-xs font-bold text-[var(--k-ink-muted)]">
                  {ref.author} • {ref.publisher}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[var(--k-ink-muted)]">
                  {ref.notes}
                </p>
              </div>

              {ref.url && (
                <div className="mt-3 pt-2 border-t border-[var(--k-outline)]/30">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-extrabold text-[var(--k-primary)] underline"
                  >
                    Buka Repositori / Penerbit Resmi ↗
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
