import type { Metadata } from 'next';
import React from 'react';
import { buildBreadcrumbJsonLd } from '@/lib/schema';
import { SITE_CONFIG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi (Offline-First & Cloud Sync Opsional)',
  description:
    'Kebijakan privasi aplikasi Android dan situs web KATARA. Dirancang offline-first dengan database SQLite lokal, minimisasi data pribadi, tanpa iklan atau pelacak.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Kebijakan Privasi', path: '/privacy' },
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <span className="inline-block rounded-full border border-[var(--k-primary)] bg-[var(--k-primary-container)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
        Diperbarui: 11 November 2026
      </span>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--k-ink)] sm:text-4xl">
        Kebijakan Privasi KATARA
      </h1>
      <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--k-ink-muted)]">
        KATARA (<code>{SITE_CONFIG.packageId}</code>) dibangun dengan prinsip{' '}
        <strong>offline-first</strong> dan <strong>minimisasi data</strong>.
        Kami tidak menjual data, tidak menampilkan iklan, dan tidak memasang
        skrip pelacak analitik komersial pihak ketiga.
      </p>

      <div className="mt-8 space-y-6">
        <section className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2 className="text-xl font-black text-[var(--k-ink)]">
            1. Penyimpanan Lokal (Lapis 1 - Tanpa Akun)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Secara bawaan, seluruh progres belajar Anda (jumlah XP, level,
            rentetan hari aktif, koin, penguasaan kata, serta preferensi tema)
            disimpan langsung di perangkat Android Anda menggunakan database{' '}
            <strong>SQLite lokal (drift)</strong> dan{' '}
            <code>SharedPreferences</code>. Data ini tetap berada di perangkat
            Anda dan bekerja penuh tanpa koneksi internet.
          </p>
        </section>

        <section className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2 className="text-xl font-black text-[var(--k-ink)]">
            2. Sinkronisasi Cloud Opsional (Lapis 2 - Firebase)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Apabila Anda memilih untuk mencadangkan progres lintas perangkat,
            KATARA menyediakan fitur masuk opsional menggunakan{' '}
            <strong>Firebase Authentication</strong> (Mode Tamu Anonim atau
            Google Sign-In) dan menyimpan ringkasan progres pada{' '}
            <strong>Cloud Firestore</strong>:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--k-ink-muted)]">
            <li>
              • <strong>Data yang dicadangkan:</strong> ID pengguna unik (
              <code>uid</code>), nama tampilan (bila masuk dengan Google), XP,
              streak, bintang pelajaran, dan kekuatan penguasaan kata.
            </li>
            <li>
              • <strong>Isolasi akses:</strong> Aturan keamanan Firestore (
              <code>firestore.rules</code>) membatasi agar setiap pengguna hanya
              dapat membaca dan menulis dokumen <code>users/&#123;uid&#125;</code>{' '}
              miliknya sendiri.
            </li>
            <li>
              • <strong>Perlindungan penyalahgunaan:</strong> Dilindungi dengan
              Firebase App Check (Google Play Integrity).
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2 className="text-xl font-black text-[var(--k-ink)]">
            3. Unduhan Modul Bahasa Daerah &amp; Notifikasi Lokal
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Ketika Anda mengunduh modul tambahan (Melayu Langkat atau Melayu
            Palembang), aplikasi mengambil arsip ZIP langsung dari{' '}
            <strong>GitHub Releases</strong> resmi tanpa mengirimkan data
            pribadi. Pengingat belajar harian dijadwalkan secara lokal di
            perangkat menggunakan <code>flutter_local_notifications</code> tanpa
            server push eksternal.
          </p>
        </section>

        <section className="rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6">
          <h2 className="text-xl font-black text-[var(--k-ink)]">
            4. Kendali Pengguna &amp; Penghapusan Data
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--k-ink-muted)]">
            Anda dapat menghapus modul dialek tambahan maupun mereset progres
            lokal kapan saja melalui menu <strong>Pengaturan</strong> di dalam
            aplikasi. Untuk pertanyaan terkait privasi, silakan hubungi tim
            pengembang melalui repositori resmi{' '}
            <a
              href={`${SITE_CONFIG.repoUrl}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold text-[var(--k-primary)] underline"
            >
              github.com/rynnxz/KATARA/issues
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
