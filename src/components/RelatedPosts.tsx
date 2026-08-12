import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { getBlogs, type Blog } from '../lib/supabase';

interface RelatedPostsProps {
    currentSlug: string;
    currentCategory: string;
    currentTags: string[];
}

export function RelatedPosts({ currentSlug, currentCategory, currentTags }: RelatedPostsProps) {
    const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRelatedPosts() {
            const allBlogs = await getBlogs();

            // Filter out current post and score by relevance
            const scoredPosts = allBlogs
                .filter(blog => blog.slug !== currentSlug)
                .map(blog => {
                    let score = 0;

                    // Same category = high score
                    if (blog.category === currentCategory) score += 10;

                    // Matching tags = score per tag
                    const matchingTags = blog.tags.filter(tag => currentTags.includes(tag));
                    score += matchingTags.length * 3;

                    return { blog, score };
                })
                .filter(item => item.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map(item => item.blog);

            // If not enough related posts, fill with recent posts
            if (scoredPosts.length < 3) {
                const remainingCount = 3 - scoredPosts.length;
                const existingSlugs = [currentSlug, ...scoredPosts.map(p => p.slug)];
                const recentPosts = allBlogs
                    .filter(blog => !existingSlugs.includes(blog.slug))
                    .slice(0, remainingCount);
                scoredPosts.push(...recentPosts);
            }

            setRelatedPosts(scoredPosts);
            setLoading(false);
        }

        fetchRelatedPosts();
    }, [currentSlug, currentCategory, currentTags]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="mt-16 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Related Posts</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-card rounded-xl animate-pulse">
                            <div className="h-40 bg-secondary rounded-t-xl" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-secondary rounded w-1/3" />
                                <div className="h-5 bg-secondary rounded w-full" />
                                <div className="h-4 bg-secondary rounded w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-border"
        >
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <Link
                            to={`/blog/${post.slug}`}
                            className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all"
                        >
                            {/* Cover */}
                            <div className="h-32 bg-gradient-to-br from-accent to-accent/90 flex items-center justify-center overflow-hidden">
                                {post.cover_image ? (
                                    <img
                                        src={post.cover_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <span className="text-white/30 text-4xl font-bold">
                                        {post.title.charAt(0)}
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-accent font-medium">
                                        {post.category}
                                    </span>
                                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(post.created_at)}
                                    </span>
                                </div>

                                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-2">
                                    {post.title}
                                </h3>

                                <span className="text-sm text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Read more
                                    <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </motion.div>
    );
}
