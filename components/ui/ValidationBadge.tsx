import React from 'react';

export type ValidationStatusType =
  | 'speaker_checked'
  | 'dictionary_verified'
  | 'draft';

interface ValidationBadgeProps {
  status: ValidationStatusType;
  className?: string;
}

/**
 * Honest scientific validation badge matching the KATARA Android app (`ValidationStatusBadge`).
 * Uses both distinct iconography and high-contrast text (WCAG 1.4.1 & 1.4.3).
 */
export function ValidationBadge({ status, className = '' }: ValidationBadgeProps) {
  if (status === 'speaker_checked') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--k-success)] bg-[var(--k-success-container)] px-3 py-1 text-xs font-extrabold text-[var(--k-on-success-container)] ${className}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 shrink-0 fill-current"
        >
          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
        </svg>
        <span>Dicek Penutur</span>
      </span>
    );
  }

  if (status === 'dictionary_verified') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--k-outline)] bg-[var(--k-secondary-container)] px-3 py-1 text-xs font-extrabold text-[var(--k-on-secondary-container)] ${className}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 shrink-0 fill-current"
        >
          <path d="M2 2.75A1.75 1.75 0 0 1 3.75 1h8.5A1.75 1.75 0 0 1 14 2.75v10.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25V2.75Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25h-8.5Z" />
        </svg>
        <span>Sumber Kamus</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--k-outline)] bg-[var(--k-surface-alt)] px-3 py-1 text-xs font-extrabold text-[var(--k-ink)] ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 shrink-0 fill-current"
      >
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8.5-3.25a.75.75 0 0 0-1.5 0v3.5c0 .199.079.39.22.53l2 2a.75.75 0 1 0 1.06-1.06L8.5 7.94V4.75Z" />
      </svg>
      <span>Draf • Perlu Tinjauan</span>
    </span>
  );
}
