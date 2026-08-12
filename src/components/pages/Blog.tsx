import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, User, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBlogs, type Blog as BlogType } from '../../lib/supabase';
import { OptimizedImage } from '../OptimizedImage';
import { Newsletter } from '../Newsletter';

export function Blog() {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', 'Branding', 'SEO', 'Social Media', 'Business', 'AI Marketing'];

    useEffect(() => {
        async function fetchBlogs() {
            const data = await getBlogs();
            setBlogs(data);
            setLoading(false);
        }
        fetchBlogs();
    }, []);

    const filteredBlogs = activeFilter === 'All'
        ? blogs
        : blogs.filter(blog => blog.category.toLowerCase() === activeFilter.toLowerCase());

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <SEO 
                title="Latest Marketing Insights & Branding Guides"
                description="Read the latest insights, branding guides, SEO tips, and AI marketing workflows from Irtiqa Marketing."
                canonical="/blog"
                keywords="blog, marketing tips, branding guides, SEO tips, instagram growth, business strategies"
            />

            <div className="bg-background pt-24 pb-16 overflow-hidden min-h-screen text-foreground">
                
                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 relative text-center">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl"
                            animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full mb-6 border border-accent/25 backdrop-blur-sm">
                                <Sparkles className="w-4 h-4 text-accent" />
                                <span className="text-accent font-semibold text-xs tracking-wider uppercase font-body">Insights & Guides</span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl font-heading mb-6 tracking-wide leading-tight">
                                Our Insights
                            </h1>
                            <div className="luxury-divider" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed"
                        >
                            Latest Marketing Tips, Branding Guides, SEO Tips, Instagram Growth, Business Strategies, and AI Marketing.
                        </motion.p>
                    </div>
                </section>

                {/* Filter */}
                <section className="px-4 sm:px-6 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap justify-center gap-3"
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveFilter(category)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeFilter === category
                                        ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                                        : 'bg-card border border-border hover:border-accent/50 text-foreground hover:shadow-md'
                                        }`}
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    {category}
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="px-4 sm:px-6 pb-20">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-card rounded-2xl p-6 animate-pulse border border-border">
                                        <div className="h-48 bg-secondary rounded-xl mb-4" />
                                        <div className="h-4 bg-secondary rounded w-1/3 mb-3" />
                                        <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                                        <div className="h-4 bg-secondary rounded w-full mb-2" />
                                        <div className="h-4 bg-secondary rounded w-2/3" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {filteredBlogs.map((blog, index) => (
                                    <motion.article
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ y: -6 }}
                                        className="group"
                                    >
                                        <Link to={`/blog/${blog.slug}`}>
                                            <div className="bg-card rounded-2xl border border-border hover:border-accent/40 hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
                                                {/* Cover Image */}
                                                <div className="aspect-video relative overflow-hidden">
                                                    {blog.cover_image ? (
                                                        <OptimizedImage
                                                            src={blog.cover_image}
                                                            alt={blog.title}
                                                            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-[#0B0B0B] flex items-center justify-center border-b border-border">
                                                            <span className="text-white/80 font-heading text-3xl font-bold">{blog.title.charAt(0)}</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                                </div>

                                                <div className="p-6 flex flex-col flex-grow">
                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-body">
                                                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-semibold">
                                                            {blog.category}
                                                        </span>
                                                        <span className="flex items-center gap-1 font-semibold">
                                                            <Clock className="w-3.5 h-3.5 text-accent" />
                                                            5 min read
                                                        </span>
                                                    </div>

                                                    <h2 className="text-xl font-heading mb-3 group-hover:text-accent transition-colors text-foreground tracking-wide line-clamp-2">
                                                        {blog.title}
                                                    </h2>

                                                    <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3 font-body leading-relaxed">
                                                        {blog.excerpt}
                                                    </p>

                                                    <div className="flex items-center justify-between pt-4 border-t border-border/60 text-xs font-semibold text-muted-foreground font-body">
                                                        <div className="flex items-center gap-2">
                                                            <User className="w-4 h-4 text-accent" />
                                                            <span>{blog.author}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-accent" />
                                                            <span>{formatDate(blog.created_at)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </motion.div>
                        )}

                        {!loading && filteredBlogs.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground text-lg font-body">No articles found in this category.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="px-4 sm:px-6 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <Newsletter />
                    </div>
                </section>
            </div>
        </>
    );
}
