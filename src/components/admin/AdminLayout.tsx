import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Camera,
    LogOut,
    Menu,
    X,
    Home,
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { PHOTOGRAPHY_CATEGORIES } from '../../lib/supabase';

export function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const { signOut, user } = useAuth();

    const activeSegment =
        new URLSearchParams(
            location.search
        ).get('segment');

    const closeSidebar = () =>
        setSidebarOpen(false);

    const goToPhotography = (
        segment?: string
    ) => {
        const target = segment
            ? `/admin/photography?segment=${encodeURIComponent(
                  segment
              )}`
            : '/admin/photography';

        /*
         * Always use React Router navigation.
         */
        navigate(target, {
            replace: false,
        });

        closeSidebar();
    };

    const handleSignOut = async () => {
        try {
            await signOut();
        } finally {
            /*
             * Explicitly leave the protected admin area.
             */
            closeSidebar();

            navigate('/admin/login', {
                replace: true,
            });
        }
    };

    const isPhotographyActive =
        location.pathname ===
        '/admin/photography';

    return (
        <div className="h-screen w-full overflow-hidden bg-background flex">
            {/* SIDEBAR */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    w-[280px] max-w-[86vw]
                    bg-card border-r border-border
                    transform transition-transform duration-300

                    lg:relative
                    lg:inset-auto
                    lg:z-auto
                    lg:translate-x-0
                    lg:shrink-0

                    ${
                        sidebarOpen
                            ? 'translate-x-0'
                            : '-translate-x-full'
                    }
                `}
            >
                <div className="flex h-full min-h-0 flex-col">
                    {/* LOGO */}
                    <div className="p-5 border-b border-border shrink-0">
                        <Link
                            to="/admin"
                            onClick={
                                closeSidebar
                            }
                            className="flex items-center gap-3 min-w-0"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/90 rounded-xl flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-lg">
                                    I
                                </span>
                            </div>

                            <span className="font-bold text-lg text-foreground truncate">
                                Admin Panel
                            </span>
                        </Link>
                    </div>

                    {/* NAVIGATION */}
                    <nav
                        className="
                            flex-1
                            min-h-0
                            overflow-y-auto
                            overflow-x-hidden
                            overscroll-contain
                            p-4
                        "
                        aria-label="Admin navigation"
                    >
                        {/* PHOTOGRAPHY */}
                        <div>
                            <Link
                                to="/admin/photography"
                                onClick={
                                    closeSidebar
                                }
                                className={`
                                    flex items-center gap-3
                                    px-4 py-3
                                    rounded-xl
                                    transition-all

                                    ${
                                        isPhotographyActive
                                            ? 'bg-accent text-accent-foreground'
                                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    }
                                `}
                            >
                                <Camera className="w-5 h-5 shrink-0" />

                                <span className="font-medium">
                                    Photography
                                </span>
                            </Link>

                            {/* SEGMENTS */}
                            {isPhotographyActive && (
                                <div className="mt-3 ml-2 pl-3 border-l border-border space-y-0.5">
                                    {/* ALL PHOTOS */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPhotography()
                                        }
                                        className={`
                                            w-full
                                            flex
                                            items-center
                                            justify-between
                                            gap-2
                                            px-3 py-2
                                            rounded-lg
                                            text-xs
                                            font-semibold
                                            text-left
                                            transition-colors

                                            ${
                                                !activeSegment
                                                    ? 'bg-secondary text-foreground'
                                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                            }
                                        `}
                                    >
                                        <span>
                                            All photos
                                        </span>

                                        {!activeSegment && (
                                            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                                        )}
                                    </button>

                                    {/* CATEGORIES */}
                                    {PHOTOGRAPHY_CATEGORIES.map(
                                        (
                                            category
                                        ) => {
                                            const selected =
                                                activeSegment ===
                                                category;

                                            return (
                                                <button
                                                    key={
                                                        category
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        goToPhotography(
                                                            category
                                                        )
                                                    }
                                                    className={`
                                                        w-full
                                                        flex
                                                        items-center
                                                        justify-between
                                                        gap-2
                                                        px-3 py-2
                                                        rounded-lg
                                                        text-xs
                                                        text-left
                                                        transition-colors

                                                        ${
                                                            selected
                                                                ? 'bg-secondary text-foreground font-semibold'
                                                                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                                        }
                                                    `}
                                                >
                                                    <span className="truncate">
                                                        {
                                                            category
                                                        }
                                                    </span>

                                                    {selected && (
                                                        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                                                    )}
                                                </button>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* BOTTOM */}
                    <div className="p-4 border-t border-border space-y-2 shrink-0 bg-card">
                        <Link
                            to="/"
                            onClick={
                                closeSidebar
                            }
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                        >
                            <Home className="w-5 h-5 shrink-0" />

                            <span className="font-medium">
                                View Website
                            </span>
                        </Link>

                        <div
                            className="px-4 py-2 text-sm text-muted-foreground truncate"
                            title={
                                user?.email || ''
                            }
                        >
                            {user?.email}
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                void handleSignOut()
                            }
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
                        >
                            <LogOut className="w-5 h-5 shrink-0" />

                            <span className="font-medium">
                                Sign Out
                            </span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* CONTENT */}
            <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
                {/* MOBILE HEADER */}
                <header className="lg:hidden shrink-0 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() =>
                            setSidebarOpen(
                                (open) => !open
                            )
                        }
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        aria-label="Open admin navigation"
                    >
                        {sidebarOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                    <span className="font-bold text-foreground">
                        Admin Panel
                    </span>

                    <div className="w-10" />
                </header>

                {/* PAGE */}
                <main
                    className="
                        flex-1
                        min-h-0
                        min-w-0
                        overflow-y-auto
                        overflow-x-hidden
                        overscroll-contain
                        p-4
                        sm:p-6
                        lg:p-8
                    "
                >
                    <Outlet />
                </main>
            </div>

            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}
        </div>
    );
}