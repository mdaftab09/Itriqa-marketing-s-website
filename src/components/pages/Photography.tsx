import { SEO } from '../SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, ChevronDown, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  getPhotographyPhotos,
  getPhotographyPublicUrl,
  PHOTOGRAPHY_CATEGORIES,
  type PhotographyPhoto,
  type PhotographyCategory,
} from '../../lib/supabase';

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const PREVIEW_LIMIT = 4;

export function Photography() {
  const [managedPhotos, setManagedPhotos] = useState<PhotographyPhoto[]>([]);
  const [activeCategory, setActiveCategory] = useState<PhotographyCategory | ''>('');
  const [viewingCategory, setViewingCategory] = useState<PhotographyCategory | null>(null);

  useEffect(() => {
    let active = true;

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    if (supabaseUrl) {
      const origin = new URL(supabaseUrl).origin;
      if (!document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = origin;
        document.head.appendChild(preconnect);
      }
    }

    getPhotographyPhotos().then((data) => {
      if (active) setManagedPhotos(data);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!viewingCategory) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setViewingCategory(null);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [viewingCategory]);

  const groupedPhotos = useMemo(
    () =>
      PHOTOGRAPHY_CATEGORIES.map((category) => ({
        category,
        photos: managedPhotos.filter((photo) => photo.category === category),
      })).filter((group) => group.photos.length > 0),
    [managedPhotos],
  );

  const viewingPhotos = viewingCategory
    ? managedPhotos.filter((photo) => photo.category === viewingCategory)
    : [];

  const categoryCounts = useMemo(
    () =>
      PHOTOGRAPHY_CATEGORIES.reduce<Record<string, number>>((counts, category) => {
        counts[category] = managedPhotos.filter((photo) => photo.category === category).length;
        return counts;
      }, {}),
    [managedPhotos],
  );

  const scrollToCategory = (category: PhotographyCategory) => {
    setActiveCategory(category);
    document.getElementById(slugify(category))?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <SEO
        title="Photography | Irtiqa Marketing"
        description="Explore Irtiqa Marketing's photography work across healthcare, bridal, real estate, education, fashion, beauty, hospitality, startups, ecommerce, NGOs, manufacturing, and corporate brands."
        canonical="/photography"
        keywords="Irtiqa photography, brand photography, product photography, commercial photography, bridal photography, fashion photography, corporate photography"
      />

      <div className="bg-background pt-24 pb-20 overflow-x-hidden text-foreground">
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

        {/* Segment directory: no horizontal scrolling on any breakpoint. */}
        <section className="px-4 sm:px-6 pb-14">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl border border-border bg-card/70 p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#C9A14A] font-semibold">
                    Explore the collection
                  </p>
                  <h2 className="font-body font-semibold text-base sm:text-lg mt-1">
                    Browse by industry
                  </h2>
                </div>
                <span className="hidden sm:block text-xs text-muted-foreground">
                  {groupedPhotos.length} {groupedPhotos.length === 1 ? 'segment' : 'segments'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {PHOTOGRAPHY_CATEGORIES.map((category) => {
                  const count = categoryCounts[category] || 0;
                  const selected = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => count && scrollToCategory(category)}
                      disabled={!count}
                      className={`group min-w-0 rounded-2xl border px-3.5 py-3 sm:px-4 sm:py-3.5 text-left transition-all ${
                        !count
                          ? 'border-border/60 bg-background/50 text-muted-foreground/45 cursor-not-allowed'
                          : selected
                            ? 'border-[#C9A14A]/70 bg-secondary/70 text-foreground'
                            : 'border-border bg-background hover:border-[#C9A14A]/50 hover:bg-secondary/70'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-xs sm:text-sm font-semibold">{category}</span>
                        <span
                          className={`shrink-0 text-[10px] sm:text-xs ${
                            selected ? 'text-[#C9A14A]' : 'text-muted-foreground'
                          }`}
                        >
                          {count}
                        </span>
                      </span>
                      {count > 0 && (
                        <span className="mt-1 block text-[9px] uppercase tracking-[0.16em] text-muted-foreground group-hover:text-[#C9A14A] transition-colors">
                          View segment
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="sm:hidden mt-3 relative">
                <label htmlFor="photography-segment-mobile" className="sr-only">
                  Choose photography segment
                </label>
                <select
                  id="photography-segment-mobile"
                  value={activeCategory}
                  onChange={(event) => {
                    const value = event.target.value as PhotographyCategory;
                    if (value) scrollToCategory(value);
                  }}
                  className="w-full appearance-none rounded-2xl border border-border bg-background px-4 py-3.5 pr-11 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C9A14A]/30"
                >
                  <option value="">Quick jump to a segment</option>
                  {groupedPhotos.map(({ category, photos }) => (
                    <option key={category} value={category}>
                      {category} ({photos.length})
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-20 sm:space-y-28">
            {groupedPhotos.map(({ category, photos: categoryPhotos }, categoryIndex) => {
              const sectionId = slugify(category);
              const previewPhotos = categoryPhotos.slice(0, PREVIEW_LIMIT);

              return (
                <section key={category} id={sectionId} className="scroll-mt-32">
                  <div className="flex items-end justify-between gap-4 mb-7 sm:mb-9">
                    <div>
                      <span className="text-[#C9A14A] text-[10px] sm:text-xs uppercase tracking-[0.28em] font-semibold">
                        Photography Segment {String(categoryIndex + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-heading mt-2">{category}</h2>
                    </div>
                    <span className="hidden sm:block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {categoryPhotos.length} {categoryPhotos.length === 1 ? 'image' : 'images'}
                    </span>
                  </div>

                  {/* Showcase images preserve their native composition. No object-cover cropping. */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-start">
                    {previewPhotos.map((photo, index) => {
                      const url = getPhotographyPublicUrl(photo.storage_path);

                      return (
                        <motion.figure
                          key={photo.id}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '0px 0px 160px 0px' }}
                          transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.12) }}
                          className="overflow-hidden rounded-2xl border border-border bg-card group shadow-sm"
                        >
                          <img
                            src={url || ''}
                            alt={photo.alt_text || `${category} photography by Irtiqa Marketing`}
                            loading={categoryIndex === 0 && index < 2 ? 'eager' : 'lazy'}
                            decoding="async"
                            fetchPriority={categoryIndex === 0 && index === 0 ? 'high' : 'auto'}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="block w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.018]"
                          />
                        </motion.figure>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setViewingCategory(category)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 bg-card px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold hover:border-[#C9A14A] hover:text-[#C9A14A] transition-colors"
                    >
                      View all {categoryPhotos.length} {categoryPhotos.length === 1 ? 'photo' : 'photos'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {categoryPhotos.length > PREVIEW_LIMIT
                        ? `${categoryPhotos.length - PREVIEW_LIMIT} more in the collection`
                        : 'Full collection available'}
                    </span>
                  </div>
                </section>
              );
            })}

            {managedPhotos.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">
                <Camera className="w-10 h-10 mx-auto mb-4 opacity-40" />
                <p className="text-sm uppercase tracking-[0.2em]">No photography uploaded yet.</p>
              </div>
            )}
          </div>
        </section>

        <section className="px-4 sm:px-6 pt-20 sm:pt-28">
          <div className="max-w-5xl mx-auto rounded-3xl bg-[#0B0B0B] text-white border border-white/10 p-8 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#C9A14A_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[#C9A14A] text-xs uppercase tracking-[0.3em] font-semibold">
                Need visuals for your brand?
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading mt-4 mb-5">
                Let’s create something worth remembering.
              </h2>
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

      <AnimatePresence>
        {viewingCategory && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm p-3 sm:p-8 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setViewingCategory(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              className="max-w-7xl mx-auto min-h-full rounded-3xl bg-background border border-white/10 shadow-2xl p-4 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 mb-7">
                <div>
                  <span className="text-[#C9A14A] text-[10px] sm:text-xs uppercase tracking-[0.28em] font-semibold">
                    Photography collection
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading mt-2">{viewingCategory}</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    {viewingPhotos.length} {viewingPhotos.length === 1 ? 'image' : 'images'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingCategory(null)}
                  className="shrink-0 rounded-full border border-border bg-card p-3 hover:border-[#C9A14A] transition-colors"
                  aria-label="Close gallery"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full-gallery view also preserves every photograph's original aspect ratio. */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 [column-fill:_balance]">
                {viewingPhotos.map((photo) => {
                  const url = getPhotographyPublicUrl(photo.storage_path);

                  return (
                    <figure
                      key={photo.id}
                      className="mb-4 sm:mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card"
                    >
                      <img
                        src={url || ''}
                        alt={photo.alt_text || `${viewingCategory} photography by Irtiqa Marketing`}
                        loading="lazy"
                        decoding="async"
                        className="block w-full h-auto object-contain"
                      />
                    </figure>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
