import { SITE_CONFIG } from './site';

export interface ReleaseAssetInfo {
  name: string;
  sizeBytes: number;
  sizeFormatted: string;
  downloadUrl: string;
  contentType: string;
  sha256: string | null;
  updatedAt: string;
}

export interface KataraReleaseInfo {
  tagName: string;
  name: string;
  publishedAt: string;
  publishedDateFormatted: string;
  htmlUrl: string;
  bodyMarkdown: string;
  bodyHtmlSanitized: string;
  apkAsset: ReleaseAssetInfo;
  moduleAssets: ReleaseAssetInfo[];
  catalogAsset: ReleaseAssetInfo | null;
  isFallback: boolean;
}

interface GitHubApiAsset {
  name?: unknown;
  size?: unknown;
  browser_download_url?: unknown;
  content_type?: unknown;
  digest?: unknown;
  updated_at?: unknown;
}

interface GitHubApiRelease {
  tag_name?: unknown;
  name?: unknown;
  published_at?: unknown;
  html_url?: unknown;
  body?: unknown;
  draft?: unknown;
  prerelease?: unknown;
  assets?: unknown;
}

const ALLOWED_DOWNLOAD_PREFIX = `https://github.com/${SITE_CONFIG.repoOwner}/${SITE_CONFIG.repoName}/releases/download/`;
const ALLOWED_HTML_URL_PREFIX = `https://github.com/${SITE_CONFIG.repoOwner}/${SITE_CONFIG.repoName}/releases/`;

/**
 * Formats byte size into human-readable Indonesian string (e.g. "65,2 MB" or "69,7 KB").
 */
export function formatBytesId(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B';
  }
  if (bytes >= 1024 * 1024) {
    const mb = (bytes / (1024 * 1024)).toFixed(1).replace('.', ',');
    return `${mb} MB`;
  }
  if (bytes >= 1024) {
    const kb = (bytes / 1024).toFixed(1).replace('.', ',');
    return `${kb} KB`;
  }
  return `${bytes} B`;
}

/**
 * Formats ISO date string into Indonesian date (e.g. "11 November 2026").
 */
export function formatDateId(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return '11 November 2026';
  }
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/**
 * Validates that a download URL strictly points to the official GitHub Releases asset prefix.
 */
export function isTrustedReleaseAssetUrl(url: string): boolean {
  if (typeof url !== 'string' || !url.startsWith(ALLOWED_DOWNLOAD_PREFIX)) {
    return false;
  }
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'https:' &&
      parsed.hostname === 'github.com' &&
      parsed.pathname.startsWith(`/${SITE_CONFIG.repoOwner}/${SITE_CONFIG.repoName}/releases/download/`) &&
      !parsed.pathname.includes('..')
    );
  } catch {
    return false;
  }
}

/**
 * Extracts a lowercase 64-char hex SHA-256 from GitHub's `digest` field ("sha256:...")
 * or from a `SHA256SUMS.txt` map.
 */
export function extractSha256(
  assetName: string,
  digestField: unknown,
  sha256SumsMap?: Map<string, string>
): string | null {
  if (sha256SumsMap && sha256SumsMap.has(assetName)) {
    const fromMap = sha256SumsMap.get(assetName)!;
    if (/^[0-9a-f]{64}$/i.test(fromMap)) {
      return fromMap.toLowerCase();
    }
  }
  if (typeof digestField === 'string') {
    const trimmed = digestField.trim();
    const match = /^sha256:([0-9a-f]{64})$/i.exec(trimmed);
    if (match) {
      return match[1].toLowerCase();
    }
  }
  return null;
}

/**
 * Parses standard `SHA256SUMS.txt` content (`<hash>  <filename>` or `<hash> *<filename>`).
 */
export function parseSha256SumsText(content: string): Map<string, string> {
  const map = new Map<string, string>();
  if (typeof content !== 'string') {
    return map;
  }
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const match = /^([0-9a-fA-F]{64})\s+\*?([^\s/\\]+)$/.exec(line);
    if (match) {
      map.set(match[2], match[1].toLowerCase());
    }
  }
  return map;
}

