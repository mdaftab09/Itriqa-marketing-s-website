import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Palette, Camera, Monitor, Brain, Megaphone } from 'lucide-react';
import { Testimonials } from '../Testimonials';

export function Home() {

  const counterSection = [
    { value: '100+', label: 'Trusted Brands' },
    { value: '500+', label: 'Projects Delivered' },
    { value: '25+', label: 'Industries Served' },
    { value: '50M+', label: 'Digital Reach' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '10+', label: 'Creative Experts' },
  ];

  const whatWeDoList = [
    { title: 'Branding', desc: 'Crafting premium identities, logo designs, and comprehensive brand guidelines.', icon: Sparkles },
    { title: 'Marketing', desc: 'Performance-driven, result-oriented marketing strategies to scale customer acquisition.', icon: Megaphone },
    { title: 'Design', desc: 'Stunning graphic designs, social media creatives, brochures, and print layouts.', icon: Palette },
    { title: 'Development', desc: 'High-performance, bespoke business websites, landing pages, and e-commerce stores.', icon: Monitor },
    { title: 'Content', desc: 'Engaging storytelling, copy, high-impact photography, and cinematic reels/videos.', icon: Camera },
    { title: 'AI Solutions', desc: 'Modern AI automation, content workflows, and customized chatbot integrations.', icon: Brain },
  ];

  const whyIrtiqa = [
    'Creative Strategy',
    'Business-Focused Marketing',
    'Fast Turnaround',
    'Premium Designs',
    'Dedicated Team',
    'End-to-End Solutions',
  ];

  const clientLogos = [
    '/images/Logos for website/294386778_736895840926025_6007188555280010895_n.jpg',
    '/images/Logos for website/329477275_754937038999274_376823044394748815_n.jpg',
    '/images/Logos for website/367608698_1457780245058530_8555842757582324557_n.jpg',
    '/images/Logos for website/441470350_3756728654654919_3485827540906061037_n.jpg',
    '/images/Logos for website/449799948_376114465498564_3783999225728027857_n.jpg',
    '/images/Logos for website/450463634_395959360118936_7382763048832768321_n.jpg',
    '/images/Logos for website/480903537_960059579607016_7510063833805973710_n.jpg',
    '/images/Logos for website/500672647_17862794427405496_2832323647421170224_n.jpg',
    '/images/Logos for website/528147221_17844575775544404_3837645943165711227_n.jpg',
    '/images/Logos for website/590369783_17853545388591431_5591131273521213306_n.jpg',
    '/images/Logos for website/590874092_18026649815781818_6755819965465007807_n.jpg',
    '/images/Logos for website/615696484_17848361400664164_8206393633985664138_n.jpg',
    '/images/Logos for website/621223818_18051904910689680_4610772012824543984_n.jpg',
    '/images/Logos for website/703954681_18427165540121358_8025350774876454640_n.jpg',
    '/images/Logos for website/730331520_18334272811265312_9185450868821934528_n.jpg',
    '/images/Logos for website/king power jpg logo.jpg.jpeg',
    '/images/brand/pista-house.jpg',
    '/images/brand/himadri-verma-studio.jpg',
  ];

  return (
    <>
      <SEO 
        title="Scale Your Brand with Creative Marketing | Irtiqa Marketing"
        description="Irtiqa Marketing is a full-service creative marketing agency helping businesses grow through branding, social media, performance marketing, website development, content creation, photography, videography, and AI-powered solutions."
        keywords="irtiqa marketing, creative marketing agency, branding, digital marketing, website design, video production, photography, performance marketing"
      />

      <div className="bg-background overflow-hidden text-foreground">
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-16 relative">
          {/* Subtle Luxury Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-foreground/5 rounded-full blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full mb-6 border border-accent/25 backdrop-blur-sm">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-accent text-xs sm:text-sm font-semibold uppercase tracking-widest" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  We don't just market brands
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-8 font-bold font-heading text-balance leading-none">
                We Build <span className="gold-text-gradient gold-shimmer">Market Leaders</span>.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 px-4 font-body leading-relaxed"
            >
              Irtiqa Marketing is a full-service creative marketing agency helping businesses grow through branding, social media, performance marketing, website development, content creation, photography, videography, and AI-powered solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/contact">
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full hover:shadow-2xl hover:shadow-[#C9A14A]/10 transition-all flex items-center justify-center gap-2 group text-sm tracking-widest uppercase font-semibold border border-transparent hover:border-[#C9A14A]/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4 text-[#C9A14A] group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/photography">
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 border border-[#C9A14A]/40 rounded-full hover:border-[#C9A14A] hover:bg-[#C9A14A]/5 transition-all text-sm tracking-widest uppercase font-semibold text-foreground"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Photography
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* About the Founder */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0B0B0B] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C9A14A_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-5"
              >
                <div className="aspect-[4/5] bg-neutral-900 rounded-3xl border border-[#C9A14A]/30 overflow-hidden relative shadow-2xl">
                  <img 
                    src="/images/founder.PNG" 
                    alt="Faqeha Fatima — Founder" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-7 space-y-6"
              >
                <span className="text-[#C9A14A] text-xs uppercase tracking-[0.3em] font-semibold block" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Meet the Founder
                </span>
                <h2 className="text-3xl sm:text-5xl font-heading leading-tight text-white">
                  Faqeha Fatima
                </h2>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/60 font-body">
                  Founder & Creative Director, Irtiqa Marketing
                </p>
                <div className="luxury-divider" style={{ margin: '1rem 0' }} />
                <p className="text-base sm:text-lg text-white/70 leading-relaxed font-body">
                  With a passion for creativity and business growth, Faqeha Fatima established Irtiqa Marketing to help brands build a powerful digital presence. Combining strategy, design, storytelling, and technology, she has led successful campaigns across multiple industries.
                </p>
                <blockquote className="border-l-4 border-[#C9A14A] pl-6 py-2 mt-4">
                  <p className="text-lg font-heading tracking-wide italic text-white/90 leading-relaxed">
                    "Every business deserves premium branding that creates trust, attracts customers, and drives measurable growth."
                  </p>
                </blockquote>
                <Link to="/founder">
                  <motion.button
                    className="mt-4 px-8 py-3 border border-[#C9A14A]/50 rounded-full hover:bg-[#C9A14A]/10 transition-all text-sm tracking-widest uppercase font-semibold text-white flex items-center gap-2 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More About the Founder
                    <ArrowRight className="w-4 h-4 text-[#C9A14A] group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Trusted By Section */}
        <section className="py-20 bg-[#0B0B0B] text-white border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="text-neutral-400 text-xs uppercase tracking-[0.25em] font-semibold block mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Trusted By
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading mb-12 tracking-wide text-white">
              Our Clients
            </h2>
            
            {/* Infinite Marquee Ticker */}
            <div className="relative w-full overflow-hidden py-4 mask-gradient-x">
              <div className="flex gap-6 animate-marquee">
                {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, idx) => (
                  <div
                    key={'logo-' + idx}
                    className="flex-shrink-0 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-[#C9A14A]/40 transition-all flex items-center justify-center h-28 w-44 group cursor-pointer"
                  >
                    <img
                      src={logo}
                      alt={`Client ${(idx % clientLogos.length) + 1}`}
                      className="max-h-16 max-w-[140px] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Homepage Counter Section */}
        <section className="py-20 px-4 sm:px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-neutral-400 text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
                At A Glance
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading tracking-wide">Our Track Record</h2>
              <div className="luxury-divider mt-4" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
              {counterSection.map((stat, index) => (
                <motion.div
                  key={stat.label + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-card rounded-xl border border-border/60 shadow-sm flex flex-col items-center justify-center min-h-[120px]"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C9A14A] mb-1 font-heading">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold text-center">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-secondary/20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-neutral-400 text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading mb-6">Strategy & Execution Combined</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
                From strategy to execution, we help businesses build unforgettable brands and measurable growth.
              </p>
              <div className="luxury-divider" />
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 text-sm font-semibold text-foreground/80 tracking-widest uppercase">
                <span>Branding</span> • <span>Marketing</span> • <span>Design</span> • <span>Development</span> • <span>Content</span> • <span>AI</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {whatWeDoList.map((service, index) => {
                const IconComp = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="p-8 bg-card rounded-2xl border border-border hover:border-[#C9A14A]/40 hover:shadow-xl transition-all group relative overflow-hidden"
                  >
                    <div className="w-12 h-12 bg-[#C9A14A]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A14A] transition-colors duration-300">
                      <IconComp className="w-6 h-6 text-[#C9A14A] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading mb-4 tracking-wide">{service.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body">{service.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Irtiqa? */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0B0B0B] text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-neutral-400 text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
                  Why Irtiqa?
                </span>
                <h2 className="text-3xl sm:text-5xl font-heading mb-8 leading-tight">
                  We don’t just create campaigns. We scale brands.
                </h2>
                <p className="text-base sm:text-lg text-white/70 mb-10 leading-relaxed font-body">
                  Combining modern design principles, advanced marketing techniques, and tailored AI workflows, we create long-term enterprise value for our clients.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {whyIrtiqa.map((differentiator) => (
                    <div key={differentiator} className="flex items-center gap-3 py-3 border-b border-white/10">
                      <CheckCircle2 className="w-5 h-5 text-[#C9A14A] flex-shrink-0" />
                      <span className="text-sm font-semibold tracking-wide text-white/90" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {differentiator}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-gradient-to-br from-[#1c1c1c] to-[#121212] rounded-3xl p-8 sm:p-12 border border-white/10"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#C9A14A]/10 rounded-full blur-2xl -z-10" />
                <h3 className="text-2xl sm:text-3xl font-heading mb-4 text-white tracking-wider">Premium Quality Guaranteed</h3>
                <p className="text-sm sm:text-base text-white/60 mb-8 leading-relaxed font-body">
                  We maintain strict attention to detail, luxury brand aesthetics, fast turnaround times, and data-driven optimization structures.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/50 font-body">Aesthetic Standard</span>
                    <span className="text-neutral-300 font-semibold tracking-wider font-heading">Luxury & Premium</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/50 font-body">Execution Speed</span>
                    <span className="text-neutral-300 font-semibold tracking-wider font-heading">Agile / Rapid</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pb-2">
                    <span className="text-white/50 font-body">Focus Area</span>
                    <span className="text-neutral-300 font-semibold tracking-wider font-heading">Business Scaling</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0B0B0B] text-white rounded-3xl p-8 sm:p-16 text-center border border-accent/30 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-neutral-400 text-xs uppercase tracking-[0.3em] font-semibold block mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Ready to Scale Your Brand?
                </span>
                <h2 className="text-3xl sm:text-5xl font-heading mb-6 max-w-3xl leading-tight">
                  Let’s Build Something <br /><span className="gold-text-gradient gold-shimmer font-bold">Extraordinary</span>.
                </h2>
                <p className="text-sm sm:text-base text-white/60 mb-10 max-w-xl font-body leading-relaxed">
                  Partner with Irtiqa Marketing to build an unforgettable identity, run campaigns that perform, and implement workflow-transforming AI solutions.
                </p>
                <Link to="/contact">
                  <motion.button
                    className="px-10 py-4 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 group text-sm tracking-widest font-semibold uppercase shadow-xl hover:shadow-white/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Free Consultation
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
