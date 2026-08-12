import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Star, StarOff, Search, Eye, EyeOff } from 'lucide-react';
import { supabase, getAllProjects, type Project } from '../../lib/supabase';

export function AdminPortfolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        const data = await getAllProjects();
        setProjects(data);
        setLoading(false);
    }

    async function toggleFeatured(id: string, currentStatus: boolean) {
        if (!supabase) return;

        const { error } = await supabase
            .from('projects')
            .update({ featured: !currentStatus })
            .eq('id', id);

        if (!error) {
            setProjects(projects.map(p =>
                p.id === id ? { ...p, featured: !currentStatus } : p
            ));
        }
    }

    async function toggleActive(id: string, currentStatus: boolean) {
        if (!supabase) return;

        const { error } = await supabase
            .from('projects')
            .update({ active: !currentStatus })
            .eq('id', id);

        if (!error) {
            setProjects(projects.map(p =>
                p.id === id ? { ...p, active: !currentStatus } : p
            ));
        }
    }

    async function deleteProject(id: string) {
        if (!supabase || !confirm('Are you sure you want to delete this project?')) return;

        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (!error) {
            setProjects(projects.filter(p => p.id !== id));
        }
    }

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
                    <p className="text-muted-foreground">Manage your portfolio projects</p>
                </div>
                <Link to="/admin/portfolio/new">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-accent text-accent-foreground rounded-lg flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Project
                    </motion.button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 bg-card rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <p className="text-muted-foreground">No projects found</p>
                    <Link to="/admin/portfolio/new" className="text-accent hover:underline mt-2 inline-block">
                        Add your first project
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-card border border-border rounded-lg overflow-hidden"
                        >
                            {/* Cover Image */}
                            <div className={`h-32 bg-gradient-to-br ${project.gradient || 'from-accent to-accent/90'} relative overflow-hidden`}>
                                {project.cover_image && (
                                    <img
                                        src={project.cover_image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {!project.active && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">Hidden</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-foreground">{project.title}</h3>
                                        <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                                            {project.category}
                                        </span>
                                    </div>
                                    {project.featured && (
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    )}
                                </div>

                                <div className="flex items-center gap-1 mt-4">
                                    <button
                                        onClick={() => toggleFeatured(project.id, project.featured)}
                                        className={`p-2 rounded-lg transition-colors ${project.featured
                                                ? 'bg-yellow-500/10 text-yellow-500'
                                                : 'bg-gray-500/10 text-gray-500'
                                            }`}
                                        title={project.featured ? 'Featured' : 'Not featured'}
                                    >
                                        {project.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => toggleActive(project.id, project.active)}
                                        className={`p-2 rounded-lg transition-colors ${project.active
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-gray-500/10 text-gray-500'
                                            }`}
                                        title={project.active ? 'Active' : 'Hidden'}
                                    >
                                        {project.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    <Link to={`/admin/portfolio/${project.id}`} className="flex-1">
                                        <button className="w-full p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors">
                                            <Edit2 className="w-4 h-4 mx-auto" />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => deleteProject(project.id)}
                                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
