import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Briefcase,
    FolderOpen,
    Mail,
    Scale,
    LogOut,
    Menu,
    X,
    Home
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './AuthContext';

export function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { signOut, user } = useAuth();

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
        { path: '/admin/blogs', label: 'Blogs', icon: FileText },
        { path: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
        { path: '/admin/services', label: 'Services', icon: Briefcase },
        { path: '/admin/portfolio', label: 'Portfolio', icon: FolderOpen },
        { path: '/admin/newsletter', label: 'Newsletter', icon: Mail },
        { path: '/admin/legal', label: 'Legal Pages', icon: Scale },
    ];

    const isActive = (path: string, exact?: boolean) => {
        if (exact) return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-border">
                        <Link to="/admin" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/90 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">I</span>
                            </div>
                            <span className="font-bold text-lg text-foreground">Admin Panel</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive(item.path, item.exact)
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    }
                `}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* User & Logout */}
                    <div className="p-4 border-t border-border space-y-2">
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                        >
                            <Home className="w-5 h-5" />
                            <span className="font-medium">View Website</span>
                        </Link>

                        <div className="px-4 py-2 text-sm text-muted-foreground truncate">
                            {user?.email}
                        </div>

                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden sticky top-0 z-40 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <span className="font-bold text-foreground">Admin Panel</span>
                    <div className="w-10" /> {/* Spacer */}
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
