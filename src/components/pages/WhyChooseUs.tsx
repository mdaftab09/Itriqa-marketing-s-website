import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, MessageSquare, Award, Users, BadgePercent, Target, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WhyChooseUs() {
  const reasons = [
    {
      title: 'Creative Strategy',
      icon: Lightbulb,
      desc: 'We step away from generic models to design bespoke narratives, styling elements, and layouts that ensure your brand stands out.',
    },
    {
      title: 'Experienced Team',
      icon: Users,
      desc: 'Your brand receives personalized attention from dedicated, highly skilled experts committed to scaling your business.',
    },
    {
      title: 'Fast Delivery',
      icon: Zap,
      desc: 'Agile design frameworks and dedicated professionals allow us to ship visual resources, profiles, and campaigns rapidly.',
    },
    {
      title: 'Affordable Packages',
      icon: BadgePercent,
      desc: 'Premium visual brand building, videography, and execution priced to deliver high value for growing businesses.',
    },
    {
      title: 'Premium Quality',
      icon: Award,
      desc: 'Strict design audits and styling rules inspired by global brands ensure class-leading aesthetic quality across outputs.',
    },
    {
      title: 'Dedicated Account Manager',
      icon: MessageSquare,
      desc: 'Scheduled check-ins, continuous reporting dashboards, and a single point of contact for seamless support.',
    },
    {
      title: 'ROI-Focused Marketing',
      icon: Target,
      desc: 'Every ad setup and keyword target is tracked against sales conversions, cost per acquisition, and clear ROI.',
    },
    {
      title: 'End-to-End Solutions',
      icon: HeartHandshake,
      desc: 'We support your brand launch and guide your growth through continuous maintenance, audits, and strategic expansions.',
    },
  ];

  return (
    <>
      <SEO 
        title="Why Choose Us | Irtiqa Marketing Differentiators"
        description="Learn why startups and enterprises choose Irtiqa Marketing: Creative thinking, business focus, premium design, and results."
        canonical="/why-choose-us"
        keywords="why choose us, marketing agency differentiators, premium branding agency, creative marketing"
      />

      <div className="bg-background pt-24 pb-16 overflow-hidden text-foreground">
        
        {/* Header */}
        <section className="py-20 px-4 sm:px-6 text-center relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-[#C9A14A] text-xs uppercase tracking-[0.3em] font-semibold block mb-4">
                Our Edge
              </span>
              <h1 className="text-4xl sm:text-6xl font-heading mb-6 tracking-wide leading-tight">
                Why Choose Us?
              </h1>
              <div className="luxury-divider" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                We combine high-end aesthetic designs with core business insights to build sustainable market value.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Reasons Grid */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reasons.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className="p-8 bg-card rounded-2xl border border-border hover:border-[#C9A14A]/40 transition-all hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-[#C9A14A]/10 rounded-xl flex items-center justify-center text-[#C9A14A] mb-6">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h2 className="text-xl font-heading tracking-wide text-foreground mb-3">{item.title}</h2>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
                        {item.desc}
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
              Partner with India’s Premium Creative Agency
            </h2>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-all duration-300">
                Start Today
              </button>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
