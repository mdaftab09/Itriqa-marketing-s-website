import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Search } from 'lucide-react';
import { supabase, type Blog } from '../../lib/supabase';

export function AdminBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleting, setDeleting] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchBlogs = async () => {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setBlogs(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const togglePublished = async (blog: Blog) => {
        if (!supabase) return;
        await supabase
            .from('blogs')
            .update({ published: !blog.published })
            .eq('id', blog.id);
        fetchBlogs();
    };

    const deleteBlog = async (id: string) => {
        if (!supabase || !confirm('Are you sure you want to delete this blog post?')) return;
        setDeleting(id);
        await supabase.from('blogs').delete().eq('id', id);
        setDeleting(null);
        fetchBlogs();
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
                    <p className="text-muted-foreground mt-1">Manage your blog content</p>
                </div>
                <Link
                    to="/admin/blogs/new"
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors flex items-center gap-2 w-fit"
                >
                    <Plus className="w-4 h-4" />
                    New Post
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground placeholder-muted-foreground"
                />
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-accent" />
                </div>
            ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-2xl">
                    <p className="text-muted-foreground">No blog posts found</p>
                    <Link
                        to="/admin/blogs/new"
                        className="inline-flex items-center gap-2 mt-4 text-accent hover:underline"
                    >
                        <Plus className="w-4 h-4" />
                        Create your first post
                    </Link>
                </div>
            ) : (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-secondary/50">
                                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Title</th>
                                    <th className="text-left py-4 px-6 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                                    <th className="text-left py-4 px-6 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Status</th>
                                    <th className="text-right py-4 px-6 font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.map((blog, index) => (
                                    <motion.tr
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-foreground">{blog.title}</div>
                                            <div className="text-sm text-muted-foreground md:hidden">{blog.category}</div>
                                        </td>
                                        <td className="py-4 px-6 hidden md:table-cell">
                                            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-muted-foreground hidden sm:table-cell">
                                            {formatDate(blog.created_at)}
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => togglePublished(blog)}
                                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${blog.published
                                                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                                    }`}
                                            >
                                                {blog.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                                {blog.published ? 'Published' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => navigate(`/admin/blogs/${blog.id}`)}
                                                    className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteBlog(blog.id)}
                                                    disabled={deleting === blog.id}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-muted-foreground hover:text-red-500"
                                                    title="Delete"
                                                >
                                                    {deleting === blog.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
