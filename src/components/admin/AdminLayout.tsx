import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, LogOut, Menu, X, Home, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { PHOTOGRAPHY_CATEGORIES } from '../../lib/supabase';

export function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { signOut, user } = useAuth();

    const navItems = [
        { path: '/admin/photography', label: 'Photography', icon: Camera },
    ];

    const isActive = (path: string, exact?: boolean) => {
        if (exact) return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    const activeSegment = new URLSearchParams(location.search).get('segment');

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background flex">
            <aside className={`fixed inset-y-0 left-0 z-50 w-[280px] max-w-[86vw] bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static lg:shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full min-h-0">
                    <div className="p-5 border-b border-border shrink-0">
                        <Link to="/admin" onClick={closeSidebar} className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/90 rounded-xl flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-lg">I</span>
                            </div>
                            <span className="font-bold text-lg text-foreground truncate">Admin Panel</span>
                        </Link>
                    </div>

                    <nav className="flex-1 min-h-0 overflow-y-auto p-4">
                        {navItems.map((item) => (
                            <div key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={closeSidebar}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(item.path) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                                >
                                    <item.icon className="w-5 h-5 shrink-0" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>

                                {isActive('/admin/photography') && (
                                    <div className="mt-3 ml-2 pl-3 border-l border-border space-y-0.5">
                                        <Link
                                            to="/admin/photography"
                                            onClick={closeSidebar}
                                            className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${!activeSegment ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                                        >
                                            <span>All photos</span>
                                            {!activeSegment && <ChevronRight className="w-3.5 h-3.5" />}
                                        </Link>
                                        {PHOTOGRAPHY_CATEGORIES.map((category) => {
                                            const selected = activeSegment === category;
                                            return (
                                                <Link
                                                    key={category}
                                                    to={`/admin/photography?segment=${encodeURIComponent(category)}`}
                                                    onClick={closeSidebar}
                                                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${selected ? 'bg-secondary text-foreground font-semibold' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                                                >
                                                    <span className="truncate">{category}</span>
                                                    {selected && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-border space-y-2 shrink-0">
                        <Link to="/" onClick={closeSidebar} className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
                            <Home className="w-5 h-5" />
                            <span className="font-medium">View Website</span>
                        </Link>
                        <div className="px-4 py-2 text-sm text-muted-foreground truncate" title={user?.email || ''}>{user?.email}</div>
                        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-1 min-w-0 max-w-full flex flex-col min-h-screen overflow-x-hidden">
                <header className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-secondary rounded-lg transition-colors" aria-label="Open admin navigation">
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <span className="font-bold text-foreground">Admin Panel</span>
                    <div className="w-10" />
                </header>

                <main className="flex-1 min-w-0 max-w-full overflow-x-hidden p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {sidebarOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeSidebar} />
            )}
        </div>
    );
}
