import type { IconName } from '../data/types';

const PATHS: Record<IconName, string> = {
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  lungs: 'M12 4v8M12 12c-1 1-2.5 1.5-3 0V7c0-1-1-2-2-1-2 2-3 6-3 10 0 2 1 3 3 3s3-1 3-3v-4M12 12c1 1 2.5 1.5 3 0V7c0-1 1-2 2-1 2 2 3 6 3 10 0 2-1 3-3 3s-3-1-3-3v-4',
  brain: 'M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3V4z',
  stomach: 'M9 3v4c0 2-4 2-4 7a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6c0-3-2-4-4-4s-3 1-3 3',
  kidney: 'M15 4c3 0 5 3 4 7-1 5-5 9-9 9-3 0-5-2-5-5 0-2 2-3 3-5s1-6 7-6zM11 12h4',
  gland: 'M12 4c-4 0-7 3-7 7 0 5 7 9 7 9s7-4 7-9c0-4-3-7-7-7zM9 11h6M12 8v6',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  shield: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6zM9 12l2 2 4-4',
  bone: 'M7 17l10-10M5 15a2 2 0 1 0 2 4 2 2 0 1 0 2-2M19 9a2 2 0 1 0-2-4 2 2 0 1 0-2 2',
  skin: 'M4 8c3-2 5 2 8 0s5-2 8 0M4 13c3-2 5 2 8 0s5-2 8 0M4 18c3-2 5 2 8 0s5-2 8 0',
  venus: 'M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 14v7M9 18h6',
  baby: 'M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM6 21c0-4 3-7 6-7s6 3 6 7M10 6h.01M14 6h.01',
  smile: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 10h.01M15 10h.01M8.5 14.5a4 4 0 0 0 7 0',
  mind: 'M12 21v-4M8 17h8M7 17c-2-1-3-3-3-6a8 8 0 0 1 16 0c0 3-1 5-3 6M10 9a2 2 0 1 1 4 0c0 1.5-2 1.5-2 3',
  pill: 'M10.5 20.5a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 7zM8.5 8.5l7 7',
  book: 'M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z',
  pulse: 'M3 12h4l2-5 4 10 2-5h6',
  siren: 'M12 3v3M5 7l2 2M19 7l-2 2M6 19v-5a6 6 0 0 1 12 0v5M4 19h16',
  check: 'M5 12l5 5L20 7',
  flag: 'M5 21V4h11l-2 4 2 4H5',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z',
  steth: 'M6 3v6a4 4 0 0 0 8 0V3M10 13v3a4 4 0 0 0 8 0v-2M18 12a2 2 0 1 0 0-.01',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  close: 'M6 6l12 12M18 6L6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6',
  map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
};

export function Icon({ name, size = 22, className = '', strokeWidth = 1.9 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={PATHS[name]} />
    </svg>
  );
}
