import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Flame, 
  Award, 
  CheckCircle2, 
  LogOut, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import { useToast } from '../components/Toast';
import { Logo } from '../components/Logo';

interface AuthPageProps {
  onNavigate: (route: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const isLoggedIn = authService.isLoggedIn();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast('Please enter your email', undefined, 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = authService.login(email.trim(), password);
      setCurrentUser(res.user);
      setIsSubmitting(false);
      toast(`Welcome back, ${res.user.name}!`, undefined, 'success');
      onNavigate('#/dashboard');
    }, 400);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast('Please fill in your name and email', undefined, 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = authService.signup(name.trim(), email.trim());
      setCurrentUser(res.user);
      setIsSubmitting(false);
      toast('Account created successfully! +50 XP awarded', undefined, 'success');
      onNavigate('#/dashboard');
    }, 400);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(authService.getCurrentUser());
    toast('You have signed out', undefined, 'info');
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your local progress and challenges?')) {
      storageService.resetProgress();
      toast('Learning progress has been reset', undefined, 'info');
      setCurrentUser(authService.getCurrentUser());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {isLoggedIn ? (
        /* Profile Management View */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-500/25">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Active Learner
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {currentUser.name}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {currentUser.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500">Developer Level</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                Lvl {currentUser.level}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500">Total XP</span>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {currentUser.xp}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500">Learning Streak</span>
              <p className="text-2xl font-black text-amber-500 mt-1 flex items-center gap-1">
                <Flame className="w-5 h-5 fill-amber-500" />
                {currentUser.streak} days
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500">Joined</span>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-2">
                {currentUser.joinedDate || 'Recent'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('#/dashboard')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
              >
                Go to Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('#/code-lab')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition"
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-500" />
                Open Code Lab
              </button>
            </div>

            <button
              onClick={handleResetProgress}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-500 transition py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Learning Progress
            </button>
          </div>
        </div>
      ) : (
        /* Sign In / Register Card */
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="inline-block mb-3">
              <Logo size={48} showText={false} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {mode === 'login' ? 'Welcome to Eduqora' : 'Start Learning with Eduqora'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Save your progress, earn XP, and practice coding live in your browser.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mb-6 text-xs font-semibold">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg transition ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-lg transition ${
                mode === 'signup'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/25 transition disabled:opacity-50 mt-2"
            >
              {isSubmitting
                ? 'Processing...'
                : mode === 'login'
                ? 'Sign In to Eduqora'
                : 'Create Free Account (+50 XP)'}
            </button>
          </form>

          {/* Guest test button */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={() => {
                authService.login('demo.coder@eduqora.dev');
                setCurrentUser(authService.getCurrentUser());
                toast('Signed in with Instant Demo account', undefined, 'success');
                onNavigate('#/dashboard');
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Quick Test: Sign in as Demo Coder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
