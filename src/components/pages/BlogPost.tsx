import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBlogBySlug, type Blog } from '../../lib/supabase';
import { OptimizedImage } from '../OptimizedImage';
import { ReadingProgress } from '../ReadingProgress';
import { TableOfContents } from '../TableOfContents';
import { ShareButtons } from '../ShareButtons';
import { RelatedPosts } from '../RelatedPosts';
import { Helmet } from 'react-helmet-async';

export function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlog() {
            if (!slug) return;
            const data = await getBlogBySlug(slug);
            setBlog(data);
            setLoading(false);
        }
        fetchBlog();
    }, [slug]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const calculateReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-accent/25 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-3xl font-heading mb-4">Article Not Found</h1>
                <Link to="/blog" className="text-accent hover:underline font-body">
                    Back to Insights
                </Link>
            </div>
        );
    }

    return (
        <>
            <SEO 
                title={blog.title}
                description={blog.excerpt}
                canonical={`/blog/${blog.slug}`}
                ogType="article"
                ogImage={blog.cover_image || undefined}
                keywords={blog.tags.join(', ')}
            />
            {/* Structured Data (JSON-LD) - Rich blog post schema */}
            <Helmet>
                <meta property="article:author" content={blog.author} />
                <meta property="article:published_time" content={blog.created_at} />
                <meta property="article:modified_time" content={blog.updated_at} />
                {blog.tags.map((tag) => (
                    <meta key={tag} property="article:tag" content={tag} />
                ))}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://hitechglobals.com/blog/${blog.slug}`
                        },
                        "headline": blog.title,
                        "description": blog.excerpt,
                        "image": blog.cover_image || "https://hitechglobals.com/og-image.png",
                        "author": {
                            "@type": "Organization",
                            "name": blog.author,
                            "url": "https://hitechglobals.com"
                        },
                        "datePublished": blog.created_at,
                        "dateModified": blog.updated_at,
                        "wordCount": blog.content.split(/\s+/).length,
                        "keywords": blog.tags.join(', '),
                        "articleSection": blog.category,
                        "publisher": {
                            "@type": "Organization",
                            "name": "Irtiqa Marketing",
                            "url": "https://hitechglobals.com",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://hitechglobals.com/logo.png"
                            }
                        }
                    })}
                </script>
            </Helmet>

            <ReadingProgress />
            <div className="bg-background pt-20 min-h-screen text-foreground">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 group font-body"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Insights
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold font-body">
                                {blog.category}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-body">
                                <Clock className="w-4 h-4 text-accent" />
                                {calculateReadTime(blog.content)} min read
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-6 text-foreground leading-tight tracking-wide">
                            {blog.title}
                        </h1>

                        <p className="text-xl text-muted-foreground mb-6 font-body leading-relaxed">
                            {blog.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-6 border-b border-border/60 font-body">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold font-heading">
                              {blog.author.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">{blog.author}</div>
                              <div className="text-xs">{formatDate(blog.created_at)}</div>
                            </div>
                          </div>

                          {/* Share Buttons */}
                          <div className="ml-auto">
                            <ShareButtons title={blog.title} />
                          </div>
                        </div>
                    </motion.header>

                    {/* Cover Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="aspect-video bg-[#0B0B0B] rounded-2xl mb-10 flex items-center justify-center overflow-hidden border border-border"
                    >
                        {blog.cover_image ? (
                            <OptimizedImage src={blog.cover_image} alt={blog.title} className="w-full h-full" />
                        ) : (
                            <span className="text-white/50 font-heading text-6xl font-bold">{blog.title.charAt(0)}</span>
                        )}
                    </motion.div>

                    {/* Table of Contents */}
                    <TableOfContents content={blog.content} />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="prose prose-lg dark:prose-invert max-w-none font-body leading-relaxed text-muted-foreground"
                    >
                        {blog.content.split('\n\n').map((paragraph, index) => {
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <h2 key={index} className="text-2xl font-heading tracking-wide mt-10 mb-4 text-foreground font-bold">
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                );
                            }
                            return (
                                <p key={index} className="mb-6 leading-relaxed">
                                    {paragraph}
                                </p>
                            );
                        })}
                    </motion.div>

                    {/* Tags */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-10 pt-8 border-t border-border/60 font-body"
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            <Tag className="w-5 h-5 text-accent" />
                            {blog.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 bg-secondary hover:bg-accent/10 rounded-full text-sm font-semibold text-foreground transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-16 p-8 bg-[#0B0B0B] border border-white/20 rounded-2xl text-white text-center"
                    >
                        <h3 className="text-2xl font-heading mb-4 text-white">Need help with your project?</h3>
                        <p className="text-white/60 mb-6 font-body text-sm max-w-md mx-auto">
                            Let's discuss how we can help bring your branding and marketing vision to life
                        </p>
                        <Link to="/contact">
                            <motion.button
                                className="px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-all inline-flex items-center gap-2 group font-bold shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get in Touch
                                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Related Posts */}
                    <RelatedPosts
                        currentSlug={blog.slug}
                        currentCategory={blog.category}
                        currentTags={blog.tags}
                    />
                </article>
            </div>
        </>
    );
}
