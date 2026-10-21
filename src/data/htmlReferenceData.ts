import { HtmlTagItem, HtmlTagCategory } from '../types/htmlReferenceTypes';
import { STRUCTURE_TAGS } from './html/structureTags';
import { SEMANTIC_TAGS } from './html/semanticTags';
import { TEXT_TAGS } from './html/textTags';
import { LIST_TABLE_TAGS } from './html/listTableTags';
import { MEDIA_GRAPHICS_TAGS } from './html/mediaGraphicsTags';
import { FORM_TAGS } from './html/formTags';
import { DEPRECATED_TAGS } from './html/deprecatedTags';
import { ATTRIBUTE_EVENT_TAGS } from './html/attributeEventTags';

export const HTML_TAGS_DATA: HtmlTagItem[] = [
  ...STRUCTURE_TAGS,
  ...SEMANTIC_TAGS,
  ...TEXT_TAGS,
  ...LIST_TABLE_TAGS,
  ...MEDIA_GRAPHICS_TAGS,
  ...FORM_TAGS,
  ...DEPRECATED_TAGS,
  ...ATTRIBUTE_EVENT_TAGS,
];

// Helper to count tags per category
const countCategory = (catId: HtmlTagCategory) =>
  HTML_TAGS_DATA.filter(t => t.category === catId).length;

export const HTML_CATEGORIES: Array<{ id: HtmlTagCategory; label: string; count: number; icon: string }> = [
  { id: 'document-structure', label: 'Document Structure', count: countCategory('document-structure'), icon: 'Layout' },
  { id: 'headings-text', label: 'Headings & Text', count: countCategory('headings-text'), icon: 'Type' },
  { id: 'inline-text', label: 'Inline Text Semantics', count: countCategory('inline-text'), icon: 'Code' },
  { id: 'links-media', label: 'Links & Media', count: countCategory('links-media'), icon: 'Image' },
  { id: 'lists', label: 'Lists', count: countCategory('lists'), icon: 'List' },
  { id: 'tables', label: 'Tables', count: countCategory('tables'), icon: 'Table' },
  { id: 'forms-inputs', label: 'Forms & Inputs', count: countCategory('forms-inputs'), icon: 'CheckSquare' },
  { id: 'semantic-html', label: 'Semantic Layout', count: countCategory('semantic-html'), icon: 'BookOpen' },
  { id: 'graphics-svg', label: 'Graphics & Canvas', count: countCategory('graphics-svg'), icon: 'Palette' },
  { id: 'html-apis', label: 'Web Components', count: countCategory('html-apis'), icon: 'Layers' },
  { id: 'deprecated-tags', label: 'Deprecated & Obsolete Tags', count: countCategory('deprecated-tags'), icon: 'AlertTriangle' },
  { id: 'attributes', label: 'HTML Attributes', count: countCategory('attributes'), icon: 'Tag' },
  { id: 'events', label: 'HTML Events', count: countCategory('events'), icon: 'Zap' },
  { id: 'input-types', label: 'Input Types', count: countCategory('input-types'), icon: 'CheckSquare' },
];
