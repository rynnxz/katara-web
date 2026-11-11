import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KATARA - Belajar Bahasa & Budaya Melayu Nusantara',
    short_name: 'KATARA',
    description:
      'Aplikasi belajar Bahasa Melayu Deli, Melayu Langkat, dan Melayu Palembang secara luring (offline-first) lengkap dengan Aksara Jawi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF9EC',
    theme_color: '#186B4C',
    lang: 'id',
    icons: [
      {
        src: '/branding/app_icon_192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/branding/app_icon_512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
