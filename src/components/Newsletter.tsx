import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NewsletterProps {
    variant?: 'inline' | 'card' | 'footer';
}

export function Newsletter({ variant = 'card' }: NewsletterProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');

        try {
            if (supabase) {
                const { error } = await supabase
                    .from('newsletter_subscribers')
                    .insert([{ email, subscribed_at: new Date().toISOString() }]);

                if (error) {
                    if (error.code === '23505') {
                        setStatus('success');
                        setMessage("You're already subscribed!");
                    } else {
                        throw error;
                    }
                } else {
                    setStatus('success');
                    setMessage('Thanks for subscribing! 🎉');
                }
            } else {
                // Fallback when Supabase is not configured
                setStatus('success');
                setMessage('Thanks for subscribing! 🎉');
            }
            setEmail('');
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }

        // Reset after 5 seconds
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 5000);
    }

    if (variant === 'footer') {
        return (
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full pl-10 pr-4 py-2.5 bg-[#141414] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-sm text-white disabled:opacity-50 font-body"
                        />
                    </div>
                    <motion.button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                        {status === 'loading' ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : status === 'success' ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <ArrowRight className="w-4 h-4" />
                        )}
                    </motion.button>
                </div>
                {message && (
                    <p className={`text-sm font-body ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                        {message}
                    </p>
                )}
            </form>
        );
    }

    if (variant === 'inline') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-accent/20 rounded-xl p-6"
            >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                        <h3 className="font-heading tracking-wide text-foreground flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-accent" />
                            Get our latest articles
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-body">
                            Join 1000+ brands getting weekly creative marketing insights
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            disabled={status === 'loading' || status === 'success'}
                            className="px-4 py-2 bg-secondary/60 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-sm disabled:opacity-50 w-48 font-body"
                        />
                        <motion.button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 text-sm font-semibold tracking-wider font-body"
                        >
                            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                        </motion.button>
                    </form>
                </div>
                {message && (
                    <p className={`text-sm mt-2 font-body ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
            </motion.div>
        );
    }

    // Default card variant
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0B0B0B] border border-white/20 rounded-2xl p-8 text-white text-center"
        >
            <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                <Mail className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-heading tracking-wide mb-2">Stay Updated</h3>
            <p className="text-sm text-white/70 mb-6 max-w-md mx-auto font-body">
                Get the latest insights on branding, graphic design, and modern marketing workflows delivered directly to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        disabled={status === 'loading' || status === 'success'}
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50 font-body text-white"
                    />
                    <motion.button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-body uppercase tracking-wider text-xs"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Subscribing...
                            </>
                        ) : status === 'success' ? (
                            <>
                                <Check className="w-4 h-4" />
                                Subscribed!
                            </>
                        ) : (
                            <>
                                Subscribe
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>
                </div>
                {message && (
                    <p className={`text-sm mt-3 font-body ${status === 'error' ? 'text-red-300' : 'text-green-300'}`}>
                        {message}
                    </p>
                )}
            </form>
            <p className="text-xs text-white/40 mt-4 font-body">
                No spam, unsubscribe anytime.
            </p>
        </motion.div>
    );
}
