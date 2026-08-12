import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera } from 'lucide-react';

const photos = [
  'IMG_4056.webp', 'IMG_4058.webp', 'IMG_4059.webp', 'IMG_4060.webp',
  'IMG_4061.webp', 'IMG_4062.webp', 'IMG_4063.webp', 'IMG_4064.webp',
  'IMG_4066.webp', 'IMG_4067.webp', 'IMG_6798.webp', 'IMG_6801.webp',
  'IMG_6802.webp', 'IMG_6807.webp',
];

export function Photography() {
  return (
    <>
      <SEO
        title="Photography | Irtiqa Marketing"
        description="Explore Irtiqa Marketing's photography work, crafted for brands, products, spaces, people, and social storytelling."
        canonical="/photography"
        keywords="Irtiqa photography, brand photography, product photography, commercial photography, Lucknow photography"
      />

      <div className="bg-background pt-24 pb-20 overflow-hidden text-foreground">
        <section className="py-16 sm:py-24 px-4 sm:px-6 text-center relative">
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C9A14A_0.5px,transparent_0.5px)] [background-size:24px_24px]" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <Camera className="w-4 h-4 text-[#C9A14A]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold">Visual Stories</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading tracking-wide leading-tight mb-6">
              Photography
            </h1>
            <div className="luxury-divider" />
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed mt-6">
              A curated collection of visual work created to make brands, products, people, and places impossible to ignore.
            </p>
          </motion.div>
        </section>

        <section className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6 [column-fill:_balance]">
            {photos.map((photo, index) => (
              <motion.figure
                key={photo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.03, 0.18) }}
                className="mb-5 sm:mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card group shadow-sm"
              >
                <img
                  src={`/photography/${photo}`}
                  alt={`Irtiqa Marketing photography ${index + 1}`}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  className="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </motion.figure>
            ))}
          </div>
        </section>

        <section className="px-4 sm:px-6 pt-20 sm:pt-28">
          <div className="max-w-5xl mx-auto rounded-3xl bg-[#0B0B0B] text-white border border-white/10 p-8 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#C9A14A_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[#C9A14A] text-xs uppercase tracking-[0.3em] font-semibold">Need visuals for your brand?</span>
              <h2 className="text-3xl sm:text-5xl font-heading mt-4 mb-5">Let’s create something worth remembering.</h2>
              <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-body mb-8">
                From product shoots to social-first content, we can plan and produce photography around your brand goals.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-black rounded-full inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold"
                >
                  Discuss a Shoot
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
