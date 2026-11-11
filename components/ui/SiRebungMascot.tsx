import React from 'react';

export type MascotMood = 'idle' | 'happy' | 'sad' | 'cheer';

interface SiRebungMascotProps {
  mood?: MascotMood;
  size?: number;
  className?: string;
}

/**
 * Vector SVG implementation of KATARA's mascot **Si Rebung**
 * (tunas rebung memakai tanjak Melayu), mirrored from `lib/app/widgets/mascot_view.dart`.
 */
export function SiRebungMascot({
  mood = 'cheer',
  size = 96,
  className = '',
}: SiRebungMascotProps) {
  const label =
    mood === 'cheer'
      ? 'Si Rebung bersorak bangga'
      : mood === 'happy'
        ? 'Si Rebung tersenyum ramah'
        : mood === 'sad'
          ? 'Si Rebung menyemangati kembali'
          : 'Si Rebung siap menemani belajar';

  const isHappyEye = mood === 'happy' || mood === 'cheer';
  const isSadMouth = mood === 'sad';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={label}
      className={`shrink-0 select-none ${className}`}
    >
      {/* Warm circular backdrop */}
      <circle
        cx="100"
        cy="108"
        r="84"
        fill="var(--k-surface-alt)"
        stroke="var(--k-outline)"
        strokeWidth="3"
      />

      {/* Bamboo shoot body (Hijau Rebung) */}
      <path
        d="M100 32 Q160 90 148 164 Q100 180 52 164 Q40 90 100 32 Z"
        fill="var(--k-primary)"
      />

      {/* Lower bamboo leaves */}
      <path d="M50 124 Q84 144 100 172 L52 164 Z" fill="var(--k-primary-dark)" />
      <path d="M150 124 Q116 144 100 172 L148 164 Z" fill="var(--k-primary-dark)" />

      {/* Warm cream face */}
      <rect x="62" y="80" width="76" height="60" rx="30" fill="#FFF3D6" />

      {/* Malay Tanjak crown (Kuning Diraja + Pita Merah Songket) */}
      <path d="M48 72 L108 26 L154 68 L148 82 L52 82 Z" fill="#F5B700" />
      <rect x="52" y="72" width="96" height="11" rx="4" fill="#A62B2B" />

      {/* Eyes */}
      {isHappyEye ? (
        <>
          <path
            d="M77 104 A7 6 0 0 1 91 104"
            fill="none"
            stroke="#221910"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M109 104 A7 6 0 0 1 123 104"
            fill="none"
            stroke="#221910"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle cx="84" cy="104" r="5.5" fill="#221910" />
          <circle cx="116" cy="104" r="5.5" fill="#221910" />
        </>
      )}

      {/* Mouth */}
      {isSadMouth ? (
        <path
          d="M90 126 Q100 116 110 126"
          fill="none"
          stroke="#221910"
          strokeWidth="5"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M88 118 Q100 130 112 118"
          fill="none"
          stroke="#221910"
          strokeWidth="5"
          strokeLinecap="round"
        />
      )}

      {/* Sparkle stars when cheering */}
      {mood === 'cheer' && (
        <>
          <circle cx="28" cy="52" r="8" fill="var(--k-secondary)" />
          <circle cx="172" cy="48" r="9" fill="var(--k-secondary)" />
        </>
      )}
    </svg>
  );
}
