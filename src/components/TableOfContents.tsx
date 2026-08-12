import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [activeId, setActiveId] = useState<string>('');
    const [headings, setHeadings] = useState<TOCItem[]>([]);

    useEffect(() => {
        // Parse headings from content
        const lines = content.split('\n');
        const items: TOCItem[] = [];

        lines.forEach((line, index) => {
            if (line.startsWith('## ')) {
                const text = line.replace('## ', '').trim();
                const id = `heading-${index}`;
                items.push({ id, text, level: 2 });
            } else if (line.startsWith('### ')) {
                const text = line.replace('### ', '').trim();
                const id = `heading-${index}`;
                items.push({ id, text, level: 3 });
            }
        });

        setHeadings(items);
    }, [content]);

    useEffect(() => {
        // Intersection observer for active heading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -80% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (headings.length < 2) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/50 border border-border rounded-xl p-4 mb-8"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-foreground font-medium"
            >
                <span className="flex items-center gap-2">
                    <List className="w-4 h-4 text-accent" />
                    Table of Contents
                </span>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <ul className="mt-4 space-y-2">
                            {headings.map((heading) => (
                                <li key={heading.id}>
                                    <button
                                        onClick={() => scrollToHeading(heading.id)}
                                        className={`
                                            w-full text-left text-sm transition-colors hover:text-accent
                                            ${heading.level === 3 ? 'pl-4' : ''}
                                            ${activeId === heading.id
                                                ? 'text-accent font-medium'
                                                : 'text-muted-foreground'
                                            }
                                        `}
                                    >
                                        {heading.text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Helper function to calculate reading time
export function calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}
