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

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const more = projects.filter((p) => p.id !== project.id);

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
          <div className="relative h-[50vh] min-h-[320px] overflow-hidden sm:rounded-t-2xl">
            <motion.div layoutId={`art-${project.id}`} className="absolute inset-0" transition={{ duration: 0.7, ease: EASE }}>
              <ProjectArt project={project} motifOnly />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/30 to-transparent" />
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
                className="font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.92] tracking-wide text-bone line-clamp-2"
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

            <motion.div variants={block} className="mt-6 flex flex-wrap gap-3">
              {project.github && (
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
              )}
              <Magnetic>
                <a
                  href={`https://wa.me/923325011274?text=${encodeURIComponent(`Hi Rayaan, I reviewed your project "${project.title}" on your portfolio and would like to discuss it.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="flex min-h-12 items-center gap-2 rounded-md border border-[#25D366]/40 bg-[#25D366]/15 px-6 text-[15px] font-bold text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
                >
                  <span>💬</span> WhatsApp Rayaan
                </a>
              </Magnetic>
            </motion.div>

            {/* screenshots & dashboard gallery */}
            <motion.section variants={block} className="mt-10">
              <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">Dashboard Previews & Visuals</h3>
                  <p className="mt-1 text-xs text-mist">High-resolution interactive dashboards, workflows, and analytical outputs.</p>
                </div>
              </div>
              <ProjectGallery project={project} />
            </motion.section>

            {/* impact */}
            <motion.section variants={block} className="mt-12">
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">Result / Impact</h3>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
                {project.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="bg-ink p-4 sm:p-5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease: EASE }}
                  >
                    <p className="font-display text-4xl leading-none text-bone sm:text-5xl" style={{ color: i === 0 ? project.palette.accent : undefined }}>
                      {m.value}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-mist">{m.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Business Outcomes & Value Delivered */}
            {project.outcomes && project.outcomes.length > 0 && (
              <motion.section variants={block} className="mt-12 rounded-2xl bg-gradient-to-br from-ink via-ink-2 to-black p-6 ring-1 ring-white/10 sm:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#46e3a8]">Business Value Delivered</span>
                    <h3 className="mt-1 font-display text-2xl tracking-wide text-bone sm:text-3xl">Project Outcomes & Benefits</h3>
                  </div>
                  <span className="rounded-full border border-[#46e3a8]/30 bg-[#46e3a8]/10 px-3 py-1 text-xs font-semibold text-[#46e3a8]">
                    Key Business Benefits
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.outcomes.map((outcome, idx) => {
                    const hasColon = outcome.includes(':');
                    const heading = hasColon ? outcome.split(':')[0] : `Outcome ${idx + 1}`;
                    const body = hasColon ? outcome.substring(outcome.indexOf(':') + 1).trim() : outcome;
                    return (
                      <div key={idx} className="relative flex items-start gap-3.5 rounded-xl bg-black/40 p-5 ring-1 ring-white/10 transition hover:ring-white/25">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#46e3a8]/20 text-xs font-bold text-[#46e3a8]">
                          ✓
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-bone leading-snug">{heading.trim()}</h4>
                          <p className="mt-1.5 text-xs leading-relaxed text-bone/75">{body}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            )}

            <div className="mt-12 grid gap-10 lg:grid-cols-[3fr_2fr]">
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

            {/* more like this */}
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
                      <ProjectArt project={p} motifOnly />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mist">{p.genre}</p>
                      <p className="font-display text-3xl leading-none tracking-wide text-bone line-clamp-1">{p.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  const images = project.images && project.images.length > 0
    ? project.images
    : project.image
      ? [project.image]
      : [];

  const [activeIdx, setActiveIdx] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [fullscreen, setFullscreen] = useState(false);

  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  const currentPath = images[activeIdx];
  const isFailed = failedImages[activeIdx];

  const viewTitles = [
    'Executive Overview & Main KPI Dashboard',
    'Deep-Dive Performance & Analytical Breakdown',
    'Operational Flow & Matrix Heatmap View',
    'Statistical Distribution & Trends View',
  ];

  return (
    <div className="mt-2">
      {/* Main Image Showcase */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-ink ring-1 ring-white/10 shadow-2xl">
        {!isFailed && currentPath ? (
          <img
            src={currentPath}
            alt={`${project.title} view ${activeIdx + 1}`}
            onError={() => setFailedImages((prev) => ({ ...prev, [activeIdx]: true }))}
            className="h-full w-full object-cover object-top cursor-zoom-in transition-transform duration-500 hover:scale-[1.02]"
            onClick={() => setFullscreen(true)}
          />
        ) : (
          /* High-Tech Blueprint Placeholder */
          <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-25"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${project.palette.accent}33, transparent 70%), linear-gradient(135deg, ${project.palette.from}, ${project.palette.to})`,
              }}
            />
            {/* SVG Dashboard Mockup Wireframe */}
            <svg viewBox="0 0 400 220" className="h-32 sm:h-40 w-auto text-white/20 mb-3" fill="none" stroke="currentColor">
              <rect x="20" y="20" width="360" height="180" rx="8" strokeWidth="1.5" strokeDasharray="4 4" />
              <rect x="36" y="36" width="96" height="40" rx="4" fill="currentColor" fillOpacity="0.1" />
              <rect x="152" y="36" width="96" height="40" rx="4" fill="currentColor" fillOpacity="0.1" />
              <rect x="268" y="36" width="96" height="40" rx="4" fill="currentColor" fillOpacity="0.1" />
              <rect x="36" y="90" width="212" height="94" rx="4" fill="currentColor" fillOpacity="0.05" />
              <line x1="50" y1="160" x2="80" y2="120" stroke={project.palette.accent} strokeWidth="2" strokeOpacity="0.7" />
              <line x1="80" y1="120" x2="120" y2="140" stroke={project.palette.accent} strokeWidth="2" strokeOpacity="0.7" />
              <line x1="120" y1="140" x2="160" y2="105" stroke={project.palette.accent} strokeWidth="2" strokeOpacity="0.7" />
              <line x1="160" y1="105" x2="200" y2="130" stroke={project.palette.accent} strokeWidth="2" strokeOpacity="0.7" />
              <line x1="200" y1="130" x2="230" y2="110" stroke={project.palette.accent} strokeWidth="2" strokeOpacity="0.7" />
              <circle cx="200" cy="130" r="4" fill={project.palette.accent} />
              <rect x="268" y="90" width="96" height="94" rx="4" fill="currentColor" fillOpacity="0.05" />
              <circle cx="316" cy="137" r="28" stroke={project.palette.accent} strokeWidth="3" strokeOpacity="0.6" strokeDasharray="80 20" />
            </svg>
            <div className="relative z-10 max-w-md px-4">
              <span className="inline-block rounded-full bg-crimson-2/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-crimson-2 ring-1 ring-crimson-2/40">
                Dashboard Screenshot {activeIdx + 1} Slot Ready
              </span>
              <p className="mt-2 text-sm font-semibold text-bone">
                {viewTitles[activeIdx % viewTitles.length]}
              </p>
              <p className="mt-1 text-xs text-mist leading-relaxed">
                Add your screenshot to <code className="rounded bg-black/60 px-1.5 py-0.5 text-bone font-mono">{currentPath || `/assets/projects/${project.id}-${activeIdx + 1}.png`}</code> to showcase here.
              </p>
            </div>
          </div>
        )}

        {/* View title caption & zoom prompt */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-xs text-bone backdrop-blur-[2px]">
          <span className="font-medium tracking-wide">
            {viewTitles[activeIdx % viewTitles.length]}
          </span>
          {!isFailed && currentPath && (
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-semibold text-bone transition hover:bg-white/25"
            >
              ⛶ Zoom Fullscreen
            </button>
          )}
        </div>

        {/* Prev / Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-lg text-bone backdrop-blur-md transition hover:bg-black/90 hover:scale-110"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-lg text-bone backdrop-blur-md transition hover:bg-black/90 hover:scale-110"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="mt-3.5 flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={img + i}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`group relative aspect-video w-24 sm:w-28 shrink-0 overflow-hidden rounded-lg ring-1 transition ${
                  active
                    ? 'ring-2 ring-crimson-2 shadow-[0_0_15px_rgba(229,19,43,0.5)]'
                    : 'ring-white/15 opacity-60 hover:opacity-100 hover:ring-white/40'
                }`}
              >
                {!failedImages[i] ? (
                  <img src={img} alt="" className="h-full w-full object-cover" onError={() => setFailedImages((prev) => ({ ...prev, [i]: true }))} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-ink-2 text-[10px] font-bold text-mist">
                    View {i + 1}
                  </div>
                )}
                <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[9px] font-bold text-bone">
                  {i + 1}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {fullscreen && !isFailed && currentPath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] flex items-center justify-center bg-black/95 p-4 sm:p-10"
            onClick={() => setFullscreen(false)}
          >
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl text-bone backdrop-blur hover:bg-white/20"
            >
              ✕
            </button>
            <img
              src={currentPath}
              alt=""
              className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
