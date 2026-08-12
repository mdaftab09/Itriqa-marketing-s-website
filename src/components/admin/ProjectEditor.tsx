import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const categoryOptions = [
    'Web App', 'E-Commerce', 'Mobile App', 'Dashboard', 'Landing Page', 'SaaS', 'Other'
];

const gradientOptions = [
    { value: 'from-blue-500 to-purple-600', label: 'Blue to Purple' },
    { value: 'from-green-500 to-teal-600', label: 'Green to Teal' },
    { value: 'from-orange-500 to-red-600', label: 'Orange to Red' },
    { value: 'from-pink-500 to-purple-600', label: 'Pink to Purple' },
    { value: 'from-cyan-500 to-blue-600', label: 'Cyan to Blue' },
    { value: 'from-yellow-500 to-orange-600', label: 'Yellow to Orange' },
];

export function ProjectEditor() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = id && id !== 'new';

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [newResult, setNewResult] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: 'Web App',
        description: '',
        cover_image: '',
        tags: [] as string[],
        results: [] as string[],
        gradient: 'from-blue-500 to-purple-600',
        featured: false,
        active: true
    });

    useEffect(() => {
        if (isEditing) {
            fetchProject();
        } else {
            setLoading(false);
        }
    }, [isEditing, id]);

    async function fetchProject() {
        if (!supabase || !id) return;
        setLoading(true);

        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching project:', error);
            navigate('/admin/portfolio');
            return;
        }

        if (data) {
            setFormData({
                title: data.title || '',
                slug: data.slug || '',
                category: data.category || 'Web App',
                description: data.description || '',
                cover_image: data.cover_image || '',
                tags: data.tags || [],
                results: data.results || [],
                gradient: data.gradient || 'from-blue-500 to-purple-600',
                featured: data.featured ?? false,
                active: data.active ?? true
            });
        }
        setLoading(false);
    }

    function generateSlug(title: string) {
        return title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }

    function addTag() {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    }

    function removeTag(index: number) {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    }

    function addResult() {
        if (newResult.trim()) {
            setFormData(prev => ({
                ...prev,
                results: [...prev.results, newResult.trim()]
            }));
            setNewResult('');
        }
    }

    function removeResult(index: number) {
        setFormData(prev => ({
            ...prev,
            results: prev.results.filter((_, i) => i !== index)
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!supabase) return;
        setSaving(true);

        const projectData = {
            title: formData.title,
            slug: formData.slug || generateSlug(formData.title),
            category: formData.category,
            description: formData.description,
            cover_image: formData.cover_image || null,
            tags: formData.tags,
            results: formData.results,
            gradient: formData.gradient,
            featured: formData.featured,
            active: formData.active
        };

        let error;
        if (isEditing) {
            const result = await supabase
                .from('projects')
                .update(projectData)
                .eq('id', id);
            error = result.error;
        } else {
            const result = await supabase
                .from('projects')
                .insert([projectData]);
            error = result.error;
        }

        setSaving(false);

        if (error) {
            console.error('Error saving project:', error);
            alert('Error saving project: ' + error.message);
            return;
        }

        navigate('/admin/portfolio');
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#0063cd]" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <button
                onClick={() => navigate('/admin/portfolio')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
            </button>

            <h1 className="text-2xl font-bold text-foreground mb-6">
                {isEditing ? 'Edit Project' : 'New Project'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => {
                            const title = e.target.value;
                            setFormData(prev => ({
                                ...prev,
                                title,
                                slug: prev.slug || generateSlug(title)
                            }));
                        }}
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                        placeholder="e.g., E-Commerce Platform"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Slug
                    </label>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                        placeholder="e-commerce-platform"
                    />
                </div>

                {/* Category & Gradient */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Category *
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                        >
                            {categoryOptions.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Color Gradient
                        </label>
                        <select
                            value={formData.gradient}
                            onChange={(e) => setFormData(prev => ({ ...prev, gradient: e.target.value }))}
                            className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                        >
                            {gradientOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                    </label>
                    <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd] resize-none"
                        placeholder="Brief description of the project..."
                    />
                </div>

                {/* Cover Image */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Cover Image URL
                    </label>
                    <input
                        type="url"
                        value={formData.cover_image}
                        onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                        placeholder="https://..."
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            className="flex-1 px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                            placeholder="e.g., React"
                        />
                        <button
                            type="button"
                            onClick={addTag}
                            className="px-4 py-2 bg-[#0063cd] text-white rounded-lg"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                            <span key={index} className="flex items-center gap-1 px-3 py-1 bg-[#0063cd]/10 text-[#0063cd] rounded-full text-sm">
                                {tag}
                                <button type="button" onClick={() => removeTag(index)} className="hover:text-red-500">
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Results / Achievements
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={newResult}
                            onChange={(e) => setNewResult(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResult())}
                            className="flex-1 px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                            placeholder="e.g., 150% increase in sales"
                        />
                        <button
                            type="button"
                            onClick={addResult}
                            className="px-4 py-2 bg-[#0063cd] text-white rounded-lg"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {formData.results.map((result, index) => (
                            <div key={index} className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                                <span className="flex-1 text-sm">{result}</span>
                                <button type="button" onClick={() => removeResult(index)} className="text-muted-foreground hover:text-red-500">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured & Active */}
                <div className="flex gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                                className="sr-only"
                            />
                            <div className={`w-14 h-8 rounded-full transition-colors ${formData.featured ? 'bg-yellow-500' : 'bg-gray-300'}`}>
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${formData.featured ? 'translate-x-7' : 'translate-x-1'}`} />
                            </div>
                        </div>
                        <span className="text-sm font-medium text-foreground">Featured</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={formData.active}
                                onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                                className="sr-only"
                            />
                            <div className={`w-14 h-8 rounded-full transition-colors ${formData.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${formData.active ? 'translate-x-7' : 'translate-x-1'}`} />
                            </div>
                        </div>
                        <span className="text-sm font-medium text-foreground">Active</span>
                    </label>
                </div>

                {/* Submit */}
                <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full px-6 py-3 bg-[#0063cd] text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            {isEditing ? 'Update Project' : 'Create Project'}
                        </>
                    )}
                </motion.button>
            </form>
        </div>
    );
}
