import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';
import { EASE, Tilt } from './fx';
import { ProjectArt } from './Poster';

export default function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.article
      className="w-[84vw] shrink-0 snap-start sm:w-[62vw] lg:w-[46vw] xl:w-[42vw]"
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px -10% 0px 0px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
    >
      <Tilt max={5} className="group rounded-2xl">
        <div
          role="button"
          tabIndex={0}
          data-cursor="view"
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen();
            }
          }}
          aria-label={`Open ${project.title}`}
          className="focus-ring relative aspect-[4/5] min-h-[480px] overflow-hidden rounded-2xl ring-1 ring-white/10 transition duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] group-hover:ring-white/25 sm:aspect-auto sm:h-[540px] lg:h-[70vh] lg:min-h-[560px]"
        >
          <motion.div layoutId={`art-${project.id}`} className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-cine)] group-hover:scale-[1.07]">
              <ProjectArt project={project} motifOnly />
            </div>
          </motion.div>

          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-ink via-ink/80 to-transparent" />

          <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 ring-1 ring-white/10 backdrop-blur-md sm:left-7 sm:top-7">
            <span className="font-display text-xl leading-none text-crimson-2">R</span>
            <span className="text-[10px] font-bold tracking-[0.34em] text-bone/90">ORIGINAL</span>
          </div>
          <span className="absolute right-5 top-5 z-20 rounded-full border border-white/25 bg-black/60 px-2.5 py-1 text-[10px] font-bold text-bone backdrop-blur-md sm:right-7 sm:top-7">
            {project.year}
          </span>

          <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 [transform:translateZ(40px)]">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-mist">{project.genre}</p>
            <motion.h3
              layoutId={`title-${project.id}`}
              className="font-display text-2xl sm:text-3xl lg:text-[clamp(1.85rem,2.4vw,2.6rem)] leading-[0.94] tracking-wide text-bone line-clamp-2"
            >
              {project.title}
            </motion.h3>
            <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-bone/75 sm:text-[13px] sm:leading-relaxed max-w-lg">
              {project.logline}
            </p>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 5).map((t) => (
                <span key={t} className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-bone/90 ring-1 ring-white/10 backdrop-blur">
                  {t}
                </span>
              ))}
              {project.stack.length > 5 && (
                <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-medium text-mist">
                  +{project.stack.length - 5}
                </span>
              )}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="flex min-h-11 items-center gap-2 rounded-md bg-bone px-5 text-sm font-bold text-ink transition group-hover:bg-white shadow-md">
                ▶ View Project
              </span>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  onClick={(e) => e.stopPropagation()}
                  className="flex min-h-11 items-center gap-2 rounded-md border border-white/25 bg-black/40 px-4 text-sm font-semibold text-bone backdrop-blur transition hover:border-bone hover:bg-white/10"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
}