/**
 * Escapes HTML special characters to prevent XSS.
 */
export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Converts release notes Markdown into safe, sanitized HTML without executing raw HTML or scripts.
 */
export function renderSafeReleaseNotesHtml(markdown: string): string {
  if (typeof markdown !== 'string' || !markdown.trim()) {
    return '<p>Tidak ada catatan rilis tambahan.</p>';
  }

  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const htmlParts: string[] = [];
  let inList = false;

  const formatInline = (text: string): string => {
    const escaped = escapeHtml(text);
    return escaped
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      continue;
    }

    if (line.startsWith('### ')) {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      htmlParts.push(`<h4>${formatInline(line.slice(4))}</h4>`);
    } else if (line.startsWith('## ')) {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      htmlParts.push(`<h3>${formatInline(line.slice(3))}</h3>`);
    } else if (line.startsWith('# ')) {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      htmlParts.push(`<h3>${formatInline(line.slice(2))}</h3>`);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        htmlParts.push('<ul>');
        inList = true;
      }
      htmlParts.push(`<li>${formatInline(line.slice(2))}</li>`);
    } else {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      htmlParts.push(`<p>${formatInline(line)}</p>`);
    }
  }

  if (inList) {
    htmlParts.push('</ul>');
  }

  return htmlParts.join('\n');
}

/**
 * Verified static fallback release matching live GitHub Release `v1.1.0`.
 */
export const FALLBACK_LATEST_RELEASE: KataraReleaseInfo = {
  tagName: 'v1.1.0',
  name: 'KATARA v1.1.0 - Ekspansi Multi-Dialek Melayu (Deli, Langkat, Palembang)',
  publishedAt: '2026-11-11T00:37:37Z',
  publishedDateFormatted: '11 November 2026',
  htmlUrl: 'https://github.com/rynnxz/KATARA/releases/tag/v1.1.0',
  bodyMarkdown:
    'Rilis produksi KATARA v1.1.0 dengan modul bawaan Melayu Deli serta modul unduhan mandiri Melayu Langkat & Melayu Palembang.\n\n- Bundel luring penuh Bahasa Melayu Deli (364 kata, 16 unit, 64 pelajaran, kamus, dan Aksara Jawi).\n- Unduhan modul mandiri Bahasa Melayu Langkat (71.391 byte) dan Bahasa Melayu Palembang (74.307 byte) dengan verifikasi tanda tangan Ed25519 serta SHA-256.\n- Peningkatan kontras warna WCAG AA+ di seluruh komponen terang maupun gelap.',
  bodyHtmlSanitized: renderSafeReleaseNotesHtml(
    'Rilis produksi KATARA v1.1.0 dengan modul bawaan Melayu Deli serta modul unduhan mandiri Melayu Langkat & Melayu Palembang.\n\n- Bundel luring penuh Bahasa Melayu Deli (364 kata, 16 unit, 64 pelajaran, kamus, dan Aksara Jawi).\n- Unduhan modul mandiri Bahasa Melayu Langkat (71.391 byte) dan Bahasa Melayu Palembang (74.307 byte) dengan verifikasi tanda tangan Ed25519 serta SHA-256.\n- Peningkatan kontras warna WCAG AA+ di seluruh komponen terang maupun gelap.'
  ),
  apkAsset: {
    name: 'katara-v1.1.0-release.apk',
    sizeBytes: 68407621,
    sizeFormatted: '65,2 MB',
    downloadUrl:
      'https://github.com/rynnxz/KATARA/releases/download/v1.1.0/katara-v1.1.0-release.apk',
    contentType: 'application/vnd.android.package-archive',
    sha256: 'd329304b3cc468b9307e632be437ad9d5c26e648d4eee41345b4d56c6f480d84',
    updatedAt: '2026-11-11T00:37:36Z',
  },
  moduleAssets: [
    {
      name: 'module_langkat.zip',
      sizeBytes: 71391,
      sizeFormatted: '69,7 KB',
      downloadUrl:
        'https://github.com/rynnxz/KATARA/releases/download/v1.1.0/module_langkat.zip',
      contentType: 'application/zip',
      sha256: '3ed866afaeb72c1354d4927e651ca9c7fd1e4adf21d6810e462dacbb58562f6f',
      updatedAt: '2026-11-11T07:56:03Z',
    },
    {
      name: 'module_palembang.zip',
      sizeBytes: 74307,
      sizeFormatted: '72,6 KB',
      downloadUrl:
        'https://github.com/rynnxz/KATARA/releases/download/v1.1.0/module_palembang.zip',
      contentType: 'application/zip',
      sha256: 'f75c27e1f28c06bece0cfe5a6deea6f40d40457b614a986d431dde22cabc2095',
      updatedAt: '2026-11-11T07:56:03Z',
    },
  ],
  catalogAsset: {
    name: 'module_catalog.json',
    sizeBytes: 2302,
    sizeFormatted: '2,2 KB',
    downloadUrl:
      'https://github.com/rynnxz/KATARA/releases/download/v1.1.0/module_catalog.json',
    contentType: 'application/json',
    sha256: '12e574ae6e244916562a4ec93105fa048cabdf9607abc7a4d1e849352cf2389b',
    updatedAt: '2026-11-11T07:56:03Z',
  },
  isFallback: true,
};

