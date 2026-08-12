import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Camera, Video, Monitor, Search, BarChart3, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Services() {
  const serviceCategories = [
    {
      icon: Sparkles,
      title: 'Branding',
      items: ['Logo Design', 'Brand Identity', 'Brand Guidelines'],
      description: 'Crafting premium, luxury visual frameworks that establish immediate market authority and trust.',
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      items: ['Social Media Posts', 'Brochures', 'Flyers', 'Packaging', 'Catalogues'],
      description: 'Stunning marketing collateral designed to communicate your brand story with sophistication and elegance.',
    },
    {
      icon: Layout,
      title: 'Social Media Marketing',
      items: ['Instagram Management', 'Facebook Marketing', 'LinkedIn Marketing'],
      description: 'End-to-end community building, organic engagement, and profile management to capture organic reach.',
    },
    {
      icon: Video,
      title: 'Reels & Video Editing',
      items: ['Short Form Videos', 'Ads', 'Motion Graphics'],
      description: 'High-impact cinematic videos and bite-sized content engineered to command attention on social feeds.',
    },
    {
      icon: Camera,
      title: 'Photography & Videography',
      items: ['Product Photography', 'Fashion Shoots', 'Corporate Shoots'],
      description: 'Ultra-premium product and brand shoots capturing every details under professional direction.',
    },
    {
      icon: Monitor,
      title: 'Website Development',
      items: ['Business Websites', 'Ecommerce', 'Landing Pages'],
      description: 'Sophisticated web experiences crafted using modern web engines, offering speed and aesthetics.',
    },
    {
      icon: BarChart3,
      title: 'Performance Marketing',
      items: ['Meta Ads', 'Google Ads', 'Lead Generation'],
      description: 'High-ROI campaigns designed to deliver sales pipelines, lead capturing, and clear ROI tracking.',
    },
    {
      icon: Search,
      title: 'SEO',
      items: ['On-page SEO', 'Local SEO', 'Technical SEO'],
      description: 'Optimizing digital assets to secure top rankings on search engines for relevant keywords.',
    },
  ];

  return (
    <>
      <SEO 
        title="Our Creative Services | Irtiqa Marketing"
        description="Explore Irtiqa Marketing's creative offerings, from branding, graphic design, social media marketing to AI solutions, SEO, and video production."
        canonical="/services"
        keywords="branding, graphic design, social media, video production, photography, web development, SEO, performance marketing, AI solutions"
      />

      <div className="bg-background pt-24 pb-16 overflow-hidden text-foreground">
        
        {/* Services Header — Image Removed, Full Width */}
        <section className="py-20 px-4 sm:px-6 relative border-b border-border/40">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <span className="text-[#C9A14A] text-xs uppercase tracking-[0.3em] font-semibold block">
                Our Services
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading leading-tight">
                What We Do
              </h1>
              <div className="luxury-divider" style={{ margin: '1rem auto' }} />
              
              <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                From strategy to execution, we help businesses build unforgettable brands and measurable growth. We blend creative marketing with data-driven workflows to deliver results that matter.
              </p>
              <div className="flex flex-wrap gap-3 pt-4 justify-center">
                {['Branding', 'Design', 'Marketing', 'Development', 'SEO', 'Video Editing'].map((tag) => (
                  <span key={tag} className="text-xs uppercase tracking-widest text-[#C9A14A] border border-[#C9A14A]/30 px-3 py-1.5 rounded-md bg-[#C9A14A]/5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid — Yellow Icons, Equal Size Cards */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ gridAutoRows: '1fr' }}>
              {serviceCategories.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="p-8 bg-card rounded-2xl border border-border hover:border-[#C9A14A]/40 transition-all hover:shadow-lg flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#C9A14A]/10 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-[#C9A14A]" />
                        </div>
                        <h2 className="text-2xl font-heading tracking-wide text-foreground">{service.title}</h2>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-body mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2 border-t border-border/50 pt-4 mb-6">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground/80 font-body">
                            <span className="w-1.5 h-1.5 bg-[#C9A14A] rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center bg-[#0B0B0B] text-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-heading mb-6 tracking-wide">
              Ready to take your business to the next level?
            </h2>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-all duration-300">
                Book Free Consultation
              </button>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
