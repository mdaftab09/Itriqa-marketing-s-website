import { type SupabaseClient } from '@supabase/supabase-js';

export const supabase: SupabaseClient | null = null;

// Types
export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string | null;
    author: string;
    category: string;
    tags: string[];
    published: boolean;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string | null;
    rating: number;
    featured: boolean;
    created_at: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    price_from: string | null;
    gradient: string;
    order_index: number;
    active: boolean;
    created_at: string;
}

export interface Project {
    id: string;
    title: string;
    slug: string;
    category: string;
    description: string;
    cover_image: string | null;
    tags: string[];
    results: string[];
    gradient: string;
    featured: boolean;
    active: boolean;
    created_at: string;
}

// Mock data for development
export const mockBlogs: Blog[] = [
    {
        id: '1',
        title: 'The Future of Web Development in 2024',
        slug: 'future-of-web-development-2024',
        excerpt: 'Explore the latest trends shaping the web development landscape, from AI-powered tools to new frameworks revolutionizing how we build.',
        content: `The web development industry continues to evolve at a rapid pace. In 2024, we're seeing exciting developments in AI-assisted coding, edge computing, and new JavaScript frameworks that promise better performance and developer experience.

## AI-Powered Development

Tools like GitHub Copilot and Claude are transforming how developers write code. These AI assistants can help with everything from code completion to debugging, making development faster and more efficient.

## Edge Computing

With the rise of edge computing platforms like Cloudflare Workers and Vercel Edge Functions, we're seeing a shift towards deploying code closer to users for better performance.

## Modern Frameworks

React Server Components, Astro, and SolidJS are leading the charge in creating faster, more efficient web applications with improved developer experience.`,
        cover_image: null,
        author: 'Irtiqa Marketing',
        category: 'Technology',
        tags: ['Web Development', 'Trends', '2024'],
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Building Scalable React Applications',
        slug: 'building-scalable-react-applications',
        excerpt: 'Learn best practices for building React applications that can grow with your business needs.',
        content: `Building scalable React applications requires careful planning and the right architectural decisions. Here's how to set your project up for success.

## Component Architecture

Break your UI into small, reusable components. Follow the single responsibility principle and keep components focused on one task.

## State Management

Choose the right state management solution based on your needs. For smaller apps, Context API works well. For complex applications, consider Redux Toolkit or Zustand.

## Performance Optimization

Use React.memo, useMemo, and useCallback strategically. Implement code splitting with React.lazy to reduce initial bundle size.`,
        cover_image: null,
        author: 'Irtiqa Marketing',
        category: 'Development',
        tags: ['React', 'JavaScript', 'Best Practices'],
        published: true,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        id: '3',
        title: 'UI/UX Design Principles for Modern Websites',
        slug: 'ui-ux-design-principles-modern-websites',
        excerpt: 'Discover the key design principles that create engaging and user-friendly website experiences.',
        content: `Great design is invisible. It guides users naturally through your website without them even noticing. Here are the principles we follow at Irtiqa Marketing.

## Visual Hierarchy

Use size, color, and spacing to guide the user's eye to the most important elements first. Headlines should stand out, CTAs should be prominent.

## Consistency

Maintain consistent design patterns throughout your site. Users should be able to predict how elements will behave based on previous interactions.

## Accessibility

Design for everyone. Use sufficient color contrast, provide alt text for images, and ensure your site works with keyboard navigation.`,
        cover_image: null,
        author: 'Irtiqa Marketing',
        category: 'Design',
        tags: ['UI/UX', 'Design', 'Web Design'],
        published: true,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 172800000).toISOString(),
    },
];

export const mockTestimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Satisfied Client',
        role: 'Social Media Management',
        company: 'Partner Brand',
        content: 'Irtiqa Marketing completely transformed our social media presence.',
        avatar: null,
        rating: 5,
        featured: true,
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Satisfied Client',
        role: 'Creative Design Partner',
        company: 'Partner Brand',
        content: 'Professional team with outstanding creativity.',
        avatar: null,
        rating: 5,
        featured: true,
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Satisfied Client',
        role: 'Branding & Marketing Client',
        company: 'Partner Brand',
        content: 'Highly recommended for branding and marketing.',
        avatar: null,
        rating: 5,
        featured: true,
        created_at: new Date().toISOString(),
    },
];

// Data fetching functions
export async function getBlogs(): Promise<Blog[]> {
    if (!supabase) return mockBlogs;

    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }

    return data || [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    if (!supabase) {
        return mockBlogs.find(blog => blog.slug === slug) || null;
    }

    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error) {
        console.error('Error fetching blog:', error);
        return null;
    }

    return data;
}

export async function getTestimonials(): Promise<Testimonial[]> {
    if (!supabase) return mockTestimonials;

    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }

    return data || [];
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
    if (!supabase) return mockTestimonials.filter(t => t.featured);

    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(4);

    if (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }

    return data || [];
}

// Services functions
export async function getServices(): Promise<Service[]> {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching services:', error);
        return [];
    }

    return data || [];
}

export async function getAllServices(): Promise<Service[]> {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching services:', error);
        return [];
    }

    return data || [];
}

// Projects functions
export async function getProjects(): Promise<Project[]> {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data || [];
}

export async function getAllProjects(): Promise<Project[]> {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data || [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('active', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data || [];
}

// Legal Pages
export interface LegalPage {
    id: string;
    slug: string; // 'privacy-policy' or 'terms-of-service'
    title: string;
    content: string;
    last_updated: string;
    created_at: string;
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
    if (!supabase) {
        // Return mock data
        if (slug === 'privacy-policy') {
            return {
                id: '1',
                slug: 'privacy-policy',
                title: 'Privacy Policy',
                content: `# Privacy Policy

Last updated: ${new Date().toLocaleDateString()}

## Information We Collect

We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us.

## How We Use Your Information

We use the information we collect to:
- Provide, maintain, and improve our services
- Send you technical notices and support messages
- Respond to your comments, questions, and requests

## Contact Us

If you have any questions about this Privacy Policy, please contact us at hello@irtiqamarketing.com`,
                last_updated: new Date().toISOString(),
                created_at: new Date().toISOString()
            };
        }
        if (slug === 'terms-of-service') {
            return {
                id: '2',
                slug: 'terms-of-service',
                title: 'Terms of Service',
                content: `# Terms of Service

Last updated: ${new Date().toLocaleDateString()}

## Acceptance of Terms

By accessing and using Irtiqa Marketing services, you accept and agree to be bound by these Terms of Service.

## Services

We provide web development, mobile app development, and digital solutions. All services are subject to availability.

## Intellectual Property

All content, features, and functionality are owned by Irtiqa Marketing and are protected by international copyright laws.

## Contact Us

If you have any questions about these Terms, please contact us at hello@irtiqamarketing.com`,
                last_updated: new Date().toISOString(),
                created_at: new Date().toISOString()
            };
        }
        return null;
    }

    const { data, error } = await supabase
        .from('legal_pages')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        return null;
    }

    return data;
}

export async function getAllLegalPages(): Promise<LegalPage[]> {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('legal_pages')
        .select('*')
        .order('title', { ascending: true });

    if (error) {
        console.error('Error fetching legal pages:', error);
        return [];
    }

    return data || [];
}
