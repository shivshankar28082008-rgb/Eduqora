/**
 * Codevaible Dynamic SEO & Metadata Manager
 * Updates document title, meta descriptions, canonical URL, OpenGraph, Twitter cards,
 * and page-specific Schema.org JSON-LD structured data upon route transitions.
 */

export interface PageMetadata {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
  ogType?: 'website' | 'article';
  schema?: Record<string, unknown>;
}

export function updatePageSEO(metadata: PageMetadata): void {
  if (typeof document === 'undefined') return;

  // 1. Title
  document.title = metadata.title;

  // 2. Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', metadata.description);

  // 3. Meta keywords if provided
  if (metadata.keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', metadata.keywords);
  }

  // 4. Canonical URL
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://codevaible.com';
  const cleanPath = metadata.canonicalPath || '';
  const canonicalUrl = `${origin}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`;

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 5. OpenGraph Tags
  const updateMetaProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  updateMetaProperty('og:title', metadata.title);
  updateMetaProperty('og:description', metadata.description);
  updateMetaProperty('og:url', canonicalUrl);
  updateMetaProperty('og:type', metadata.ogType || 'website');

  // 6. Twitter Card Tags
  const updateMetaName = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  updateMetaName('twitter:title', metadata.title);
  updateMetaName('twitter:description', metadata.description);

  // 7. Dynamic JSON-LD Structured Data for Route
  const existingScript = document.getElementById('route-schema');
  if (metadata.schema) {
    const jsonString = JSON.stringify(metadata.schema);
    if (existingScript) {
      existingScript.textContent = jsonString;
    } else {
      const script = document.createElement('script');
      script.id = 'route-schema';
      script.type = 'application/ld+json';
      script.textContent = jsonString;
      document.head.appendChild(script);
    }
  } else if (existingScript) {
    existingScript.remove();
  }
}

/**
 * Returns optimized metadata and Schema.org structured data for any route
 */
