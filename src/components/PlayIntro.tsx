import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { introSlides, profile } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE } from './fx';

const SLIDE_MS = 3600;

/**
 * "▶ Play Intro": darken → zoom into the portrait → a full-screen highlight reel
 * built only from resume facts + synced Video Presenter of Rayaan speaking.
 */
export default function PlayIntro({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const reduced = useReducedMotionPref();
  const [phase, setPhase] = useState<'zoom' | 'reel' | 'end'>(reduced ? 'reel' : 'zoom');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    if (phase !== 'zoom') return;
    const t = window.setTimeout(() => setPhase('reel'), 1700);
    return () => clearTimeout(t);
  }, [phase]);

  const next = useCallback(() => {
    setIndex((i) => {
      if (i >= introSlides.length - 1) {
        setPhase('end');
        return i;
      }
      return i + 1;
    });
    progress.set(0);
  }, [progress]);
  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
    progress.set(0);
  }, [progress]);

  // one clock drives both the active progress bar and auto-advance, so pause is exact
  useEffect(() => {
    if (phase !== 'reel' || paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const v = progress.get() + (now - last) / SLIDE_MS;
      last = now;
      if (v >= 1) {
        next();
        return;
      }
      progress.set(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, paused, index, next, progress]);

  useEffect(() => {
    if (phase !== 'end') return;
    const t = window.setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [phase, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, next, prev]);

  const slide = introSlides[index];

  return (
    <motion.div
      className="fixed inset-0 z-[130] overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
      role="dialog"
      aria-modal="true"
      aria-label="Intro highlight reel"
    >
      {/* Zoom into the portrait */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center"
        initial={{ scale: 1, opacity: 1 }}
        animate={phase === 'zoom' ? { scale: [1, 1.08, 2.6], opacity: [0.9, 1, 0] } : { opacity: 0.1, scale: 1.25, filter: 'blur(4px)' }}
        transition={{ duration: phase === 'zoom' ? 1.7 : 1.2, ease: [0.7, 0, 0.2, 1], times: phase === 'zoom' ? [0, 0.3, 1] : undefined }}
        style={{ transformOrigin: '50% 30%' }}
      >
        <img
          src={profile.portrait.src}
          alt=""
          className="h-[82vh] max-h-[640px] w-auto max-w-none object-contain [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(120,10,25,0.35),transparent_70%)]" />

      {/* progress bars */}
      {phase !== 'zoom' && (
        <div className="absolute inset-x-0 top-0 z-20 flex gap-1.5 px-4 pt-4 sm:px-10 sm:pt-6">
          {introSlides.map((s, i) => (
            <div key={s.kicker} className="h-[3px] flex-1 overflow-hidden rounded bg-white/15">
              <motion.div
                className="h-full origin-left bg-bone"
                style={{ scaleX: i === index && phase === 'reel' ? progress : i < index || phase === 'end' ? 1 : 0 }}
              />
            </div>
          ))}
        </div>
      )}

      {/* reel text content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {phase === 'reel' && (
            <motion.div
              key={index}
              className="max-w-4xl"
              initial={{ opacity: 0, scale: 1.06, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.5em] text-crimson-2 sm:text-xs">
                Episode {String(index + 1).padStart(2, '0')} · {slide.kicker}
              </p>
              <h2 className="font-display leading-[0.88] text-bone" style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)' }}>
                {slide.title}
              </h2>
              <div className="mt-6 space-y-2">
                {slide.lines.map((l, i) => (
                  <motion.p
                    key={l}
                    className="text-base text-bone/80 sm:text-xl"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.15, duration: 0.6, ease: EASE }}
                  >
                    {l}
                  </motion.p>
                ))}
              </div>
              {slide.chips && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {slide.chips.map((c, i) => (
                    <motion.span
                      key={c}
                      className="glass rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-bone"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.06 }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
          {phase === 'end' && (
            <motion.div key="end" initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.2em' }} transition={{ duration: 1.2, ease: EASE }}>
              <p className="font-display text-5xl text-bone sm:text-7xl">NOW STREAMING</p>
              <p className="mt-3 text-xs font-semibold tracking-[0.4em] text-mist">{profile.displayName.toUpperCase()}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Video Presenter (Speaking Video Section) */}
      {phase === 'reel' && (
        <VideoPresenter
          videoSrc={profile.introVideo}
          paused={paused}
          onTogglePause={() => setPaused((p) => !p)}
        />
      )}

      {/* tap zones (mobile-friendly) */}
      {phase === 'reel' && (
        <>
          <button type="button" aria-label="Previous highlight" className="absolute inset-y-0 left-0 z-[5] w-1/4" onClick={prev} />
          <button type="button" aria-label="Next highlight" data-cursor="play" className="absolute inset-y-0 right-0 z-[5] w-1/4" onClick={next} />
        </>
      )}

      {/* controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-8">
        <div className="flex items-center gap-2">
          {phase === 'reel' && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Resume' : 'Pause'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-bone transition hover:bg-white/10"
            >
              {paused ? '▶' : '❚❚'}
            </button>
          )}
          <span className="hidden text-[11px] tracking-[0.2em] text-smoke sm:block">SPACE · ← → · ESC</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          data-cursor="close"
          className="rounded-full bg-bone px-5 py-2.5 text-xs font-bold tracking-[0.18em] text-ink transition hover:bg-white"
        >
          BACK TO BROWSE
        </button>
      </div>
    </motion.div>
  );
}

function VideoPresenter({
  videoSrc,
  paused,
  onTogglePause,
}: {
  videoSrc?: string;
  paused: boolean;
  onTogglePause: () => void;
}) {
  const [muted, setMuted] = useState(true);
  const [spotlight, setSpotlight] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (paused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
        /* browser autoplay policy fallback */
      });
    }
  }, [paused]);

  if (!videoSrc) return null;

  if (minimized) {
    return (
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setMinimized(false)}
        className="fixed bottom-24 right-4 sm:right-8 z-30 flex items-center gap-2.5 rounded-full bg-black/80 px-4 py-2 ring-1 ring-white/25 backdrop-blur-md shadow-xl hover:ring-crimson-2 transition text-xs text-bone"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-2 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-crimson-2"></span>
        </span>
        <span className="font-semibold">Show Video Intro</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed z-30 transition-all duration-500 ${
        spotlight
          ? 'inset-x-4 top-16 bottom-28 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[680px] sm:h-[480px] rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)]'
          : 'bottom-24 right-4 sm:right-8 w-60 sm:w-80 md:w-88 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
      } overflow-hidden bg-ink-2 ring-1 ring-white/20 backdrop-blur-xl flex flex-col`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/60 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-2 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-2"></span>
          </span>
          <span className="font-bold tracking-wider text-[11px] text-bone">RAYAAN ALI • INTRO</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            title={muted ? 'Unmute' : 'Mute'}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-bone text-xs transition"
          >
            {muted ? '🔇' : '🔊'}
          </button>
          <button
            type="button"
            onClick={() => setSpotlight((s) => !s)}
            title={spotlight ? 'Picture-in-Picture' : 'Spotlight View'}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-bone text-xs transition"
          >
            {spotlight ? '🗗' : '⛶'}
          </button>
          <button
            type="button"
            onClick={() => setMinimized(true)}
            title="Minimize"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-bone text-xs transition"
          >
            —
          </button>
        </div>
      </div>

      {/* Video / Placeholder Body */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[160px] sm:min-h-[200px]">
        {!hasError ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted={muted}
            playsInline
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          /* High-Tech Video Slot Placeholder */
          <div className="relative flex h-full w-full flex-col items-center justify-center p-4 text-center">
            <div className="relative mb-2">
              <img
                src={profile.portrait.src}
                alt={profile.fullName}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover object-top ring-2 ring-crimson-2/60 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-crimson-2 text-[10px] text-white font-bold">
                ▶
              </span>
            </div>
            <p className="text-xs font-semibold text-bone">Video Intro Slot Ready</p>
            <p className="mt-1 text-[11px] text-mist leading-snug max-w-xs">
              Save your speaking video to <code className="text-bone font-mono">public/assets/intro-video.mp4</code>
            </p>
            <div className="mt-2.5 flex items-center gap-1">
              {[0.4, 0.9, 0.6, 1, 0.5, 0.8, 0.3].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [h, 1.2, h] }}
                  transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-3 w-0.5 rounded-full bg-crimson-2"
                />
              ))}
            </div>
          </div>
        )}

        {/* Unmute quick prompt overlay */}
        {!hasError && muted && (
          <button
            type="button"
            onClick={() => setMuted(false)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/80 px-3.5 py-1 text-[11px] font-bold text-bone ring-1 ring-white/30 backdrop-blur hover:bg-black transition"
          >
            <span>🔊</span> Tap to Unmute
          </button>
        )}
      </div>
    </motion.div>
  );
}
