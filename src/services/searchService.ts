import { SearchResultItem } from '../types';
import { LANGUAGES_DATA } from '../data/languagesData';
import { LESSONS_DATA } from '../data/lessonsData';
import { PROJECT_TEMPLATES } from '../data/projectTemplates';
import { RESOURCES_DATA } from '../data/resourcesData';
import { DSA_TOPICS } from '../data/dsaData';
import { HTML_TAGS_DATA } from '../data/htmlReferenceData';

export const searchService = {
  search(query: string): SearchResultItem[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResultItem[] = [];

    // Quick Match: Code Lab & Sandbox
    if ('codelab'.includes(q) || 'code lab'.includes(q) || 'sandbox'.includes(q) || 'vscode'.includes(q) || 'live'.includes(q) || 'playground'.includes(q)) {
      results.push({
        id: 'nav-codelab',
        type: 'resource',
        title: 'VS Code Live Code Lab & Sandbox',
        subtitle: 'Interactive Multi-Language Execution Studio',
        description: 'Multi-file editor with live preview, DOM sandbox, terminal compiler, and in-browser console logging.',
        url: '#/code-lab',
      });
    }

    // 1. Search Languages
    LANGUAGES_DATA.forEach(lang => {
      if (
        lang.name.toLowerCase().includes(q) ||
        lang.id.toLowerCase().includes(q) ||
        lang.shortDesc.toLowerCase().includes(q)
      ) {
        results.push({
          id: 'lang-' + lang.id,
          type: 'language',
          title: lang.name,
          subtitle: `${lang.difficulty} Track • ${lang.lessonCount} Lessons`,
          description: lang.shortDesc,
          url: `#/learn/${lang.id}`,
          languageId: lang.id,
          difficulty: lang.difficulty,
        });
      }
    });

    // 2. Search Lessons
    LESSONS_DATA.forEach(lesson => {
      if (
        lesson.title.toLowerCase().includes(q) ||
        lesson.description.toLowerCase().includes(q) ||
        lesson.whatIsIt.toLowerCase().includes(q) ||
        lesson.syntax.toLowerCase().includes(q)
      ) {
        results.push({
          id: 'lesson-' + lesson.id,
          type: 'lesson',
          title: lesson.title,
          subtitle: `${lesson.languageId.toUpperCase()} • ${lesson.difficulty} (${lesson.estimatedMinutes} mins)`,
          description: lesson.description,
          url: `#/learn/${lesson.languageId}/${lesson.id}`,
          languageId: lesson.languageId,
          difficulty: lesson.difficulty,
        });
      }
    });

    // 3. Search Projects
    PROJECT_TEMPLATES.forEach(p => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.language.toLowerCase().includes(q)
      ) {
        results.push({
          id: 'proj-' + p.id,
          type: 'project',
          title: p.title,
          subtitle: `Project Template • ${p.language.toUpperCase()}`,
          description: p.description,
          url: `#/code-lab?template=${p.id}`,
          languageId: p.language,
        });
      }
    });

    // 4. Search Resources
    RESOURCES_DATA.forEach(res => {
      if (
        res.title.toLowerCase().includes(q) ||
        res.category.toLowerCase().includes(q) ||
        res.summary.toLowerCase().includes(q)
      ) {
        results.push({
          id: 'res-' + res.id,
          type: 'resource',
          title: res.title,
          subtitle: `Cheat Sheet • ${res.category}`,
          description: res.summary,
          url: `#/resources`,
          languageId: res.languageId,
        });
      }
    });

    // 5. Search DSA Topics
    DSA_TOPICS.forEach(topic => {
      if (
        topic.name.toLowerCase().includes(q) ||
        topic.shortDesc.toLowerCase().includes(q) ||
        topic.introduction.toLowerCase().includes(q) ||
        topic.id.toLowerCase().includes(q)
      ) {
        results.push({
          id: 'dsa-' + topic.id,
          type: 'lesson',
          title: `DSA: ${topic.name}`,
          subtitle: `${topic.category === 'data-structures' ? 'Data Structure' : 'Algorithm'} • ${topic.difficulty}`,
          description: topic.shortDesc,
          url: `#/dsa/${topic.id}`,
          difficulty: topic.difficulty,
        });
      }
    });

    // 6. Search HTML Tags Reference
    HTML_TAGS_DATA.forEach(tag => {
      const cleanName = tag.name.replace(/[<>!/]/g, '').toLowerCase();
      if (
        tag.name.toLowerCase().includes(q) ||
        cleanName.includes(q) ||
        tag.shortDesc.toLowerCase().includes(q) ||
        tag.categoryLabel.toLowerCase().includes(q)
      ) {
        results.push({
          id: 'html-tag-' + tag.id,
          type: 'resource',
          title: `HTML: ${tag.name}`,
          subtitle: `${tag.categoryLabel} • ${tag.isDeprecated ? 'Obsolete' : 'Standard'}`,
          description: tag.shortDesc,
          url: `#/html-reference/${tag.id}`,
        });
      }
    });

    return results.slice(0, 15);
  }
};
