import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function Founder() {
  return (
    <>
      <SEO 
        title="Meet the Founder | Irtiqa Marketing"
        description="Learn more about Faqeha Fatima, Founder & Creative Director of Irtiqa Marketing, her vision, background and message."
        canonical="/founder"
        keywords="faqeha fatima, founder, creative director, irtiqa marketing founder, branding vision"
      />

      <div className="bg-background pt-24 pb-16 overflow-hidden text-foreground">
        
        {/* Founder Intro Section */}
        <section className="py-20 px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Profile Image — Colored */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
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
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#C9A14A]/10 rounded-full blur-2xl -z-10" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                </div>
              </motion.div>

              {/* Story Column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-7 space-y-6"
              >
                <span className="text-[#C9A14A] text-xs uppercase tracking-[0.3em] font-semibold block">
                  Meet the Founder
                </span>
                <h1 className="text-4xl sm:text-5xl font-heading leading-tight">
                  Faqeha Fatima
                </h1>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-body">
                  Founder & Creative Director, Irtiqa Marketing
                </p>
                <div className="luxury-divider" style={{ margin: '1rem 0' }} />
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-body">
                  With a passion for creativity and business growth, Faqeha Fatima established Irtiqa Marketing to help brands build a powerful digital presence. Combining strategy, design, storytelling, and technology, she has led successful campaigns across multiple industries.
                </p>

                <div className="grid md:grid-cols-12 gap-6 items-center pt-6 border-t border-border mt-6">
                  {/* Quote Text */}
                  <div className="md:col-span-7">
                    <blockquote className="border-l-4 border-[#C9A14A] pl-6 py-2">
                      <p className="text-lg font-heading tracking-wide italic text-foreground leading-relaxed">
                        "Every business deserves premium branding that creates trust, attracts customers, and drives measurable growth."
                      </p>
                    </blockquote>
                  </div>
                  {/* Quote Image — Colored */}
                  <div className="md:col-span-5">
                    <div className="aspect-[3/4] bg-neutral-900 border border-border rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src="/images/vision_behind_irtiqa.jpg" 
                        alt="Faqeha Fatima — Vision Behind Irtiqa" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Founder Gallery Section — All Colored */}
        <section className="py-20 px-4 sm:px-6 bg-secondary/10 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#C9A14A] text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
                Showcase
              </span>
              <h2 className="text-3xl font-heading tracking-wide">Behind The Scenes</h2>
              <div className="luxury-divider mt-4" />
            </div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-[3/4] w-full max-w-[280px] bg-neutral-900 border border-border/60 rounded-xl overflow-hidden shadow-md"
              >
                <img
                  src="/images/founderquote.JPG"
                  alt="Executive Vision"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#C9A14A] font-semibold">Executive Vision</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder Message Section */}
        <section className="py-20 px-4 sm:px-6 bg-[#0B0B0B] text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(#C9A14A_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Quote className="w-12 h-12 text-[#C9A14A] mx-auto mb-8 opacity-60 animate-bounce" />
            <span className="text-neutral-400 text-xs uppercase tracking-[0.25em] font-semibold block mb-4">
              Founder's Vision
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading mb-8 leading-relaxed italic text-white/90">
              "Every business deserves premium branding that creates trust, attracts customers, and drives measurable growth."
            </h2>
            <div className="luxury-divider" />
          </div>
        </section>

      </div>
    </>
  );
}
