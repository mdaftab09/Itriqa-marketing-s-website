import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getLegalPage, type LegalPage as LegalPageType } from '../../lib/supabase';

export function LegalPage() {
    const { slug } = useParams<{ slug: string }>();
    const [page, setPage] = useState<LegalPageType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPage() {
            if (!slug) return;
            try {
                const data = await getLegalPage(slug);
                if (!data) {
                    setError('Page not found');
                    setLoading(false);
                    return;
                }
                setPage(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load page');
                setLoading(false);
            }
        }
        fetchPage();
    }, [slug]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="bg-background pt-20 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-20">
                    <div className="animate-pulse">
                        <div className="h-8 bg-secondary rounded w-1/3 mb-4" />
                        <div className="h-4 bg-secondary rounded w-1/4 mb-8" />
                        <div className="space-y-4">
                            <div className="h-4 bg-secondary rounded w-full" />
                            <div className="h-4 bg-secondary rounded w-full" />
                            <div className="h-4 bg-secondary rounded w-3/4" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-background pt-20 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Error</h1>
                    <p className="text-muted-foreground">{error}</p>
                    <p className="text-sm text-muted-foreground mt-4">Slug: {slug}</p>
                </div>
            </div>
        );
    }

    if (!page) return null;

    return (
        <>
            <Helmet>
                <title>{page.title} | Irtiqa Marketing</title>
                <meta name="description" content={`${page.title} for Irtiqa Marketing - Creative Marketing Agency`} />
                <meta name="robots" content="noindex, follow" />
                <link rel="canonical" href={`https://hitechglobals.com/legal/${page.slug}`} />
            </Helmet>

            <div className="bg-background pt-20 min-h-screen">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            {page.title}
                        </h1>
                        <p className="text-muted-foreground">
                            Last updated: {formatDate(page.last_updated)}
                        </p>
                    </motion.header>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="prose prose-lg dark:prose-invert max-w-none"
                    >
                        {page.content
                            .replace(/\r\n/g, '\n') // Normalize Windows line endings
                            .split('\n\n')
                            .map((paragraph, index) => {
                                const trimmed = paragraph.trim();
                                // Skip h1 as we already show title
                                if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
                                    return null;
                                }
                                // Skip "Last updated" line since we show it in header
                                if (trimmed.toLowerCase().startsWith('last updated')) {
                                    return null;
                                }
                                if (trimmed.startsWith('### ')) {
                                    return (
                                        <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">
                                            {trimmed.replace('### ', '')}
                                        </h3>
                                    );
                                }
                                if (trimmed.startsWith('## ')) {
                                    return (
                                        <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                                            {trimmed.replace('## ', '')}
                                        </h2>
                                    );
                                }
                                if (trimmed.startsWith('- ')) {
                                    const items = trimmed.split('\n').filter(line => line.trim().startsWith('- '));
                                    return (
                                        <ul key={index} className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                                            {items.map((item, i) => {
                                                const text = item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1');
                                                return <li key={i}>{text}</li>;
                                            })}
                                        </ul>
                                    );
                                }
                                if (!trimmed) return null;
                                // Render paragraphs with bold text support
                                const parts = trimmed.split(/(\*\*.*?\*\*)/g);
                                return (
                                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                                        {parts.map((part, i) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return <strong key={i} className="text-foreground">{part.slice(2, -2)}</strong>;
                                            }
                                            return part;
                                        })}
                                    </p>
                                );
                            })}
                    </motion.div>
                </article>
            </div>
        </>
    );
}
