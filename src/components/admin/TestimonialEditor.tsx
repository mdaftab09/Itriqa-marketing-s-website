import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function TestimonialEditor() {
    const { id } = useParams<{ id: string }>();
    const isEditing = id && id !== 'new';
    const navigate = useNavigate();

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        content: '',
        avatar: '',
        rating: 5,
        featured: false,
    });

    useEffect(() => {
        if (isEditing && supabase) {
            supabase
                .from('testimonials')
                .select('*')
                .eq('id', id)
                .single()
                .then(({ data }) => {
                    if (data) {
                        setFormData({
                            name: data.name,
                            role: data.role || '',
                            company: data.company || '',
                            content: data.content,
                            avatar: data.avatar || '',
                            rating: data.rating,
                            featured: data.featured,
                        });
                    }
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) return;

        setSaving(true);

        const testimonialData = {
            name: formData.name,
            role: formData.role,
            company: formData.company,
            content: formData.content,
            avatar: formData.avatar || null,
            rating: formData.rating,
            featured: formData.featured,
        };

        if (isEditing) {
            await supabase.from('testimonials').update(testimonialData).eq('id', id);
        } else {
            await supabase.from('testimonials').insert({
                ...testimonialData,
                created_at: new Date().toISOString(),
            });
        }

        setSaving(false);
        navigate('/admin/testimonials');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#0063cd]" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/admin/testimonials')}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        {isEditing ? 'Edit Testimonial' : 'New Testimonial'}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isEditing ? 'Update testimonial details' : 'Add a new client testimonial'}
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
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Client Name *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Role & Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Role/Position
                            </label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground"
                                placeholder="CEO"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Company
                            </label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground"
                                placeholder="Company Inc."
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Testimonial Content *
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground resize-none"
                            placeholder="What did the client say about your work?"
                        />
                    </div>

                    {/* Avatar URL */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Avatar URL (optional)
                        </label>
                        <input
                            type="url"
                            value={formData.avatar}
                            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] text-foreground"
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Rating
                        </label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                    className="p-1 hover:scale-110 transition-transform"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= formData.rating
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                        <div>
                            <div className="font-medium text-foreground">Featured Testimonial</div>
                            <div className="text-sm text-muted-foreground">Show this testimonial on the homepage</div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                            className={`relative w-14 h-8 rounded-full transition-colors ${formData.featured ? 'bg-[#0063cd]' : 'bg-border'
                                }`}
                        >
                            <span
                                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${formData.featured ? 'translate-x-7' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </motion.div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/testimonials')}
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
                                {isEditing ? 'Update' : 'Create'}
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
