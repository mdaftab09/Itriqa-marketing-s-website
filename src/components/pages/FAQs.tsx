import { SEO } from '../SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQs() {
  const faqs: FAQItem[] = [
    {
      question: 'Why choose Irtiqa?',
      answer: 'We combine premium luxury design, business intelligence, rapid delivery models, transparent pricing structures, and dedicated specialists to handle branding, marketing, development, and AI solutions under one roof.',
    },
    {
      question: 'How long does branding take?',
      answer: 'Comprehensive visual brand building (including logo designs, packaging frameworks, business profiles, and guidelines) generally ranges from 3 to 6 weeks depending on revisions and scope.',
    },
    {
      question: 'Do you manage Instagram?',
      answer: 'Yes, we manage brand profiles on Instagram, LinkedIn, and Facebook, covering organic strategy, custom photography, short-form reels, copywriting, and monthly content calendars.',
    },
    {
      question: 'Do you create websites?',
      answer: 'Yes, we develop bespoke high-speed business sites, landing pages, and customized Shopify e-commerce structures utilizing modern front-end architectures.',
    },
    {
      question: 'Can you run ads?',
      answer: 'Absolutely. We manage Google Ads, Meta (Instagram/Facebook) campaigns, and remarketing setups to generate sales leads and inbound queries.',
    },
    {
      question: 'What industries do you work with?',
      answer: 'We partner with healthcare groups, restaurants, hotels, education, fashion, beauty, real estate, construction, NGOs, startups, and corporate brands.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <SEO 
        title="Frequently Asked Questions | Irtiqa Support"
        description="Have questions about our branding services, Instagram management, ad setups, or timelines? Read our FAQ."
        canonical="/faqs"
        keywords="faq, branding timeline, ad campaigns setup, SMM management questions"
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
              <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold block mb-4">
                Support
              </span>
              <h1 className="text-4xl sm:text-6xl font-heading mb-6 tracking-wide leading-tight">
                FAQs
              </h1>
              <div className="luxury-divider" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                Quick answers to questions you may have about our workflows and services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQs List */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full p-6 flex justify-between items-center text-left gap-4 hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <HelpCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-base sm:text-lg font-heading tracking-wide text-foreground font-semibold">
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-accent flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-border/50 text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Contact */}
        <section className="py-20 text-center bg-[#0B0B0B] text-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-heading mb-6 tracking-wide">
              Still have questions?
            </h2>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-all duration-300">
                Ask Us Directly
              </button>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
