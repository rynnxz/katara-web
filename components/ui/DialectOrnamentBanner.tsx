import React from 'react';

interface DialectOrnamentBannerProps {
  courseId: 'ms-deli' | 'ms-langkat' | 'ms-palembang';
  className?: string;
}

/**
 * Renders the geometric cultural ornament for each Malay dialect,
 * mirrored from `lib/app/widgets/pattern_background.dart`:
 * - `ms-deli`: Pucuk Rebung Kesultanan Deli
 * - `ms-langkat`: Tampuk Manggis Songket Langkat
 * - `ms-palembang`: Songket Lepus Bunga Cina Sriwijaya
 */
export function DialectOrnamentBanner({
  courseId,
  className = '',
}: DialectOrnamentBannerProps) {
  const patternId = `ornament-${courseId}`;

  return (
    <svg
      aria-hidden="true"
      className={`h-12 w-full select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          {courseId === 'ms-deli' && (
            <g stroke="currentColor" strokeWidth="1.6" fill="none">
              <polygon points="24,6 41,42 7,42" />
              <polygon points="24,18 33,36 15,36" />
              <line x1="24" y1="6" x2="24" y2="42" />
            </g>
          )}
          {courseId === 'ms-langkat' && (
            <g stroke="currentColor" strokeWidth="1.6" fill="none">
              <polygon points="24,6 42,24 24,42 6,24" />
              <rect x="16" y="16" width="16" height="16" />
              <circle cx="24" cy="24" r="2.2" fill="currentColor" />
            </g>
          )}
          {courseId === 'ms-palembang' && (
            <g stroke="currentColor" strokeWidth="1.6" fill="none">
              <polygon points="24,5 43,24 24,43 5,24" />
              <line x1="14" y1="24" x2="34" y2="24" />
              <line x1="24" y1="14" x2="24" y2="34" />
              <circle cx="24" cy="24" r="2.5" fill="currentColor" />
            </g>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
