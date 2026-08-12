import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function BlogEditor() {
    const { id } = useParams<{ id: string }>();
    const isEditing = id && id !== 'new';
    const navigate = useNavigate();

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        cover_image: '',
        author: 'Irtiqa Marketing',
        category: '',
        tags: '',
        published: false,
    });

    useEffect(() => {
        if (isEditing && supabase) {
            supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single()
                .then(({ data }) => {
                    if (data) {
                        setFormData({
                            title: data.title,
                            slug: data.slug,
                            excerpt: data.excerpt || '',
                            content: data.content,
                            cover_image: data.cover_image || '',
                            author: data.author,
                            category: data.category || '',
                            tags: data.tags?.join(', ') || '',
                            published: data.published,
                        });
                    }
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug || generateSlug(title),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) return;

        setSaving(true);

        const blogData = {
            title: formData.title,
            slug: formData.slug || generateSlug(formData.title),
            excerpt: formData.excerpt,
            content: formData.content,
            cover_image: formData.cover_image || null,
            author: formData.author,
            category: formData.category,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            published: formData.published,
            updated_at: new Date().toISOString(),
        };

        if (isEditing) {
            await supabase.from('blogs').update(blogData).eq('id', id);
        } else {
            await supabase.from('blogs').insert({
                ...blogData,
                created_at: new Date().toISOString(),
            });
        }

        setSaving(false);
        navigate('/admin/blogs');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#0063cd]" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/admin/blogs')}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        {isEditing ? 'Edit Blog Post' : 'New Blog Post'}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isEditing ? 'Update your blog content' : 'Create a new blog post'}
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6 space-y-6"
                >
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleTitleChange}
                            required
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground"
                            placeholder="Enter blog title"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            URL Slug
                        </label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground"
                            placeholder="url-friendly-slug"
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Excerpt
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground resize-none"
                            placeholder="Brief description of the blog post"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Content *
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                            rows={12}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground resize-y font-mono text-sm"
                            placeholder="Write your blog content here. Use ## for headings."
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Supports basic markdown: Use ## for headings
                        </p>
                    </div>

                    {/* Category & Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground"
                                placeholder="e.g., Technology, Design"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Tags
                            </label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground"
                                placeholder="React, Web Dev, Tips (comma separated)"
                            />
                        </div>
                    </div>

                    {/* Cover Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Cover Image URL
                        </label>
                        <input
                            type="url"
                            value={formData.cover_image}
                            onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground"
                            placeholder="Author name"
                        />
                    </div>

                    {/* Published Toggle */}
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                        <div>
                            <div className="font-medium text-foreground">Publish Post</div>
                            <div className="text-sm text-muted-foreground">Make this post visible on the blog</div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, published: !formData.published })}
                            className={`relative w-14 h-8 rounded-full transition-colors ${formData.published ? 'bg-[#0063cd]' : 'bg-border'
                                }`}
                        >
                            <span
                                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${formData.published ? 'translate-x-7' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </motion.div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/blogs')}
                        className="px-6 py-3 border border-border rounded-xl hover:bg-secondary transition-colors"
                    >
                        Cancel
                    </button>
                    <motion.button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-[#0063cd] text-white rounded-xl hover:bg-[#0052a8] transition-colors flex items-center gap-2 disabled:opacity-50"
                        whileHover={{ scale: saving ? 1 : 1.02 }}
                        whileTap={{ scale: saving ? 1 : 0.98 }}
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                {isEditing ? 'Update Post' : 'Create Post'}
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
