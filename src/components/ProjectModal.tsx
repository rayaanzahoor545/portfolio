import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, type Project } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE, Magnetic } from './fx';
import { ProjectArt } from './Poster';

const block = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

export default function ProjectModal({ project, onClose, onSwitch }: { project: Project; onClose: () => void; onSwitch: (p: Project) => void }) {
  useScrollLock(true);
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose, lightboxOpen]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    setActiveImgIndex(0);
  }, [project.id]);

  const more = projects.filter((p) => p.id !== project.id);
  const gallery = project.images && project.images.length > 0 ? project.images : project.image ? [project.image] : [];
  const currentImg = gallery[activeImgIndex] || project.image || '';

  return (
    <motion.div className="fixed inset-0 z-[140]" role="dialog" aria-modal="true" aria-labelledby={`title-${project.id}-modal`}>
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div ref={scroller} data-lenis-prevent className="absolute inset-0 overflow-y-auto overscroll-contain" onClick={onClose}>
        <motion.div
          className="relative mx-auto min-h-full max-w-5xl bg-ink-2 shadow-2xl sm:my-10 sm:min-h-0 sm:rounded-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
        >
          {/* billboard */}
          <div className="relative h-[50vh] min-h-[340px] overflow-hidden sm:rounded-t-2xl">
            <motion.div layoutId={`art-${project.id}`} className="absolute inset-0" transition={{ duration: 0.7, ease: EASE }}>
              <ProjectArt project={project} activeImage={currentImg} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/40 to-transparent" />
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              data-cursor="close"
              aria-label="Close project"
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-lg text-bone backdrop-blur transition hover:bg-black"
            >
              ✕
            </button>
            <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-10">
              <motion.p className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.34em] text-bone/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <span className="font-display text-xl tracking-normal text-crimson-2">R</span> ORIGINAL
              </motion.p>
              <motion.h2
                id={`title-${project.id}-modal`}
                layoutId={`title-${project.id}`}
                className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[0.92] tracking-wide text-bone"
                transition={{ duration: 0.7, ease: EASE }}
              >
                {project.title}
              </motion.h2>
            </div>
          </div>

          <motion.div className="px-5 pb-12 sm:px-10" initial="hidden" animate="show" transition={{ staggerChildren: 0.08, delayChildren: 0.25 }}>
            <motion.div variants={block} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-mist">
              <span className="font-semibold text-[#46e3a8]">{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-smoke" />
              <span>{project.genre}</span>
            </motion.div>

            <motion.p variants={block} className="mt-4 max-w-3xl text-lg leading-relaxed text-bone sm:text-xl">
              {project.logline}
            </motion.p>

            {project.github && (
              <motion.div variants={block} className="mt-6 flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="flex min-h-12 items-center gap-2 rounded-md bg-bone px-6 text-[15px] font-bold text-ink transition hover:bg-white"
                  >
                    GitHub ↗
                  </a>
                </Magnetic>
              </motion.div>
            )}

            {/* RESULT / IMPACT - perfectly aligned 4 columns, no empty 5th slot */}
            <motion.section variants={block} className="mt-12">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">Result / Impact</h3>
                <span className="text-xs text-smoke">Validated Project Metrics</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-4.5 sm:p-5 backdrop-blur-sm transition duration-300 hover:border-white/25 hover:bg-white/[0.06]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 + i * 0.06, duration: 0.5, ease: EASE }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{ background: i === 0 ? project.palette.accent : 'rgba(255,255,255,0.15)' }}
                    />
                    <p
                      className="font-display text-3xl leading-none tracking-wide text-bone sm:text-4xl"
                      style={{ color: i === 0 ? project.palette.accent : undefined }}
                    >
                      {m.value}
                    </p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-mist">
                      {m.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* MULTI-IMAGE DASHBOARD GALLERY */}
            <motion.section variants={block} className="mt-12 border-t border-white/10 pt-10">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">Dashboard Previews & Visuals</h3>
                  <p className="mt-1 text-sm text-mist">Interactive multi-page views of the analytical dashboards & data models</p>
                </div>
                {gallery.length > 0 && (
                  <span className="text-xs font-medium text-bone/70">
                    View {activeImgIndex + 1} of {gallery.length}
                  </span>
                )}
              </div>

              {gallery.length > 0 ? (
                <div className="space-y-4">
                  {/* Main Active Image Viewport */}
                  <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/15 bg-black/60 shadow-2xl">
                    <img
                      key={currentImg}
                      src={currentImg}
                      alt={`${project.title} - View ${activeImgIndex + 1}`}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-xs font-semibold text-bone backdrop-blur border border-white/20 transition hover:bg-white hover:text-ink"
                    >
                      <span>⛶</span> Fullscreen View
                    </button>
                    {gallery.length > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Previous image"
                          onClick={() => setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-bone backdrop-blur border border-white/20 transition hover:bg-bone hover:text-ink"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          aria-label="Next image"
                          onClick={() => setActiveImgIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-bone backdrop-blur border border-white/20 transition hover:bg-bone hover:text-ink"
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails Strip */}
                  {gallery.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {gallery.map((img, idx) => (
                        <button
                          key={img}
                          type="button"
                          onClick={() => setActiveImgIndex(idx)}
                          className={`group relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg border transition sm:w-36 ${
                            idx === activeImgIndex
                              ? 'border-crimson-2 ring-2 ring-crimson-2/50 scale-[1.03]'
                              : 'border-white/15 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                          <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-bold text-bone">
                            0{idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback when images have not yet been copied to folder */
                <div className="relative overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-8 text-center sm:p-12">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl text-crimson-2">
                    🖼
                  </div>
                  <h4 className="mt-4 font-display text-2xl tracking-wide text-bone">Multi-Image Gallery Ready</h4>
                  <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-mist">
                    Aap is project ke liye multiple dashboard screenshots add kar sakte hain. Screenshots ko{' '}
                    <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-bone">public/assets/projects/</code> folder mein save karein aur unke paths{' '}
                    <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-bone">portfolio.ts</code> mein list karein.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-semibold text-smoke">
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Page 1: Overview</span>
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Page 2: Risk Metrics</span>
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Page 3: Drilldown & Analysis</span>
                  </div>
                </div>
              )}
            </motion.section>

            {/* MY CONTRIBUTION, TECH STACK & KEY FEATURES */}
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <motion.section variants={block}>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">My Contribution</h3>
                <ul className="space-y-4">
                  {project.build.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-bone/85">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.palette.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.section>
              <div className="space-y-10">
                <motion.section variants={block}>
                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span key={t} className="glass rounded-full px-3 py-1.5 text-sm font-medium text-bone">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.section>
                <motion.section variants={block}>
                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">Key Features</h3>
                  <ul className="space-y-2.5">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-bone/85">
                        <span className="text-crimson-2">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.section>
              </div>
            </div>

            {/* MORE ORIGINALS */}
            <motion.section variants={block} className="mt-14 border-t border-white/10 pt-8">
              <h3 className="mb-4 font-sans text-lg font-semibold text-bone">More Originals</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {more.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    data-cursor="view"
                    onClick={() => onSwitch(p)}
                    className="group relative aspect-video overflow-hidden rounded-xl text-left ring-1 ring-white/10 transition hover:ring-white/30"
                  >
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                      <ProjectArt project={p} />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mist">{p.genre}</p>
                      <p className="font-display text-3xl leading-none tracking-wide text-bone">{p.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxOpen && currentImg && (
          <motion.div
            className="fixed inset-0 z-[160] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl text-bone backdrop-blur hover:bg-white/20"
            >
              ✕
            </button>
            <img
              src={currentImg}
              alt={project.title}
              className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
