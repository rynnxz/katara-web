'use client';

import React, { useState } from 'react';

interface CopyHashButtonProps {
  value: string;
  label?: string;
  copiedMessage?: string;
  className?: string;
}

/**
 * Interactive button that copies a SHA-256 checksum or URL to the clipboard
 * and announces confirmation via an M3-styled snackbar (`role="status"`).
 */
export function CopyHashButton({
  value,
  label = 'Salin SHA-256',
  copiedMessage = 'SHA-256 tersalin ke papan klip',
  className = '',
}: CopyHashButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3200);
    } catch {
      // Fallback for restricted clipboard environments
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3200);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] px-4 py-2.5 text-sm font-extrabold text-[var(--k-ink)] transition hover:bg-[var(--k-primary-container)] hover:text-[var(--k-on-primary-container)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--k-primary)] ${className}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4 shrink-0 fill-current"
        >
          {copied ? (
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
          ) : (
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
          )}
        </svg>
        <span>{copied ? 'Tersalin!' : label}</span>
      </button>

      {/* Accessible M3 Snackbar notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-24 left-1/2 z-50 -translate-x-1/2 transition-all duration-200 md:bottom-8 ${
          copied
            ? ' pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        {copied && (
          <div className="flex items-center gap-2.5 rounded-2xl border-2 border-[var(--k-primary)] bg-[var(--k-ink)] px-5 py-3 text-sm font-extrabold text-[var(--k-bg)] shadow-lg">
            <span aria-hidden="true">✓</span>
            <span>{copiedMessage}</span>
          </div>
        )}
      </div>
    </>
  );
}
