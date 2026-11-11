'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SiRebungMascot } from '../ui/SiRebungMascot';

const NAV_ITEMS = [
  { href: '/', label: 'Beranda' },
  { href: '/dialek', label: '3 Dialek Melayu' },
  { href: '/download', label: 'Unduh & Verifikasi' },
  { href: '/changelog', label: 'Riwayat Rilis' },
  { href: '/security', label: 'Keamanan' },
  { href: '/about', label: 'Tentang & Riset' },
] as const;

export function HeaderNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      const saved = window.localStorage.getItem('katara-theme');
      if (!saved) {
        const nextTheme = e.matches ? 'dark' : 'light';
        root.classList.toggle('dark', nextTheme === 'dark');
        root.style.colorScheme = nextTheme;
        setTheme(nextTheme);
      }
    };
    media.addEventListener('change', handleMediaChange);
    return () => media.removeEventListener('change', handleMediaChange);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.classList.toggle('dark', nextTheme === 'dark');
    root.style.colorScheme = nextTheme;
    try {
      window.localStorage.setItem('katara-theme', nextTheme);
    } catch {
      // Ignore storage restrictions
    }
    setTheme(nextTheme);
  }

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--k-outline)]/50 bg-[var(--k-bg)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl py-1 pr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--k-primary)]"
        >
          <SiRebungMascot mood="happy" size={44} />
          <div>
            <span className="block text-xl font-black tracking-tight text-[var(--k-ink)]">
              KATARA
            </span>
            <span className="block text-xs font-bold text-[var(--k-ink-muted)]">
              Bahasa &amp; Budaya Melayu
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex min-h-[44px] items-center rounded-full px-3.5 py-2 text-sm font-extrabold transition ${
                  active
                    ? 'border border-[var(--k-primary)] bg-[var(--k-primary-container)] text-[var(--k-on-primary-container)]'
                    : 'text-[var(--k-ink)] hover:bg-[var(--k-surface-alt)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Beralih ke tema terang Kertas Lontar'
                : 'Beralih ke tema gelap Malam Songket'
            }
            aria-pressed={theme === 'dark'}
            className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] px-3 text-sm font-extrabold text-[var(--k-ink)] transition hover:bg-[var(--k-surface-alt)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--k-primary)]"
          >
            {theme === 'dark' ? (
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true">☀</span>
                <span className="hidden sm:inline">Terang</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true">☾</span>
                <span className="hidden sm:inline">Gelap</span>
              </span>
            )}
          </button>

          <Link
            href="/download"
            className="hidden min-h-[48px] items-center justify-center rounded-2xl bg-[var(--k-primary)] px-4 py-2.5 text-sm font-extrabold text-[var(--k-on-primary)] shadow-[0_4px_0_var(--k-primary-dark)] transition hover:brightness-105 active:translate-y-[2px] active:shadow-[0_2px_0_var(--k-primary-dark)] sm:inline-flex"
          >
            Unduh APK
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border-2 border-[var(--k-outline)] bg-[var(--k-surface)] text-base font-extrabold text-[var(--k-ink)] lg:hidden"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Navigasi seluler"
          className="border-t-2 border-[var(--k-outline)]/50 bg-[var(--k-surface)] px-4 py-4 lg:hidden"
        >
          <ul className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-[48px] items-center rounded-2xl px-4 py-2.5 text-base font-extrabold ${
                      active
                        ? 'border border-[var(--k-primary)] bg-[var(--k-primary-container)] text-[var(--k-on-primary-container)]'
                        : 'text-[var(--k-ink)] hover:bg-[var(--k-surface-alt)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 pt-3 border-t border-[var(--k-outline)]/40">
            <Link
              href="/download"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-[var(--k-primary)] px-4 py-3 text-base font-extrabold text-[var(--k-on-primary)] shadow-[0_4px_0_var(--k-primary-dark)]"
            >
              Unduh APK Android Resmi
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
