import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, Award, Target, MessageSquare } from 'lucide-react';

interface CaseStudy {
  title: string;
  category: string;
  challenge: string;
  strategy: string;
  execution: string;
  result: string;
  feedback: string;
  client: string;
  before: string;
  after: string;
}

export function CaseStudies() {
  const caseStudies: CaseStudy[] = [
    {
      title: 'Monarch Luxury Cosmetics Launch',
      category: 'Branding & Packaging',
      client: 'Monarch Cosmetics Ltd.',
      challenge: 'Launching a premium skin product line in a highly saturated local retail market without a premium aesthetic setup.',
      strategy: 'Design a bespoke, heavy card luxury packaging box featuring custom gold foil leaf and minimal serif fonts, coupled with elite product photography shoots.',
      execution: 'Created structural dies, aligned fine gold stamping parameters, executed a two-day fashion style studio shoot, and published catalog files.',
      result: 'Secured placement in 15+ premium department stores and achieved a 120% rise in B2B catalog inquiries within 60 days.',
      feedback: '“The Irtiqa team transformed our product presence entirely. The luxury packaging design received outstanding feedback from all our retail stockists.”',
      before: 'Plain white generic plastic container jars with basic sticker print.',
      after: 'Bespoke heavy card outer carton with Gold Hot Foil stamping and embossed logo prints.'
    },
    {
      title: 'Apex Healthcare Online Patient Growth',
      category: 'Web Development & SEO',
      client: 'Apex Health Group',
      challenge: 'Slow, non-responsive legacy corporate website resulting in high bounce rates and declining patient consultations.',
      strategy: 'Develop a fast custom React/Next.js portal optimized for local search keywords, integrated with automated booking systems.',
      execution: 'Designed mobile-first UI grids, wrote technical Schema tags, and configured speed optimization frameworks.',
      result: 'Reached top 3 positions for primary local healthcare searches and boosted consultation appointment counts by 40%.',
      feedback: '“Our appointment bookings increased dramatically. The website speed, design, and SEO execution exceeded all our targets.”',
      before: 'Page load speed of 6.2s, no local search keyword ranking.',
      after: 'Sub-second load times, rank #1 for critical regional patient searches.'
    }
  ];

  return (
    <>
      <SEO 
        title="Case Studies | Irtiqa Marketing"
        description="Read detailed case studies detailing our challenges, strategies, executions, results, client feedbacks, and before/after comparisons."
        canonical="/case-studies"
        keywords="case studies, branding results, SEO success, marketing ROI, before and after branding"
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
                Proven Impact
              </span>
              <h1 className="text-4xl sm:text-6xl font-heading mb-6 tracking-wide leading-tight">
                Case Studies
              </h1>
              <div className="luxury-divider" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                A closer look at how we resolve complex branding, design, and marketing challenges to deliver measurable business results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies List */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-20">
            {caseStudies.map((study, idx) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 sm:p-12 bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-all space-y-8"
              >
                {/* Header Info */}
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-border pb-6 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-widest block mb-2 font-body">
                      {study.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading tracking-wide text-foreground">{study.title}</h2>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold font-body bg-secondary/80 px-4 py-2 rounded-lg text-muted-foreground">
                    Client: {study.client}
                  </div>
                </div>

                {/* Challenge & Strategy */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider font-heading">
                      <AlertCircle className="w-4 h-4" /> Challenge
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-body">
                      {study.challenge}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider font-heading">
                      <Target className="w-4 h-4" /> Strategy
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-body">
                      {study.strategy}
                    </p>
                  </div>
                </div>

                {/* Execution & Result */}
                <div className="grid md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider font-heading">
                      <Sparkles className="w-4 h-4" /> Execution
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-body">
                      {study.execution}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider font-heading">
                      <Award className="w-4 h-4" /> Result
                    </div>
                    <p className="text-sm text-accent font-semibold leading-relaxed font-body">
                      {study.result}
                    </p>
                  </div>
                </div>

                {/* Before & After comparison */}
                <div className="bg-secondary/35 rounded-2xl p-6 grid sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold font-body">Before</span>
                    <p className="text-sm font-body text-foreground/80">{study.before}</p>
                  </div>
                  <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-border/80 pt-4 sm:pt-0 sm:pl-6">
                    <span className="text-xs uppercase tracking-wider text-accent font-semibold font-body">After</span>
                    <p className="text-sm font-body text-accent font-medium">{study.after}</p>
                  </div>
                </div>

                {/* Client Feedback */}
                <div className="border-t border-border pt-6">
                  <div className="flex gap-4">
                    <MessageSquare className="w-6 h-6 text-accent flex-shrink-0 opacity-60" />
                    <p className="text-sm italic text-muted-foreground font-body leading-relaxed">
                      {study.feedback}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