/**
 * Normalizes and validates a raw GitHub release payload into a safe `KataraReleaseInfo` object.
 * Returns `null` if no valid `.apk` asset with a trusted GitHub download URL is present.
 */
export function normalizeGitHubRelease(
  raw: GitHubApiRelease,
  sha256SumsMap?: Map<string, string>
): KataraReleaseInfo | null {
  if (!raw || typeof raw !== 'object') return null;
  if (raw.draft === true) return null;

  const tagName = typeof raw.tag_name === 'string' && raw.tag_name.trim() ? raw.tag_name.trim() : '';
  if (!tagName) return null;

  const name =
    typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : `KATARA ${tagName}`;
  const publishedAt =
    typeof raw.published_at === 'string' && raw.published_at.trim()
      ? raw.published_at.trim()
      : '2026-11-11T00:37:37Z';

  const rawHtmlUrl = typeof raw.html_url === 'string' ? raw.html_url.trim() : '';
  const htmlUrl = rawHtmlUrl.startsWith(ALLOWED_HTML_URL_PREFIX)
    ? rawHtmlUrl
    : `https://github.com/${SITE_CONFIG.repoOwner}/${SITE_CONFIG.repoName}/releases/tag/${encodeURIComponent(tagName)}`;

  const rawAssets = Array.isArray(raw.assets) ? (raw.assets as GitHubApiAsset[]) : [];
  const validAssets: ReleaseAssetInfo[] = [];

  for (const item of rawAssets) {
    if (!item || typeof item !== 'object') continue;
    const assetName = typeof item.name === 'string' ? item.name.trim() : '';
    const downloadUrl =
      typeof item.browser_download_url === 'string' ? item.browser_download_url.trim() : '';
    const sizeBytes = typeof item.size === 'number' && item.size >= 0 ? item.size : 0;

    if (!assetName || !isTrustedReleaseAssetUrl(downloadUrl)) {
      continue;
    }

    const sha256 = extractSha256(assetName, item.digest, sha256SumsMap);
    validAssets.push({
      name: assetName,
      sizeBytes,
      sizeFormatted: formatBytesId(sizeBytes),
      downloadUrl,
      contentType:
        typeof item.content_type === 'string'
          ? item.content_type
          : 'application/octet-stream',
      sha256,
      updatedAt:
        typeof item.updated_at === 'string' ? item.updated_at : publishedAt,
    });
  }

  // Deterministic APK selection: prefer *-release.apk or arm64/universal .apk
  const apkCandidates = validAssets.filter((a) => a.name.toLowerCase().endsWith('.apk'));
  if (apkCandidates.length === 0) {
    return null;
  }
  apkCandidates.sort((a, b) => {
    const aPreferred = a.name.includes('release') ? 0 : 1;
    const bPreferred = b.name.includes('release') ? 0 : 1;
    if (aPreferred !== bPreferred) return aPreferred - bPreferred;
    return a.name.localeCompare(b.name);
  });
  const apkAsset = apkCandidates[0];

  const moduleAssets = validAssets
    .filter((a) => /^module_[a-z0-9_]+\.zip$/i.test(a.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  const catalogAsset =
    validAssets.find((a) => a.name === 'module_catalog.json') || null;

  const bodyMarkdown =
    typeof raw.body === 'string' && raw.body.trim()
      ? raw.body.trim()
      : FALLBACK_LATEST_RELEASE.bodyMarkdown;

  return {
    tagName,
    name,
    publishedAt,
    publishedDateFormatted: formatDateId(publishedAt),
    htmlUrl,
    bodyMarkdown,
    bodyHtmlSanitized: renderSafeReleaseNotesHtml(bodyMarkdown),
    apkAsset,
    moduleAssets:
      moduleAssets.length > 0 ? moduleAssets : FALLBACK_LATEST_RELEASE.moduleAssets,
    catalogAsset: catalogAsset ?? FALLBACK_LATEST_RELEASE.catalogAsset,
    isFallback: false,
  };
}

function buildGitHubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'KATARA-Web-Vercel/1.1.0',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Fetches all public releases from GitHub API with ISR (`revalidate: 3600`).
 * Falls back cleanly to `FALLBACK_LATEST_RELEASE` on network error or rate limit.
 */
export async function getKataraReleases(
  customFetch: typeof fetch = fetch
): Promise<KataraReleaseInfo[]> {
  const url = `https://api.github.com/repos/${SITE_CONFIG.repoOwner}/${SITE_CONFIG.repoName}/releases?per_page=10`;
  try {
    const response = await customFetch(url, {
      headers: buildGitHubHeaders(),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [FALLBACK_LATEST_RELEASE];
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
      return [FALLBACK_LATEST_RELEASE];
    }

    const parsedReleases: KataraReleaseInfo[] = [];
    for (const rawRelease of data) {
      // Optional: check if SHA256SUMS.txt asset exists on the release
      let sha256Map: Map<string, string> | undefined;
      if (rawRelease && typeof rawRelease === 'object' && Array.isArray((rawRelease as GitHubApiRelease).assets)) {
        const sumsAsset = ((rawRelease as GitHubApiRelease).assets as GitHubApiAsset[]).find(
          (a) =>
            typeof a?.name === 'string' &&
            (a.name === 'SHA256SUMS.txt' || a.name.endsWith('.sha256')) &&
            typeof a?.browser_download_url === 'string' &&
            isTrustedReleaseAssetUrl(a.browser_download_url)
        );
        if (sumsAsset && typeof sumsAsset.browser_download_url === 'string') {
          try {
            const sumsResp = await customFetch(sumsAsset.browser_download_url, {
              next: { revalidate: 3600 },
            });
            if (sumsResp.ok) {
              const sumsText = await sumsResp.text();
              sha256Map = parseSha256SumsText(sumsText);
            }
          } catch {
            // Ignore SHA256SUMS fetch error and fall back to GitHub asset `digest` field
          }
        }
      }

      const normalized = normalizeGitHubRelease(rawRelease as GitHubApiRelease, sha256Map);
      if (normalized) {
        parsedReleases.push(normalized);
      }
    }

    return parsedReleases.length > 0 ? parsedReleases : [FALLBACK_LATEST_RELEASE];
  } catch {
    return [FALLBACK_LATEST_RELEASE];
  }
}

/**
 * Returns the latest verified release for `/` and `/download`.
 */
export async function getLatestKataraRelease(
  customFetch: typeof fetch = fetch
): Promise<KataraReleaseInfo> {
  const releases = await getKataraReleases(customFetch);
  return releases[0] ?? FALLBACK_LATEST_RELEASE;
}
