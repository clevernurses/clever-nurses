/** CleveRNurses design tokens. Keep in sync with src/data/designTokens.ts */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF8F3',
        paper: '#FFFFFF',
        ink: { DEFAULT: '#1C2333', soft: '#4A5163', mute: '#5B6170' },
        line: '#E7E1D7',
        teal: { DEFAULT: '#1F7A6F', mid: '#4FB3A2', tint: '#DDF1EC' },
        coral: { DEFAULT: '#E07A5F', deep: '#A9472F', tint: '#FBE4DB' },
        sun: { DEFAULT: '#F2C14E', deep: '#8A6411', tint: '#FCF1D2' },
        lav: { DEFAULT: '#9A8FD8', deep: '#5546A3', tint: '#ECE9F9' },
        sky: { DEFAULT: '#6FA8DC', deep: '#2C6496', tint: '#E2EEF9' },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { xl2: '1.25rem', xl3: '1.75rem' },
      boxShadow: {
        card: '0 1px 0 rgba(28,35,51,.04), 0 8px 24px -12px rgba(28,35,51,.18)',
        lift: '0 2px 0 rgba(28,35,51,.04), 0 22px 40px -18px rgba(28,35,51,.28)',
      },
      keyframes: {
        float: { '0%,100%': { translate: '0 0' }, '50%': { translate: '0 -8px' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: { float: 'float 7s ease-in-out infinite', fadeUp: 'fadeUp .35s ease both' },
    },
  },
  plugins: [],
};
