export interface KataraThemeTokens {
  primary: string;
  primaryDark: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  accent: string;
  bg: string;
  surface: string;
  surfaceAlt: string;
  outline: string;
  ink: string;
  inkMuted: string;
  success: string;
  successContainer: string;
  onSuccessContainer: string;
  warning: string;
  error: string;
  errorContainer: string;
  onErrorContainer: string;
  streak: string;
  xp: string;
  coin: string;
}

export interface DialectIdentityToken {
  courseId: 'ms-deli' | 'ms-langkat' | 'ms-palembang';
  shortLabel: string;
  regionSubtitle: string;
  ornamentLabel: string;
  accentColor: string;
  accentContainerLight: string;
  accentContainerDark: string;
  onAccentLight: string;
  onAccentDark: string;
  borderAccentLight: string;
  borderAccentDark: string;
}

/**
 * Exact design tokens mirrored from `lib/app/theme/katara_colors.dart`.
 */
export const KATARA_PALETTE: {
  light: KataraThemeTokens;
  dark: KataraThemeTokens;
} = {
  light: {
    primary: '#186B4C',
    primaryDark: '#114D36',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E2F5EC',
    onPrimaryContainer: '#0D3B29',
    secondary: '#F5B700',
    onSecondary: '#221910',
    secondaryContainer: '#FFF0BD',
    onSecondaryContainer: '#221910',
    accent: '#A62B2B',
    bg: '#FFF9EC',
    surface: '#FFFFFF',
    surfaceAlt: '#F6EEDC',
    outline: '#786954',
    ink: '#221910',
    inkMuted: '#4A3E2D',
    success: '#1B6B3A',
    successContainer: '#DCF5E4',
    onSuccessContainer: '#0F3D22',
    warning: '#B87A00',
    error: '#B8251E',
    errorContainer: '#FCE4E4',
    onErrorContainer: '#5C1111',
    streak: '#FF7A18',
    xp: '#3B82F6',
    coin: '#F5B700',
  },
  dark: {
    primary: '#3FBF8A',
    primaryDark: '#2C9A6C',
    onPrimary: '#0F1F18',
    primaryContainer: '#132E23',
    onPrimaryContainer: '#CFFAE6',
    secondary: '#FFC933',
    onSecondary: '#221910',
    secondaryContainer: '#3D2E05',
    onSecondaryContainer: '#FFE799',
    accent: '#E0605F',
    bg: '#15110C',
    surface: '#211B14',
    surfaceAlt: '#2C241A',
    outline: '#8C7D68',
    ink: '#F8F1E3',
    inkMuted: '#D8CCB8',
    success: '#4CD08A',
    successContainer: '#123321',
    onSuccessContainer: '#C6F7DC',
    warning: '#FFB547',
    error: '#FF6B6B',
    errorContainer: '#3D1414',
    onErrorContainer: '#FFCDD2',
    streak: '#FF8F3D',
    xp: '#60A5FA',
    coin: '#FFC933',
  },
};

export const DIALECT_IDENTITIES: Record<
  'ms-deli' | 'ms-langkat' | 'ms-palembang',
  DialectIdentityToken
> = {
  'ms-deli': {
    courseId: 'ms-deli',
    shortLabel: 'Melayu Deli',
    regionSubtitle: 'Medan, Labuhan Deli & Deli Serdang',
    ornamentLabel: 'Motif Pucuk Rebung Kesultanan Deli',
    accentColor: '#F5B700',
    accentContainerLight: '#FFF4CC',
    accentContainerDark: '#3A2B04',
    onAccentLight: '#3B2800',
    onAccentDark: '#FFE599',
    borderAccentLight: '#7A5700',
    borderAccentDark: '#FFC933',
  },
  'ms-langkat': {
    courseId: 'ms-langkat',
    shortLabel: 'Melayu Langkat',
    regionSubtitle: 'Tanjung Pura, Stabat & Pesisir Langkat',
    ornamentLabel: 'Motif Tampuk Manggis Songket Langkat',
    accentColor: '#186B4C',
    accentContainerLight: '#DFF5EB',
    accentContainerDark: '#0F2E22',
    onAccentLight: '#0C3D2A',
    onAccentDark: '#B8F2D8',
    borderAccentLight: '#186B4C',
    borderAccentDark: '#3FBF8A',
  },
  'ms-palembang': {
    courseId: 'ms-palembang',
    shortLabel: 'Melayu Palembang',
    regionSubtitle: 'Seberang Ilir, Seberang Ulu & Tepian Musi',
    ornamentLabel: 'Motif Songket Lepus Sriwijaya Palembang',
    accentColor: '#8B1E24',
    accentContainerLight: '#FCE8E9',
    accentContainerDark: '#381013',
    onAccentLight: '#4F0D11',
    onAccentDark: '#FFC9CC',
    borderAccentLight: '#8B1E24',
    borderAccentDark: '#F28B8F',
  },
};

/**
 * Parses a 6-digit hex color string (`#RRGGBB`) into RGB [0..255] channels.
 */
export function parseHexColor(hex: string): [number, number, number] {
  const clean = hex.trim().replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return [r, g, b];
}

/**
 * Computes WCAG 2.x relative luminance for an RGB color.
 */
export function getRelativeLuminance(hex: string): number {
  const [r, g, b] = parseHexColor(hex).map((channel) => {
    const sRGB = channel / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Computes WCAG 2.x contrast ratio between two hex colors (1.0 to 21.0).
 */
export function getContrastRatio(foregroundHex: string, backgroundHex: string): number {
  const l1 = getRelativeLuminance(foregroundHex);
  const l2 = getRelativeLuminance(backgroundHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
