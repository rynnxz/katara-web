import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        katara: {
          bg: 'var(--k-bg)',
          surface: 'var(--k-surface)',
          'surface-alt': 'var(--k-surface-alt)',
          outline: 'var(--k-outline)',
          ink: 'var(--k-ink)',
          'ink-muted': 'var(--k-ink-muted)',
          primary: 'var(--k-primary)',
          'primary-dark': 'var(--k-primary-dark)',
          'on-primary': 'var(--k-on-primary)',
          'primary-container': 'var(--k-primary-container)',
          'on-primary-container': 'var(--k-on-primary-container)',
          secondary: 'var(--k-secondary)',
          'on-secondary': 'var(--k-on-secondary)',
          'secondary-container': 'var(--k-secondary-container)',
          'on-secondary-container': 'var(--k-on-secondary-container)',
          accent: 'var(--k-accent)',
          success: 'var(--k-success)',
          'success-container': 'var(--k-success-container)',
          'on-success-container': 'var(--k-on-success-container)',
          error: 'var(--k-error)',
          'error-container': 'var(--k-error-container)',
          'on-error-container': 'var(--k-on-error-container)',
        },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        jawi: ['var(--font-jawi)', 'serif'],
      },
      borderRadius: {
        card: '1.5rem',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
