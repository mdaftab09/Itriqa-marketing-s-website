import { SEO } from '../SEO';
import { motion } from 'framer-motion';

export function Team() {
  const teamMembers = [
    { name: 'Faqeha Fatima', role: 'Creative Director', description: 'Leads art direction, branding frameworks, and core visual strategies.' },
    { name: 'Suhail Ahmed', role: 'Senior Graphic Designer', description: 'Specializes in brand styling guide designs, packaging, and layouts.' },
    { name: 'Aditya Sen', role: 'Video Editor & Motion Designer', description: 'Transforms raw video assets into cinematic reels, ads, and films.' },
    { name: 'Meera Nair', role: 'Marketing Specialist', description: 'Handles Meta Ads, Google PPC campaigns, and ROI tracking models.' },
    { name: 'Vikram Malhotra', role: 'Lead Web Developer', description: 'Develops fast, custom React interfaces, web apps, and CMS backends.' },
    { name: 'Rohit Sharma', role: 'Brand Photographer', description: 'Directs lighting, camera angles, and details for premium products.' },
    { name: 'Ayesha Khan', role: 'Lead Content Strategist', description: 'Curates content roadmaps, social copy, and brand narratives.' }
  ];

  return (
    <>
      <SEO 
        title="Meet the Team | Creative Minds"
        description="Meet the creative minds behind Irtiqa Marketing: Designers, Developers, Editors, Photographers, and Strategists."
        canonical="/team"
        keywords="team, creative agency team, marketing specialists, web developers, photographers"
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
                Creative Minds
              </span>
              <h1 className="text-4xl sm:text-6xl font-heading mb-6 tracking-wide leading-tight">
                Meet Our Team
              </h1>
              <div className="luxury-divider" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                Dedicated designers, editors, developers, and copywriters built to scale your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="p-8 bg-card rounded-2xl border border-border hover:border-accent/40 transition-all hover:shadow-md text-center flex flex-col justify-between"
                >
                  <div>
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-xl font-heading font-bold text-accent mx-auto mb-6">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h2 className="text-xl font-heading tracking-wide text-foreground mb-1">{member.name}</h2>
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold font-body block mb-4">
                      {member.role}
                    </span>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
