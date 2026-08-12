import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(scrollPercent, 100));
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-[100] h-1 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent/90"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
            />
        </motion.div>
    );
}
