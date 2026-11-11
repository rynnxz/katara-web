import Link from 'next/link';
import React from 'react';
import { SiRebungMascot } from '@/components/ui/SiRebungMascot';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <SiRebungMascot mood="sad" size={112} />
      <span className="mt-4 rounded-full border border-[var(--k-outline)] bg-[var(--k-surface-alt)] px-3.5 py-1 text-xs font-extrabold text-[var(--k-ink)]">
        Galat 404 • Halaman Tidak Ditemukan
      </span>
      <h1 className="mt-3 text-3xl font-black text-[var(--k-ink)] sm:text-4xl">
        Alamak, Halaman Ini Tidak Ditemukan
      </h1>
      <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--k-ink-muted)]">
        Tautan yang Anda tuju mungkin telah berpindah atau salah ketik. Mari
        kembali ke beranda atau halaman unduhan resmi bersama Si Rebung.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[var(--k-primary)] px-6 py-3 text-sm font-extrabold text-[var(--k-on-primary)] shadow-[0_4px_0_var(--k-primary-dark)]"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/download"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] px-6 py-3 text-sm font-extrabold text-[var(--k-ink)]"
        >
          Ke Halaman Unduh APK
        </Link>
      </div>
    </div>
  );
}
