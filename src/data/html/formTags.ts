import { HtmlTagItem } from '../../types/htmlReferenceTypes';

export const FORM_TAGS: HtmlTagItem[] = [
  // =========================================================================
  // FORMS & CONTROLS
  // =========================================================================
  {
    id: 'form',
    name: '<form>',
    syntax: '<form action="/submit" method="POST">...</form>',
    category: 'forms-inputs',
    categoryLabel: 'Forms & Inputs',
    shortDesc: 'Represents a document section containing interactive controls for submitting information to a web server.',
    hinglish: '<form> tag user se input lene aur data ko server par bhejne ke liye use hota hai (jaise login, sign up, contact forms, payment checkouts). "action" attribute me destination URL hoti hai aur "method" me GET ya POST request type.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</form>).',
    supportedAttributes: ['action', 'method', 'enctype', 'novalidate', 'target', 'autocomplete'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <form action="/login" method="POST" style="max-width: 320px; background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    <h3 style="margin-top: 0; color: #1e293b;">Sign In to Codevaible</h3>
    <div style="margin-bottom: 12px;">
      <label for="user-email" style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 4px; color: #475569;">Email Address</label>
      <input type="email" id="user-email" name="email" required style="width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #94a3b8; border-radius: 6px;">
    </div>
    <button type="submit" style="width: 100%; padding: 10px; background: #4f46e5; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
      Sign In
    </button>
  </form>
</body>
</html>`,
    accessibilityGuidance: 'Forms should have clear programmatic submission handlers and associate every input with an explicit <label>.',
    seoRelevance: 'Search engines index search forms and interaction endpoints.',
    commonMistakes: [
      {
        mistake: 'Nesting a <form> inside another <form>.',
        solution: 'Never nest forms; nested forms are strictly forbidden in HTML.',
        explanation: 'Browsers do not support nested forms and behavior is undefined.'
      }
    ],
    relatedElements: ['input', 'button', 'label', 'fieldset'],
    interviewQuestions: [
      {
        question: 'What is the difference between GET and POST form methods?',
        answer: 'GET appends form data to the URL as query parameters (visible in history, limited length, for safe idempotent queries). POST sends data inside the HTTP request body (secure for passwords, unlimited payload, creates or modifies server resources).',
        hinglishTip: 'GET = data URL me dikhta hai (search); POST = data body me chup kar jaata hai (passwords/forms).'
      }
    ],
    practiceExercise: {
      title: 'Build Login Form Skeleton',
      prompt: 'Construct a <form> with action="/login" and method="POST" containing a submit button.',
      starterCode: `<body>
  <!-- Build form -->
</body>`,
      solutionCode: `<body>
  <form action="/login" method="POST">
    <button type="submit">Submit</button>
  </form>
</body>`,
      hint: 'Include action and method attributes on <form>.'
    }
  },
  {
    id: 'input',
    name: '<input>',
    syntax: '<input type="text" name="username" placeholder="Enter username" required>',
    category: 'forms-inputs',
    categoryLabel: 'Forms & Inputs',
    shortDesc: 'The primary interactive form control element used to accept data from the user.',
    hinglish: '<input> web development ka sabse versatile form control hai. Iska kaam "type" attribute se decide hota hai: type="text", "password", "email", "number", "checkbox", "radio", "file", "date", "range", etc. Yeh void element hai, iska koi closing tag nahi hota.',
    status: 'standard',
    isVoid: true,
    selfClosing: true,
    closingTagUsage: 'Forbidden — Void element.',
    supportedAttributes: ['type', 'name', 'value', 'placeholder', 'required', 'disabled', 'readonly', 'min', 'max', 'step', 'pattern', 'autocomplete', 'autofocus'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
    <div>
      <label style="font-size: 12px; font-weight: bold; color: #475569;">Text Input:</label>
      <input type="text" placeholder="John Doe" style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
    </div>
    <div>
      <label style="font-size: 12px; font-weight: bold; color: #475569;">Password Input (Masked):</label>
      <input type="password" placeholder="••••••••" style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
    </div>
    <div>
      <label style="font-size: 12px; font-weight: bold; color: #475569;">Range Slider:</label>
      <input type="range" min="0" max="100" value="75" style="width: 100%;">
    </div>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Every <input> must have an accessible name, typically via a linked <label for="inputId"> or aria-label.',
    seoRelevance: 'Inputs power interactive search boxes and newsletter capture widgets.',
    commonMistakes: [
      {
        mistake: 'Using placeholder instead of a <label>.',
        solution: 'Always pair an input with a visible <label>; placeholders disappear when typing and fail accessibility.',
        explanation: 'Screen readers and users with cognitive difficulties rely on persistent labels.'
      }
    ],
    relatedElements: ['label', 'form', 'button', 'datalist'],
    interviewQuestions: [
      {
        question: 'Why is placeholder NOT an acceptable substitute for a <label>?',
        answer: 'Placeholders disappear as soon as the user begins typing, leaving no persistent indication of what field it is. They also typically have poor color contrast and are not reliably announced by all screen readers.',
        hinglishTip: 'Placeholder type karte hi gayab ho jata hai, isliye accessibility ke liye <label> mandatory hai.'
      }
    ],
    practiceExercise: {
      title: 'Create Required Email Field',
      prompt: 'Create an <input> with type="email", name="email", and required attribute.',
      starterCode: `<div>
  <!-- Add email input -->
</div>`,
      solutionCode: `<div>
  <input type="email" name="email" required placeholder="name@domain.com">
</div>`,
      hint: 'Include type="email" and required.'
    }
  },
  {
    id: 'button',
    name: '<button>',
    syntax: '<button type="submit">Click Me</button>',
    category: 'forms-inputs',
    categoryLabel: 'Forms & Inputs',
    shortDesc: 'Represents a clickable interactive button used to submit forms or trigger JavaScript behaviors.',
    hinglish: '<button> tag webpage par clickable button banata hai. Isme teen types hote hain: type="submit" (form submit karta hai - yeh default hai!), type="button" (normal JavaScript click ke liye), aur type="reset" (form clear karta hai). Hamesha type specify karein taaki form galti se submit na ho.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</button>).',
    supportedAttributes: ['type', 'disabled', 'name', 'value', 'form', 'formaction', 'formmethod'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <div style="display: flex; gap: 10px; align-items: center;">
    <button type="button" style="padding: 10px 18px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
      Primary Action
    </button>
    <button type="button" disabled style="padding: 10px 18px; background: #cbd5e1; color: #64748b; border: none; border-radius: 8px; font-weight: bold; cursor: not-allowed;">
      Disabled State
    </button>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Natively focusable and triggers on both Space and Enter keys. Icons inside buttons must have descriptive aria-label or accessible text.',
    seoRelevance: 'Calls to Action (CTAs) drive user conversion rates.',
    commonMistakes: [
      {
        mistake: 'Leaving off type="button" on non-submit buttons inside a form.',
        solution: 'Always declare type="button" if the button should not submit the form.',
        explanation: 'Default type of <button> inside a form is "submit", causing unintended page reloads.'
      }
    ],
    relatedElements: ['input', 'form', 'a'],
    interviewQuestions: [
      {
        question: 'What is the default type attribute of a <button> element inside a form?',
        answer: 'type="submit". If omitted, clicking any button inside a form will automatically trigger form submission.',
        hinglishTip: 'Button ka default type "submit" hota hai, isliye normal button ke liye hamesha type="button" likhna zaroori hai.'
      }
    ],
    practiceExercise: {
      title: 'Add Safe Button with Explicit Type',
      prompt: 'Construct a button with type="button" and text "Cancel".',
      starterCode: `<div>
  <!-- Add button -->
</div>`,
      solutionCode: `<div>
  <button type="button">Cancel</button>
</div>`,
      hint: 'Include type="button".'
    }
  },
  {
    id: 'label',
    name: '<label>',
    syntax: '<label for="user-age">Age:</label><input id="user-age" type="number">',
    category: 'forms-inputs',
    categoryLabel: 'Forms & Inputs',
    shortDesc: 'Represents a caption for an item in a user interface, binding programmatically to input controls.',
    hinglish: '<label> tag input fields ke liye heading ya title ka kaam karta hai. Jab aap <label for="xyz"> ko <input id="xyz"> ke saath jodte hain, toh label par click karne par bhi input field automatically focus/check ho jaata hai (khaaskar checkboxes aur radio buttons me yeh usability ke liye zabardast hai).',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</label>).',
    supportedAttributes: ['for', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <!-- Clicking the label text checks the checkbox automatically! -->
  <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; display: inline-flex; align-items: center; gap: 8px; cursor: pointer;">
    <input type="checkbox" id="terms-agree" style="width: 18px; height: 18px; cursor: pointer;">
    <label for="terms-agree" style="font-size: 14px; font-weight: 500; color: #1e293b; cursor: pointer;">
      I agree to the Codevaible Learning Terms and Conditions (Click this text to test!)
    </label>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Provides the accessible name for form inputs. Clicking the label expands the hit target area, especially critical on mobile touchscreens.',
    seoRelevance: 'Essential for accessibility compliance scores (Lighthouse a11y 100%).',
    commonMistakes: [
      {
        mistake: 'Using name attribute instead of id attribute in label\'s for: <label for="email"> with <input name="email">.',
        solution: 'The "for" attribute must match the "id" attribute of the target input, not its "name".',
        explanation: 'HTML binding is strictly based on the target element\'s id.'
      }
    ],
    relatedElements: ['input', 'select', 'textarea'],
    interviewQuestions: [
      {
        question: 'What are the two ways to associate a <label> with an <input>?',
        answer: '1) Explicit association using for="inputId" matching <input id="inputId">. 2) Implicit nesting by wrapping the <input> directly inside <label>Text <input></label>.',
        hinglishTip: '1) for aur id match karke, ya 2) input ko label ke andar wrap karke.'
      }
    ],
    practiceExercise: {
      title: 'Bind Label to Input with For Attribute',
      prompt: 'Create a <label> bound to an input with id="username".',
      starterCode: `<div>
  <!-- Add label and input -->
</div>`,
      solutionCode: `<div>
  <label for="username">Username:</label>
  <input type="text" id="username" name="username">
</div>`,
      hint: 'Match label for="username" with input id="username".'
    }
  },
  {
    id: 'select-option-optgroup',
    name: '<select>, <option>, <optgroup>',
    syntax: '<select name="track"><optgroup label="Core"><option value="dsa">DSA</option></optgroup></select>',
    category: 'forms-inputs',
    categoryLabel: 'Forms & Inputs',
    shortDesc: 'Provides a dropdown selection menu (<select>) with individual choices (<option>) grouped logically (<optgroup>).',
    hinglish: '<select> dropdown menu banata hai jisme se user option choose karta hai. <option> har ek choice hoti hai. <optgroup> options ko categories me divide karke visually separate karta hai (jaise "Frontend Tracks" aur "Backend Tracks").',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required closing tags for each.',
    supportedAttributes: ['name', 'multiple', 'size', 'required', 'disabled', 'value', 'selected (on option)', 'label (on optgroup)'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <label for="track-select" style="display: block; font-weight: bold; margin-bottom: 6px;">Choose Your Engineering Track:</label>
  <select id="track-select" name="track" style="padding: 10px 14px; border-radius: 8px; border: 1px solid #94a3b8; font-size: 14px; width: 280px; background: white;">
    <optgroup label="Frontend Engineering">
      <option value="html5">HTML5 Semantic Architecture</option>
      <option value="css3" selected>Modern CSS &amp; Flexbox</option>
      <option value="react">React &amp; TypeScript</option>
    </optgroup>
    <optgroup label="Computer Science &amp; DSA">
      <option value="trees">Binary Search Trees</option>
      <option value="graphs">Graph Algorithms (BFS/DFS)</option>
      <option value="dp">Dynamic Programming</option>
    </optgroup>
  </select>
</body>
</html>`,
    accessibilityGuidance: 'Natively accessible dropdown; allows keyboard arrow navigation and type-ahead letter jumping.',
    seoRelevance: 'Facilitates faceted navigation on e-commerce catalog pages.',
    commonMistakes: [
      {
        mistake: 'Forgetting the "value" attribute on <option>.',
        solution: 'Always set <option value="xyz">Text</option>.',
        explanation: 'If value is omitted, the text content is submitted, which may contain formatting issues.'
      }
    ],
    relatedElements: ['datalist', 'input', 'form'],
    interviewQuestions: [
      {
        question: 'What is the purpose of <optgroup>?',
        answer: 'It creates non-selectable categorized header groups within a <select> dropdown menu, organizing long lists into readable logical sections.',
        hinglishTip: '<optgroup> dropdown ke andar unclickable category headers banata hai.'
      }
    ],
    practiceExercise: {
      title: 'Build Dropdown with Selected Default',
      prompt: 'Construct a <select> with two options where the second option has selected attribute.',
      starterCode: `<div>
  <!-- Build select menu -->
</div>`,
      solutionCode: `<div>
  <select name="level">
    <option value="beginner">Beginner</option>
    <option value="advanced" selected>Advanced</option>
  </select>
</div>`,
      hint: 'Add selected attribute to the second option.'
    }
  },
  {
    id: 'textarea',
    name: '<textarea>',
    syntax: '<textarea name="comments" rows="4" cols="40">Initial text</textarea>',
    category: 'forms-inputs',
    categoryLabel: 'Forms & Inputs',
    shortDesc: 'Represents a multi-line plain-text editing control.',
    hinglish: '<textarea> tag multi-line text input (lambe messages, feedback, comments, ya code) likhne ke liye use hota hai. <input> ki tarah iska koi "value" attribute nahi hota — default text iske opening aur closing tag ke beech me likha jaata hai (<textarea>Default text</textarea>).',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</textarea>).',
    supportedAttributes: ['rows', 'cols', 'name', 'placeholder', 'required', 'maxlength', 'minlength', 'readonly', 'disabled'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <label for="feedback" style="display: block; font-weight: bold; margin-bottom: 6px; color: #1e293b;">
    Share Your Code Lab Feedback:
  </label>
  <textarea 
    id="feedback" 
    name="feedback" 
    rows="5" 
    placeholder="Write your suggestions here..."
    style="width: 100%; max-width: 450px; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; font-size: 14px; box-sizing: border-box;"
  ></textarea>
</body>
</html>`,
    accessibilityGuidance: 'Must have an associated <label> for screen reader context. Character count limits should announce remaining characters via aria-live.',
    seoRelevance: 'Enables user reviews and comments which provide rich User-Generated Content (UGC) for SEO.',
    commonMistakes: [
      {
        mistake: 'Trying to set value via attribute: <textarea value="Hello">.',
        solution: 'Put text content between the tags: <textarea>Hello</textarea>.',
        explanation: '<textarea> does not support the value attribute in HTML; initial text goes between tags.'
      }
    ],
    relatedElements: ['input', 'form', 'label'],
    interviewQuestions: [
      {
        question: 'How do you set initial/default text inside a <textarea>?',
        answer: 'By placing the text between the opening <textarea> and closing </textarea> tags. It does NOT use a value="..." attribute like <input>.',
        hinglishTip: '<textarea> me text tags ke beech me likha jata hai, value attribute me nahi.'
      }
    ],
    practiceExercise: {
      title: 'Create Feedback Textarea',
      prompt: 'Construct a <textarea> with id="bio", rows="4", and placeholder.',
      starterCode: `<div>
  <!-- Add textarea -->
</div>`,
      solutionCode: `<div>
  <label for="bio">Bio:</label>
  <textarea id="bio" name="bio" rows="4" placeholder="Tell us about yourself..."></textarea>
</div>`,
      hint: 'Include id, name, rows, and placeholder.'
    }
  },
  {
    id: 'fieldset-legend',
    name: '<fieldset> & <legend>',
    syntax: '<fieldset><legend>Personal Details</legend>...</fieldset>',
    category: 'forms-inputs',
    categoryLabel: 'Forms & Inputs',
    shortDesc: 'Groups related form controls (<fieldset>) with an accessible caption title (<legend>).',
    hinglish: '<fieldset> tag form ke related inputs (jaise Shipping Address, Billing Info, ya Radio Button choices) ko ek bordered group box me organize karta hai. <legend> is group ka heading ya caption hota hai jo border line ke beech me beautifully display hota hai. Screen readers radio button groups ke liye isko hamesha require karte hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required closing tags for each.',
    supportedAttributes: ['disabled (on fieldset disables all nested inputs)', 'name', 'form', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <fieldset style="border: 2px solid #6366f1; border-radius: 12px; padding: 16px 20px; max-width: 360px; background: #fafafa;">
    <legend style="font-weight: bold; color: #4338ca; padding: 0 8px; font-size: 14px;">
      Preferred Learning Speed
    </legend>
    <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <input type="radio" name="speed" value="standard" checked> Standard (1 Step/sec)
      </label>
      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <input type="radio" name="speed" value="fast"> Fast (Turbo Mode)
      </label>
    </div>
  </fieldset>
</body>
</html>`,
    accessibilityGuidance: 'Crucial for radio button groups: Screen readers repeat the <legend> title before each radio option, providing essential group context.',
    seoRelevance: 'Structures complex multi-step forms cleanly.',
    commonMistakes: [
      {
        mistake: 'Placing <legend> somewhere other than the very first child of <fieldset>.',
        solution: '<legend> MUST be the first child inside <fieldset>.',
        explanation: 'Specification mandates legend as the opening header element.'
      }
    ],
    relatedElements: ['form', 'input', 'label'],
    interviewQuestions: [
      {
        question: 'What special behavior occurs when you add the disabled attribute to a <fieldset>?',
        answer: 'All interactive form controls (inputs, buttons, selects) nested inside that <fieldset> are automatically disabled in one declaration.',
        hinglishTip: '<fieldset disabled> lagane se uske andar ke saare inputs ek saath disable ho jaate hain.'
      }
    ],
    practiceExercise: {
      title: 'Group Radio Buttons with Fieldset',
      prompt: 'Create a <fieldset> with a <legend> "Subscription" containing two radio inputs.',
      starterCode: `<div>
  <!-- Create fieldset with legend -->
</div>`,
      solutionCode: `<div>
  <fieldset>
    <legend>Subscription</legend>
    <label><input type="radio" name="sub" value="monthly"> Monthly</label>
    <label><input type="radio" name="sub" value="annual"> Annual</label>
  </fieldset>
</div>`,
      hint: 'Place <legend> as first child of <fieldset>.'
    }
  },
  {
    id: 'datalist',
    name: '<datalist>',
    syntax: '<input list="browsers"><datalist id="browsers"><option value="Chrome"><option value="Firefox"></datalist>',
    category: 'forms-inputs',
    categoryLabel: 'Forms & Inputs',
    shortDesc: 'Contains a set of <option> elements that represent recommended autocomplete options for an <input>.',
    hinglish: '<datalist> tag regular text <input> ko auto-complete suggestions provide karta hai. Jab user type karna shuru karta hai, toh filter hokar list aati hai, lekin <select> ke vipreet user apni marzi ka naya custom text bhi type kar sakta hai!',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</datalist>).',
    supportedAttributes: ['id (referenced by input list attribute)', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <label for="algorithm-input" style="display: block; font-weight: bold; margin-bottom: 6px;">
    Search or Type Algorithm Name (Try typing "B" or "Q"):
  </label>
  <input 
    id="algorithm-input" 
    list="algo-options" 
    placeholder="Type e.g. Binary Search..." 
    style="padding: 10px; width: 300px; border: 1px solid #94a3b8; border-radius: 6px;"
  >

  <datalist id="algo-options">
    <option value="Binary Search">
    <option value="Bubble Sort">
    <option value="Breadth-First Search (BFS)">
    <option value="Depth-First Search (DFS)">
    <option value="Quick Sort">
  </datalist>
</body>
</html>`,
    accessibilityGuidance: 'Exposes native autocomplete combobox pattern to screen readers.',
    seoRelevance: 'Facilitates fast search interactions.',
    commonMistakes: [
      {
        mistake: 'Mismatched list and id: <input list="algo"> with <datalist id="algorithms">.',
        solution: 'The input list attribute must exactly match the datalist id attribute.',
        explanation: 'Browsers link input and datalist via ID reference.'
      }
    ],
    relatedElements: ['input', 'select', 'option'],
    interviewQuestions: [
      {
        question: 'What is the main difference between <select> and <input list="datalist">?',
        answer: '<select> restricts the user strictly to the predefined options. <input list="datalist"> offers autocomplete suggestions while still allowing the user to type and submit any arbitrary custom value.',
        hinglishTip: '<select> me sirf wahi choose kar sakte hain jo list me hai; <datalist> me suggestions ke sath-sath custom text bhi type kar sakte hain.'
      }
    ],
    practiceExercise: {
      title: 'Attach Datalist to Input',
      prompt: 'Create an <input list="langs"> linked to a <datalist id="langs"> with three options.',
      starterCode: `<div>
  <!-- Add input and datalist -->
</div>`,
      solutionCode: `<div>
  <input list="langs" placeholder="Select programming language">
  <datalist id="langs">
    <option value="JavaScript">
    <option value="Python">
    <option value="TypeScript">
  </datalist>
</div>`,
      hint: 'Match input list="langs" with datalist id="langs".'
    }
  },
  {
    id: 'output',
    name: '<output>',
    syntax: '<output name="result" for="a b">0</output>',
    category: 'forms-inputs',
    categoryLabel: 'Forms & Inputs',
    shortDesc: 'Represents the result of a calculation or user action.',
    hinglish: '<output> tag kisi calculation ya form action ke result/outcome ko render karne ke liye semantic container hai. Jaise slider move karne par calculated value live dikhana (e.g. Price: $75). Screen readers isko automatically updated live region ki tarah announce karte hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required (</output>).',
    supportedAttributes: ['for', 'form', 'name', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Live Interactive Calculator (&lt;output&gt;):</h3>
  <form oninput="total.value = parseInt(items.value) * 15" style="background: #f8fafc; padding: 20px; border-radius: 12px; max-width: 360px; border: 1px solid #e2e8f0;">
    <label for="items" style="display: block; font-weight: bold; margin-bottom: 4px;">Number of Lessons ($15 each):</label>
    <input type="range" id="items" value="4" min="1" max="10" style="width: 100%;">
    
    <div style="margin-top: 16px; font-size: 18px; font-weight: bold; color: #4f46e5;">
      Total Cost: $<output name="total" for="items">60</output>
    </div>
  </form>
</body>
</html>`,
    accessibilityGuidance: 'Acts as an implicit ARIA live region (aria-live="polite") so changes are voiced by screen readers without page reloads.',
    seoRelevance: 'Semantic mathematical calculator markup.',
    commonMistakes: [
      {
        mistake: 'Using a generic <span> for calculated results instead of <output>.',
        solution: 'Use <output> for calculated values so assistive tools announce the updated values.',
        explanation: '<span> has no accessible calculation semantics.'
      }
    ],
    relatedElements: ['input', 'progress', 'meter'],
    interviewQuestions: [
      {
        question: 'What accessibility benefit does <output> have over a normal <span>?',
        answer: '<output> has an implicit ARIA role of "status" and acts as a live region (aria-live="polite"), ensuring assistive devices announce calculation updates when form controls change.',
        hinglishTip: '<output> me calculated value update hone par screen reader automatically bol kar batata hai.'
      }
    ],
    practiceExercise: {
      title: 'Display Calculation Result',
      prompt: 'Construct an <output> tag with name="sum" and for="num1 num2".',
      starterCode: `<div>
  <!-- Add output tag -->
</div>`,
      solutionCode: `<div>
  <output name="sum" for="num1 num2">0</output>
</div>`,
      hint: 'Include name and for attributes.'
    }
  },
  {
    id: 'progress-meter',
    name: '<progress> & <meter>',
    syntax: '<progress value="70" max="100">70%</progress> and <meter value="0.8" min="0" max="1" optimum="0.9">80%</meter>',
    category: 'forms-inputs',
    categoryLabel: 'Forms & Inputs',
    shortDesc: '<progress> indicates task completion status (download, file upload); <meter> displays a scalar measurement within a known range (disk space, battery).',
    hinglish: '<progress> tag kisi chal rahe kaam ki progress (jaise file download 70%, loading bar) dikhata hai. <meter> kisi fixed range ke measurement (jaise battery 85%, disk space usage, exam grade) ko gauge ki tarah dikhata hai jisme low, high, aur optimum values set ki ja sakti hain.',
    status: 'standard',
    isVoid: false,
    closingTagUsage: 'Required closing tags for each.',
    supportedAttributes: ['value', 'max', 'min', 'low', 'high', 'optimum', 'Global attributes'],
    exampleCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; line-height: 1.8;">
  <h3>Progress Bar vs Measurement Gauge:</h3>
  
  <div>
    <strong>Course Download Progress (&lt;progress&gt;):</strong><br>
    <progress value="65" max="100" style="width: 250px; height: 18px; accent-color: #4f46e5;">65%</progress>
    <span style="font-size: 13px; color: #475569; margin-left: 8px;">65%</span>
  </div>

  <div style="margin-top: 16px;">
    <strong>Memory Usage Gauge (&lt;meter&gt;):</strong><br>
    <meter value="85" min="0" max="100" low="30" high="80" optimum="20" style="width: 250px; height: 18px;">85%</meter>
    <span style="font-size: 13px; color: #dc2626; font-weight: bold; margin-left: 8px;">High Usage (Warning)</span>
  </div>
</body>
</html>`,
    accessibilityGuidance: 'Screen readers voice the progress value and range (e.g. "Progress bar, 65 percent"). Always supply fallback text inside the tag.',
    seoRelevance: 'Semantic dashboard indicator markup.',
    commonMistakes: [
      {
        mistake: 'Using <progress> to show disk space or battery level.',
        solution: 'Use <meter> for scalar measurements and <progress> for task completion.',
        explanation: 'Progress is for completion of a task; meter is for a gauge/fraction.'
      }
    ],
    relatedElements: ['output', 'input'],
    interviewQuestions: [
      {
        question: 'When must you use <meter> instead of <progress>?',
        answer: 'Use <progress> only when measuring the completion of a progressive task (uploading, loading). Use <meter> for static scalar measurements within a fixed range (disk usage, battery level, test score).',
        hinglishTip: 'Progress = kaam kitna poora hua (loading); Meter = scale par measurement kitna hai (battery, storage).'
      }
    ],
    practiceExercise: {
      title: 'Render 80% Progress Bar',
      prompt: 'Create a <progress> tag with value="80" and max="100" with text fallback.',
      starterCode: `<div>
  <!-- Add progress bar -->
</div>`,
      solutionCode: `<div>
  <progress value="80" max="100">80%</progress>
</div>`,
      hint: 'Include value="80" and max="100".'
    }
  }
];
