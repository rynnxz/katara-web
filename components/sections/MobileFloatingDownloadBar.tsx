import React from 'react';

interface MobileFloatingDownloadBarProps {
  downloadUrl: string;
  tagName: string;
  sizeFormatted: string;
}

/**
 * Compact floating bottom CTA bar on mobile screens (`md:hidden`).
 * Paired with `pb-24` on the footer so no content is ever obscured.
 */
export function MobileFloatingDownloadBar({
  downloadUrl,
  tagName,
  sizeFormatted,
}: MobileFloatingDownloadBarProps) {
  return (
    <aside
      aria-label="Unduh cepat APK Android"
      className="fixed bottom-0 left-0 right-0 z-30 border-t-2 border-[var(--k-outline)] bg-[var(--k-surface)]/95 px-4 py-2.5 shadow-2xl backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-black text-[var(--k-ink)]">
            KATARA {tagName} • Android APK
          </p>
          <p className="truncate text-[11px] font-bold text-[var(--k-ink-muted)]">
            {sizeFormatted} • Terverifikasi SHA-256
          </p>
        </div>
        <a
          href={downloadUrl}
          rel="noopener"
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-xl bg-[var(--k-primary)] px-4 py-2.5 text-sm font-extrabold text-[var(--k-on-primary)] shadow-[0_3px_0_var(--k-primary-dark)]"
        >
          Unduh APK
        </a>
      </div>
    </aside>
  );
}
