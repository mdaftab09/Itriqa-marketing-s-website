import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function LegalPageEditor() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = id && id !== 'new';

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: ''
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetchPage();
        }
    }, [id]);

    async function fetchPage() {
        if (!supabase || !id) return;
        setLoading(true);

        const { data, error } = await supabase
            .from('legal_pages')
            .select('*')
            .eq('id', id)
            .single();

        if (!error && data) {
            setFormData({
                title: data.title,
                slug: data.slug,
                content: data.content
            });
        }
        setLoading(false);
    }

    function generateSlug(title: string) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!supabase) {
            alert('Supabase not configured');
            return;
        }

        setSaving(true);

        const pageData = {
            ...formData,
            last_updated: new Date().toISOString()
        };

        let error;

        if (isEditing) {
            const result = await supabase
                .from('legal_pages')
                .update(pageData)
                .eq('id', id);
            error = result.error;
        } else {
            const result = await supabase
                .from('legal_pages')
                .insert([{ ...pageData, created_at: new Date().toISOString() }]);
            error = result.error;
        }

        setSaving(false);

        if (error) {
            alert('Error saving: ' + error.message);
        } else {
            navigate('/admin/legal');
        }
    }

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-secondary rounded w-1/3" />
                <div className="h-12 bg-secondary rounded" />
                <div className="h-64 bg-secondary rounded" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/legal')}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {isEditing ? 'Edit Legal Page' : 'New Legal Page'}
                    </h1>
                    <p className="text-muted-foreground">
                        {isEditing ? 'Update page content' : 'Create a new legal page'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                        slug: isEditing ? formData.slug : generateSlug(e.target.value)
                                    });
                                }}
                                required
                                placeholder="Privacy Policy"
                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Slug *
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                required
                                placeholder="privacy-policy"
                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                URL: /legal/{formData.slug || 'slug'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-foreground">
                                Content * (Markdown)
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPreview(!showPreview)}
                                className="flex items-center gap-1 text-sm text-[#0063cd] hover:underline"
                            >
                                {showPreview ? (
                                    <>
                                        <EyeOff className="w-4 h-4" />
                                        Hide Preview
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-4 h-4" />
                                        Show Preview
                                    </>
                                )}
                            </button>
                        </div>

                        {showPreview ? (
                            <div className="bg-background border border-border rounded-lg p-6 min-h-[400px] prose prose-sm dark:prose-invert max-w-none">
                                {formData.content.split('\n\n').map((paragraph, index) => {
                                    if (paragraph.startsWith('# ')) {
                                        return (
                                            <h1 key={index} className="text-2xl font-bold mb-4">
                                                {paragraph.replace('# ', '')}
                                            </h1>
                                        );
                                    }
                                    if (paragraph.startsWith('## ')) {
                                        return (
                                            <h2 key={index} className="text-xl font-bold mt-6 mb-3">
                                                {paragraph.replace('## ', '')}
                                            </h2>
                                        );
                                    }
                                    return (
                                        <p key={index} className="text-muted-foreground mb-4">
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>
                        ) : (
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
                                rows={16}
                                placeholder={`# Privacy Policy

Last updated: December 2024

## Introduction

Your privacy is important to us...

## Information We Collect

We may collect the following information:
- Name and contact details
- Email address
- Website usage data

## Contact Us

If you have questions, contact us at hello@irtiqamarketing.com`}
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
                            />
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/legal')}
                            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Cancel
                        </button>
                        <motion.button
                            type="submit"
                            disabled={saving}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-2 bg-[#0063cd] text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Saving...' : 'Save Page'}
                        </motion.button>
                    </div>
                </div>
            </form>
        </div>
    );
}
