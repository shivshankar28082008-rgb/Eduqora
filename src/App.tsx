import React, { useState, useEffect } from 'react';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { LanguageDetailPage } from './pages/LanguageDetailPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { CodeLabPage } from './pages/CodeLabPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AuthPage } from './pages/AuthPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LanguageId } from './types';

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || '#/');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('eduqora-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Default to modern dark developer theme
  });

  // Apply theme to document
  useEffect(() => {
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
    try {
      localStorage.setItem('eduqora-theme', theme);
    } catch {
      // ignore storage quota errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Synchronize route hash changes
  useEffect(() => {
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

    // 2. Learn tracks & lessons
    if (firstSegment === 'learn') {
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

    // 3. Eduqora Code Lab IDE
    if (firstSegment === 'code-lab') {
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
    if (firstSegment === 'login' || firstSegment === 'account') {
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

  const isCodeLabRoute = pathParts[0] === 'code-lab';

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
          {renderRoute()}
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
