import type { Metadata, Viewport } from 'next';
import { Noto_Naskh_Arabic, Nunito } from 'next/font/google';
import React from 'react';
import { Footer } from '@/components/sections/Footer';
import { HeaderNav } from '@/components/sections/HeaderNav';
import { SITE_CONFIG } from '@/lib/site';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-nunito',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-jawi',
});

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();
const bingVerification = process.env.NEXT_PUBLIC_BING_VERIFICATION?.trim();

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF9EC' },
    { media: '(prefers-color-scheme: dark)', color: '#15110C' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: 'KATARA - Aplikasi Belajar Bahasa & Budaya Melayu Nusantara (Android)',
    template: '%s | KATARA',
  },
  description:
    'Belajar Bahasa Melayu Deli, Melayu Langkat, dan Melayu Palembang secara luring (offline-first) di Android. 980 kosakata terkurasi, Aksara Jawi, kuis interaktif, gratis tanpa iklan.',
  applicationName: 'KATARA',
  keywords: [
    'KATARA',
    'belajar bahasa Melayu',
    'bahasa Melayu Deli',
    'bahasa Melayu Langkat',
    'bahasa Melayu Palembang',
    'aksara Jawi',
    'aplikasi bahasa daerah Android',
    'Budaya Go 2026',
  ],
  authors: [{ name: 'Tim Pengembang KATARA', url: SITE_CONFIG.repoUrl }],
  creator: 'Tim Pengembang KATARA',
  publisher: 'KATARA (Budaya Go 2026)',
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_CONFIG.siteUrl,
    siteName: 'KATARA',
    title: 'KATARA - Belajar Bahasa & Budaya Melayu Nusantara (Android)',
    description:
      'Aplikasi belajar Bahasa Melayu Deli, Langkat, dan Palembang berbasis 24 rujukan ilmiah Balai Bahasa. Bekerja 100% luring di Android, dilengkapi Aksara Jawi dan gamifikasi bersama Si Rebung.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KATARA - Belajar Bahasa & Budaya Melayu Nusantara',
    description:
      '980 kosakata terkurasi, 30 dialog, 330 kuis, dan Aksara Jawi dalam aplikasi Android offline-first. Unduh APK resmi terverifikasi SHA-256.',
  },
  verification: {
    ...(gscVerification ? { google: gscVerification } : {}),
    ...(bingVerification
      ? { other: { 'msvalidate.01': bingVerification } }
      : {}),
  },
};

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('katara-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var useDark = saved === 'dark' || (!saved && prefersDark);
    var root = document.documentElement;
    if (useDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${nunito.variable} ${notoNaskhArabic.variable}`}
    >
      <head>
        {/* MANDATORY: Declare support for both light and dark themes per modern-web-guidance */}
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-[var(--k-bg)] font-sans text-[var(--k-ink)] antialiased">
        <a href="#main-content" className="skip-link">
          Langsung ke konten utama
        </a>
        <HeaderNav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
