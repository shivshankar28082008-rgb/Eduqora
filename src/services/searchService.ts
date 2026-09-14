import { SearchResultItem } from '../types';
import { LANGUAGES_DATA } from '../data/languagesData';
import { LESSONS_DATA } from '../data/lessonsData';
import { PROJECT_TEMPLATES } from '../data/projectTemplates';
import { RESOURCES_DATA } from '../data/resourcesData';

export const searchService = {
  search(query: string): SearchResultItem[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResultItem[] = [];

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

    return results.slice(0, 15);
  }
};
