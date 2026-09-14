import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-php';

const LANGUAGE_MAP: Record<string, string> = {
  c: 'c',
  cpp: 'cpp',
  'c++': 'cpp',
  java: 'java',
  python: 'python',
  py: 'python',
  sql: 'sql',
  php: 'php',
  html: 'markup',
  xml: 'markup',
  css: 'css',
  javascript: 'javascript',
  js: 'javascript',
};

export function highlightCode(code: string, language: string): string {
  if (!code) return '';
  const langKey = LANGUAGE_MAP[language.toLowerCase()] || 'javascript';
  const grammar = Prism.languages[langKey];

  if (grammar) {
    try {
      return Prism.highlight(code, grammar, langKey);
    } catch {
      // Fallback if highlight throws
    }
  }

  // Fallback HTML escaping
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
