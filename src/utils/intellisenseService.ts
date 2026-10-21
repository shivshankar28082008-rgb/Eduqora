/**
 * Codevaible IntelliSense & Autocomplete Service
 * Provides VS Code-style contextual completions for HTML, CSS, JavaScript, Python, SQL, etc.
 * Features a 3000ms typing-inactivity trigger and rich snippet templates.
 */

// Track registered languages to avoid duplicate providers on component re-mount
const registeredLanguages = new Set<string>();

/**
 * Register all completion providers and configure Monaco languages
 */
export function setupMonacoIntellisense(monaco: any) {
  if (!monaco || !monaco.languages) return;

  registerHtmlCompletions(monaco);
  registerCssCompletions(monaco);
  registerJsCompletions(monaco);
  registerPythonCompletions(monaco);
  registerSqlCompletions(monaco);
}

/**
 * Attach the 3-second (3000ms) typing inactivity autocomplete trigger to a Monaco Editor instance.
 * Resets the 3000ms timer on every keystroke.
 * When user stops typing for 3000ms, triggers the native suggestion popup near cursor.
 */
export function attachInactivitySuggestTrigger(editor: any, delayMs: number = 3000): () => void {
  if (!editor) return () => {};

  let timer: any = null;

  const disposable = editor.onDidChangeModelContent(() => {
    // 1. Reset timer immediately whenever the user types
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 2. Set new 3000ms inactivity timer
    timer = setTimeout(() => {
      try {
        // Only trigger if editor still has focus or is active, and cursor is valid
        const position = editor.getPosition();
        if (position) {
          editor.trigger('inactivity-3s', 'editor.action.triggerSuggest', {});
        }
      } catch {
        // graceful fallback if editor unmounted
      }
    }, delayMs);
  });

  return () => {
    if (timer) clearTimeout(timer);
    disposable.dispose();
  };
}

