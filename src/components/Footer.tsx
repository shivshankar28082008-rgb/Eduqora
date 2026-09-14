import React from 'react';
import { Logo } from './Logo';
import { Github, Twitter, Linkedin, Sparkles } from 'lucide-react';
import { LanguageIcon } from './LanguageIcon';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#070b12] text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <button onClick={() => onNavigate('#/')} className="text-left">
              <Logo size={36} />
            </button>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              Learn programming concepts, understand practical examples, practice inside the browser, run your code, and build real projects — all in one focused learning space.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400 dark:text-slate-500">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                v2.4 Developer Edition
              </span>
              <span className="text-xs">Learn • Practice • Run • Build</span>
            </div>
          </div>

          {/* Column 1: Learn */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Learn
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('#/learn/html')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center gap-2">
                  <LanguageIcon id="html" size={13} />
                  <span>HTML5</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/learn/css')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center gap-2">
                  <LanguageIcon id="css" size={13} />
                  <span>CSS3 & Flexbox</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/learn/javascript')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center gap-2">
                  <LanguageIcon id="javascript" size={13} />
                  <span>JavaScript</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/learn/python')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center gap-2">
                  <LanguageIcon id="python" size={13} />
                  <span>Python</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/learn/sql')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center gap-2">
                  <LanguageIcon id="sql" size={13} />
                  <span>MySQL / SQL</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/learn/c')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center gap-2">
                  <LanguageIcon id="c" size={13} />
                  <span>C Language</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/learn/cpp')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center gap-2">
                  <LanguageIcon id="cpp" size={13} />
                  <span>C++ Systems</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/learn/java')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center gap-2">
                  <LanguageIcon id="java" size={13} />
                  <span>Java</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/learn/php')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center gap-2">
                  <LanguageIcon id="php" size={13} />
                  <span>PHP</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('#/code-lab')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1.5">
                  Code Lab IDE
                  <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-1 rounded font-bold">LIVE</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/projects')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Project Templates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/dashboard')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/resources')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Developer Cheat Sheets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/search')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Global Search
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('#/about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  About Eduqora
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/contact')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Contact & Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Educational Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Eduqora Coding Learning Lab. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="font-semibold text-slate-800 dark:text-slate-300">
              Learn Code. Build Real Ideas.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
