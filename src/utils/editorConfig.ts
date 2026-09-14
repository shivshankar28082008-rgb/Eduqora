import { Extension } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting, foldGutter, bracketMatching, indentOnInput } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { autocompletion, CompletionContext, CompletionResult, closeBrackets } from '@codemirror/autocomplete';
import { history, defaultKeymap, historyKeymap, indentWithTab } from '@codemirror/commands';
import { searchKeymap } from '@codemirror/search';

import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { sql } from '@codemirror/lang-sql';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { php } from '@codemirror/lang-php';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';

import { intellisenseService } from '../services/intellisenseService';

/**
 * Maps language ID or file extension to normalized language key
 */
export function normalizeLanguage(language?: string, fileName?: string): string {
  if (fileName) {
    const lower = fileName.toLowerCase();
    if (lower.endsWith('.html') || lower.endsWith('.htm')) return 'html';
    if (lower.endsWith('.css')) return 'css';
    if (lower.endsWith('.js') || lower.endsWith('.mjs') || lower.endsWith('.cjs')) return 'javascript';
    if (lower.endsWith('.jsx')) return 'javascript';
    if (lower.endsWith('.ts')) return 'typescript';
    if (lower.endsWith('.tsx')) return 'typescript';
    if (lower.endsWith('.py')) return 'python';
    if (lower.endsWith('.sql')) return 'sql';
    if (lower.endsWith('.c') || lower.endsWith('.h')) return 'c';
    if (lower.endsWith('.cpp') || lower.endsWith('.cc') || lower.endsWith('.cxx') || lower.endsWith('.hpp')) return 'cpp';
    if (lower.endsWith('.java')) return 'java';
    if (lower.endsWith('.php')) return 'php';
    if (lower.endsWith('.json')) return 'json';
    if (lower.endsWith('.md') || lower.endsWith('.markdown')) return 'markdown';
  }

  const lang = (language || 'javascript').toLowerCase();
  if (lang === 'c++') return 'cpp';
  if (lang === 'py') return 'python';
  if (lang === 'js') return 'javascript';
  if (lang === 'ts') return 'typescript';
  return lang;
}

/**
 * Returns the matching CodeMirror language extension
 */
export function getLanguageExtension(langKey: string): Extension {
  switch (langKey) {
    case 'html':
      return html({ matchClosingTags: true, autoCloseTags: true });
    case 'css':
      return css();
    case 'javascript':
      return javascript({ jsx: true });
    case 'typescript':
      return javascript({ jsx: true, typescript: true });
    case 'python':
      return python();
    case 'sql':
      return sql();
    case 'c':
    case 'cpp':
      return cpp();
    case 'java':
      return java();
    case 'php':
      return php();
    case 'json':
      return json();
    case 'markdown':
      return markdown();
    default:
      return javascript();
  }
}

/**
 * Authentic VS Code Dark+ Syntax Highlighting Theme
 */
export const vsCodeHighlightStyle = HighlightStyle.define([
  // Keywords & Control Flow
  { tag: tags.keyword, color: '#569cd6', fontWeight: '500' },
  { tag: tags.controlKeyword, color: '#c586c0' },
  { tag: tags.definitionKeyword, color: '#569cd6' },
  { tag: tags.moduleKeyword, color: '#c586c0' },

  // HTML / XML Tags & Attributes
  { tag: tags.tagName, color: '#569cd6', fontWeight: '500' },
  { tag: tags.angleBracket, color: '#808080' },
  { tag: tags.attributeName, color: '#9cdcfe' },
  { tag: tags.attributeValue, color: '#ce9178' },

  // Strings & Literals
  { tag: tags.string, color: '#ce9178' },
  { tag: tags.character, color: '#ce9178' },
  { tag: tags.docString, color: '#ce9178' },

  // Comments (VS Code Italic Green)
  { tag: tags.comment, color: '#6a9955', fontStyle: 'italic' },
  { tag: tags.docComment, color: '#6a9955', fontStyle: 'italic' },

  // Numbers & Booleans
  { tag: tags.number, color: '#b5cea8' },
  { tag: tags.integer, color: '#b5cea8' },
  { tag: tags.float, color: '#b5cea8' },
  { tag: tags.bool, color: '#569cd6', fontWeight: '500' },
  { tag: tags.null, color: '#569cd6', fontWeight: '500' },
  { tag: tags.self, color: '#569cd6' },

  // Functions & Methods (VS Code Soft Yellow)
  { tag: tags.function(tags.variableName), color: '#dcdcaa' },
  { tag: tags.function(tags.propertyName), color: '#dcdcaa' },

  // Built-in Objects & Classes (VS Code Cyan/Teal)
  { tag: tags.standard(tags.variableName), color: '#4ec9b0' },
  { tag: tags.className, color: '#4ec9b0' },
  { tag: tags.typeName, color: '#4ec9b0' },

  // Variables & Properties (VS Code Light Blue)
  { tag: tags.propertyName, color: '#9cdcfe' },
  { tag: tags.variableName, color: '#9cdcfe' },
  { tag: tags.definition(tags.variableName), color: '#9cdcfe' },

  // Operators & Brackets
  { tag: tags.operator, color: '#d4d4d4' },
  { tag: tags.punctuation, color: '#d4d4d4' },
  { tag: tags.bracket, color: '#ffd700' },
  { tag: tags.separator, color: '#d4d4d4' },

  // Markdown & Headings
  { tag: tags.heading, color: '#569cd6', fontWeight: 'bold' },
  { tag: tags.link, color: '#9cdcfe', textDecoration: 'underline' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.strong, fontWeight: 'bold' },
]);

