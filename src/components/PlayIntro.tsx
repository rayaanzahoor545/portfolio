import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { introSlides, profile } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE } from './fx';

const SLIDE_MS = 3600;

/**
 * "▶ Play Intro": darken → zoom into the portrait → full-screen highlight reel
 * with synchronized Video Intro Presenter Box (Picture-in-Picture) → fade back to the portfolio.
 */
export default function PlayIntro({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const reduced = useReducedMotionPref();
  const [phase, setPhase] = useState<'zoom' | 'reel' | 'end'>(reduced ? 'reel' : 'zoom');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(false);
  const [showVideoBox, setShowVideoBox] = useState(true);
  const progress = useMotionValue(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    if (phase !== 'reel' || paused || videoExpanded) return;
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
  }, [phase, paused, videoExpanded, index, next, progress]);

  // Sync video play/pause with intro state
  useEffect(() => {
    if (!videoRef.current) return;
    if (paused) {
      videoRef.current.pause();
    } else if (phase === 'reel') {
      videoRef.current.play().catch(() => {
        /* autoplay policy handles gracefully */
      });
    }
  }, [paused, phase]);

  useEffect(() => {
    if (phase !== 'end') return;
    const t = window.setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [phase, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (videoExpanded) setVideoExpanded(false);
        else onClose();
      }
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') {
        e.preventDefault();
        setPaused((p) => !p);
      }
      if (e.key.toLowerCase() === 'm') {
        setVideoMuted((m) => !m);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, next, prev, videoExpanded]);

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
      aria-label="Intro highlight reel with personal video"
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

      {/* Progress bars */}
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

      {/* Reel slides */}
      <div className={`relative z-10 flex h-full items-center justify-center px-6 text-center transition-all duration-500 ${showVideoBox && !videoExpanded ? 'lg:pr-[360px]' : ''}`}>
        <AnimatePresence mode="wait">
          {phase === 'reel' && !videoExpanded && (
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
              <h2 className="font-display leading-[0.88] text-bone" style={{ fontSize: 'clamp(2.5rem, 8vw, 7.5rem)' }}>
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

      {/* PRESENTER VIDEO INTRO BOX (Picture-in-Picture corner or expanded theater) */}
      {phase === 'reel' && showVideoBox && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`z-30 overflow-hidden rounded-2xl border border-white/20 bg-ink-2/95 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(229,19,43,0.25)] backdrop-blur-2xl transition-all ${
            videoExpanded
              ? 'fixed inset-4 sm:inset-12 md:inset-20 z-50 flex flex-col'
              : 'fixed bottom-24 right-4 sm:right-8 w-[270px] sm:w-[320px] md:w-[350px]'
          }`}
        >
          {/* Header Bar */}
          <div className="flex h-10 items-center justify-between border-b border-white/10 bg-black/60 px-3.5 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-bone">
                Rayaan · Intro Video
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setVideoExpanded((e) => !e)}
                title={videoExpanded ? 'Minimize video' : 'Expand theater mode'}
                className="flex h-6 w-6 items-center justify-center rounded text-xs text-mist hover:bg-white/10 hover:text-bone"
              >
                {videoExpanded ? '⤡' : '⤢'}
              </button>
              <button
                type="button"
                onClick={() => setShowVideoBox(false)}
                title="Hide video box"
                className="flex h-6 w-6 items-center justify-center rounded text-xs text-mist hover:bg-white/10 hover:text-bone"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Video Player Canvas */}
          <div className={`relative ${videoExpanded ? 'flex-1 bg-black' : 'aspect-video w-full bg-black'}`}>
            <video
              ref={videoRef}
              src={profile.introVideo}
              autoPlay
              playsInline
              loop
              muted={videoMuted}
              onLoadedData={() => setVideoAvailable(true)}
              onError={() => setVideoAvailable(false)}
              className="h-full w-full object-cover"
            />

            {/* Fallback view when user has not yet dropped intro.mp4 in public/assets/ */}
            {!videoAvailable && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#3d0712,#09090e)] p-4 text-center">
                <div className="relative mb-2 h-14 w-14 overflow-hidden rounded-full border border-crimson-2/50 shadow-[0_0_20px_rgba(229,19,43,0.4)]">
                  <img src={profile.portrait.src} alt="Rayaan Ali" className="h-full w-full object-cover object-top" />
                </div>
                <p className="font-display text-base tracking-wide text-bone">Personal Video Box</p>
                <p className="mt-1 text-[11px] leading-tight text-mist">
                  Drop <code className="rounded bg-white/15 px-1 py-0.5 text-bone">intro.mp4</code> in <code className="rounded bg-white/15 px-1 py-0.5 text-bone">/public/assets/</code>
                </p>
                <div className="mt-2.5 flex items-center gap-1">
                  {[40, 75, 100, 60, 90, 45, 80, 55].map((h, i) => (
                    <span
                      key={i}
                      className="inline-block w-1 rounded-full bg-crimson-2"
                      style={{
                        height: `${h * 0.16}px`,
                        animation: `pulse 1.2s infinite ease-in-out ${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Audio Toggle Overlay */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setVideoMuted((m) => !m)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold backdrop-blur transition ${
                  videoMuted
                    ? 'border border-crimson-2/80 bg-crimson/90 text-white shadow-[0_0_20px_rgba(229,19,43,0.6)] animate-pulse'
                    : 'border border-white/20 bg-black/70 text-bone hover:bg-black/90'
                }`}
              >
                <span>{videoMuted ? '🔇' : '🔊'}</span>
                <span>{videoMuted ? 'Tap to Unmute Voice' : 'Sound On'}</span>
              </button>
            </div>
          </div>

          {/* Subtitle / Topic Caption below video in expanded mode */}
          {videoExpanded && (
            <div className="border-t border-white/10 bg-ink-2 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-crimson-2">Now Explaining: {slide.kicker}</p>
              <p className="font-display text-2xl text-bone">{slide.title}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Button to restore video box if user dismissed it */}
      {phase === 'reel' && !showVideoBox && (
        <button
          type="button"
          onClick={() => setShowVideoBox(true)}
          className="fixed bottom-24 right-4 sm:right-8 z-30 flex items-center gap-2 rounded-full border border-white/20 bg-ink-2/90 px-4 py-2 text-xs font-bold text-bone backdrop-blur shadow-xl hover:border-crimson-2"
        >
          <span>🔴</span> Show Video Intro
        </button>
      )}

      {/* Tap zones for slide navigation */}
      {phase === 'reel' && !videoExpanded && (
        <>
          <button type="button" aria-label="Previous highlight" className="absolute inset-y-0 left-0 z-[5] w-1/4" onClick={prev} />
          <button type="button" aria-label="Next highlight" data-cursor="play" className="absolute inset-y-0 right-0 z-[5] w-1/4" onClick={next} />
        </>
      )}

      {/* Bottom controls */}
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
          <span className="hidden text-[11px] tracking-[0.2em] text-smoke sm:block">SPACE · ← → · M (MUTE) · ESC</span>
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
