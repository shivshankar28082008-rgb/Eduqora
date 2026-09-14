import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Flame, 
  Sparkles, 
  LayoutDashboard, 
  Code2, 
  BookOpen, 
  FolderGit2, 
  FileText,
  User,
  ChevronDown,
  Home,
  Layers,
  Terminal
} from 'lucide-react';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import { UserProfile } from '../types';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(authService.getCurrentUser());
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, [currentRoute]);

  const navLinks = [
    { label: 'Home', route: '#/', icon: Home },
    { label: 'Learn', route: '#/learn', icon: BookOpen },
    { label: 'Code Lab', route: '#/code-lab', icon: Code2, highlight: true, badge: 'LIVE' },
    { label: 'Languages', route: '#/learn#languages', icon: Layers },
    { label: 'Projects', route: '#/projects', icon: FolderGit2 },
    { label: 'Resources', route: '#/resources', icon: FileText },
  ];

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const isLoggedIn = authService.isLoggedIn();

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'py-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs border-b border-slate-200/80 dark:border-slate-800/80'
          : 'py-3.5 bg-white/70 dark:bg-[#090d16]/70 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Eduqora Logo */}
        <button
          onClick={() => handleNav('#/')}
          className="flex items-center gap-2 focus:outline-none group text-left"
          aria-label="Eduqora Home"
        >
          <Logo />
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/40 px-2 py-1 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
          {navLinks.map(link => {
            const isActive = currentRoute === link.route || (link.route !== '#/' && currentRoute.startsWith(link.route));
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => handleNav(link.route)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/40'
                } ${link.highlight ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600 transition text-xs font-medium"
            aria-label="Search"
            title="Global Search (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline">Search Eduqora...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-[10px] font-semibold border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Auth or Dashboard */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-100/90 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white text-xs font-bold flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[90px]">
                    {user.name}
                  </span>
                  <span className="flex items-center text-amber-500 font-bold">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    {user.streak}d
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
                      <span className="text-slate-500">Level {user.level}</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user.xp} XP</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNav('#/dashboard')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                    Student Dashboard
                  </button>
                  <button
                    onClick={() => handleNav('#/projects')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <FolderGit2 className="w-4 h-4 text-amber-500" />
                    My Projects
                  </button>
                  <button
                    onClick={() => handleNav('#/login')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    Account & Profile
                  </button>

                  <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                    <button
                      onClick={() => {
                        authService.logout();
                        setUser(authService.getCurrentUser());
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('#/login')}
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
              >
                Login
              </button>
              <button
                onClick={() => handleNav('#/learn')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
              >
                <span>Get Started</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.route)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.highlight && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                      LIVE IDE
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Appearance</span>
              <button
                onClick={onToggleTheme}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>Switch to Dark</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => handleNav('#/dashboard')}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
              <button
                onClick={() => handleNav('#/login')}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
              >
                {isLoggedIn ? 'Account' : 'Login / Register'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
