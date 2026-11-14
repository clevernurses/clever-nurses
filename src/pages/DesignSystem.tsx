import { Icon } from '../components/Icon';
import { Thumbnail } from '../components/Thumbnail';
import { RESOURCES } from '../data/resources';
import type { IconName } from '../data/types';

const CORE = [
  { name: 'Ivory', hex: '#FBF8F3', role: 'Page background', cls: 'bg-ivory ring-1 ring-line' },
  { name: 'Paper', hex: '#FFFFFF', role: 'Cards, panels', cls: 'bg-paper ring-1 ring-line' },
  { name: 'Ink', hex: '#1C2333', role: 'Text, primary buttons', cls: 'bg-ink' },
  { name: 'Ink Soft', hex: '#4A5163', role: 'Body copy', cls: 'bg-ink-soft' },
  { name: 'Line', hex: '#E7E1D7', role: 'Borders, dividers', cls: 'bg-line' },
];
const ACCENTS = [
  { name: 'Teal', fill: '#4FB3A2', tint: '#DDF1EC', deep: '#1F7A6F', use: 'Pharmacology, safety, links & focus', f: 'bg-teal-mid', t: 'bg-teal-tint' },
  { name: 'Coral', fill: '#E07A5F', tint: '#FBE4DB', deep: '#A9472F', use: 'Cardiac, critical care, maternal', f: 'bg-coral', t: 'bg-coral-tint' },
  { name: 'Sun', fill: '#F2C14E', tint: '#FCF1D2', deep: '#8A6411', use: 'Students, NCLEX, prioritization', f: 'bg-sun', t: 'bg-sun-tint' },
  { name: 'Lavender', fill: '#9A8FD8', tint: '#ECE9F9', deep: '#5546A3', use: 'Mental health, advanced practice', f: 'bg-lav', t: 'bg-lav-tint' },
  { name: 'Sky', fill: '#6FA8DC', tint: '#E2EEF9', deep: '#2C6496', use: 'Neuro, respiratory, reasoning', f: 'bg-sky', t: 'bg-sky-tint' },
];
const ICONS: IconName[] = ['heart', 'lungs', 'brain', 'kidney', 'pill', 'mind', 'pulse', 'steth', 'drop', 'shield', 'baby', 'compass'];

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-14">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <div><p className="font-mono text-xs text-teal">{n}</p><h2 className="mt-1 text-2xl font-semibold">{title}</h2></div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function DesignSystemPage() {
  return (
    <div className="wrap pt-14">
      <p className="eyebrow mb-4">Design system · v1</p>
      <h1 className="text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[1]">Editorial calm, <span className="text-teal">clever</span> color.</h1>
      <p className="mt-6 max-w-2xl text-lg text-ink-soft">Direction: Editorial Minimalism (60%) + Playful Learning Studio (25%) + Modern Visual Library (15%). Lots of ivory space and big type, so the colorful learning visuals are what you notice first.</p>

      <Block n="01" title="Color">
        <p className="mb-4 text-sm text-ink-soft">Neutrals carry the page. Accents are used only for learning content and topic coding, never as large background washes. Accent fills always take Ink text; the “deep” shades are for small colored text and pass 4.5:1 on their tints.</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {CORE.map((c) => (
            <div key={c.name}><div className={`h-20 rounded-2xl ${c.cls}`} /><p className="mt-2 text-sm font-semibold">{c.name}</p><p className="font-mono text-xs text-ink-mute">{c.hex}</p><p className="text-xs text-ink-soft">{c.role}</p></div>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-5">
          {ACCENTS.map((a) => (
            <div key={a.name} className="overflow-hidden rounded-2xl ring-1 ring-line">
              <div className={`h-14 ${a.f}`} /><div className={`h-8 ${a.t}`} />
              <div className="bg-paper p-3 text-xs">
                <p className="text-sm font-semibold">{a.name}</p>
                <p className="font-mono text-ink-mute">fill {a.fill}<br />tint {a.tint}<br />deep {a.deep}</p>
                <p className="mt-1 text-ink-soft">{a.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block n="02" title="Typography">
        <div className="space-y-6">
          <div><p className="eyebrow">Display · Outfit 600 · tight tracking</p><p className="font-display text-6xl font-semibold leading-none tracking-tight">Make it click.</p></div>
          <div><p className="eyebrow">Heading · Outfit 600 · 28–36px</p><p className="font-display text-3xl font-semibold">Mania vs. Hypomania</p></div>
          <div><p className="eyebrow">Body · DM Sans 400/600 · 16–20px · 1.55 line height</p><p className="max-w-xl text-lg">Left-sided heart failure backs up into the lungs. Watch for dyspnea, orthopnea and crackles.</p></div>
          <div><p className="eyebrow">Label · IBM Plex Mono 500 · uppercase · 11–12px</p><p className="font-mono text-xs uppercase tracking-[.14em]">Differentiation map · Intermediate</p></div>
        </div>
      </Block>

      <Block n="03" title="Buttons & chips">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn-primary">Primary action</button>
          <button type="button" className="btn-secondary">Secondary</button>
          <button type="button" className="btn-ghost">Text link button</button>
          <span className="chip bg-teal-tint text-teal">Free</span>
          <span className="chip bg-ink text-ivory"><Icon name="lock" size={12} />Premium · planned</span>
          <span className="chip bg-sun-tint text-sun-deep">Sample · in development</span>
        </div>
        <p className="mt-4 text-sm text-ink-soft">Pills, at least 44px tall. Primary is ink and turns teal on hover. Every action goes somewhere real; placeholders are labeled as placeholders.</p>
      </Block>

      <Block n="04" title="Cards & thumbnails">
        <div className="grid gap-4 sm:grid-cols-3">
          {RESOURCES.slice(1, 4).map((r) => <Thumbnail key={r.slug} r={r} />)}
        </div>
        <p className="mt-4 text-sm text-ink-soft">Each learning format has its own thumbnail layout (ladder, side-by-side, chain, range bar, ✓/✕), so people can recognize the format before they read it. Radii: cards 28px, thumbnails 16px, chips full.</p>
      </Block>

      <Block n="05" title="Spacing & layout">
        <div className="flex flex-wrap items-end gap-3">
          {[4, 8, 12, 16, 24, 32, 48, 64, 112].map((s) => (
            <div key={s} className="text-center"><div className="rounded bg-teal-mid" style={{ width: s, height: s }} /><p className="mt-1 font-mono text-[10px] text-ink-mute">{s}</p></div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-soft">4px base unit. Content max-width 1152px with 20–32px side padding. Sections are separated by 112px of space rather than heavy colored bands.</p>
      </Block>

      <Block n="06" title="Iconography & illustration">
        <div className="flex flex-wrap gap-3">
          {ICONS.map((i) => <span key={i} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper ring-1 ring-line"><Icon name={i} /></span>)}
        </div>
        <p className="mt-4 text-sm text-ink-soft">1.9px rounded line icons on a 24px grid. Illustrations reuse the same line and flat accent fills, plus one motif: the EKG pulse line and a hand-drawn underline. No stock photos.</p>
      </Block>

      <Block n="07" title="Responsive & motion">
        <ul className="grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
          <li className="rounded-2xl bg-paper p-4 ring-1 ring-line"><strong className="text-ink">Breakpoints:</strong> 640 / 768 / 1024 / 1280. Grids collapse 3 → 2 → 1, and the nav becomes a menu below 1280.</li>
          <li className="rounded-2xl bg-paper p-4 ring-1 ring-line"><strong className="text-ink">Hover:</strong> cards lift 4px and thumbnails tilt slightly. Arrows nudge forward.</li>
          <li className="rounded-2xl bg-paper p-4 ring-1 ring-line"><strong className="text-ink">Motion:</strong> slow float on the hero cards only, plus a 350ms fade-up when feedback appears. Turned off for reduced-motion users.</li>
          <li className="rounded-2xl bg-paper p-4 ring-1 ring-line"><strong className="text-ink">Accessibility:</strong> visible focus rings, a skip link, real form controls, aria-live feedback, and 44px touch targets.</li>
        </ul>
      </Block>
    </div>
  );
}
