import type { Metadata } from 'next';
import React from 'react';
import { CopyHashButton } from '@/components/ui/CopyHashButton';
import { getKataraReleases } from '@/lib/github';
import { buildBreadcrumbJsonLd } from '@/lib/schema';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Riwayat Rilis (Changelog) & Arsip Versi',
  description:
    'Catatan perubahan resmi setiap rilis aplikasi Android KATARA beserta daftar aset APK, modul bahasa daerah, dan checksum SHA-256.',
  alternates: {
    canonical: '/changelog',
  },
};

export default async function ChangelogPage() {
  const releases = await getKataraReleases();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Riwayat Rilis', path: '/changelog' },
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl">
        <span className="inline-block rounded-full border border-[var(--k-primary)] bg-[var(--k-primary-container)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
          Sinkron Otomatis dari GitHub Releases (ISR 1 Jam)
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--k-ink)] sm:text-4xl">
          Riwayat Rilis Aplikasi KATARA
        </h1>
        <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--k-ink-muted)]">
          Daftar lengkap pembaruan aplikasi, penambahan korpus dialek Melayu,
          perbaikan aksesibilitas, serta checksum SHA-256 setiap berkas rilis.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {releases.map((rel, idx) => (
          <article
            key={rel.tagName}
            className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6 shadow-[0_5px_0_var(--k-outline)] sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--k-outline)]/40 pb-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-[var(--k-primary)] px-3.5 py-1 font-mono text-xs font-black text-[var(--k-on-primary)]">
                  {rel.tagName}
                </span>
                {idx === 0 && (
                  <span className="rounded-full bg-[var(--k-success-container)] px-3 py-1 text-xs font-extrabold text-[var(--k-on-success-container)]">
                    Rilis Terbaru
                  </span>
                )}
                <span className="text-xs font-bold text-[var(--k-ink-muted)]">
                  {rel.publishedDateFormatted}
                </span>
              </div>

              <a
                href={rel.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-extrabold text-[var(--k-primary)] underline"
              >
                Lihat di GitHub Releases ↗
              </a>
            </div>

            <h2 className="mt-4 text-2xl font-black text-[var(--k-ink)]">
              {rel.name}
            </h2>

            {/* Sanitized release notes HTML */}
            <div
              className="prose-katara mt-4 space-y-2 text-sm leading-relaxed text-[var(--k-ink-muted)] [&_code]:rounded [&_code]:bg-[var(--k-surface-alt)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-[var(--k-ink)] [&_h3]:mt-4 [&_h3]:text-base [&_h3]:font-black [&_h3]:text-[var(--k-ink)] [&_h4]:mt-3 [&_h4]:text-sm [&_h4]:font-black [&_h4]:text-[var(--k-ink)] [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-extrabold [&_strong]:text-[var(--k-ink)]"
              dangerouslySetInnerHTML={{ __html: rel.bodyHtmlSanitized }}
            />

            {/* Release Assets Table */}
            <div className="mt-6 border-t border-[var(--k-outline)]/40 pt-5">
              <h3 className="text-sm font-black uppercase tracking-wider text-[var(--k-ink)]">
                Berkas Unduhan &amp; Checksum SHA-256
              </h3>

              <div className="mt-3 space-y-3">
                {[
                  rel.apkAsset,
                  ...rel.moduleAssets,
                  ...(rel.catalogAsset ? [rel.catalogAsset] : []),
                ].map((asset) => (
                  <div
                    key={asset.name}
                    className="flex flex-col justify-between gap-3 rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={asset.downloadUrl}
                          rel="noopener"
                          className="font-mono text-sm font-black text-[var(--k-primary)] underline"
                        >
                          {asset.name}
                        </a>
                        <span className="rounded-full border border-[var(--k-outline)] bg-[var(--k-surface)] px-2.5 py-0.5 text-xs font-bold text-[var(--k-ink)]">
                          {asset.sizeFormatted}
                        </span>
                      </div>
                      {asset.sha256 && (
                        <p className="mt-1 break-all font-mono text-xs text-[var(--k-ink-muted)]">
                          SHA-256: {asset.sha256}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {asset.sha256 && (
                        <CopyHashButton
                          value={asset.sha256}
                          label="Salin Hash"
                        />
                      )}
                      <a
                        href={asset.downloadUrl}
                        rel="noopener"
                        className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[var(--k-primary)] px-4 py-2 text-xs font-extrabold text-[var(--k-on-primary)]"
                      >
                        Unduh
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
