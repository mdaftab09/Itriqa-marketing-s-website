import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Plus, Briefcase, FolderOpen } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminDashboard() {
    const [stats, setStats] = useState({
        blogs: 0,
        testimonials: 0,
        services: 0,
        projects: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            if (!supabase) return;

            const [blogsRes, testimonialsRes, servicesRes, projectsRes] = await Promise.all([
                supabase.from('blogs').select('id'),
                supabase.from('testimonials').select('id'),
                supabase.from('services').select('id'),
                supabase.from('projects').select('id'),
            ]);

            setStats({
                blogs: blogsRes.data?.length || 0,
                testimonials: testimonialsRes.data?.length || 0,
                services: servicesRes.data?.length || 0,
                projects: projectsRes.data?.length || 0,
            });
        }
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Blogs', value: stats.blogs, icon: FileText, color: 'from-yellow-600 to-accent', link: '/admin/blogs' },
        { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'from-purple-500 to-pink-500', link: '/admin/testimonials' },
        { label: 'Services', value: stats.services, icon: Briefcase, color: 'from-green-500 to-emerald-500', link: '/admin/services' },
        { label: 'Projects', value: stats.projects, icon: FolderOpen, color: 'from-amber-500 to-orange-500', link: '/admin/portfolio' },
    ];

    const quickActions = [
        { title: 'Blog', desc: 'Create and manage blog posts', icon: FileText, addLink: '/admin/blogs/new', viewLink: '/admin/blogs' },
        { title: 'Testimonials', desc: 'Manage client testimonials', icon: MessageSquare, addLink: '/admin/testimonials/new', viewLink: '/admin/testimonials' },
        { title: 'Services', desc: 'Manage your service offerings', icon: Briefcase, addLink: '/admin/services/new', viewLink: '/admin/services' },
        { title: 'Portfolio', desc: 'Manage portfolio projects', icon: FolderOpen, addLink: '/admin/portfolio/new', viewLink: '/admin/portfolio' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Welcome to your admin panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <Link key={stat.label} to={stat.link}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:border-accent/50 transition-all"
                        >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                    <motion.div
                        key={action.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="bg-card border border-border rounded-2xl p-5"
                    >
                        <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                            <action.icon className="w-5 h-5 text-accent" />
                            {action.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            {action.desc}
                        </p>
                        <div className="flex gap-2">
                            <Link
                                to={action.addLink}
                                className="px-3 py-1.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-1 text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </Link>
                            <Link
                                to={action.viewLink}
                                className="px-3 py-1.5 border border-border rounded-lg hover:bg-secondary transition-colors text-sm"
                            >
                                View All
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
