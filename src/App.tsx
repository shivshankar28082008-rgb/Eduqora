import React, { useState, useEffect } from 'react';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';

// Pages
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const LearnPage = lazy(() => import('./pages/LearnPage').then(m => ({ default: m.LearnPage })));
const LanguageDetailPage = lazy(() => import('./pages/LanguageDetailPage').then(m => ({ default: m.LanguageDetailPage })));
const LessonDetailPage = lazy(() => import('./pages/LessonDetailPage').then(m => ({ default: m.LessonDetailPage })));
const CodeLabPage = lazy(() => import('./pages/CodeLabPage').then(m => ({ default: m.CodeLabPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const AuthPage = lazy(() => import('./pages/AuthPage').then(m => ({ default: m.AuthPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
import { LanguageId } from './types';

function getInitialRoute(): string {
  if (typeof window === 'undefined') return '#/';
  try {
    if (window.location.hash && window.location.hash !== '#') {
      return window.location.hash;
    }
    // Check if pathname has a subroute past /Eduqora/ or / (e.g. GitHub Pages 404 fallback)
    const pathname = window.location.pathname || '';
    const normalized = pathname
      .replace(/^\/Eduqora\/?/i, '')
      .replace(/^\//, '')
      .replace(/^(index|404)\.html\/?/i, '');

    if (normalized) {
      const search = window.location.search || '';
      return `#/${normalized}${search}`;
    }
  } catch {
    return '#/';
  }
  return '#/';
}

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(getInitialRoute);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        const saved = localStorage.getItem('eduqora-theme');
        if (saved === 'light' || saved === 'dark') return saved;
      }
    } catch {
      // Fallback if localStorage is inaccessible or throws SecurityError
    }
    return 'dark'; // Default to modern dark developer theme
  });

  // Apply theme to document
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
        document.body.classList.add('dark');
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
        document.body.classList.remove('dark');
      }
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        localStorage.setItem('eduqora-theme', theme);
      }
    } catch {
      // ignore storage quota / security errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Synchronize route hash changes & handle direct path navigation
  useEffect(() => {
    const initial = getInitialRoute();
    if (initial !== '#/' && (!window.location.hash || window.location.hash === '#')) {
      window.location.hash = initial;
    }

    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    window.location.hash = route;
    setCurrentHash(route);
    window.scrollTo(0, 0);
  };

  // Parse current route and query parameters
  const [routePath, queryString] = currentHash.split('?');
  const queryParams = new URLSearchParams(queryString || '');
  const pathParts = routePath.replace(/^#\/?/, '').split('/').filter(Boolean);

  const renderRoute = () => {
    // 1. Home
    if (pathParts.length === 0) {
      return <HomePage onNavigate={navigate} />;
    }

    const firstSegment = pathParts[0];

    // 2. Learn tracks & lessons (also support /languages)
    if (firstSegment === 'learn' || firstSegment === 'languages') {
      if (pathParts.length === 1) {
        return <LearnPage onNavigate={navigate} />;
      }
      if (pathParts.length === 2) {
        return (
          <LanguageDetailPage 
            languageId={pathParts[1] as LanguageId} 
            onNavigate={navigate} 
          />
        );
      }
      if (pathParts.length >= 3) {
        return (
          <LessonDetailPage
            languageId={pathParts[1] as LanguageId}
            lessonId={pathParts[2]}
            onNavigate={navigate}
          />
        );
      }
    }

    // 3. Eduqora Code Lab IDE (supports code-lab, code, codelab, and live)
    if (firstSegment === 'code-lab' || firstSegment === 'code' || firstSegment === 'codelab' || firstSegment === 'live') {
      const projId = queryParams.get('project') || undefined;
      const tmplId = queryParams.get('template') || undefined;
      const lang = (queryParams.get('lang') as LanguageId) || undefined;
      return (
        <CodeLabPage
          projectId={projId}
          templateId={tmplId}
          initialLang={lang}
          onNavigate={navigate}
        />
      );
    }

    // 4. Projects Hub
    if (firstSegment === 'projects') {
      return <ProjectsPage onNavigate={navigate} />;
    }

    // 5. Dashboard
    if (firstSegment === 'dashboard') {
      return <DashboardPage onNavigate={navigate} />;
    }

    // 6. Resources & Cheat Sheets
    if (firstSegment === 'resources') {
      return <ResourcesPage onNavigate={navigate} />;
    }

    // 7. Auth & Account Profile
    if (firstSegment === 'login' || firstSegment === 'account' || firstSegment === 'auth') {
      return <AuthPage onNavigate={navigate} />;
    }

    // 8. About Page
    if (firstSegment === 'about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 9. Contact Page
    if (firstSegment === 'contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    // Fallback to Home
    return <HomePage onNavigate={navigate} />;
  };

  const isCodeLabRoute = ['code-lab', 'code', 'codelab', 'live'].includes(pathParts[0]);

  return (
    <ToastProvider>
      <div className="min-h-[100dvh] w-full max-w-full overflow-x-hidden flex flex-col bg-[#fafbfc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-indigo-500 selection:text-white transition-colors duration-200">
        
        {/* Global Navigation Bar */}
        <Navbar
          onOpenSearch={() => setSearchModalOpen(true)}
          currentRoute={currentHash}
          onNavigate={navigate}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Page Content */}
        <div className="flex-1">
          <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center bg-[#fafbfc] dark:bg-[#090d16]"><div className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading Eduqora…</div></div>}>
            {renderRoute()}
          </Suspense>
        </div>

        {/* Global Footer (hidden inside full IDE mode to maximize editor space) */}
        {!isCodeLabRoute && (
          <Footer onNavigate={navigate} />
        )}

        {/* Global Command/Search Palette (Ctrl+K / Cmd+K) */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onNavigate={navigate}
        />
      </div>
    </ToastProvider>
  );
}
