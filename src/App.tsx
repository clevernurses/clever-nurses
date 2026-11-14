import { useEffect } from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AboutPage } from './pages/About';
import { DesignSystemPage } from './pages/DesignSystem';
import { AdvancedPage, ContactPage, FreePage, LabPage, LibraryPage, NotFound, PsychPage, ResourcePage } from './pages/Pages';
import { resourceBySlug } from './data/resources';

const TITLES: Record<string, string> = {
  '': 'Visual nursing education', library: 'Explore Library', psych: 'Psych Nursing', lab: 'Clinical Judgment Lab',
  advanced: 'Advanced Practice', free: 'Free Resources', about: 'About', contact: 'Contact', 'design-system': 'Design System',
};

function Routes() {
  const { route } = useRouter();
  useEffect(() => {
    const r = route.startsWith('r-') ? resourceBySlug(route.slice(2))?.title : TITLES[route];
    document.title = `${r ?? 'Not found'} · CleveRNurses`;
  }, [route]);

  if (route.startsWith('r-')) return <ResourcePage slug={route.slice(2)} />;
  switch (route) {
    case '': return <Home />;
    case 'library': return <LibraryPage />;
    case 'psych': return <PsychPage />;
    case 'lab': return <LabPage />;
    case 'advanced': return <AdvancedPage />;
    case 'free': return <FreePage />;
    case 'about': return <AboutPage />;
    case 'contact': return <ContactPage />;
    case 'design-system': return <DesignSystemPage />;
    default: return <NotFound />;
  }
}

export default function App() {
  return (
    <RouterProvider>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none"><Routes /></main>
      <Footer />
    </RouterProvider>
  );
}
