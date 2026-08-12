import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Pencil, Plus, Calendar } from 'lucide-react';
import { supabase, type LegalPage } from '../../lib/supabase';

export function AdminLegalPages() {
    const [pages, setPages] = useState<LegalPage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPages();
    }, []);

    async function fetchPages() {
        if (!supabase) {
            // Mock data for development
            setPages([
                {
                    id: '1',
                    slug: 'privacy-policy',
                    title: 'Privacy Policy',
                    content: '# Privacy Policy\n\nContent here...',
                    last_updated: new Date().toISOString(),
                    created_at: new Date().toISOString()
                },
                {
                    id: '2',
                    slug: 'terms-of-service',
                    title: 'Terms of Service',
                    content: '# Terms of Service\n\nContent here...',
                    last_updated: new Date().toISOString(),
                    created_at: new Date().toISOString()
                }
            ]);
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('legal_pages')
            .select('*')
            .order('title', { ascending: true });

        if (!error && data) {
            setPages(data);
        }
        setLoading(false);
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Legal Pages</h1>
                    <p className="text-muted-foreground">Manage Privacy Policy & Terms of Service</p>
                </div>
                <Link to="/admin/legal/new">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-[#0063cd] text-white rounded-lg flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Page
                    </motion.button>
                </Link>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="h-24 bg-card rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : pages.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No legal pages found</p>
                    <Link
                        to="/admin/legal/new"
                        className="inline-flex items-center gap-2 mt-4 text-[#0063cd] hover:underline"
                    >
                        <Plus className="w-4 h-4" />
                        Create your first legal page
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {pages.map((page, index) => (
                        <motion.div
                            key={page.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#0063cd]/10 rounded-xl flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-[#0063cd]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground text-lg">
                                            {page.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                Updated: {formatDate(page.last_updated)}
                                            </span>
                                            <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                                                /{page.slug}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={`/legal/${page.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        View
                                    </a>
                                    <Link
                                        to={`/admin/legal/${page.id}`}
                                        className="px-3 py-1.5 bg-[#0063cd] text-white rounded-lg text-sm flex items-center gap-1"
                                    >
                                        <Pencil className="w-3 h-3" />
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
