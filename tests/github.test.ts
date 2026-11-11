import { describe, expect, it } from 'vitest';
import {
  extractSha256,
  FALLBACK_LATEST_RELEASE,
  getKataraReleases,
  isTrustedReleaseAssetUrl,
  normalizeGitHubRelease,
  parseSha256SumsText,
  renderSafeReleaseNotesHtml,
} from '../lib/github';

describe('lib/github.ts security & release normalization', () => {
  it('validates download URLs against strict GitHub Releases allowlist', () => {
    expect(
      isTrustedReleaseAssetUrl(
        'https://github.com/rynnxz/KATARA/releases/download/v1.1.0/katara-v1.1.0-release.apk'
      )
    ).toBe(true);

    // Reject HTTP, untrusted hosts, other repositories, or path traversal
    expect(
      isTrustedReleaseAssetUrl(
        'http://github.com/rynnxz/KATARA/releases/download/v1.1.0/app.apk'
      )
    ).toBe(false);
    expect(
      isTrustedReleaseAssetUrl(
        'https://evil.example.com/rynnxz/KATARA/releases/download/v1.1.0/app.apk'
      )
    ).toBe(false);
    expect(
      isTrustedReleaseAssetUrl(
        'https://github.com/otheruser/KATARA/releases/download/v1.1.0/app.apk'
      )
    ).toBe(false);
    expect(
      isTrustedReleaseAssetUrl(
        'https://github.com/rynnxz/KATARA/releases/download/../../evil.apk'
      )
    ).toBe(false);
  });

  it('extracts SHA-256 from SHA256SUMS.txt or GitHub digest field', () => {
    const validHash =
      'd329304b3cc468b9307e632be437ad9d5c26e648d4eee41345b4d56c6f480d84';
    const sumsText = [
      '# KATARA release checksums',
      `${validHash}  katara-v1.1.0-release.apk`,
      '3ed866afaeb72c1354d4927e651ca9c7fd1e4adf21d6810e462dacbb58562f6f *module_langkat.zip',
    ].join('\n');

    const map = parseSha256SumsText(sumsText);
    expect(map.get('katara-v1.1.0-release.apk')).toBe(validHash);
    expect(map.get('module_langkat.zip')).toBe(
      '3ed866afaeb72c1354d4927e651ca9c7fd1e4adf21d6810e462dacbb58562f6f'
    );

    expect(
      extractSha256('katara-v1.1.0-release.apk', undefined, map)
    ).toBe(validHash);
    expect(
      extractSha256('other.apk', `sha256:${validHash.toUpperCase()}`)
    ).toBe(validHash);
    expect(extractSha256('missing.apk', 'md5:12345')).toBeNull();
  });

  it('sanitizes release notes Markdown and strips raw HTML / XSS vectors', () => {
    const maliciousMarkdown = [
      '## Rilis Baru',
      '- Perbaikan `ModuleDownloadService` dan **kontras**',
      '<script>alert("xss")</script>',
      '<img src=x onerror=alert(1)>',
    ].join('\n');

    const html = renderSafeReleaseNotesHtml(maliciousMarkdown);
    expect(html).toContain('<h3>Rilis Baru</h3>');
    expect(html).toContain('<code>ModuleDownloadService</code>');
    expect(html).toContain('<strong>kontras</strong>');
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;script&gt;');
  });

  it('rejects releases whose APK URL points outside official GitHub Releases', () => {
    const untrustedRelease = normalizeGitHubRelease({
      tag_name: 'v9.9.9',
      name: 'Spoofed Release',
      draft: false,
      assets: [
        {
          name: 'katara-release.apk',
          size: 123456,
          browser_download_url: 'https://attacker.example.com/katara-release.apk',
        },
      ],
    });
    expect(untrustedRelease).toBeNull();
  });

  it('parses valid GitHub API responses and falls back cleanly on error or rate limit', async () => {
    const mockSuccessFetch = (async () =>
      new Response(
        JSON.stringify([
          {
            tag_name: 'v1.1.0',
            name: 'KATARA v1.1.0',
            published_at: '2026-11-11T00:37:37Z',
            html_url: 'https://github.com/rynnxz/KATARA/releases/tag/v1.1.0',
            body: '- Rilis utama',
            draft: false,
            assets: [
              {
                name: 'katara-v1.1.0-release.apk',
                size: 68407621,
                browser_download_url:
                  'https://github.com/rynnxz/KATARA/releases/download/v1.1.0/katara-v1.1.0-release.apk',
                digest:
                  'sha256:d329304b3cc468b9307e632be437ad9d5c26e648d4eee41345b4d56c6f480d84',
              },
            ],
          },
        ]),
        { status: 200 }
      )) as unknown as typeof fetch;

    const releases = await getKataraReleases(mockSuccessFetch);
    expect(releases).toHaveLength(1);
    expect(releases[0].isFallback).toBe(false);
    expect(releases[0].apkAsset.sha256).toBe(
      'd329304b3cc468b9307e632be437ad9d5c26e648d4eee41345b4d56c6f480d84'
    );

    const mockRateLimitedFetch = (async () =>
      new Response('Rate limit exceeded', { status: 403 })) as unknown as typeof fetch;

    const fallbackReleases = await getKataraReleases(mockRateLimitedFetch);
    expect(fallbackReleases).toHaveLength(1);
    expect(fallbackReleases[0].isFallback).toBe(true);
    expect(fallbackReleases[0].tagName).toBe(FALLBACK_LATEST_RELEASE.tagName);
  });
});
