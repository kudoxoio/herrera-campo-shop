/** @jsxImportSource preact */
import { useEffect } from 'preact/hooks';

/**
 * LenisInit — mounts a Lenis smooth-scroll instance on the window and
 * drives its RAF loop. Honors prefers-reduced-motion.
 */
export default function LenisInit() {
  useEffect(() => {
    let destroyed = false;
    let rafId: number | null = null;
    (async () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;
      const mod = await import('lenis');
      if (destroyed) return;
      const Lenis = mod.default;
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    })();
    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  return null;
}