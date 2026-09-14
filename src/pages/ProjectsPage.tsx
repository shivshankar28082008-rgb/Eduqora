import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Code2, 
  FileCode, 
  Clock, 
  Trash2, 
  Copy, 
  Edit3, 
  Download, 
  ExternalLink, 
  Check, 
  Briefcase, 
  Calculator, 
  CheckSquare, 
  Database,
  Search,
  Sparkles
} from 'lucide-react';
import { projectService } from '../services/projectService';
import { useToast } from '../components/Toast';
import { LanguageIcon } from '../components/LanguageIcon';
import { Project, ProjectTemplate } from '../types';

interface ProjectsPageProps {
  onNavigate: (route: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>(projectService.getProjects());
  const [templates, setTemplates] = useState<ProjectTemplate[]>(projectService.getTemplates());
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('portfolio-starter');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameTitle, setRenameTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshProjects = () => {
    setProjects(projectService.getProjects());
  };

  const handleCreateProject = () => {
    const created = projectService.createProjectFromTemplate(selectedTemplateId, customTitle.trim() || undefined);
    refreshProjects();
    setIsNewProjectModalOpen(false);
    setCustomTitle('');
    toast('Project Created!', `Initialized "${created.title}" in Code Lab.`, 'success');
    onNavigate(`#/code-lab?project=${created.id}`);
  };

  const handleDuplicate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const dup = projectService.duplicateProject(id);
    if (dup) {
      refreshProjects();
      toast('Project Duplicated', `Created copy "${dup.title}".`, 'success');
    }
  };

  const handleDelete = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete project "${title}"?`)) {
      projectService.deleteProject(id);
      refreshProjects();
      toast('Project Deleted', `Removed "${title}".`, 'info');
    }
  };

  const handleStartRename = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingId(project.id);
    setRenameTitle(project.title);
  };

  const handleSaveRename = (id: string) => {
    const proj = projectService.getProjectById(id);
    if (proj && renameTitle.trim()) {
      proj.title = renameTitle.trim();
      projectService.saveProject(proj);
      refreshProjects();
      toast('Project Renamed', `Updated to "${proj.title}".`, 'success');
    }
    setRenamingId(null);
  };

  const handleDownload = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    projectService.downloadProject(project);
    toast('Project Downloaded', `Exported "${project.title}".`, 'info');
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Code2 className="w-3.5 h-3.5" /> Workspace Projects
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            My Projects
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage your personal coding projects, starter templates, and Code Lab files.
          </p>
        </div>

        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-8 max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter projects by title or language..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-indigo-500 transition"
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Code2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Projects Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Build your first project in Eduqora Code Lab or initialize one from our developer templates.
          </p>
          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
          >
            Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(p => (
            <div
              key={p.id}
              onClick={() => onNavigate(`#/code-lab?project=${p.id}`)}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-400 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
                    <LanguageIcon id={p.language} size={13} />
                    <span>{p.language}</span>
                  </span>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                    <button
                      onClick={e => handleStartRename(p, e)}
                      className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      title="Rename"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={e => handleDuplicate(p.id, e)}
                      className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={e => handleDownload(p, e)}
                      className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      title="Download JSON"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={e => handleDelete(p.id, p.title, e)}
                      className="p-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-400 hover:text-rose-500"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {renamingId === p.id ? (
                  <div className="flex items-center gap-1 mb-2" onClick={e => e.stopPropagation()}>
                    <input
                      type="text"
                      value={renameTitle}
                      onChange={e => setRenameTitle(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSaveRename(p.id)}
                      autoFocus
                      className="w-full px-2 py-1 bg-slate-100 dark:bg-slate-800 border rounded text-xs font-bold"
                    />
                    <button 
                      onClick={() => handleSaveRename(p.id)}
                      className="p-1 bg-indigo-600 text-white rounded"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate">
                    {p.title}
                  </h3>
                )}

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                {/* File Badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.files.map(f => (
                    <span
                      key={f.id}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800"
                    >
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(p.updatedAt).toLocaleDateString()}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline flex items-center gap-1">
                  Open IDE <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Project Modal with Templates */}
      {isNewProjectModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setIsNewProjectModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Create New Project
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Choose a starter template or begin with a clean workspace.
                </p>
              </div>
            </div>

            {/* Custom Title Input */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Project Name:
              </label>
              <input
                type="text"
                placeholder="e.g. My Interactive Web App"
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Template Selection Grid */}
            <div className="space-y-2 mb-6">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Choose Starter Template:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {templates.map(tmpl => (
                  <div
                    key={tmpl.id}
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition ${
                      selectedTemplateId === tmpl.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 dark:border-indigo-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {tmpl.title}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        <LanguageIcon id={tmpl.language} size={12} />
                        <span>{tmpl.language}</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {tmpl.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition"
              >
                Launch in Code Lab
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
