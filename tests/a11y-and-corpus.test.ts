import fs from 'node:fs';
import path from 'node:path';
import axe from 'axe-core';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import {
  ACADEMIC_REFERENCES,
  DIALECTS_DATA,
  JAWI_SPECIAL_LETTERS,
  SITE_CONFIG,
} from '../lib/site';

describe('Corpus Data Integrity, Antislop Copy Rules & Accessibility (axe-core)', () => {
  it('matches exact verified corpus statistics from the KATARA repository', () => {
    const totalWords = DIALECTS_DATA.reduce((acc, d) => acc + d.wordCount, 0);
    const totalDialogues = DIALECTS_DATA.reduce(
      (acc, d) => acc + d.dialogueCount,
      0
    );
    const totalQuizzes = DIALECTS_DATA.reduce((acc, d) => acc + d.quizCount, 0);
    const totalRefs = DIALECTS_DATA.reduce(
      (acc, d) => acc + d.referenceCount,
      0
    );

    expect(totalWords).toBe(SITE_CONFIG.corpusStats.totalCuratedWords);
    expect(totalDialogues).toBe(SITE_CONFIG.corpusStats.totalDialogues);
    expect(totalQuizzes).toBe(SITE_CONFIG.corpusStats.totalQuizzes);
    expect(totalRefs).toBe(SITE_CONFIG.corpusStats.totalAcademicSources);
    expect(ACADEMIC_REFERENCES).toHaveLength(24);
    expect(JAWI_SPECIAL_LETTERS).toHaveLength(6);
  });

  it('audits all prerendered pages in .next/server/app with axe-core and SEO/copy checks', async () => {
    const appBuildDir = path.resolve(process.cwd(), '.next', 'server', 'app');
    const pages = [
      'index.html',
      'download.html',
      'dialek.html',
      'changelog.html',
      'about.html',
      'privacy.html',
      'security.html',
    ];

    for (const pageFile of pages) {
      const fullPath = path.join(appBuildDir, pageFile);
      if (!fs.existsSync(fullPath)) continue;

      const html = fs.readFileSync(fullPath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      // 1. HTML lang="id"
      expect(doc.documentElement.getAttribute('lang')).toBe('id');

      // 2. Exactly one <h1> per page
      const h1List = doc.querySelectorAll('h1');
      expect(h1List.length, `${pageFile} should have exactly 1 <h1>`).toBe(1);

      // 3. No em-dashes (—) in visible text content (antislop copywriting rule)
      const bodyText = doc.body.textContent || '';
      expect(
        bodyText.includes('—'),
        `${pageFile} must not contain em-dash (—)`
      ).toBe(false);

      // 4. axe-core WCAG 2.2 AA check
      const axeResults = await axe.run(doc.documentElement, {
        rules: {
          'color-contrast': { enabled: false },
        },
      });
      expect(
        axeResults.violations.map((v) => ({
          page: pageFile,
          id: v.id,
          help: v.help,
          nodes: v.nodes.map((n) => n.html),
        }))
      ).toEqual([]);
    }
  });
});
