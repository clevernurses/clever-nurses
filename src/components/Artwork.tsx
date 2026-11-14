import type { Resource } from '../data/types';
import { ACCENT } from '../lib/accent';

// Any image dropped into src/art/ is picked up at build time, keyed by base file name.
const files = import.meta.glob('../art/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const byBase: Record<string, string> = {};
Object.entries(files).forEach(([path, url]) => {
  const base = path.split('/').pop()!.replace(/\.(png|jpe?g|webp)$/i, '');
  byBase[base] = url;
});

export function artworkUrl(r: Resource): string | undefined {
  if (!r.artwork) return undefined;
  return byBase[r.artwork.file.replace(/\.(png|jpe?g|webp)$/i, '')];
}

/**
 * Original infographic in a fixed frame. The frame keeps the card proportions (5:4 for cards);
 * the art is scaled with object-contain so portrait and landscape pieces never crop or stretch.
 * When the file isn't available yet, a clearly labeled placeholder shows instead.
 */
export function Artwork({ r, size = 'card' }: { r: Resource; size?: 'card' | 'large' }) {
  const a = ACCENT[r.accent];
  const url = artworkUrl(r);
  const big = size === 'large';
  const portrait = (r.artwork?.ratio ?? 8.5 / 11) < 1;

  return (
    <div className={`relative flex ${big ? 'aspect-[4/3.6]' : 'aspect-[5/4]'} items-center justify-center overflow-hidden rounded-2xl ${a.tint} ${big ? 'p-6 sm:p-10' : 'p-3.5'}`}>
      {url ? (
        // Right-click, drag-to-save and iOS long-press menus are blocked on artwork only.
        // This deters casual saving; it can't prevent screenshots.
        <img src={url} alt={r.artwork?.alt ?? r.title} loading="lazy" decoding="async" draggable={false}
          onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}
          className="protected-art h-full w-full select-none rounded-lg object-contain drop-shadow-[0_8px_18px_rgba(28,35,51,.18)]" />
      ) : (
        <div role="img" aria-label={`Original artwork for ${r.title} not yet added`}
          className={`flex h-full ${portrait ? 'aspect-[8.5/11]' : 'aspect-[11/8.5] max-w-full'} max-h-full flex-col rounded-md bg-paper p-[6%] shadow-[0_8px_18px_-6px_rgba(28,35,51,.25)] ring-1 ring-ink/5`}>
          <span className={`block h-1.5 w-8 rounded-full ${a.fill}`} />
          <span className={`mt-[8%] block font-display font-semibold leading-tight text-ink ${big ? 'text-2xl sm:text-3xl' : 'text-[13px]'}`}>{r.title}</span>
          <span className="mt-auto flex flex-col gap-1">
            {[78, 62, 70].map((w) => <span key={w} className="block h-1 rounded-full bg-ink/10" style={{ width: `${w}%` }} />)}
          </span>
          <span className={`mt-[8%] block font-mono uppercase tracking-[.12em] text-ink-mute ${big ? 'text-[11px]' : 'text-[8.5px]'}`}>Original art · file pending</span>
        </div>
      )}
    </div>
  );
}