export function getRouteMetadata(pathParts: string[]): PageMetadata {
  if (pathParts.length === 0) {
    return {
      title: 'Codevaible Coding Learning Lab — Learn Code. Build Real Ideas.',
      description: 'Learn programming, write code, run projects, and build real-world applications with interactive lessons, in-browser Code Lab compiler, and visual DSA tutorials on Codevaible.',
      canonicalPath: '/',
      keywords: 'coding lab, learn code, coding tutorials, online compiler, python, javascript, html, dsa',
      ogType: 'website'
    };
  }

  const primary = pathParts[0].toLowerCase();

  switch (primary) {
    case 'learn':
    case 'languages': {
      if (pathParts.length === 1) {
        return {
          title: 'Interactive Coding Tracks & Programming Courses | Codevaible',
          description: 'Explore structured programming tracks in HTML, CSS, JavaScript, Python, C++, and Java with interactive exercises and live code execution.',
          canonicalPath: '/learn',
          keywords: 'coding courses, learn python, learn javascript, html course, c++ tutorial',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'Course',
            'name': 'Codevaible Interactive Programming Tracks',
            'description': 'Beginner-to-advanced hands-on coding curriculum with live code execution.',
            'provider': {
              '@type': 'EducationalOrganization',
              'name': 'Codevaible',
              'sameAs': 'https://codevaible.com/'
            }
          }
        };
      }
      const lang = pathParts[1].toUpperCase();
      return {
        title: `${lang} Programming Tutorials & Practice | Codevaible`,
        description: `Learn ${lang} from basics to advanced concepts with step-by-step explanations, code examples, and practice challenges.`,
        canonicalPath: `/learn/${pathParts[1]}`,
        keywords: `${lang} tutorial, learn ${lang}, ${lang} syntax, coding practice`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Course',
          'name': `${lang} Programming Track`,
          'description': `Complete ${lang} coding course with interactive lessons.`,
          'provider': {
            '@type': 'EducationalOrganization',
            'name': 'Codevaible'
          }
        }
      };
    }

    case 'html-reference':
    case 'html-tags':
    case 'tags':
      return {
        title: 'Complete HTML5 Reference & Tag Guide | Codevaible',
        description: 'Comprehensive HTML5 tag directory with syntax examples, attribute guides, browser compatibility notes, and live interactive Code Lab previews.',
        canonicalPath: '/html-reference',
        keywords: 'html reference, html5 tags, html cheatsheet, web development tags, html attributes',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': 'HTML5 Complete Tag Directory & Reference Guide',
          'description': 'Exhaustive reference for modern HTML5 elements and attributes with live preview examples.'
        }
      };

    case 'html-practice':
    case 'practice':
      return {
        title: 'HTML, CSS & JS Code Practice Workbench | Codevaible',
        description: 'Interactive HTML, CSS, and JavaScript practice sandbox. Build UI components and test responsive designs with instant live rendering.',
        canonicalPath: '/html-practice',
        keywords: 'html practice, css sandbox, javascript playground, frontend practice'
      };

    case 'dsa':
      return {
        title: 'Data Structures & Algorithms with Visual Animations | Codevaible',
        description: 'Master DSA visually with animated step-by-step walk-throughs of arrays, linked lists, stacks, trees, graphs, and sorting algorithms.',
        canonicalPath: '/dsa',
        keywords: 'dsa visualizer, data structures, algorithms tutorial, sorting animation, binary tree',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': 'Interactive Data Structures & Algorithms Visual Guide',
          'description': 'Visual learning for data structures and computer science algorithms.'
        }
      };

    case 'dsa-questions':
    case 'dsa-qa':
    case 'questions':
    case 'interview-prep':
    case 'coding-challenges':
      return {
        title: 'DSA Coding Interview Questions & Solutions | Codevaible',
        description: 'Practice top software engineering interview questions with step-by-step explanations, optimal approaches, and runnable solutions.',
        canonicalPath: '/dsa-questions',
        keywords: 'coding interview questions, dsa problems, leetcode style problems, algorithm challenges'
      };

    case 'code-lab':
    case 'code':
    case 'codelab':
    case 'live':
    case 'html-playground':
    case 'playground':
    case 'sandbox':
      return {
        title: 'Code Lab — Online Code Editor & Live Compiler | Codevaible',
        description: 'Write, debug, and execute HTML, CSS, JavaScript, Python, C++, and Java with intelligent VS Code-style autocomplete in Codevaible Code Lab.',
        canonicalPath: '/code-lab',
        keywords: 'online code editor, live compiler, code lab, online ide, web ide, js compiler',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Codevaible Code Lab IDE',
          'operatingSystem': 'Web Browser',
          'applicationCategory': 'DeveloperApplication',
          'description': 'Full-featured online multi-language code editor and live compiler with intelligent autocomplete.'
        }
      };

    case 'projects':
      return {
        title: 'Guided Real-World Coding Projects | Codevaible',
        description: 'Build real-world web apps, developer tools, and portfolio projects with step-by-step milestones, starter templates, and live preview.',
        canonicalPath: '/projects',
        keywords: 'coding projects, portfolio projects, frontend projects, web dev projects'
      };

    case 'quiz':
    case 'quizzes':
      return {
        title: 'Interactive Programming & Tech Skill Quizzes | Codevaible',
        description: 'Test your programming knowledge across HTML, CSS, JavaScript, Python, and DSA with instant scoring and detailed explanations.',
        canonicalPath: '/quiz',
        keywords: 'programming quiz, coding test, html quiz, javascript quiz, dsa quiz'
      };

    case 'resources':
      return {
        title: 'Developer Cheat Sheets, Roadmaps & Tools | Codevaible',
        description: 'Curated collection of developer cheat sheets, learning roadmaps, documentation quick-references, and essential developer tools.',
        canonicalPath: '/resources',
        keywords: 'developer cheat sheets, programming roadmaps, developer resources, web dev tools'
      };

    case 'about':
      return {
        title: 'About Codevaible — Modern Coding Learning Lab',
        description: 'Learn about Codevaible’s mission to make computer science and web development hands-on, accessible, and intuitive through interactive tools.',
        canonicalPath: '/about',
        keywords: 'about codevaible, coding education mission, interactive learning platform'
      };

    case 'contact':
      return {
        title: 'Contact Codevaible Support & Community | Codevaible',
        description: 'Get in touch with the Codevaible team for platform feedback, technical support, educational partnerships, and questions.',
        canonicalPath: '/contact',
        keywords: 'contact codevaible, developer support, coding platform feedback'
      };

    default:
      return {
        title: 'Codevaible Coding Learning Lab — Learn Code. Build Real Ideas.',
        description: 'Learn programming, write code, run projects, and build real-world applications with interactive lessons, in-browser Code Lab compiler, and visual DSA tutorials.',
        canonicalPath: '/',
        keywords: 'coding lab, learn code, coding tutorials, online compiler'
      };
  }
}
