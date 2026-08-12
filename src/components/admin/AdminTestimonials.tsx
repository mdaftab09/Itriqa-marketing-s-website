import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Star, Loader2, Search } from 'lucide-react';
import { supabase, type Testimonial } from '../../lib/supabase';

export function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleting, setDeleting] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchTestimonials = async () => {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setTestimonials(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const toggleFeatured = async (testimonial: Testimonial) => {
        if (!supabase) return;
        await supabase
            .from('testimonials')
            .update({ featured: !testimonial.featured })
            .eq('id', testimonial.id);
        fetchTestimonials();
    };

    const deleteTestimonial = async (id: string) => {
        if (!supabase || !confirm('Are you sure you want to delete this testimonial?')) return;
        setDeleting(id);
        await supabase.from('testimonials').delete().eq('id', id);
        setDeleting(null);
        fetchTestimonials();
    };

    const filteredTestimonials = testimonials.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Testimonials</h1>
                    <p className="text-muted-foreground mt-1">Manage client testimonials</p>
                </div>
                <Link
                    to="/admin/testimonials/new"
                    className="px-4 py-2 bg-[#0063cd] text-white rounded-xl hover:bg-[#0052a8] transition-colors flex items-center gap-2 w-fit"
                >
                    <Plus className="w-4 h-4" />
                    New Testimonial
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search testimonials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0063cd] focus:border-transparent text-foreground placeholder-muted-foreground"
                />
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#0063cd]" />
                </div>
            ) : filteredTestimonials.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-2xl">
                    <p className="text-muted-foreground">No testimonials found</p>
                    <Link
                        to="/admin/testimonials/new"
                        className="inline-flex items-center gap-2 mt-4 text-[#0063cd] hover:underline"
                    >
                        <Plus className="w-4 h-4" />
                        Add your first testimonial
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#0063cd] to-[#0052a8] rounded-full flex items-center justify-center text-white font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {testimonial.role} at {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleFeatured(testimonial)}
                                    className={`p-2 rounded-lg transition-colors ${testimonial.featured
                                            ? 'bg-amber-500/10 text-amber-500'
                                            : 'hover:bg-secondary text-muted-foreground'
                                        }`}
                                    title={testimonial.featured ? 'Remove from featured' : 'Mark as featured'}
                                >
                                    <Star className={`w-5 h-5 ${testimonial.featured ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                "{testimonial.content}"
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-4 border-t border-border">
                                <button
                                    onClick={() => navigate(`/admin/testimonials/${testimonial.id}`)}
                                    className="flex-1 py-2 text-center hover:bg-secondary rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <Pencil className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTestimonial(testimonial.id)}
                                    disabled={deleting === testimonial.id}
                                    className="flex-1 py-2 text-center hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    {deleting === testimonial.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
