import { SEO } from '../SEO';
import { motion } from 'framer-motion';

export function Clients() {
  const clientLogos = [
    { name: 'Client 1', logo: '/images/Logos for website/294386778_736895840926025_6007188555280010895_n.jpg' },
    { name: 'Client 2', logo: '/images/Logos for website/329477275_754937038999274_376823044394748815_n.jpg' },
    { name: 'Client 3', logo: '/images/Logos for website/367608698_1457780245058530_8555842757582324557_n.jpg' },
    { name: 'Client 4', logo: '/images/Logos for website/441470350_3756728654654919_3485827540906061037_n.jpg' },
    { name: 'Client 5', logo: '/images/Logos for website/449799948_376114465498564_3783999225728027857_n.jpg' },
    { name: 'Client 6', logo: '/images/Logos for website/450463634_395959360118936_7382763048832768321_n.jpg' },
    { name: 'Client 7', logo: '/images/Logos for website/480903537_960059579607016_7510063833805973710_n.jpg' },
    { name: 'Client 8', logo: '/images/Logos for website/500672647_17862794427405496_2832323647421170224_n.jpg' },
    { name: 'Client 9', logo: '/images/Logos for website/528147221_17844575775544404_3837645943165711227_n.jpg' },
    { name: 'Client 10', logo: '/images/Logos for website/590369783_17853545388591431_5591131273521213306_n.jpg' },
    { name: 'Client 11', logo: '/images/Logos for website/590874092_18026649815781818_6755819965465007807_n.jpg' },
    { name: 'Client 12', logo: '/images/Logos for website/615696484_17848361400664164_8206393633985664138_n.jpg' },
    { name: 'Client 13', logo: '/images/Logos for website/621223818_18051904910689680_4610772012824543984_n.jpg' },
    { name: 'Client 14', logo: '/images/Logos for website/703954681_18427165540121358_8025350774876454640_n.jpg' },
    { name: 'Client 15', logo: '/images/Logos for website/730331520_18334272811265312_9185450868821934528_n.jpg' },
    { name: 'King Power', logo: '/images/Logos for website/king power jpg logo.jpg.jpeg' },
    { name: 'Pista House', logo: '/images/brand/pista-house.jpg' },
    { name: 'Himadri Verma Studio', logo: '/images/brand/himadri-verma-studio.jpg' },
  ];

  const numbers = [
    { value: '100+', label: 'Brands Served' },
    { value: '500+', label: 'Projects Delivered' },
    { value: '25+', label: 'Industries Served' },
    { value: '95%', label: 'Client Satisfaction' },
  ];

  // Split logos into two rows for two-direction marquee
  const row1Logos = clientLogos.slice(0, 9);
  const row2Logos = clientLogos.slice(9);

  return (
    <>
      <SEO 
        title="Our Clients | Trusted By"
        description="We are trusted by 100+ brands across 25+ industries. Check out our clients and partners."
        canonical="/clients"
        keywords="clients, trusted brands, client logos, branding partners India"
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
                Trusted By
              </span>
              <h1 className="text-4xl sm:text-6xl font-heading mb-6 tracking-wide leading-tight">
                Our Clients
              </h1>
              <div className="luxury-divider" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                Empowering brands across India with premium branding and data-driven marketing solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Clients Scrolling Tickers with Logo Images */}
        <section className="py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Ticker Row 1 (Left direction) */}
            <div className="relative w-full overflow-hidden py-2 mask-gradient-x">
              <div className="flex gap-6 animate-marquee">
                {[...row1Logos, ...row1Logos].map((client, idx) => (
                  <div
                    key={client.name + '-r1-' + idx}
                    className="flex-shrink-0 p-4 bg-card rounded-2xl border border-border hover:border-[#C9A14A]/40 transition-all hover:shadow-sm flex items-center justify-center h-32 w-48 group overflow-hidden"
                  >
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-20 max-w-[160px] object-contain group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Ticker Row 2 (Right/Reverse direction) */}
            <div className="relative w-full overflow-hidden py-2 mask-gradient-x">
              <div className="flex gap-6 animate-marquee-reverse">
                {[...row2Logos, ...row2Logos].map((client, idx) => (
                  <div
                    key={client.name + '-r2-' + idx}
                    className="flex-shrink-0 p-4 bg-card rounded-2xl border border-border hover:border-[#C9A14A]/40 transition-all hover:shadow-sm flex items-center justify-center h-32 w-48 group overflow-hidden"
                  >
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-20 max-w-[160px] object-contain group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Numbers Section — Fixed Visibility */}
        <section className="py-20 px-4 sm:px-6 bg-[#0B0B0B] text-white border-t border-white/5 relative overflow-hidden mt-12">
          <div className="absolute inset-0 bg-[radial-gradient(#C9A14A_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="text-[#C9A14A] text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
                Proven Impact
              </span>
              <h2 className="text-3xl font-heading tracking-wide text-white">Our Numbers Speak</h2>
              <div className="luxury-divider mt-4" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {numbers.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#C9A14A] mb-2 font-heading">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/70 uppercase tracking-wider font-semibold text-center">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
