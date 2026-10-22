import { Project, ProjectTemplate, LanguageId, ProjectFile } from '../types';
import { PROJECT_TEMPLATES } from '../data/projectTemplates';
import { storageService } from './storageService';
import { authService } from './authService';
import { firebaseService } from './firebaseService';

export const projectService = {
  getProjects(): Project[] {
    return storageService.getProjects();
  },

  getProjectById(id: string): Project | undefined {
    return storageService.getProjects().find(p => p.id === id);
  },

  getTemplates(): ProjectTemplate[] {
    return PROJECT_TEMPLATES;
  },

  createProjectFromTemplate(templateId: string, customTitle?: string): Project {
    const tmpl = PROJECT_TEMPLATES.find(t => t.id === templateId) || PROJECT_TEMPLATES[0];
    const newId = 'proj-' + Date.now();
    const newProject: Project = {
      id: newId,
      title: customTitle || tmpl.title,
      description: tmpl.description,
      language: tmpl.language,
      files: tmpl.files.map((f, idx) => ({
        id: `f-${newId}-${idx}`,
        name: f.name,
        language: f.language,
        content: f.content,
        isEntry: f.isEntry,
      })),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const current = storageService.getProjects();
    storageService.saveProjects([newProject, ...current]);

    authService.addXP(50, `Created Project ${newProject.title}`);
    storageService.addActivity({
      type: 'project_created',
      title: `Created ${newProject.title}`,
      detail: `Initialized project with ${newProject.files.length} files in Code Lab.`,
      xpGained: 50,
    });

    return newProject;
  },

  createBlankProject(title: string, language: LanguageId = 'html'): Project {
    const newId = 'proj-' + Date.now();
    let initialFiles: ProjectFile[] = [
      { 
        id: `f-${newId}-0`, 
        name: 'index.html', 
        language: 'html' as const, 
        content: '', 
        isEntry: true 
      },
      { 
        id: `f-${newId}-1`, 
        name: 'styles.css', 
        language: 'css' as const, 
        content: '', 
      },
      { 
        id: `f-${newId}-2`, 
        name: 'script.js', 
        language: 'javascript' as const, 
        content: '', 
      },
    ];

    if (language === 'python') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'main.py', language: 'python' as const, content: '', isEntry: true },
      ];
    } else if (language === 'sql') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'query.sql', language: 'sql' as const, content: '', isEntry: true },
      ];
    } else if (language === 'c') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'main.c', language: 'c' as const, content: '', isEntry: true },
      ];
    } else if (language === 'cpp') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'main.cpp', language: 'cpp' as const, content: '', isEntry: true },
      ];
    } else if (language === 'java') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'Main.java', language: 'java' as const, content: '', isEntry: true },
      ];
    } else if (language === 'php') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'index.php', language: 'php' as const, content: '', isEntry: true },
      ];
    } else if (language === 'javascript') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'index.js', language: 'javascript' as const, content: '', isEntry: true },
      ];
    } else if (language === 'go') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'main.go', language: 'go' as const, content: '', isEntry: true },
      ];
    } else if (language === 'rust') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'main.rs', language: 'rust' as const, content: '', isEntry: true },
      ];
    } else if (language === 'csharp') {
      initialFiles = [
        { id: `f-${newId}-0`, name: 'Program.cs', language: 'csharp' as const, content: '', isEntry: true },
      ];
    } else if (language === 'css') {
      initialFiles = [
        {
          id: `f-${newId}-0`,
          name: 'styles.css',
          language: 'css' as const,
          content: '',
          isEntry: true,
        },
      ];
    }

    const newProject: Project = {
      id: newId,
      title: title.trim() || 'Untitled Project',
      description: 'Custom coding project created in Codevaible Code Lab.',
      language,
      files: initialFiles,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const current = storageService.getProjects();
    storageService.saveProjects([newProject, ...current]);
    return newProject;
  },

  saveProject(updated: Project): void {
    const current = storageService.getProjects();
    const idx = current.findIndex(p => p.id === updated.id);
    const stamped = { ...updated, updatedAt: Date.now() };

    if (idx >= 0) {
      current[idx] = stamped;
      storageService.saveProjects(current);
    } else {
      storageService.saveProjects([stamped, ...current]);
    }
  },

  duplicateProject(id: string): Project | null {
    const existing = this.getProjectById(id);
    if (!existing) return null;

    const newId = 'proj-' + Date.now();
    const duplicated: Project = {
      ...existing,
      id: newId,
      title: `${existing.title} (Copy)`,
      files: existing.files.map(f => ({
        ...f,
        id: 'f-' + newId + '-' + Math.random().toString(36).substring(2, 6),
      })),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const current = storageService.getProjects();
    storageService.saveProjects([duplicated, ...current]);
    return duplicated;
  },

  deleteProject(id: string): boolean {
    const current = storageService.getProjects();
    const filtered = current.filter(p => p.id !== id);
    if (filtered.length === current.length) return false;
    storageService.saveProjects(filtered);
    return true;
  },

  downloadProject(project: Project): void {
    // Generate combined bundle or single download
    const bundle: Record<string, string> = {};
    project.files.forEach(f => {
      bundle[f.name] = f.content;
    });

    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-codevaible.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Syncs all local projects to Firebase Cloud Firestore for the authenticated user
   */
  async syncAllToCloud(userId: string): Promise<{ syncedCount: number; errors: string[] }> {
    const localProjects = storageService.getProjects();
    const errors: string[] = [];
    let syncedCount = 0;

    for (const project of localProjects) {
      try {
        await firebaseService.saveProject(project, userId);
        syncedCount++;
      } catch (err: any) {
        errors.push(`Failed to sync ${project.title}: ${err.message || String(err)}`);
      }
    }

    return { syncedCount, errors };
  },

  /**
   * Fetches projects stored in Firestore and merges them with local projects
   */
  async fetchCloudProjects(userId: string): Promise<Project[]> {
    try {
      const cloudProjects = await firebaseService.getUserProjects(userId);
      if (cloudProjects && cloudProjects.length > 0) {
        const localProjects = storageService.getProjects();
        const map = new Map<string, Project>();
        // Add cloud projects first
        cloudProjects.forEach(p => map.set(p.id, p));
        // Add local projects if not present or newer
        localProjects.forEach(p => {
          const existing = map.get(p.id);
          if (!existing || (p.updatedAt && p.updatedAt > (existing.updatedAt || 0))) {
            map.set(p.id, p);
          }
        });
        const merged = Array.from(map.values());
        storageService.saveProjects(merged);
        return merged;
      }
    } catch (err) {
      console.warn('Could not fetch cloud projects from Firestore:', err);
    }
    return storageService.getProjects();
  }
};
