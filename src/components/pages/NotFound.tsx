import { Helmet } from 'react-helmet-async';
import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export function NotFound() {
    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <SEO 
                title="404 - Page Not Found"
                description="The page you're looking for doesn't exist. Let's get you back on track to Irtiqa Marketing."
            />

            <div className="bg-background min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden text-foreground">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl"
                        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl"
                        animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Floating shapes */}
                    <motion.div
                        className="absolute top-1/4 right-1/4 w-4 h-4 bg-accent/30 rounded-full"
                        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/3 left-1/4 w-6 h-6 border-2 border-accent/20 rounded-full"
                        animate={{ y: [0, 20, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="max-w-2xl mx-auto text-center relative z-10">
                    {/* 404 Number */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative mb-8"
                    >
                        <span className="text-[150px] sm:text-[200px] md:text-[250px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-accent/90 leading-none select-none font-heading">
                            404
                        </span>
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Search className="w-16 h-16 sm:w-20 sm:h-20 text-accent/30" />
                        </motion.div>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-4 text-foreground">
                            Oops! Page not found
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto font-body">
                            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                        </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/">
                            <motion.button
                                className="px-8 py-4 bg-primary text-primary-foreground rounded-full hover:shadow-xl hover:shadow-accent/25 transition-all inline-flex items-center gap-2 group font-medium w-full sm:w-auto justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Home className="w-4 h-4" />
                                Go to Homepage
                            </motion.button>
                        </Link>

                        <button
                          onClick={() => window.history.back()}
                          className="px-8 py-4 bg-card border border-border rounded-full hover:border-accent hover:text-accent transition-all inline-flex items-center gap-2 group font-medium w-full sm:w-auto justify-center"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Go Back
                        </button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-12 pt-8 border-t border-border"
                    >
                        <p className="text-muted-foreground mb-4 font-body">Or check out these pages:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { label: 'Services', path: '/services' },
                                { label: 'Photography', path: '/photography' },
                                { label: 'Blog', path: '/blog' },
                                { label: 'Contact', path: '/contact' },
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="px-4 py-2 text-sm bg-secondary hover:bg-accent/10 hover:text-accent rounded-full transition-colors font-medium font-body"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
