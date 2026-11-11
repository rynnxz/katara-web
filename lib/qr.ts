import QRCode from 'qrcode';
import { KATARA_PALETTE } from './tokens';

/**
 * Generates an inline SVG string for the given URL at build/SSR time.
 */
export async function generateDownloadQrSvg(url: string): Promise<string> {
  try {
    const svg = await QRCode.toString(url, {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 176,
      color: {
        dark: KATARA_PALETTE.light.ink,
        light: '#FFFFFF',
      },
    });
    return svg;
  } catch {
    return '';
  }
}
