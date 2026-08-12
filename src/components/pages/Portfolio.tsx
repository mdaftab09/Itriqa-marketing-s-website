import { SEO } from '../SEO';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects, type Project as DBProject } from '../../lib/supabase';
import { ArrowRight } from 'lucide-react';

interface UnifiedProject {
  id?: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  client: string;
  results: string;
  image: string;
}

export function Portfolio() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [projects, setProjects] = useState<UnifiedProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const staticProjects: UnifiedProject[] = [
    {
      title: 'Monarch Cosmetics Packaging',
      category: 'Packaging',
      description: 'Luxury outer carton and container design utilizing gold foil prints and structured textures.',
      tags: ['Luxury Packaging', 'Foil Stamping', 'Graphic Design'],
      client: 'Monarch Brands',
      results: '120% increase in shelf-space retail inquiries',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Aura Aesthetics Brand Identity',
      category: 'Branding',
      description: 'Sophisticated minimalist visual brand framework, style guidelines, and logo design.',
      tags: ['Branding', 'Typography', 'Logo Design'],
      client: 'Aura Skin Clinic',
      results: 'Established clear market position & premium pricing',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Apex Healthcare Website Design',
      category: 'Website',
      description: 'Custom React site with high speed, clean accessibility layout, and interactive scheduler.',
      tags: ['React', 'Next.js', 'Responsive UI'],
      client: 'Apex Health Group',
      results: '40% boost in online bookings',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Luxura Hotels Reel Series',
      category: 'Reels',
      description: 'A cinematic sequence of Instagram Reels detailing room services and location aesthetics.',
      tags: ['Cinematography', 'Social Media', 'Reels'],
      client: 'Luxura Luxury Hotels',
      results: '3.4 Million combined organic views',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Gourmet Kitchen Food Shoot',
      category: 'Photography',
      description: 'High-contrast studio food and lifestyle photography showcasing premium menus.',
      tags: ['Food Photography', 'Studio Lighting', 'Art Direction'],
      client: 'Gourmet Bistro Group',
      results: 'Featured in elite local culinary guides',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Vanguard Realty Advertising Campaign',
      category: 'Social Media',
      description: 'Targeted Lead generation and brand awareness campaigns on Meta and Google Ads.',
      tags: ['Meta Ads', 'Google PPC', 'Copywriting'],
      client: 'Vanguard Properties',
      results: '240 Qualified luxury property leads',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop'
    },
  ];

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const dbData = await getProjects();
        if (dbData && dbData.length > 0) {
          const mapped: UnifiedProject[] = dbData.map((p: DBProject) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            description: p.description,
            tags: p.tags || [],
            client: 'Premium Client',
            results: Array.isArray(p.results) ? p.results.join(', ') : (p.results || 'Outstanding Results'),
            image: p.cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
          }));
          setProjects(mapped);
        } else {
          setProjects(staticProjects);
        }
      } catch (err) {
        console.error('Failed to load database projects, falling back to static portfolio:', err);
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  // Pre-filter category when routing from Home category card clicks
  useEffect(() => {
    if (location.state && location.state.filter) {
      setActiveFilter(location.state.filter);
    }
  }, [location.state]);

  const filters = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <SEO
        title="Creative Showcase | Irtiqa Marketing Portfolio"
        description="Explore the creative portfolio of Irtiqa Marketing, showcasing logo designs, packaging, website designs, photography, reels, and ad campaigns."
        canonical="/portfolio"
        keywords="portfolio, logo designs, packaging, website designs, photography, product shoots, video production, ad campaigns"
      />

      <div className="bg-background pt-24 pb-16 overflow-hidden text-foreground">
        
        {/* Portfolio Header */}
        <section className="py-20 px-4 sm:px-6 text-center relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-[#C9A14A] text-xs uppercase tracking-[0.3em] font-semibold block mb-4">
                Creative Showcase
              </span>
              <h1 className="text-4xl sm:text-6xl font-heading mb-6 tracking-wide leading-tight">
                Our Portfolio
              </h1>
              <div className="luxury-divider" />
            </motion.div>
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="py-8 px-4 overflow-x-auto border-y border-border/40 scrollbar-none">
          <div className="max-w-7xl mx-auto flex flex-wrap md:justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#C9A14A] text-white'
                    : 'bg-card border border-border text-muted-foreground hover:border-[#C9A14A] hover:text-foreground'
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-24">
                <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <motion.div
                      layout
                      key={project.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-[#C9A14A]/40 transition-all duration-500 flex flex-col hover:shadow-2xl hover:-translate-y-1"
                    style={{ height: '100%' }}
                    >
                      {/* Image Preview Container */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                        
                        {/* Category Floating Badge */}
                        <span className="absolute top-4 left-4 text-[10px] uppercase font-semibold tracking-widest text-white bg-[#C9A14A] px-3 py-1 rounded-md font-body shadow-sm">
                          {project.category}
                        </span>
                      </div>

                      {/* Content Wrapper */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-heading tracking-wide text-foreground mb-3 group-hover:text-[#C9A14A] transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">
                            {project.description}
                          </p>

                          {/* Client / Results Metadata Table */}
                          <div className="border-t border-border/50 pt-4 space-y-2 mb-6">
                            <div className="flex justify-between items-start gap-4 text-xs">
                              <span className="text-muted-foreground font-body flex-shrink-0">Client</span>
                              <span className="text-foreground font-semibold font-body text-right">{project.client}</span>
                            </div>
                            <div className="flex justify-between items-start gap-4 text-xs">
                              <span className="text-muted-foreground font-body flex-shrink-0">Impact</span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold font-body text-right">{project.results}</span>
                            </div>
                          </div>
                        </div>

                        {/* Project Footer Details */}
                        <div className="space-y-4">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                            {project.tags.map((tag) => (
                              <span key={tag} className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground bg-secondary/80 px-2.5 py-0.5 rounded-md font-body">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Discuss Project Link CTA */}
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9A14A] hover:text-[#C9A14A]/80 transition-colors uppercase tracking-wider font-body pt-2 group/btn"
                          >
                            Inquire About This Project 
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  );
}
