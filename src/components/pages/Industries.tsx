import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Heart, UtensilsCrossed, Hotel, GraduationCap, Shirt, Scissors, Building2, Factory, HeartHandshake, Rocket, Briefcase, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Industries() {
  const industries = [
    { name: 'Healthcare', icon: Heart, desc: 'Patient-centric marketing, clinic branding, and medical growth strategies.' },
    { name: 'Real Estate', icon: Building2, desc: 'Lead generation funnels, premium brochures, and local property SEO.' },
    { name: 'Education', icon: GraduationCap, desc: 'Brand authority building and conversion campaigns for institutions.' },
    { name: 'Fashion', icon: Shirt, desc: 'Lookbook photography, reels creation, and retail marketing campaigns.' },
    { name: 'Beauty & Salon', icon: Scissors, desc: 'Aesthetic SMM layouts, influencer tie-ups, and brand styling.' },
    { name: 'Restaurants', icon: UtensilsCrossed, desc: 'Appetizing visual content, food photography, and SMM campaigns.' },
    { name: 'Hotels', icon: Hotel, desc: 'Premium hospitality campaigns, digital reach, and premium design guides.' },
    { name: 'Startups', icon: Rocket, desc: 'Rapid brand launch frameworks, pitch design, and fast turnarounds.' },
    { name: 'Ecommerce', icon: ShoppingBag, desc: 'Conversion rate optimization, custom Shopify stores, and retargeting ads.' },
    { name: 'NGOs', icon: HeartHandshake, desc: 'Inspiring storytelling design, fundraising campaigns, and community reach.' },
    { name: 'Manufacturing', icon: Factory, desc: 'Corporate identity, catalog design, and technical brand guidelines.' },
    { name: 'Corporate Companies', icon: Briefcase, desc: 'Consistent corporate identity, profile designs, and internal guides.' },
  ];

  return (
    <>
      <SEO 
        title="Industries We Serve | Irtiqa Marketing"
        description="We partner with healthcare, restaurants, fashion, beauty, real estate, travel, events, NGOs, and startups to build market leaders."
        canonical="/industries"
        keywords="industries, healthcare marketing, fashion branding, real estate leads, startup marketing"
      />

      <div className="bg-background pt-24 pb-16 overflow-hidden text-foreground">
        
        {/* Header Section */}
        <section className="py-20 px-4 sm:px-6 text-center relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-[#C9A14A] text-xs uppercase tracking-[0.3em] font-semibold block mb-4">
                Markets We Serve
              </span>
              <h1 className="text-4xl sm:text-6xl font-heading mb-6 tracking-wide leading-tight">
                Industries We Serve
              </h1>
              <div className="luxury-divider" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                Empowering businesses across sectors to establish trust, authority, and measurable scaling patterns.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Industries Grid — Yellow Icons */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((ind, idx) => {
                const IconComponent = ind.icon;
                return (
                  <motion.div
                    key={ind.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="p-8 bg-card rounded-2xl border border-border hover:border-[#C9A14A]/40 transition-all hover:shadow-md flex items-start gap-5"
                  >
                    <div className="w-12 h-12 bg-[#C9A14A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-[#C9A14A]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-heading tracking-wide text-foreground mb-2">{ind.name}</h2>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
                        {ind.desc}
                      </p>
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
              Don't see your industry listed?
            </h2>
            <p className="text-sm text-white/60 font-body mb-8">
              Every business structure has a story. Contact us to design a tailored marketing roadmap.
            </p>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-all duration-300">
                Let's Discuss
              </button>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