// ============================================================================
// 1. HTML COMPLETIONS PROVIDER
// ============================================================================
function registerHtmlCompletions(monaco: any) {
  if (registeredLanguages.has('html')) return;
  registeredLanguages.add('html');

  monaco.languages.registerCompletionItemProvider('html', {
    triggerCharacters: ['<', '!', ' ', '"', "'", '=', '/', ':', '-'],
    provideCompletionItems: (model: any, position: any) => {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const lineContent = model.getLineContent(position.lineNumber);
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      const suggestions: any[] = [];
      const { CompletionItemKind, CompletionItemInsertTextRule } = monaco.languages;

      // Case A: Inside <input type="..."
      if (/type=["'][^"']*$/.test(textUntilPosition)) {
        const inputTypes = [
          { label: 'text', doc: 'Standard single-line text input field' },
          { label: 'email', doc: 'Email address with built-in format validation' },
          { label: 'password', doc: 'Masked characters input for credentials' },
          { label: 'number', doc: 'Numeric input with spinner buttons' },
          { label: 'checkbox', doc: 'Binary toggle checkbox option' },
          { label: 'radio', doc: 'Radio button for mutually exclusive selection' },
          { label: 'date', doc: 'Native date picker control' },
          { label: 'file', doc: 'File upload dialog selector' },
          { label: 'submit', doc: 'Submit button that sends form data' },
          { label: 'button', doc: 'Generic clickable button element' },
          { label: 'tel', doc: 'Telephone number input field' },
          { label: 'url', doc: 'URL input with protocol validation' },
          { label: 'search', doc: 'Search query field with clear button' },
          { label: 'color', doc: 'Native color picker palette control' },
          { label: 'range', doc: 'Slider control for numeric ranges' },
          { label: 'hidden', doc: 'Invisible field for form tracking tokens' },
          { label: 'reset', doc: 'Resets form values to their defaults' },
        ];

        inputTypes.forEach((t, i) => {
          suggestions.push({
            label: t.label,
            kind: CompletionItemKind.Value,
            detail: `HTML Input Type: ${t.label}`,
            documentation: t.doc,
            insertText: t.label,
            range,
            sortText: `0_${i.toString().padStart(2, '0')}`,
          });
        });

        return { suggestions };
      }

      // Case B: Inside an opening tag attributes (e.g. `<img `, `<a `, `<form `)
      const tagMatch = textUntilPosition.match(/<([a-zA-Z0-9_-]+)(?:\s+[^>]*)?$/);
      const isInsideTag = tagMatch && !textUntilPosition.endsWith('>');

      if (isInsideTag) {
        const tagName = tagMatch[1].toLowerCase();

        // Tag-specific attribute suggestions
        const tagAttributes: Record<string, Array<{ attr: string; snippet: string; doc: string }>> = {
          img: [
            { attr: 'src', snippet: 'src="${1:image.png}"', doc: 'Specifies the path/URL to the image asset' },
            { attr: 'alt', snippet: 'alt="${1:Descriptive text}"', doc: 'Alternative text required for accessibility & screen readers' },
            { attr: 'width', snippet: 'width="${1:400}"', doc: 'Image intrinsic width in pixels' },
            { attr: 'height', snippet: 'height="${1:300}"', doc: 'Image intrinsic height in pixels' },
            { attr: 'loading', snippet: 'loading="${1|lazy,eager|}"', doc: 'Enables browser-native lazy loading' },
          ],
          a: [
            { attr: 'href', snippet: 'href="${1:https://example.com}"', doc: 'The target destination URL or anchor' },
            { attr: 'target', snippet: 'target="${1|_blank,_self,_parent,_top|}"', doc: 'Specifies where to open the linked document' },
            { attr: 'rel', snippet: 'rel="${1:noopener noreferrer}"', doc: 'Relationship between linked document and current page' },
          ],
          input: [
            { attr: 'type', snippet: 'type="${1|text,email,password,number,checkbox,radio,file,date,submit|}"', doc: 'Input control type' },
            { attr: 'placeholder', snippet: 'placeholder="${1:Enter text...}"', doc: 'Ghost placeholder hint displayed when empty' },
            { attr: 'required', snippet: 'required', doc: 'Specifies that an input field must be filled out before submitting' },
            { attr: 'name', snippet: 'name="${1:field_name}"', doc: 'Name submitted with form payload' },
            { attr: 'value', snippet: 'value="${1:default}"', doc: 'Initial value of the input field' },
            { attr: 'disabled', snippet: 'disabled', doc: 'Disables user interaction with the control' },
          ],
          button: [
            { attr: 'type', snippet: 'type="${1|button,submit,reset|}"', doc: 'Button behavior type' },
            { attr: 'disabled', snippet: 'disabled', doc: 'Disables button click events' },
          ],
          form: [
            { attr: 'action', snippet: 'action="${1:/api/submit}"', doc: 'URL endpoint where form data is sent' },
            { attr: 'method', snippet: 'method="${1|POST,GET|}"', doc: 'HTTP method used to send form data' },
            { attr: 'enctype', snippet: 'enctype="${1|application/x-www-form-urlencoded,multipart/form-data|}', doc: 'MIME encoding for file uploads' },
          ],
        };

        const specificAttrs = tagAttributes[tagName] || [];
        specificAttrs.forEach((item, idx) => {
          suggestions.push({
            label: item.attr,
            kind: CompletionItemKind.Property,
            detail: `Attribute for <${tagName}>`,
            documentation: item.doc,
            insertText: item.snippet,
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            range,
            sortText: `0_${idx.toString().padStart(2, '0')}`,
          });
        });

        // Global attributes (available on all elements)
        const globalAttributes = [
          { attr: 'id', snippet: 'id="${1:uniqueId}"', doc: 'Unique identifier element for CSS styling and JS document.getElementById' },
          { attr: 'class', snippet: 'class="${1:className}"', doc: 'Space-separated list of CSS classes' },
          { attr: 'style', snippet: 'style="${1:color: red;}"', doc: 'Inline CSS styling rules' },
          { attr: 'title', snippet: 'title="${1:Tooltip title}"', doc: 'Advisory tooltip text shown on hover' },
          { attr: 'hidden', snippet: 'hidden', doc: 'Hides element visually and from assistive technology' },
          { attr: 'tabindex', snippet: 'tabindex="${1:0}"', doc: 'Controls keyboard tab focus order' },
          { attr: 'data-*', snippet: 'data-${1:key}="${2:value}"', doc: 'Custom private data attributes for JavaScript DOM access' },
          { attr: 'aria-label', snippet: 'aria-label="${1:Label}"', doc: 'Accessible text label for assistive devices' },
        ];

        globalAttributes.forEach((ga, i) => {
          suggestions.push({
            label: ga.attr,
            kind: CompletionItemKind.Field,
            detail: 'Global HTML Attribute',
            documentation: ga.doc,
            insertText: ga.snippet,
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            range,
            sortText: `1_${i.toString().padStart(2, '0')}`,
          });
        });

        return { suggestions };
      }

      // Case C: Snippets & Element Tags (when typing tag names or triggers)
      // 1. HTML5 Boilerplate triggers: `!` or `htm` or `html`
      suggestions.push({
        label: '!',
        kind: CompletionItemKind.Snippet,
        detail: 'HTML5 Starter Boilerplate',
        documentation: 'Complete modern HTML5 document structure with viewport and meta tags',
        insertText: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\${1:Document Title}</title>
</head>
<body>
  \${0}
</body>
</html>`,
        insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
        range,
        sortText: '0_00_boilerplate',
      });

      suggestions.push({
        label: 'html:5',
        kind: CompletionItemKind.Snippet,
        detail: 'HTML5 Document Structure',
        documentation: 'Emmet-style HTML5 document template',
        insertText: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\${1:Codevaible Project}</title>
</head>
<body>
  <header>
    <h1>\${2:Hello World}</h1>
  </header>
  <main>
    \${0}
  </main>
</body>
</html>`,
        insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
        range,
        sortText: '0_01_html5',
      });

      // 2. Standard HTML Element Snippets with Emmet-like shortcuts
      const elementSnippets = [
        {
          trigger: 'div',
          name: 'div',
          snippet: '<div class="${1:container}">\n\t${0}\n</div>',
          doc: 'Generic flow content division container',
        },
        {
          trigger: 'img',
          name: 'img',
          snippet: '<img src="${1:https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500}" alt="${2:Descriptive alternative text}" width="${3:400}" />',
          doc: 'Embeds an image into the document with src, alt, and dimensions',
        },
        {
          trigger: 'a',
          name: 'a',
          snippet: '<a href="${1:#}">\${2:Link Text}</a>',
          doc: 'Hyperlink to another document or bookmark anchor',
        },
        {
          trigger: 'button',
          name: 'button',
          snippet: '<button type="${1|button,submit|}">\${2:Click Me}</button>',
          doc: 'Clickable button element used to submit forms or trigger JavaScript',
        },
        {
          trigger: 'form',
          name: 'form',
          snippet: '<form action="${1:#}" method="${2|POST,GET|}">\n\t<label for="${3:input1}">\${4:Label}:</label>\n\t<input type="text" id="${3:input1}" name="${3:input1}" required />\n\t<button type="submit">\${5:Submit}</button>\n</form>',
          doc: 'HTML form container with label, input, and submit button',
        },
        {
          trigger: 'input',
          name: 'input',
          snippet: '<input type="${1|text,email,password,number,checkbox|}" name="${2:name}" placeholder="${3:Enter value...}" />',
          doc: 'Void element representing a typed data field',
        },
        {
          trigger: 'table',
          name: 'table',
          snippet: '<table>\n\t<thead>\n\t\t<tr>\n\t\t\t<th>\${1:Header 1}</th>\n\t\t\t<th>\${2:Header 2}</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>\${3:Data 1}</td>\n\t\t\t<td>\${4:Data 2}</td>\n\t\t</tr>\n\t</tbody>\n</table>',
          doc: 'Structured tabular data matrix with thead, tbody, tr, th, and td',
        },
        {
          trigger: 'ul',
          name: 'ul',
          snippet: '<ul>\n\t<li>\${1:First item}</li>\n\t<li>\${2:Second item}</li>\n\t<li>\${3:Third item}</li>\n</ul>',
          doc: 'Unordered list rendered with bullet points',
        },
        {
          trigger: 'ol',
          name: 'ol',
          snippet: '<ol>\n\t<li>\${1:Step One}</li>\n\t<li>\${2:Step Two}</li>\n\t<li>\${3:Step Three}</li>\n</ol>',
          doc: 'Ordered list rendered with sequential numbers',
        },
        {
          trigger: 'h1',
          name: 'h1',
          snippet: '<h1>\${1:Main Page Heading}</h1>',
          doc: 'Top-level heading for the page hierarchy',
        },
        {
          trigger: 'h2',
          name: 'h2',
          snippet: '<h2>\${1:Section Heading}</h2>',
          doc: 'Second-level section heading',
        },
        {
          trigger: 'h3',
          name: 'h3',
          snippet: '<h3>\${1:Sub-section Heading}</h3>',
          doc: 'Third-level sub-section heading',
        },
        {
          trigger: 'p',
          name: 'p',
          snippet: '<p>\${1:Paragraph of readable text...}</p>',
          doc: 'Paragraph text container',
        },
        {
          trigger: 'span',
          name: 'span',
          snippet: '<span class="${1:highlight}">\${2:inline text}</span>',
          doc: 'Generic inline phrasing container for targeted styling',
        },
        {
          trigger: 'header',
          name: 'header',
          snippet: '<header>\n\t<h1>\${1:Site Title}</h1>\n\t<nav>\n\t\t<a href="#">Home</a>\n\t</nav>\n</header>',
          doc: 'Semantic introductory content or navigational banner',
        },
        {
          trigger: 'nav',
          name: 'nav',
          snippet: '<nav>\n\t<a href="${1:#}">\${2:Nav Item 1}</a>\n\t<a href="${3:#}">\${4:Nav Item 2}</a>\n</nav>',
          doc: 'Major navigation links section for document syndication',
        },
        {
          trigger: 'main',
          name: 'main',
          snippet: '<main>\n\t<section>\n\t\t<h2>\${1:Main Content}</h2>\n\t\t<p>\${0}</p>\n\t</section>\n</main>',
          doc: 'Dominant content unique to the document body',
        },
        {
          trigger: 'footer',
          name: 'footer',
          snippet: '<footer>\n\t<p>&copy; \${1:2026} \${2:Codevaible}. All rights reserved.</p>\n</footer>',
          doc: 'Closing footer container containing authorship, copyright, and links',
        },
        {
          trigger: 'dialog',
          name: 'dialog',
          snippet: '<dialog id="${1:myModal}">\n\t<h3>\${2:Modal Title}</h3>\n\t<p>\${3:Modal content here...}</p>\n\t<button onclick="document.getElementById(\'${1:myModal}\').close()">Close</button>\n</dialog>',
          doc: 'HTML5 native modal or popup dialog with built-in backdrop support',
        },
        {
          trigger: 'details',
          name: 'details',
          snippet: '<details>\n\t<summary>\${1:Click to expand FAQ}</summary>\n\t<p>\${2:Detailed answer or accordion text.}</p>\n</details>',
          doc: 'Native disclosure widget accordion (no JavaScript required)',
        },
        {
          trigger: 'video',
          name: 'video',
          snippet: '<video controls width="${1:480}">\n\t<source src="${2:video.mp4}" type="video/mp4" />\n\tYour browser does not support HTML5 video.\n</video>',
          doc: 'Embeds video media player into webpage',
        },
        {
          trigger: 'audio',
          name: 'audio',
          snippet: '<audio controls src="${1:audio.mp3}">\n\tYour browser does not support audio playback.\n</audio>',
          doc: 'Embeds sound content into webpage',
        },
        {
          trigger: 'card',
          name: 'card snippet',
          snippet: '<div class="card">\n\t<h3>\${1:Card Title}</h3>\n\t<p>\${2:Card description text...}</p>\n\t<button class="btn">\${3:Action}</button>\n</div>',
          doc: 'Responsive card UI component container',
        },
      ];

      elementSnippets.forEach((item, idx) => {
        suggestions.push({
          label: item.trigger,
          kind: CompletionItemKind.Snippet,
          detail: `<${item.name}> HTML Snippet`,
          documentation: item.doc,
          insertText: item.snippet,
          insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          sortText: `0_${idx.toString().padStart(2, '0')}`,
        });
      });

      return { suggestions };
    },
  });
}

// ============================================================================
// 2. CSS COMPLETIONS PROVIDER
// ============================================================================
function registerCssCompletions(monaco: any) {
  if (registeredLanguages.has('css')) return;
  registeredLanguages.add('css');

  monaco.languages.registerCompletionItemProvider('css', {
    triggerCharacters: [':', ' ', '@', '.', '#', '-'],
    provideCompletionItems: (model: any, position: any) => {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      const suggestions: any[] = [];
      const { CompletionItemKind, CompletionItemInsertTextRule } = monaco.languages;

      // Case A: Contextual Values after property colon (e.g. `display: `, `position: `, `color: `)
      const propMatch = textUntilPosition.match(/([a-zA-Z-]+)\s*:\s*([^;]*)$/);

      if (propMatch) {
        const propName = propMatch[1].toLowerCase().trim();

        const propertyValues: Record<string, Array<{ val: string; doc: string }>> = {
          display: [
            { val: 'block', doc: 'Generates a block box element (takes full available width)' },
            { val: 'flex', doc: 'Enables flexible 1D flexbox layout container' },
            { val: 'grid', doc: 'Enables 2D CSS grid layout with rows and columns' },
            { val: 'inline', doc: 'Generates inline element (flows with text)' },
            { val: 'inline-block', doc: 'Inline element with adjustable width and height' },
            { val: 'none', doc: 'Hides element completely from layout and accessibility tree' },
            { val: 'inline-flex', doc: 'Inline element with flex container internals' },
          ],
          position: [
            { val: 'static', doc: 'Default document flow positioning' },
            { val: 'relative', doc: 'Positioned relative to its normal document position' },
            { val: 'absolute', doc: 'Positioned relative to closest non-static ancestor' },
            { val: 'fixed', doc: 'Positioned relative to viewport; stays in place during scroll' },
            { val: 'sticky', doc: 'Toggles between relative and fixed based on scroll threshold' },
          ],
          color: [
            { val: '#2563eb', doc: 'Brand Royal Blue (#2563eb)' },
            { val: '#10b981', doc: 'Emerald Green (#10b981)' },
            { val: '#ef4444', doc: 'Vibrant Red (#ef4444)' },
            { val: '#6366f1', doc: 'Indigo Violet (#6366f1)' },
            { val: '#f8fafc', doc: 'Off-white Light Slate (#f8fafc)' },
            { val: '#0f172a', doc: 'Deep Slate Navy (#0f172a)' },
            { val: 'currentColor', doc: 'Inherits current computed text color' },
            { val: 'transparent', doc: 'Completely see-through alpha zero' },
            { val: 'rgba(0, 0, 0, 0.5)', doc: 'Semi-transparent black overlay' },
          ],
          'background-color': [
            { val: '#ffffff', doc: 'Pure White' },
            { val: '#0f172a', doc: 'Deep Slate' },
            { val: '#1e293b', doc: 'Card Surface Slate' },
            { val: '#f1f5f9', doc: 'Light Canvas Gray' },
            { val: 'transparent', doc: 'Transparent background' },
          ],
          'flex-direction': [
            { val: 'row', doc: 'Horizontal left-to-right (default)' },
            { val: 'column', doc: 'Vertical top-to-bottom stack' },
            { val: 'row-reverse', doc: 'Horizontal right-to-left reverse' },
            { val: 'column-reverse', doc: 'Vertical bottom-to-top reverse' },
          ],
          'justify-content': [
            { val: 'center', doc: 'Pack items around the center along main axis' },
            { val: 'space-between', doc: 'Distribute items evenly; first on start, last on end' },
            { val: 'space-around', doc: 'Distribute items evenly with equal half-space at edges' },
            { val: 'flex-start', doc: 'Pack items from start edge' },
            { val: 'flex-end', doc: 'Pack items towards end edge' },
          ],
          'align-items': [
            { val: 'center', doc: 'Center items along cross axis' },
            { val: 'stretch', doc: 'Stretch items to fit container along cross axis' },
            { val: 'flex-start', doc: 'Align items to start of cross axis' },
            { val: 'flex-end', doc: 'Align items to end of cross axis' },
          ],
          cursor: [
            { val: 'pointer', doc: 'Indicates link or clickable button' },
            { val: 'default', doc: 'Standard platform arrow cursor' },
            { val: 'not-allowed', doc: 'Circle with slash indicating forbidden action' },
            { val: 'grab', doc: 'Open hand indicating draggable item' },
          ],
          overflow: [
            { val: 'hidden', doc: 'Clip content that overflows boundaries' },
            { val: 'auto', doc: 'Display scrollbars only when content exceeds box' },
            { val: 'scroll', doc: 'Always show scrollbars' },
            { val: 'visible', doc: 'Default: content renders outside element box' },
          ],
        };

        const vals = propertyValues[propName] || [];
        vals.forEach((v, idx) => {
          suggestions.push({
            label: v.val,
            kind: CompletionItemKind.Value,
            detail: `Value for '${propName}'`,
            documentation: v.doc,
            insertText: v.val + ';',
            range,
            sortText: `0_${idx.toString().padStart(2, '0')}`,
          });
        });

        if (suggestions.length > 0) {
          return { suggestions };
        }
      }

      // Case B: CSS Property Names & Layout Snippets
      const properties = [
        { prop: 'color', snippet: 'color: ${1:#2563eb};', doc: 'Sets foreground text color' },
        { prop: 'background', snippet: 'background: ${1:#ffffff};', doc: 'Shorthand for all background styling properties' },
        { prop: 'background-color', snippet: 'background-color: ${1:#0f172a};', doc: 'Sets solid background fill color' },
        { prop: 'display', snippet: 'display: ${1|block,flex,grid,inline-block,none|};', doc: 'Defines how the element is rendered in document flow' },
        { prop: 'position', snippet: 'position: ${1|relative,absolute,fixed,sticky|};', doc: 'Sets positioning algorithm in viewport/parent' },
        { prop: 'padding', snippet: 'padding: ${1:16px};', doc: 'Sets inner space between content and border' },
        { prop: 'margin', snippet: 'margin: ${1:0 auto};', doc: 'Sets outer spacing around the element' },
        { prop: 'border', snippet: 'border: ${1:1px solid #cbd5e1};', doc: 'Sets border width, style, and color' },
        { prop: 'border-radius', snippet: 'border-radius: ${1:8px};', doc: 'Rounds the corners of element outer border edge' },
        { prop: 'box-shadow', snippet: 'box-shadow: 0 ${1:4px} ${2:6px} -1px rgba(0, 0, 0, ${3:0.1});', doc: 'Adds drop shadow effects around element frame' },
        { prop: 'font-size', snippet: 'font-size: ${1:16px};', doc: 'Sets font glyph size in px, rem, or em' },
        { prop: 'font-weight', snippet: 'font-weight: ${1|bold,600,500,normal|};', doc: 'Sets text stroke weight boldness' },
        { prop: 'font-family', snippet: "font-family: ${1:system-ui, -apple-system, sans-serif};", doc: 'Prioritized list of font family names' },
        { prop: 'width', snippet: 'width: ${1:100%};', doc: 'Sets horizontal width of the element content area' },
        { prop: 'max-width', snippet: 'max-width: ${1:600px};', doc: 'Sets maximum allowable width constraint' },
        { prop: 'height', snippet: 'height: ${1:auto};', doc: 'Sets vertical height of the element' },
        { prop: 'gap', snippet: 'gap: ${1:16px};', doc: 'Sets gutters between rows and columns in flex and grid layouts' },
        { prop: 'justify-content', snippet: 'justify-content: ${1|center,space-between,space-around,flex-start,flex-end|};', doc: 'Aligns items along flexbox main axis' },
        { prop: 'align-items', snippet: 'align-items: ${1|center,flex-start,flex-end,stretch|};', doc: 'Aligns items along flexbox cross axis' },
        { prop: 'flex-direction', snippet: 'flex-direction: ${1|row,column,row-reverse,column-reverse|};', doc: 'Sets main axis flow direction for flex items' },
        { prop: 'grid-template-columns', snippet: 'grid-template-columns: repeat(${1:3}, 1fr);', doc: 'Defines grid column track sizes' },
        { prop: 'transition', snippet: 'transition: all ${1:0.2s} ease;', doc: 'Animates property value changes smoothly' },
        { prop: 'transform', snippet: 'transform: ${1|translateY(-2px),scale(1.05),rotate(45deg)|};', doc: 'Applies 2D or 3D coordinate transformations' },
        { prop: 'cursor', snippet: 'cursor: ${1|pointer,default,not-allowed,grab|};', doc: 'Sets mouse cursor symbol displayed over element' },
        { prop: 'opacity', snippet: 'opacity: ${1:0.9};', doc: 'Sets visual transparency degree (0.0 to 1.0)' },
        { prop: 'z-index', snippet: 'z-index: ${1:10};', doc: 'Sets stack level order of positioned elements' },
      ];

      properties.forEach((p, idx) => {
        suggestions.push({
          label: p.prop,
          kind: CompletionItemKind.Property,
          detail: `CSS: ${p.prop}`,
          documentation: p.doc,
          insertText: p.snippet,
          insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          sortText: `0_${idx.toString().padStart(2, '0')}`,
        });
      });

      // Layout & Responsive Snippets
      suggestions.push({
        label: 'flex-center',
        kind: CompletionItemKind.Snippet,
        detail: 'Flexbox Center Container',
        documentation: 'Centers child elements horizontally and vertically using flexbox',
        insertText: `display: flex;\njustify-content: center;\nalign-items: center;\ngap: \${1:12px};`,
        insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
        range,
        sortText: '0_flex_center',
      });

      suggestions.push({
        label: 'grid-auto',
        kind: CompletionItemKind.Snippet,
        detail: 'Responsive Auto-Fitting Grid',
        documentation: 'CSS Grid that dynamically calculates columns based on min/max size',
        insertText: `display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(\${1:240px}, 1fr));\ngap: \${2:20px};`,
        insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
        range,
        sortText: '0_grid_auto',
      });

      suggestions.push({
        label: '@media',
        kind: CompletionItemKind.Snippet,
        detail: 'Responsive Media Query',
        documentation: 'Applies CSS block when viewport matches max-width breakpoint',
        insertText: `@media (max-width: \${1:768px}) {\n\t\${0}\n}`,
        insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
        range,
        sortText: '0_media_query',
      });

      return { suggestions };
    },
  });
}

// ============================================================================
// 3. JAVASCRIPT COMPLETIONS PROVIDER
// ============================================================================
function registerJsCompletions(monaco: any) {
  if (registeredLanguages.has('javascript')) return;
  registeredLanguages.add('javascript');

  const jsLanguages = ['javascript', 'typescript'];

  jsLanguages.forEach(lang => {
    monaco.languages.registerCompletionItemProvider(lang, {
      triggerCharacters: ['.', '(', '"', "'", ' '],
      provideCompletionItems: (model: any, position: any) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        };

        const suggestions: any[] = [];
        const { CompletionItemKind, CompletionItemInsertTextRule } = monaco.languages;

        // Case A: After `console.`
        if (/console\.\s*$/.test(textUntilPosition)) {
          const consoleMethods = [
            { method: 'log', snippet: 'log(${1:data});', doc: 'Outputs an informational message to the Codevaible console' },
            { method: 'warn', snippet: 'warn(${1:warning});', doc: 'Outputs a warning message with yellow alert icon' },
            { method: 'error', snippet: 'error(${1:err});', doc: 'Outputs an error message with stack trace' },
            { method: 'info', snippet: 'info(${1:info});', doc: 'Outputs an informative log entry' },
            { method: 'table', snippet: 'table(${1:arrayOrObject});', doc: 'Renders tabular data cleanly in formatted matrix' },
            { method: 'clear', snippet: 'clear();', doc: 'Clears all messages from the interactive console' },
            { method: 'time', snippet: 'time("${1:timer}");', doc: 'Starts a named timer for runtime execution profiling' },
            { method: 'timeEnd', snippet: 'timeEnd("${1:timer}");', doc: 'Stops named timer and logs elapsed milliseconds' },
          ];

          consoleMethods.forEach((m, idx) => {
            suggestions.push({
              label: m.method,
              kind: CompletionItemKind.Method,
              detail: `console.${m.method}()`,
              documentation: m.doc,
              insertText: m.snippet,
              insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
              range,
              sortText: `0_${idx.toString().padStart(2, '0')}`,
            });
          });

          return { suggestions };
        }

        // Case B: After `document.`
        if (/document\.\s*$/.test(textUntilPosition)) {
          const docMembers = [
            { name: 'getElementById', snippet: "getElementById('${1:elementId}')", doc: 'Returns the Element matching the unique ID string' },
            { name: 'querySelector', snippet: "querySelector('${1:.class-or-selector}')", doc: 'Returns the first Element that matches CSS selector' },
            { name: 'querySelectorAll', snippet: "querySelectorAll('${1:.items}')", doc: 'Returns a static NodeList of all matching elements' },
            { name: 'createElement', snippet: "createElement('${1:div}')", doc: 'Creates the HTML element specified by tagName' },
            { name: 'addEventListener', snippet: "addEventListener('${1:DOMContentLoaded}', (e) => {\n\t${0}\n});", doc: 'Registers an event listener on the root document' },
            { name: 'body', snippet: 'body', doc: 'Direct access to the <body> element' },
            { name: 'title', snippet: 'title', doc: 'Gets or sets the title of current document' },
          ];

          docMembers.forEach((d, idx) => {
            suggestions.push({
              label: d.name,
              kind: CompletionItemKind.Method,
              detail: `document.${d.name}`,
              documentation: d.doc,
              insertText: d.snippet,
              insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
              range,
              sortText: `0_${idx.toString().padStart(2, '0')}`,
            });
          });

          return { suggestions };
        }

        // Case C: After `.addEventListener(`
        if (/\.addEventListener\(\s*['"]?$/.test(textUntilPosition)) {
          const events = [
            { ev: 'click', doc: 'User clicks on element with mouse or taps on touch screen' },
            { ev: 'submit', doc: 'Fired when form is submitted (call e.preventDefault())' },
            { ev: 'input', doc: 'Fired synchronously whenever an input value changes' },
            { ev: 'change', doc: 'Fired when input commitment is verified on blur' },
            { ev: 'keydown', doc: 'Fired when key is initially pressed down' },
            { ev: 'keyup', doc: 'Fired when key is released' },
            { ev: 'mouseover', doc: 'Cursor enters bounding area of element' },
            { ev: 'DOMContentLoaded', doc: 'Initial HTML document completely parsed' },
          ];

          events.forEach((e, idx) => {
            suggestions.push({
              label: e.ev,
              kind: CompletionItemKind.Event,
              detail: `DOM Event: '${e.ev}'`,
              documentation: e.doc,
              insertText: `${e.ev}', (e) => {\n\t\${0}\n});`,
              insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
              range,
              sortText: `0_${idx.toString().padStart(2, '0')}`,
            });
          });

          return { suggestions };
        }

        // Case D: General JavaScript Keywords & Modern Snippets
        const jsSnippets = [
          {
            label: 'const',
            snippet: 'const ${1:name} = ${2:value};',
            kind: CompletionItemKind.Keyword,
            detail: 'Constant Declaration',
            doc: 'Declares block-scoped immutable identifier binding',
          },
          {
            label: 'let',
            snippet: 'let ${1:name} = ${2:value};',
            kind: CompletionItemKind.Keyword,
            detail: 'Variable Declaration',
            doc: 'Declares block-scoped mutable variable',
          },
          {
            label: 'function',
            snippet: 'function ${1:functionName}(${2:params}) {\n\t${0}\n}',
            kind: CompletionItemKind.Snippet,
            detail: 'Standard Function',
            doc: 'Standard function declaration statement',
          },
          {
            label: 'arrow',
            snippet: 'const ${1:fnName} = (${2:args}) => {\n\t${0}\n};',
            kind: CompletionItemKind.Snippet,
            detail: 'Arrow Function Expression',
            doc: 'Modern arrow function with lexical this binding',
          },
          {
            label: 'console.log',
            snippet: 'console.log(${1:variable});',
            kind: CompletionItemKind.Snippet,
            detail: 'Console Log Output',
            doc: 'Prints message or object inspection to console panel',
          },
          {
            label: 'getElementById',
            snippet: "document.getElementById('${1:elementId}')",
            kind: CompletionItemKind.Snippet,
            detail: 'DOM Selector by ID',
            doc: 'Retrieves element reference matching ID attribute',
          },
          {
            label: 'addEventListener',
            snippet: "document.getElementById('${1:btnId}')?.addEventListener('${2|click,input,submit|}', (e) => {\n\t${0}\n});",
            kind: CompletionItemKind.Snippet,
            detail: 'DOM Event Listener Attachment',
            doc: 'Attaches event handler with callback function',
          },
          {
            label: 'fetch',
            snippet: "fetch('${1:https://api.example.com/data}')\n\t.then(res => res.json())\n\t.then(data => {\n\t\tconsole.log(data);\n\t\t\${0}\n\t})\n\t.catch(err => console.error('Fetch Error:', err));",
            kind: CompletionItemKind.Snippet,
            detail: 'Async Fetch API Request',
            doc: 'Promise-based HTTP request helper',
          },
          {
            label: 'async-await',
            snippet: 'async function ${1:loadData}() {\n\ttry {\n\t\tconst res = await fetch(\'${2:url}\');\n\t\tconst data = await res.json();\n\t\t${0}\n\t} catch (err) {\n\t\tconsole.error(err);\n\t}\n}',
            kind: CompletionItemKind.Snippet,
            detail: 'Async/Await Function with Try/Catch',
            doc: 'Cleaner asynchronous promise handling',
          },
          {
            label: 'for-of',
            snippet: 'for (const ${1:item} of ${2:items}) {\n\t${0}\n}',
            kind: CompletionItemKind.Snippet,
            detail: 'For...Of Loop',
            doc: 'Iterates over values of iterable objects (arrays, strings, sets)',
          },
          {
            label: 'map',
            snippet: '${1:array}.map(${2:item} => {\n\treturn ${0};\n});',
            kind: CompletionItemKind.Snippet,
            detail: 'Array.prototype.map()',
            doc: 'Transforms each element in an array into a new array',
          },
          {
            label: 'filter',
            snippet: '${1:array}.filter(${2:item} => ${3:item.active});',
            kind: CompletionItemKind.Snippet,
            detail: 'Array.prototype.filter()',
            doc: 'Filters elements satisfying predicate function',
          },
          {
            label: 'setTimeout',
            snippet: 'setTimeout(() => {\n\t${0}\n}, ${1:1000});',
            kind: CompletionItemKind.Snippet,
            detail: 'Timer Delay',
            doc: 'Executes callback function after specified milliseconds',
          },
        ];

        jsSnippets.forEach((s, idx) => {
          suggestions.push({
            label: s.label,
            kind: s.kind,
            detail: s.detail,
            documentation: s.doc,
            insertText: s.snippet,
            insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
            range,
            sortText: `0_${idx.toString().padStart(2, '0')}`,
          });
        });

        return { suggestions };
      },
    });
  });
}

// ============================================================================
// 4. PYTHON COMPLETIONS PROVIDER
// ============================================================================
function registerPythonCompletions(monaco: any) {
  if (registeredLanguages.has('python')) return;
  registeredLanguages.add('python');

  monaco.languages.registerCompletionItemProvider('python', {
    triggerCharacters: ['.', ' ', '('],
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      const { CompletionItemKind, CompletionItemInsertTextRule } = monaco.languages;

      const pythonSnippets = [
        { label: 'def', snippet: 'def ${1:func_name}(${2:params}):\n\t"""${3:Docstring}"""\n\t${0:pass}', doc: 'Function definition' },
        { label: 'class', snippet: 'class ${1:ClassName}:\n\tdef __init__(self, ${2:params}):\n\t\tself.${3:prop} = ${2:params}\n\t${0}', doc: 'Class declaration' },
        { label: 'print', snippet: 'print(${1:"Hello, Codevaible!"})', doc: 'Prints expression to standard output' },
        { label: 'for', snippet: 'for ${1:item} in ${2:items}:\n\t${0:print(item)}', doc: 'For item in iterable loop' },
        { label: 'if-else', snippet: 'if ${1:condition}:\n\t${2:pass}\nelse:\n\t${0:pass}', doc: 'Conditional statement' },
        { label: 'try-except', snippet: 'try:\n\t${1:pass}\nexcept Exception as e:\n\tprint("Error:", e)', doc: 'Exception handling block' },
        { label: 'list-comp', snippet: '[${1:x} for ${1:x} in ${2:iterable} if ${3:condition}]', doc: 'List comprehension' },
        { label: 'main', snippet: 'if __name__ == "__main__":\n\t${0:main()}', doc: 'Python standard entrypoint' },
      ];

      const suggestions = pythonSnippets.map((s, idx) => ({
        label: s.label,
        kind: CompletionItemKind.Snippet,
        detail: `Python: ${s.label}`,
        documentation: s.doc,
        insertText: s.snippet,
        insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
        range,
        sortText: `0_${idx.toString().padStart(2, '0')}`,
      }));

      return { suggestions };
    },
  });
}

