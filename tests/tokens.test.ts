import { describe, expect, it } from 'vitest';
import {
  DIALECT_IDENTITIES,
  getContrastRatio,
  KATARA_PALETTE,
} from '../lib/tokens';

describe('KATARA Design Tokens & WCAG Contrast Ratios', () => {
  it('maintains >= 7:1 (AAA) contrast for primary and muted body text in light mode', () => {
    const L = KATARA_PALETTE.light;
    expect(getContrastRatio(L.ink, L.bg)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(L.ink, L.surface)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(L.ink, L.surfaceAlt)).toBeGreaterThanOrEqual(7.0);

    expect(getContrastRatio(L.inkMuted, L.bg)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(L.inkMuted, L.surface)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(L.inkMuted, L.surfaceAlt)).toBeGreaterThanOrEqual(7.0);
  });

  it('maintains >= 7:1 (AAA) contrast for primary and muted body text in dark mode', () => {
    const D = KATARA_PALETTE.dark;
    expect(getContrastRatio(D.ink, D.bg)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(D.ink, D.surface)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(D.ink, D.surfaceAlt)).toBeGreaterThanOrEqual(7.0);

    expect(getContrastRatio(D.inkMuted, D.bg)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(D.inkMuted, D.surface)).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(D.inkMuted, D.surfaceAlt)).toBeGreaterThanOrEqual(7.0);
  });

  it('maintains >= 4.5:1 contrast for all interactive buttons and container badges', () => {
    const L = KATARA_PALETTE.light;
    const D = KATARA_PALETTE.dark;

    expect(getContrastRatio(L.onPrimary, L.primary)).toBeGreaterThanOrEqual(4.5);
    expect(
      getContrastRatio(L.onPrimaryContainer, L.primaryContainer)
    ).toBeGreaterThanOrEqual(7.0);
    expect(getContrastRatio(L.onSecondary, L.secondary)).toBeGreaterThanOrEqual(7.0);
    expect(
      getContrastRatio(L.onSecondaryContainer, L.secondaryContainer)
    ).toBeGreaterThanOrEqual(7.0);
    expect(
      getContrastRatio(L.onSuccessContainer, L.successContainer)
    ).toBeGreaterThanOrEqual(7.0);
    expect(
      getContrastRatio(L.onErrorContainer, L.errorContainer)
    ).toBeGreaterThanOrEqual(7.0);

    expect(getContrastRatio(D.onPrimary, D.primary)).toBeGreaterThanOrEqual(7.0);
    expect(
      getContrastRatio(D.onPrimaryContainer, D.primaryContainer)
    ).toBeGreaterThanOrEqual(7.0);
    expect(
      getContrastRatio(D.onSecondaryContainer, D.secondaryContainer)
    ).toBeGreaterThanOrEqual(7.0);
    expect(
      getContrastRatio(D.onSuccessContainer, D.successContainer)
    ).toBeGreaterThanOrEqual(7.0);
    expect(
      getContrastRatio(D.onErrorContainer, D.errorContainer)
    ).toBeGreaterThanOrEqual(7.0);
  });

  it('maintains >= 3:1 non-text contrast for outlines and dialect borders', () => {
    const L = KATARA_PALETTE.light;
    const D = KATARA_PALETTE.dark;

    expect(getContrastRatio(L.outline, L.bg)).toBeGreaterThanOrEqual(3.0);
    expect(getContrastRatio(L.outline, L.surface)).toBeGreaterThanOrEqual(3.0);
    expect(getContrastRatio(D.outline, D.bg)).toBeGreaterThanOrEqual(3.0);
    expect(getContrastRatio(D.outline, D.surface)).toBeGreaterThanOrEqual(3.0);

    for (const dialect of Object.values(DIALECT_IDENTITIES)) {
      expect(
        getContrastRatio(dialect.onAccentLight, dialect.accentContainerLight)
      ).toBeGreaterThanOrEqual(7.0);
      expect(
        getContrastRatio(dialect.onAccentDark, dialect.accentContainerDark)
      ).toBeGreaterThanOrEqual(7.0);
      expect(
        getContrastRatio(dialect.borderAccentLight, L.surface)
      ).toBeGreaterThanOrEqual(3.0);
      expect(
        getContrastRatio(dialect.borderAccentDark, D.surface)
      ).toBeGreaterThanOrEqual(3.0);
    }
  });
});
