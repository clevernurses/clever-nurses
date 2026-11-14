import type { Accent } from '../data/types';

// Literal class strings so Tailwind can see them at build time.
export const ACCENT: Record<Accent, { fill: string; tint: string; deep: string; ring: string; hex: string; tintHex: string; deepHex: string }> = {
  teal: { fill: 'bg-teal-mid', tint: 'bg-teal-tint', deep: 'text-teal', ring: 'ring-teal', hex: '#4FB3A2', tintHex: '#DDF1EC', deepHex: '#1F7A6F' },
  coral: { fill: 'bg-coral', tint: 'bg-coral-tint', deep: 'text-coral-deep', ring: 'ring-coral', hex: '#E07A5F', tintHex: '#FBE4DB', deepHex: '#A9472F' },
  sun: { fill: 'bg-sun', tint: 'bg-sun-tint', deep: 'text-sun-deep', ring: 'ring-sun', hex: '#F2C14E', tintHex: '#FCF1D2', deepHex: '#8A6411' },
  lav: { fill: 'bg-lav', tint: 'bg-lav-tint', deep: 'text-lav-deep', ring: 'ring-lav', hex: '#9A8FD8', tintHex: '#ECE9F9', deepHex: '#5546A3' },
  sky: { fill: 'bg-sky', tint: 'bg-sky-tint', deep: 'text-sky-deep', ring: 'ring-sky', hex: '#6FA8DC', tintHex: '#E2EEF9', deepHex: '#2C6496' },
};
