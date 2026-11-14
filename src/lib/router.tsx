import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Audience, TopicId } from '../data/types';

/**
 * Minimal hash router. Routes are plain #names (e.g. #library, #r-lithium-toxicity) so links
 * can be shared. In production, swap for React Router or the framework router (see roadmap).
 */
export type LibraryPreset = { audience?: Audience; topic?: TopicId; query?: string };

interface RouterValue {
  route: string;
  go: (route: string, preset?: LibraryPreset) => void;
  preset: LibraryPreset | null;
  clearPreset: () => void;
}

const Ctx = createContext<RouterValue | null>(null);
const read = () => (typeof window === 'undefined' ? '' : window.location.hash.replace(/^#/, ''));

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState(read());
  const [preset, setPreset] = useState<LibraryPreset | null>(null);

  useEffect(() => {
    const onHash = () => {
      setRoute(read());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = useCallback((next: string, p?: LibraryPreset) => {
    if (p) setPreset(p);
    if (read() === next) {
      window.scrollTo({ top: 0 });
      setRoute(next);
    } else {
      window.location.hash = next;
    }
  }, []);

  return <Ctx.Provider value={{ route, go, preset, clearPreset: () => setPreset(null) }}>{children}</Ctx.Provider>;
}

export function useRouter() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useRouter outside RouterProvider');
  return v;
}

/** Anchor that routes via hash. Real <a href> so it works with keyboard, middle-click and copy-link. */
export function Link({ to, preset, className, children, ariaLabel }: { to: string; preset?: LibraryPreset; className?: string; children: ReactNode; ariaLabel?: string }) {
  const { go } = useRouter();
  return (
    <a href={`#${to}`} className={className} aria-label={ariaLabel}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        go(to, preset);
      }}>
      {children}
    </a>
  );
}