/**
 * VS Code Dark+ Workspace Layout Theme
 */
export const vsCodeWorkspaceTheme = EditorView.theme({
  '&': {
    color: '#d4d4d4',
    backgroundColor: '#1e1e1e',
    height: '100%',
    fontFamily: "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  '.cm-scroller': {
    overflow: 'auto',
    fontFamily: 'inherit',
    lineHeight: '1.6',
  },
  '.cm-content': {
    caretColor: '#569cd6',
    padding: '12px 0',
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: '#569cd6',
    borderLeftWidth: '2px',
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: '#264f78 !important',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  '.cm-gutters': {
    backgroundColor: '#1e1e1e',
    color: '#858585',
    borderRight: '1px solid #2d2d2d',
    paddingRight: '6px',
    userSelect: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    color: '#c6c6c6',
    fontWeight: '600',
  },
  '.cm-foldGutter': {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
  '.cm-foldGutter span': {
    color: '#858585',
    cursor: 'pointer',
    transition: 'color 0.15s',
  },
  '.cm-foldGutter span:hover': {
    color: '#ffffff',
  },
  '.cm-matchingBracket, .cm-nonmatchingBracket': {
    backgroundColor: '#0d5a94',
    outline: '1px solid #327ac6',
    color: '#ffffff !important',
  },
  '.cm-panels': {
    backgroundColor: '#252526',
    color: '#cccccc',
  },
  '.cm-panels.cm-panels-top': {
    borderBottom: '1px solid #333333',
  },
  '.cm-panels.cm-panels-bottom': {
    borderTop: '1px solid #333333',
  },
  '.cm-searchMatch': {
    backgroundColor: '#515c6b',
    outline: '1px solid #6199ff',
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: '#6199ff',
  },
  '.cm-tooltip': {
    backgroundColor: '#252526',
    border: '1px solid #454545',
    borderRadius: '6px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.5)',
    color: '#cccccc',
    fontSize: '12px',
  },
  '.cm-tooltip-autocomplete': {
    maxHeight: '260px',
    fontFamily: 'inherit',
  },
  '.cm-tooltip-autocomplete > ul > li': {
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
    backgroundColor: '#04395e',
    color: '#ffffff',
  },
  '.cm-completionLabel': {
    fontWeight: '500',
  },
  '.cm-completionDetail': {
    color: '#858585',
    fontStyle: 'normal',
    marginLeft: 'auto',
    fontSize: '11px',
  },
}, { dark: true });

/**
 * Creates custom autocompletion integrated with Eduqora IntelliSense
 */
export function createEduqoraAutocompletion(langKey: string): Extension {
  return autocompletion({
    override: [
      (context: CompletionContext): CompletionResult | null => {
        const word = context.matchBefore(/[\w<$.:-]+/);
        if (!word && !context.explicit) return null;

        const docText = context.state.doc.toString();
        const res = intellisenseService.getSuggestions(langKey, docText, context.pos);

        if (!res.suggestions || res.suggestions.length === 0) return null;

        return {
          from: word ? word.from : context.pos,
          options: res.suggestions.map(s => ({
            label: s.label,
            type: s.kind === 'keyword' ? 'keyword'
              : s.kind === 'function' ? 'function'
              : s.kind === 'tag' ? 'type'
              : s.kind === 'property' ? 'property'
              : s.kind === 'snippet' ? 'text'
              : 'variable',
            detail: s.detail,
            info: s.documentation,
            apply: s.insertText,
          })),
          validFor: /^[\w<$.:-]*$/,
        };
      },
    ],
  });
}
