import { useState, type ReactNode } from 'react';
import type { Palette, Project } from '../data/portfolio';

/**
 * Generated "key art" for thumbnails — layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }: { palette: Palette; children?: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]" />
      {children}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** Motif illustrations for each Original, built from the project's own architecture. */
export function ProjectArt({ project, className = '', motifOnly = false }: { project: Project; className?: string; motifOnly?: boolean }) {
  const [imgFailed, setImgFailed] = useState(false);
  const a = project.palette.accent;
  if (!motifOnly && project.image && !imgFailed) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        <img
          src={project.image}
          alt={project.title}
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
      </div>
    );
  }
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />
        {project.motif === 'shield' && (
          <g transform="translate(232 40)" fill="none" stroke={a} strokeOpacity="0.85">
            <path d="M58 0 L116 22 V78 C116 120 90 146 58 160 C26 146 0 120 0 78 V22 Z" strokeWidth="2" />
            <path d="M58 16 L102 33 V78 C102 111 82 132 58 144 C34 132 14 111 14 78 V33 Z" strokeWidth="1" strokeOpacity="0.4" />
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="30" x2={i % 2 ? 72 : 86} y1={56 + i * 14} y2={56 + i * 14} strokeWidth="3" strokeLinecap="round" strokeOpacity={0.35 + i * 0.1} />
            ))}
            <path d="M40 124 l12 12 l26 -28" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {project.motif === 'flow' && (
          <g fill="none" stroke={a}>
            <rect x="200" y="56" width="150" height="94" rx="12" strokeWidth="2" strokeOpacity="0.85" />
            <rect x="214" y="72" width="28" height="20" rx="4" strokeOpacity="0.7" />
            <line x1="214" x2="330" y1="124" y2="124" strokeWidth="3" strokeOpacity="0.4" strokeDasharray="18 8" />
            <g transform="translate(176 196)" fontFamily="Inter" fontSize="10" fill={a} stroke="none" letterSpacing="2">
              <circle cx="16" cy="16" r="16" fill="none" stroke={a} strokeWidth="2" />
              <path d="M34 16 h46" stroke={a} strokeWidth="2" />
              <circle cx="96" cy="16" r="16" fill="none" stroke={a} strokeWidth="2" strokeOpacity="0.8" />
              <path d="M112 8 l38 -22 M112 24 l38 22" stroke={a} strokeWidth="2" strokeOpacity="0.6" />
              <circle cx="166" cy="-18" r="10" fill={a} fillOpacity="0.8" />
              <circle cx="166" cy="50" r="10" fill="none" stroke={a} strokeWidth="2" strokeOpacity="0.5" />
            </g>
          </g>
        )}
        {project.motif === 'tenants' && (
          <g fill="none" stroke={a}>
            {/* Workforce Analytics & Attrition Chart Motif */}
            <g transform="translate(194 48)">
              {/* Dashboard scorecard outline */}
              <rect x="0" y="0" width="160" height="116" rx="12" strokeWidth="2" strokeOpacity="0.85" />
              {/* Header metrics */}
              <line x1="16" y1="20" x2="68" y2="20" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.9" />
              <line x1="78" y1="20" x2="114" y2="20" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" />
              {/* Analytics bar columns */}
              <rect x="18" y="58" width="18" height="42" rx="3" fill={a} fillOpacity="0.35" strokeWidth="1.5" strokeOpacity="0.8" />
              <rect x="44" y="42" width="18" height="58" rx="3" fill={a} fillOpacity="0.75" strokeWidth="1.5" strokeOpacity="0.9" />
              <rect x="70" y="68" width="18" height="32" rx="3" fill={a} fillOpacity="0.25" strokeWidth="1.5" strokeOpacity="0.6" />
              <rect x="96" y="50" width="18" height="50" rx="3" fill={a} fillOpacity="0.55" strokeWidth="1.5" strokeOpacity="0.8" />
              <rect x="122" y="34" width="18" height="66" rx="3" fill={a} fillOpacity="0.85" strokeWidth="1.5" strokeOpacity="0.95" />
              {/* Trendline overlay with peak dot */}
              <path d="M27 52 Q 53 32, 79 62 T 131 28" strokeWidth="2.5" strokeLinecap="round" stroke={a} />
              <circle cx="131" cy="28" r="4" fill={a} />
            </g>
            {/* Cohort retention nodes below */}
            <g transform="translate(176 196)" fill="none" stroke={a}>
              <circle cx="16" cy="16" r="14" strokeWidth="2" strokeOpacity="0.8" />
              <path d="M11 16 h10 M16 11 v10" strokeWidth="2" strokeLinecap="round" />
              <path d="M30 16 h40" strokeWidth="2" strokeOpacity="0.5" />
              <circle cx="86" cy="16" r="14" strokeWidth="2" strokeOpacity="0.8" />
              <path d="M100 16 h40" strokeWidth="2" strokeOpacity="0.5" />
              <circle cx="156" cy="16" r="14" strokeWidth="2" strokeOpacity="0.8" />
            </g>
          </g>
        )}
      </svg>
    </PosterBackdrop>
  );
}

/** Small fictional platform mark used in the nav and on cards. */
export function SeriesMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 24 32" className="h-[1.1em] w-auto" aria-hidden>
        <path d="M6 6 h8 c3.2 0 5 1.8 5 4.8 c0 3 -1.8 4.8 -5 4.8 H6 v10 M14 15.6 l6 10.4" fill="none" stroke="#e5132b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.36em] text-mist">SERIES</span>
    </span>
  );
}
