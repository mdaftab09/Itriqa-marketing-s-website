import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setShowBanner(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    function handleAccept() {
        localStorage.setItem('cookie-consent', 'accepted');
        setShowBanner(false);
    }

    function handleDecline() {
        localStorage.setItem('cookie-consent', 'declined');
        setShowBanner(false);
    }

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
                >
                    <div className="bg-card border border-border rounded-2xl shadow-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Cookie className="w-5 h-5 text-accent" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-1">We use cookies</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    We use cookies to enhance your experience and analyze site traffic.
                                    By clicking "Accept", you agree to our use of cookies.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAccept}
                                        className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                                    >
                                        Accept All
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleDecline}
                                        className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                                    >
                                        Decline
                                    </motion.button>
                                </div>
                            </div>
                            <button
                                onClick={handleDecline}
                                className="p-1 hover:bg-secondary rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
