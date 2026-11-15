import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';
import { EASE, Tilt } from './fx';
import { ProjectArt } from './Poster';

export default function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.article
      className="w-[85vw] shrink-0 snap-start sm:w-[60vw] lg:w-[44vw] xl:w-[38vw]"
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px -10% 0px 0px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
    >
      <Tilt max={5} className="group h-full rounded-2xl">
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
          className="focus-ring relative aspect-[4/5] min-h-[480px] overflow-hidden rounded-2xl ring-1 ring-white/10 transition duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] group-hover:ring-white/25 sm:min-h-[520px] lg:aspect-auto lg:h-[72vh] lg:min-h-[560px] xl:h-[75vh]"
        >
          <motion.div layoutId={`art-${project.id}`} className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-cine)] group-hover:scale-[1.07]">
              <ProjectArt project={project} />
            </div>
          </motion.div>

          {/* Top badges */}
          <div className="absolute left-5 top-5 z-20 flex items-center gap-2 sm:left-6 sm:top-6">
            <span className="font-display text-lg leading-none text-crimson-2 sm:text-xl">R</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-bone/90">ORIGINAL</span>
          </div>
          <span className="absolute right-5 top-5 z-20 rounded border border-white/30 bg-black/50 px-2.5 py-0.5 text-[10px] font-bold text-bone backdrop-blur sm:right-6 sm:top-6">
            {project.year}
          </span>

          {/* Bottom text block with smooth gradient backdrop */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-5 pt-16 sm:p-6 sm:pt-20 bg-gradient-to-t from-ink via-ink/90 via-65% to-transparent">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-crimson-2 sm:text-[11px]">
              {project.genre}
            </p>
            <motion.h3
              layoutId={`title-${project.id}`}
              className="font-display text-[clamp(1.3rem,2vw,1.95rem)] leading-[0.98] tracking-wide text-bone line-clamp-2"
            >
              {project.title}
            </motion.h3>
            <p className="mt-2 text-xs leading-relaxed text-bone/75 sm:text-[13px] line-clamp-2">
              {project.logline}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((t) => (
                <span key={t} className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-bone backdrop-blur sm:text-[11px]">
                  {t}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-mist">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <span className="flex min-h-10 items-center gap-2 rounded-md bg-bone px-4 text-xs font-bold text-ink transition group-hover:bg-white sm:text-sm">
                ▶ View Project
              </span>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  onClick={(e) => e.stopPropagation()}
                  className="flex min-h-10 items-center gap-1.5 rounded-md border border-white/20 bg-black/40 px-3 text-xs font-semibold text-bone backdrop-blur transition hover:border-bone hover:bg-white/10 sm:text-sm"
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
