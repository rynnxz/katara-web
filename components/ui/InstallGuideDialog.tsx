'use client';

import React, { useEffect, useRef } from 'react';

interface InstallGuideDialogProps {
  apkName: string;
  apkSha256: string | null;
}

/**
 * Modal installation guide built on the native `<dialog>` element.
 * Follows `modern-web-guidance` dialog guidelines:
 * - Opened via `dialog.showModal()` (no manual `role="dialog"` or `aria-modal` needed).
 * - Uses `closedby="any"` with pointer bounding-rect light-dismiss fallback for browsers without `closedBy`.
 * - Closes with `<form method="dialog">` and restores focus automatically to the invoker button.
 */
export function InstallGuideDialog({
  apkName,
  apkSha256,
}: InstallGuideDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Fallback for browsers where `closedby="any"` is not yet supported
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      let pressedOutside = false;
      const isOutside = (e: PointerEvent) => {
        const rect = dialog.getBoundingClientRect();
        return (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        );
      };
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = isOutside(e);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && isOutside(e)) {
          dialog.close();
        }
      };
      dialog.addEventListener('pointerdown', onPointerDown);
      dialog.addEventListener('pointerup', onPointerUp);
      return () => {
        dialog.removeEventListener('pointerdown', onPointerDown);
        dialog.removeEventListener('pointerup', onPointerUp);
      };
    }
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] px-5 py-3 text-base font-extrabold text-[var(--k-ink)] shadow-[0_4px_0_var(--k-outline)] transition active:translate-y-[2px] active:shadow-[0_2px_0_var(--k-outline)] hover:bg-[var(--k-surface-alt)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--k-primary)]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-5 w-5 fill-current text-[var(--k-primary)]"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
            clipRule="evenodd"
          />
        </svg>
        <span>Panduan Pasang APK (4 Langkah)</span>
      </button>

      {/* MANDATORY: no role="dialog" or aria-modal; the native modal already provides them */}
      <dialog
        ref={dialogRef}
        id="install-guide-dialog"
        aria-labelledby="install-guide-title"
        closedby="any"
        className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-3xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] p-6 text-[var(--k-ink)] shadow-2xl backdrop:bg-black/60"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--k-outline)]/40 pb-4">
          <div>
            <span className="inline-block rounded-full bg-[var(--k-primary-container)] px-3 py-1 text-xs font-extrabold text-[var(--k-on-primary-container)]">
              Pemasangan Langsung Android
            </span>
            <h2
              id="install-guide-title"
              className="mt-2 text-xl font-extrabold text-[var(--k-ink)]"
            >
              Cara Memasang {apkName} di Android
            </h2>
          </div>
          <form method="dialog">
            <button
              type="submit"
              autoFocus
              aria-label="Tutup panduan pemasangan"
              className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl border-2 border-[var(--k-outline)] bg-[var(--k-surface-alt)] text-sm font-extrabold text-[var(--k-ink)] hover:bg-[var(--k-primary-container)]"
            >
              ✕
            </button>
          </form>
        </div>

        <ol className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--k-ink)]">
          <li className="rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4">
            <p className="font-extrabold text-[var(--k-ink)]">
              1. Unduh berkas APK resmi dari GitHub Releases
            </p>
            <p className="mt-1 text-[var(--k-ink-muted)]">
              Ketuk tombol <strong>Unduh APK</strong> untuk mengunduh berkas{' '}
              <code className="rounded bg-[var(--k-surface)] px-1.5 py-0.5 font-mono text-xs">
                {apkName}
              </code>{' '}
              langsung dari server resmi GitHub.
            </p>
          </li>

          <li className="rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4">
            <p className="font-extrabold text-[var(--k-ink)]">
              2. Izinkan pemasangan dari peramban Anda (bila diminta)
            </p>
            <p className="mt-1 text-[var(--k-ink-muted)]">
              Karena APK diunduh langsung di luar Play Store, Android akan
              menampilkan dialog konfirmasi{' '}
              <em>&quot;Izinkan pemasangan aplikasi dari sumber ini&quot;</em>.
              Aktifkan izin sementara untuk peramban Anda.
            </p>
          </li>

          <li className="rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4">
            <p className="font-extrabold text-[var(--k-ink)]">
              3. Konfirmasi Google Play Protect (bila muncul)
            </p>
            <p className="mt-1 text-[var(--k-ink-muted)]">
              Jika muncul peringatan aplikasi pengembang independen, pilih{' '}
              <strong>Detail selengkapnya</strong> lalu ketuk{' '}
              <strong>Tetap instal</strong>. Anda dapat memverifikasi keaslian
              berkas dengan mencocokkan nilai SHA-256:
            </p>
            {apkSha256 && (
              <p className="mt-2 break-all rounded-lg border border-[var(--k-outline)] bg-[var(--k-surface)] p-2 font-mono text-xs text-[var(--k-ink)]">
                {apkSha256}
              </p>
            )}
          </li>

          <li className="rounded-2xl border border-[var(--k-outline)] bg-[var(--k-surface-alt)] p-4">
            <p className="font-extrabold text-[var(--k-ink)]">
              4. Buka KATARA dan mulai belajar tanpa internet!
            </p>
            <p className="mt-1 text-[var(--k-ink-muted)]">
              Materi <strong>Bahasa Melayu Deli</strong> langsung tersedia
              secara luring. Untuk menambah <strong>Melayu Langkat</strong> atau{' '}
              <strong>Melayu Palembang</strong>, buka menu{' '}
              <strong>Pilih Daerah</strong> di dalam aplikasi.
            </p>
          </li>
        </ol>

        <form method="dialog" className="mt-6 flex justify-end">
          <button
            type="submit"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[var(--k-primary)] px-6 py-3 text-sm font-extrabold text-[var(--k-on-primary)] shadow-[0_4px_0_var(--k-primary-dark)]"
          >
            Mengerti, Tutup Panduan
          </button>
        </form>
      </dialog>
    </>
  );
}
