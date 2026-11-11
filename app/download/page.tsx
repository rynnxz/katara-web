import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { CopyHashButton } from '@/components/ui/CopyHashButton';
import { InstallGuideDialog } from '@/components/ui/InstallGuideDialog';
import { getLatestKataraRelease } from '@/lib/github';
import { generateDownloadQrSvg } from '@/lib/qr';
import { buildBreadcrumbJsonLd } from '@/lib/schema';
import { SITE_CONFIG } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Unduh APK Android Resmi & Verifikasi SHA-256',
  description:
    'Unduh berkas APK resmi KATARA untuk Android beserta paket modul Bahasa Melayu Langkat dan Melayu Palembang. Lengkap dengan checksum SHA-256, QR Code ponsel, dan panduan instalasi.',
  alternates: {
    canonical: '/download',
  },
};

export default async function DownloadPage() {
  const release = await getLatestKataraRelease();
  const qrSvg = await generateDownloadQrSvg(release.apkAsset.downloadUrl);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Unduh APK & Verifikasi', path: '/download' },
  ]);

  const apkHash =
    release.apkAsset.sha256 ||
    '424ddd2dbd6b1bbb3795cc1060869ef74aed3a185fdd6a99e82432bec24eba3e';

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl">
        <span className="inline-block rounded-full border border-[var(--k-primary)] bg-[var(--k-primary-container)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
          Distribusi Langsung GitHub Releases • Terverifikasi Kriptografis
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--k-ink)] sm:text-4xl">
          Unduh KATARA untuk Android &amp; Verifikasi Keaslian Berkas
        </h1>
        <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--k-ink-muted)]">
          Seluruh berkas instalasi dihosting langsung pada repositori resmi{' '}
          <a
            href={`${SITE_CONFIG.repoUrl}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-extrabold text-[var(--k-primary)] underline"
          >
            github.com/rynnxz/KATARA/releases
          </a>{' '}
          tanpa perantara pihak ketiga.
        </p>
      </div>

      {/* Primary APK Card + Desktop QR Code Card */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <section
          aria-labelledby="apk-primary-heading"
          className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6 shadow-[0_6px_0_var(--k-outline)] sm:p-8 lg:col-span-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-[var(--k-success-container)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-on-success-container)]">
              ✓ Rilis Stabil Terbaru ({release.tagName})
            </span>
            <span className="text-xs font-bold text-[var(--k-ink-muted)]">
              Dirilis: {release.publishedDateFormatted}
            </span>
          </div>

          <h2
            id="apk-primary-heading"
            className="mt-4 text-2xl font-black text-[var(--k-ink)] sm:text-3xl"
          >
            {release.name}
          </h2>

          <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4 sm:grid-cols-4">
            <div>
              <dt className="text-xs font-bold text-[var(--k-ink-muted)]">
                Nama Berkas
              </dt>
              <dd className="mt-0.5 truncate font-mono text-xs font-extrabold text-[var(--k-ink)]">
                {release.apkAsset.name}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold text-[var(--k-ink-muted)]">
                Ukuran APK
              </dt>
              <dd className="mt-0.5 text-sm font-black text-[var(--k-ink)]">
                {release.apkAsset.sizeFormatted}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold text-[var(--k-ink-muted)]">
                Sistem Minimum
              </dt>
              <dd className="mt-0.5 text-sm font-black text-[var(--k-ink)]">
                Android 6.0+ (API 24)
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold text-[var(--k-ink-muted)]">
                ID Paket
              </dt>
              <dd className="mt-0.5 font-mono text-xs font-extrabold text-[var(--k-ink)]">
                {SITE_CONFIG.packageId}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={release.apkAsset.downloadUrl}
              rel="noopener"
              className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-2xl bg-[var(--k-primary)] px-6 py-3.5 text-base font-black text-[var(--k-on-primary)] shadow-[0_4px_0_var(--k-primary-dark)] hover:brightness-105"
            >
              <span>
                Unduh Langsung {release.apkAsset.name} (
                {release.apkAsset.sizeFormatted})
              </span>
            </a>

            <InstallGuideDialog
              apkName={release.apkAsset.name}
              apkSha256={apkHash}
            />
          </div>

          {/* SHA-256 Checksum & Terminal Commands */}
          <div className="mt-8 border-t border-[var(--k-outline)]/40 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-black text-[var(--k-ink)]">
                Checksum SHA-256 Berkas APK
              </h3>
              <CopyHashButton value={apkHash} label="Salin SHA-256 APK" />
            </div>

            <pre className="mt-3 overflow-x-auto rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-3.5 font-mono text-xs font-bold text-[var(--k-ink)]">
              <code>{apkHash}</code>
            </pre>

            <p className="mt-4 text-xs font-bold text-[var(--k-ink-muted)]">
              Verifikasi integritas berkas di terminal komputer Anda setelah
              mengunduh:
            </p>
            <div className="mt-2 space-y-2 text-xs">
              <div className="rounded-xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-3 font-mono text-[var(--k-ink)]">
                <span className="block font-sans text-[11px] font-extrabold text-[var(--k-ink-muted)]">
                  Windows PowerShell:
                </span>
                Get-FileHash .\{release.apkAsset.name} -Algorithm SHA256
              </div>
              <div className="rounded-xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-3 font-mono text-[var(--k-ink)]">
                <span className="block font-sans text-[11px] font-extrabold text-[var(--k-ink-muted)]">
                  Linux / macOS:
                </span>
                sha256sum {release.apkAsset.name}
              </div>
            </div>
          </div>
        </section>

        {/* Desktop / Non-Android Visitor Card with QR Code */}
        <aside
          aria-labelledby="qr-download-heading"
          className="flex flex-col justify-between rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6 shadow-[0_6px_0_var(--k-outline)] lg:col-span-4"
        >
          <div>
            <span className="inline-block rounded-full bg-[var(--k-secondary-container)] px-3 py-1 text-xs font-extrabold text-[var(--k-on-secondary-container)]">
              Membuka dari Laptop / PC?
            </span>
            <h2
              id="qr-download-heading"
              className="mt-3 text-xl font-black text-[var(--k-ink)]"
            >
              Pindai QR dari Ponsel Android Anda
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
              KATARA adalah aplikasi Android (<code>.apk</code>). Arahkan kamera
              ponsel Android Anda ke kode QR di bawah ini untuk mengunduh berkas
              APK secara langsung:
            </p>

            {qrSvg && (
              <div
                className="mx-auto my-6 flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-[var(--k-outline)] bg-white p-3 shadow-sm"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            )}
          </div>

          <div className="space-y-3 border-t border-[var(--k-outline)]/40 pt-4">
            <CopyHashButton
              value={release.apkAsset.downloadUrl}
              label="Salin Tautan Unduh APK"
              copiedMessage="Tautan unduh APK tersalin ke papan klip"
              className="w-full"
            />
            <p className="text-center text-xs font-semibold text-[var(--k-ink-muted)]">
              Tautan mengarah langsung ke aset resmi GitHub Releases.
            </p>
          </div>
        </aside>
      </div>

      {/* Downloadable Dialect Modules Section */}
      <section
        aria-labelledby="modules-download-heading"
        className="mt-14 rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6 shadow-[0_5px_0_var(--k-outline)] sm:p-8"
      >
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--k-primary)]">
            Pendekatan A • Arsip Modul Mandiri
          </span>
          <h2
            id="modules-download-heading"
            className="mt-1 text-2xl font-black text-[var(--k-ink)]"
          >
            Paket Modul Bahasa Daerah &amp; Katalog Terverifikasi Ed25519
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Di dalam aplikasi KATARA, modul Melayu Langkat dan Melayu Palembang
            dapat diunduh otomatis melalui menu <strong>Pilih Daerah</strong>.
            Kami juga menyediakan berkas ZIP dan katalog JSON di bawah ini untuk
            audit terbuka dan verifikasi mandiri:
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {release.moduleAssets.map((mod) => (
            <div
              key={mod.name}
              className="flex flex-col justify-between rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-mono text-base font-black text-[var(--k-ink)]">
                    {mod.name}
                  </h3>
                  <span className="rounded-full border border-[var(--k-outline)] bg-[var(--k-surface)] px-3 py-0.5 text-xs font-extrabold text-[var(--k-ink)]">
                    {mod.sizeBytes.toLocaleString('id-ID')} byte (
                    {mod.sizeFormatted})
                  </span>
                </div>
                {mod.sha256 && (
                  <p className="mt-3 break-all rounded-xl border border-[var(--k-outline)] bg-[var(--k-surface)] p-2.5 font-mono text-xs text-[var(--k-ink)]">
                    <strong className="block font-sans text-[11px] text-[var(--k-ink-muted)]">
                      SHA-256:
                    </strong>
                    {mod.sha256}
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={mod.downloadUrl}
                  rel="noopener"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[var(--k-primary)] px-4 py-2 text-xs font-extrabold text-[var(--k-on-primary)]"
                >
                  Unduh {mod.name}
                </a>
                {mod.sha256 && (
                  <CopyHashButton
                    value={mod.sha256}
                    label="Salin SHA-256"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* System Requirements & Platform Availability */}
      <section
        aria-labelledby="sysreq-heading"
        className="mt-12 grid gap-6 md:grid-cols-2"
      >
        <div className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2
            id="sysreq-heading"
            className="text-xl font-black text-[var(--k-ink)]"
          >
            Persyaratan Sistem Android
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm font-semibold text-[var(--k-ink-muted)]">
            <li>
              • <strong className="text-[var(--k-ink)]">Sistem Operasi:</strong>{' '}
              {SITE_CONFIG.minAndroidVersion}
            </li>
            <li>
              • <strong className="text-[var(--k-ink)]">Arsitektur:</strong>{' '}
              ARM64 (arm64-v8a), ARMv7, dan x86_64
            </li>
            <li>
              • <strong className="text-[var(--k-ink)]">Ruang Penyimpanan:</strong>{' '}
              ~100 MB ruang kosong untuk APK utama dan database SQLite lokal
            </li>
            <li>
              • <strong className="text-[var(--k-ink)]">Koneksi Internet:</strong>{' '}
              Tidak diperlukan untuk belajar harian; hanya dipakai saat
              mengunduh modul tambahan (~70 KB) atau mencadangkan progres ke
              cloud.
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2 className="text-xl font-black text-[var(--k-ink)]">
            Status Ketersediaan iOS &amp; Google Play Store
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Saat ini KATARA fokus pada distribusi terbuka untuk perangkat{' '}
            <strong>Android</strong> melalui GitHub Releases resmi agar pelajar,
            guru, dan komunitas penutur dapat langsung memasang aplikasi tanpa
            hambatan biaya.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Versi <strong>iOS</strong> dan pendaftaran di{' '}
            <strong>Google Play Store</strong> direncanakan pada fase
            pengembangan selanjutnya. Pantau perkembangan terbaru melalui{' '}
            <Link
              href="/changelog"
              className="font-extrabold text-[var(--k-primary)] underline"
            >
              halaman Riwayat Rilis
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
