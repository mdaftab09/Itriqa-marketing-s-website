import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Compass, Search, Target, Palette, Cpu, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Process() {
  const steps = [
    {
      step: '01',
      title: 'Discovery',
      icon: Compass,
      desc: 'We sit down with you to understand your brand goals, target demographics, constraints, and long-term vision.',
    },
    {
      step: '02',
      title: 'Research',
      icon: Search,
      desc: 'Comprehensive market auditing, competitive research, and target audience behavior analysis to build positioning blueprints.',
    },
    {
      step: '03',
      title: 'Strategy',
      icon: Target,
      desc: 'Formulating structured digital marketing plans, content structures, advertising models, and technology scopes.',
    },
    {
      step: '04',
      title: 'Design',
      icon: Palette,
      desc: 'Translating concepts into beautiful, premium designs, mood boards, prototypes, packaging layouts, or website UI maps.',
    },
    {
      step: '05',
      title: 'Execution',
      icon: Cpu,
      desc: 'Implementing layouts into production code, launching SMM content calendars, launching ad platforms, and directing photo/video setups.',
    },
    {
      step: '06',
      title: 'Optimization',
      icon: Sparkles,
      desc: 'Continuous performance monitoring, A/B testing copy layouts, fixing SEO indexes, and refining ad spends based on incoming metrics.',
    },
    {
      step: '07',
      title: 'Growth',
      icon: TrendingUp,
      desc: 'Scaling the marketing initiatives, expanding target audiences, and unlocking new organic/paid growth avenues for your brand.',
    },
  ];

  return (
    <>
      <SEO 
        title="Our Process | 7 Steps to Scale Brands"
        description="Learn more about Irtiqa Marketing's 7-step agency process: Discovery, Research, Strategy, Design, Execution, Optimization, and Growth."
        canonical="/process"
        keywords="process, discovery, research, strategy, design, execution, optimization, growth, marketing workflow"
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
                Methodology
              </span>
              <h1 className="text-4xl sm:text-6xl font-heading mb-6 tracking-wide leading-tight">
                Our Process
              </h1>
              <div className="luxury-divider" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                A structured, data-driven, and highly creative roadmap ensuring that every single asset delivers high-end business value.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Steps List */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto relative space-y-12">
            
            {/* Timeline connection line */}
            <div className="absolute left-[31px] sm:left-[39px] top-6 bottom-6 w-0.5 bg-accent/25 z-0" />

            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex items-start gap-6 sm:gap-8 relative z-10 bg-background py-2"
                >
                  {/* Icon Node */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-card border-2 border-accent rounded-full flex items-center justify-center text-accent flex-shrink-0 shadow-sm relative">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    <span className="absolute -bottom-2 -right-1 text-[10px] font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-body">
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 bg-card rounded-2xl border border-border hover:border-accent/30 transition-all hover:shadow-md flex-1">
                    <h2 className="text-xl sm:text-2xl font-heading tracking-wide mb-3">{step.title}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center bg-[#0B0B0B] text-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-heading mb-6 tracking-wide">
              Ready to start your Discovery phase?
            </h2>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-all duration-300">
                Book Consultation
              </button>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
