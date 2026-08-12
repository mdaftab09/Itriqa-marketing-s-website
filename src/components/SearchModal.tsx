import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBlogs, type Blog } from '../lib/supabase';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Fetch all blogs on mount
        async function fetchBlogs() {
            const blogs = await getBlogs();
            setAllBlogs(blogs);
        }
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);
        const searchTimeout = setTimeout(() => {
            const searchQuery = query.toLowerCase();
            const filtered = allBlogs.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery) ||
                blog.excerpt.toLowerCase().includes(searchQuery) ||
                blog.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
                blog.category.toLowerCase().includes(searchQuery)
            );
            setResults(filtered.slice(0, 5));
            setLoading(false);
        }, 200);

        return () => clearTimeout(searchTimeout);
    }, [query, allBlogs]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                if (!isOpen) {
                    // This won't work directly, but we keep for reference
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Search Input */}
                    <div className="flex items-center gap-3 p-4 border-b border-border">
                        <SearchIcon className="w-5 h-5 text-muted-foreground" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search blog posts..."
                            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                        />
                        {loading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                            aria-label="Close search"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="max-h-80 overflow-y-auto">
                        {query.length < 2 ? (
                            <div className="p-8 text-center text-muted-foreground text-sm">
                                Type at least 2 characters to search
                            </div>
                        ) : results.length === 0 && !loading ? (
                            <div className="p-8 text-center text-muted-foreground text-sm">
                                No results found for "{query}"
                            </div>
                        ) : (
                            <div className="p-2">
                                {results.map((blog) => (
                                    <Link
                                        key={blog.id}
                                        to={`/blog/${blog.slug}`}
                                        onClick={onClose}
                                        className="block p-3 rounded-xl hover:bg-secondary transition-colors group"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-foreground truncate group-hover:text-accent transition-colors">
                                                    {blog.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                                                    {blog.excerpt}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                                                        {blog.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-border bg-secondary/30">
                        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">ESC</kbd>
                                to close
                            </span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// Search trigger button
export function SearchButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 border border-border rounded-lg transition-colors text-sm text-muted-foreground"
        >
            <SearchIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 bg-background rounded text-xs ml-2">⌘K</kbd>
        </button>
    );
}
