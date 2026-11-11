import type { Metadata } from 'next';
import React from 'react';
import { CopyHashButton } from '@/components/ui/CopyHashButton';
import { buildBreadcrumbJsonLd } from '@/lib/schema';
import { SITE_CONFIG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Arsitektur Keamanan, Verifikasi Ed25519 & Pelaporan Celah',
  description:
    'Dokumentasi keamanan distribusi APK dan modul dialek KATARA: verifikasi tanda tangan digital Ed25519, checksum SHA-256, daftar putih host HTTPS, dan kebijakan pelaporan kerentanan.',
  alternates: {
    canonical: '/security',
  },
};

export default function SecurityPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Keamanan & Verifikasi', path: '/security' },
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <span className="inline-block rounded-full border border-[var(--k-primary)] bg-[var(--k-primary-container)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
        Keamanan Rantai Pasok &amp; Distribusi
      </span>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--k-ink)] sm:text-4xl">
        Arsitektur Keamanan &amp; Kebijakan Pengungkapan Kerentanan
      </h1>
      <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--k-ink-muted)]">
        KATARA menerapkan pertahanan berlapis untuk memastikan berkas APK maupun
        paket modul bahasa daerah yang Anda unduh bebas dari manipulasi pihak
        ketiga.
      </p>

      <div className="mt-8 space-y-6">
        <section className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2 className="text-xl font-black text-[var(--k-ink)]">
            1. Tanda Tangan Kriptografis Ed25519 &amp; Checksum SHA-256
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Setiap paket modul dialek (<code>module_langkat.zip</code> dan{' '}
            <code>module_palembang.zip</code>) serta berkas katalog{' '}
            <code>module_catalog.json</code> dibangun secara deterministik dan
            diverifikasi menggunakan dua lapis pemeriksaan sebelum dipasang:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--k-ink-muted)]">
            <li>
              • <strong>Verifikasi SHA-256:</strong> Aplikasi menghitung digest
              SHA-256 dari setiap byte berkas ZIP yang diunduh dan menolak
              ekstraksi apabila tidak cocok 100% dengan hash katalog.
            </li>
            <li>
              • <strong>Tanda Tangan Digital Ed25519:</strong> Berkas{' '}
              <code>module_catalog.json</code> ditandatangani menggunakan kunci
              privat Ed25519 yang disimpan secara luring di luar repositori, dan
              diverifikasi dengan kunci publik berikut yang tertanam di dalam
              aplikasi:
            </li>
          </ul>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <code className="break-all rounded-xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-3 font-mono text-xs font-bold text-[var(--k-ink)]">
              {SITE_CONFIG.ed25519PublicKey}
            </code>
            <CopyHashButton
              value={SITE_CONFIG.ed25519PublicKey}
              label="Salin Kunci Publik"
              copiedMessage="Kunci publik Ed25519 tersalin ke papan klip"
            />
          </div>
        </section>

        <section className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2 className="text-xl font-black text-[var(--k-ink)]">
            2. Daftar Putih Host HTTPS &amp; Perlindungan Ekstraksi Arsip
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            <li>
              • <strong>Host Allowlist:</strong> Baik situs web ini maupun
              pengunduh di dalam aplikasi hanya mengizinkan URL unduhan HTTPS
              yang mengarah ke <code>github.com/rynnxz/KATARA/releases/download/</code>{' '}
              dan CDN resmi GitHub (<code>objects.githubusercontent.com</code>).
            </li>
            <li>
              • <strong>Anti-Zip-Slip &amp; Batas Ukuran:</strong> Ekstraktor
              modul memvalidasi setiap nama berkas di dalam arsip (menolak{' '}
              <code>..</code>, jalur absolut, atau ekstensi selain{' '}
              <code>.json</code>) dan membatasi ukuran dekompresi untuk mencegah
              serangan <em>zip bomb</em>.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2 className="text-xl font-black text-[var(--k-ink)]">
            3. Melaporkan Celah Keamanan (Responsible Disclosure)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Jika Anda menemukan celah keamanan pada aplikasi Android KATARA,
            aturan Firestore, atau situs web ini, mohon laporkan secara
            bertanggung jawab melalui fitur pelaporan privat GitHub Security
            Advisories:
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={`${SITE_CONFIG.repoUrl}/security/advisories/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[var(--k-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--k-on-primary)]"
            >
              Laporkan via GitHub Security Advisory ↗
            </a>
            <a
              href="/.well-known/security.txt"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface-alt)] px-5 py-2.5 text-sm font-extrabold text-[var(--k-ink)]"
            >
              Lihat /.well-known/security.txt
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
