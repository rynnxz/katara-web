import type { KataraReleaseInfo } from './github';
import { FAQ_ITEMS, SITE_CONFIG } from './site';

export function buildHomeJsonLd(release: KataraReleaseInfo) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.siteUrl}/#organization`,
        name: 'KATARA (Proyek Pelestarian Bahasa Daerah Budaya Go 2026)',
        url: SITE_CONFIG.siteUrl,
        logo: `${SITE_CONFIG.siteUrl}/branding/app_icon_512.png`,
        sameAs: [SITE_CONFIG.repoUrl, SITE_CONFIG.webRepoUrl],
      },
      {
        '@type': 'MobileApplication',
        '@id': `${SITE_CONFIG.siteUrl}/#application`,
        name: 'KATARA - Belajar Bahasa & Budaya Melayu Nusantara',
        operatingSystem: 'Android 6.0+',
        applicationCategory: 'EducationalApplication',
        inLanguage: 'id-ID',
        softwareVersion: release.tagName.replace(/^v/, ''),
        fileSize: `${release.apkAsset.sizeBytes} bytes`,
        downloadUrl: release.apkAsset.downloadUrl,
        releaseNotes: `${SITE_CONFIG.siteUrl}/changelog`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR',
        },
        author: {
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
        },
        description:
          'Aplikasi belajar bahasa dan budaya Melayu Nusantara (Melayu Deli, Melayu Langkat, Melayu Palembang) secara luring (offline-first) dengan aksara Jawi dan gamifikasi.',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_CONFIG.siteUrl}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_CONFIG.siteUrl}${item.path}`,
    })),
  };
}