// ============================================================================
// 5. SQL COMPLETIONS PROVIDER
// ============================================================================
function registerSqlCompletions(monaco: any) {
  if (registeredLanguages.has('sql')) return;
  registeredLanguages.add('sql');

  monaco.languages.registerCompletionItemProvider('sql', {
    triggerCharacters: [' ', '.', ','],
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      const { CompletionItemKind, CompletionItemInsertTextRule } = monaco.languages;

      const sqlSnippets = [
        { label: 'SELECT', snippet: 'SELECT ${1:*} FROM ${2:table_name};', doc: 'Retrieves records from specified table' },
        { label: 'SELECT WHERE', snippet: 'SELECT ${1:*} FROM ${2:table_name} WHERE ${3:condition};', doc: 'Queries filtered records' },
        { label: 'INSERT INTO', snippet: 'INSERT INTO ${1:table_name} (${2:col1, col2})\nVALUES (${3:val1, val2});', doc: 'Inserts row into table' },
        { label: 'UPDATE', snippet: 'UPDATE ${1:table_name}\nSET ${2:col1} = ${3:val1}\nWHERE ${4:condition};', doc: 'Updates existing records' },
        { label: 'DELETE FROM', snippet: 'DELETE FROM ${1:table_name} WHERE ${2:condition};', doc: 'Deletes records meeting condition' },
        { label: 'INNER JOIN', snippet: 'SELECT * FROM ${1:table1}\nINNER JOIN ${2:table2} ON ${1:table1}.${3:id} = ${2:table2}.${4:t1_id};', doc: 'Joins matching rows from both tables' },
        { label: 'CREATE TABLE', snippet: 'CREATE TABLE ${1:table_name} (\n\tid INT PRIMARY KEY AUTO_INCREMENT,\n\tname VARCHAR(100) NOT NULL,\n\tcreated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);', doc: 'Creates new database table' },
      ];

      const suggestions = sqlSnippets.map((s, idx) => ({
        label: s.label,
        kind: CompletionItemKind.Snippet,
        detail: `SQL Statement: ${s.label}`,
        documentation: s.doc,
        insertText: s.snippet,
        insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
        range,
        sortText: `0_${idx.toString().padStart(2, '0')}`,
      }));

      return { suggestions };
    },
  });
}
