import Link from 'next/link';
import React from 'react';
import { SITE_CONFIG } from '@/lib/site';
import { SiRebungMascot } from '../ui/SiRebungMascot';

export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--k-outline)]/60 bg-[var(--k-surface-alt)] pb-24 pt-12 text-[var(--k-ink)] md:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <SiRebungMascot mood="cheer" size={52} />
              <div>
                <p className="text-xl font-black text-[var(--k-ink)]">
                  KATARA ({SITE_CONFIG.packageId})
                </p>
                <p className="text-sm font-bold text-[var(--k-ink-muted)]">
                  Pelestarian Bahasa &amp; Budaya Melayu Nusantara
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--k-ink-muted)]">
              Aplikasi pembelajaran bahasa daerah bergaya interaktif yang bekerja
              100% luring (offline-first) di perangkat Android. Mencakup Bahasa
              Melayu Deli (bawaan APK), Melayu Langkat, dan Melayu Palembang
              berbasis 24 rujukan ilmiah Balai Bahasa serta perguruan tinggi.
            </p>
            <div className="mt-4 rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface)] p-3 text-xs text-[var(--k-ink-muted)]">
              <p className="font-extrabold text-[var(--k-ink)]">
                Kunci Publik Ed25519 Katalog Modul:
              </p>
              <code className="mt-1 block break-all font-mono text-[11px] text-[var(--k-ink)]">
                {SITE_CONFIG.ed25519PublicKey}
              </code>
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-sm font-black uppercase tracking-wider text-[var(--k-ink)]">
              Navigasi Situs
            </h2>
            <ul className="mt-3 space-y-2 text-sm font-bold">
              <li>
                <Link href="/" className="hover:underline">
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:underline">
                  Unduh APK &amp; Verifikasi SHA-256
                </Link>
              </li>
              <li>
                <Link href="/dialek" className="hover:underline">
                  Eksplorasi 3 Dialek Melayu
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:underline">
                  Riwayat Rilis (Changelog)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  Tentang, Metodologi &amp; 24 Rujukan
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-[var(--k-ink)]">
              Keamanan, Privasi &amp; Kode Sumber
            </h2>
            <ul className="mt-3 space-y-2 text-sm font-bold">
              <li>
                <Link href="/privacy" className="hover:underline">
                  Kebijakan Privasi (Offline-First &amp; Cloud Sync)
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:underline">
                  Arsitektur Keamanan &amp; Pelaporan Celah
                </Link>
              </li>
              <li>
                <a
                  href="/.well-known/security.txt"
                  className="hover:underline"
                >
                  /.well-known/security.txt
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Repositori Aplikasi Android (rynnxz/KATARA) ↗
                </a>
              </li>
              <li>
                <a
                  href={`${SITE_CONFIG.repoUrl}/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub Releases Resmi ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--k-outline)]/40 pt-6 text-xs font-bold text-[var(--k-ink-muted)] sm:flex-row sm:items-center">
          <p>
            © 2026 KATARA (Budaya Go 2026). Bebas iklan, tanpa pelacak analitik
            komersial.
          </p>
          <p>
            Font UI: Nunito (OFL) • Aksara Jawi: Noto Naskh Arabic (OFL)
          </p>
        </div>
      </div>
    </footer>
  );
}
