import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

export function About() {
  const values = [
    { title: 'Creativity', desc: 'Crafting unforgettable stories and custom visual assets that resonate deeply with audiences.' },
    { title: 'Transparency', desc: 'Honest communication, transparent workflows, and zero hidden costs at every phase.' },
    { title: 'Innovation', desc: 'Pushing creative boundaries to deliver next-generation marketing and design standards.' },
    { title: 'Growth', desc: 'Data-driven, performance-oriented execution built to generate real, measurable business results.' },
    { title: 'Excellence', desc: 'Premium luxury aesthetics and meticulous attention to detail in every deliverable.' }
  ];

  return (
    <>
      <SEO 
        title="About Us | Irtiqa Marketing & Founder Faqeha Fatima"
        description="Learn more about Irtiqa Marketing, a creative digital agency dedicated to transforming ideas into impactful brands, and founder Faqeha Fatima."
        canonical="/about"
        keywords="about irtiqa marketing, marketing agency india, values, mission, vision, creative director, faqeha fatima"
      />

      <div className="bg-background pt-24 pb-16 overflow-hidden text-foreground">
        
        {/* Section 1: About Irtiqa Marketing — Full Width (Image Removed) */}
        <section className="py-16 px-4 sm:px-6 relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <span className="text-[#C9A14A] text-xs uppercase tracking-[0.3em] font-semibold block animate-pulse">
                About Irtiqa Marketing
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading tracking-wide leading-tight">
                Who We Are
              </h1>
              <div className="luxury-divider" />
              
              <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                Irtiqa Marketing is a creative digital marketing agency dedicated to transforming ideas into impactful brands. 
                We blend creativity with data-driven strategies to help businesses increase visibility, engagement, and revenue.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-16 px-4 sm:px-6 bg-[#0B0B0B] text-white border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              
              {/* Our Vision Card (Replaces Image) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="p-8 sm:p-10 bg-white/5 rounded-2xl border border-[#C9A14A]/30 hover:border-[#C9A14A]/50 transition-all flex flex-col justify-center"
              >
                <div className="w-12 h-12 bg-[#C9A14A]/10 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-[#C9A14A]" />
                </div>
                <h2 className="text-2xl font-heading mb-4 tracking-wide text-white">Our Vision</h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-body">
                  Our vision is to become a luxury marketing agency that feels like home for every brand we serve. We aspire to create meaningful connections, deliver exceptional experiences, and empower businesses to grow fearlessly while redefining excellence through creativity, innovation, and strategic thinking.
                </p>
              </motion.div>

              {/* Our Mission Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="p-8 sm:p-10 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-center"
              >
                <div className="w-12 h-12 bg-[#C9A14A]/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-[#C9A14A]" />
                </div>
                <h2 className="text-2xl font-heading mb-4 tracking-wide text-white">Our Mission</h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-body">
                  To empower businesses with innovative marketing solutions.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#C9A14A] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
                Our Foundation
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading tracking-wide">Core Values</h2>
              <div className="luxury-divider" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((value, idx) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 bg-card rounded-xl border border-border hover:border-[#C9A14A]/30 transition-all hover:shadow-md text-center"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-[#C9A14A] px-2.5 py-1 bg-[#C9A14A]/10 rounded-md mb-4">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-heading tracking-wide text-foreground mb-2">{value.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-body">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: About the Founder — All Colored */}
        <section className="py-20 px-4 sm:px-6 bg-[#0B0B0B] text-white relative border-t border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(#C9A14A_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Founder Image Card — Colored */}
              <motion.div
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-5 relative group"
              >
                <div className="aspect-[4/5] bg-neutral-900 rounded-3xl border border-[#C9A14A]/30 overflow-hidden relative shadow-2xl">
                  <img 
                    src="/images/founder.PNG" 
                    alt="Faqeha Fatima" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                </div>
              </motion.div>

              {/* Founder Details */}
              <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-7 space-y-6"
              >
                <span className="text-[#C9A14A] text-xs uppercase tracking-[0.3em] font-semibold block">
                  Meet the Founder
                </span>
                <h2 className="text-4xl sm:text-5xl font-heading leading-tight text-white">
                  Faqeha Fatima
                </h2>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/60 font-body">
                  Founder & Creative Director, Irtiqa Marketing
                </p>
                <div className="luxury-divider" style={{ margin: '1rem 0' }} />
                
                <p className="text-base sm:text-lg text-white/70 leading-relaxed font-body">
                  With a passion for creativity and business growth, Faqeha Fatima established Irtiqa Marketing to help brands build a powerful digital presence. Combining strategy, design, storytelling, and technology, she has led successful campaigns across multiple industries.
                </p>

                <div className="grid md:grid-cols-12 gap-6 items-center pt-6 border-t border-white/10 mt-6">
                  {/* Quote Text */}
                  <div className="md:col-span-7">
                    <blockquote className="border-l-4 border-[#C9A14A] pl-6 py-2">
                      <p className="text-lg font-heading tracking-wide italic text-white/95 leading-relaxed">
                        "Every business deserves premium branding that creates trust, attracts customers, and drives measurable growth."
                      </p>
                    </blockquote>
                  </div>
                  {/* Quote Image — Colored */}
                  <div className="md:col-span-5">
                    <div className="aspect-[3/4] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src="/images/founderquote.JPG" 
                        alt="Faqeha Fatima Quote Portrait" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}
