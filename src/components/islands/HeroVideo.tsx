/** @jsxImportSource preact */
import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
  src: string;
}

/**
 * HeroVideo — scroll-scrubbed video on desktop, autoplay on mobile.
 *
 * IMPORTANT: always renders BOTH <video> and <canvas> in the same JSX
 * so SSR and client hydration produce the same DOM tree. Visibility is
 * toggled with CSS, not conditional rendering.
 */
export default function HeroVideo({ src }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Detect viewport + motion prefs AFTER mount (avoids SSR mismatch).
  useEffect(() => {
    const mqlDesk = window.matchMedia('(min-width: 768px)');
    const mqlRed = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setIsDesktop(mqlDesk.matches);
      setReduceMotion(mqlRed.matches);
    };
    sync();
    mqlDesk.addEventListener('change', sync);
    mqlRed.addEventListener('change', sync);
    return () => {
      mqlDesk.removeEventListener('change', sync);
      mqlRed.removeEventListener('change', sync);
    };
  }, []);

  // Load video metadata once.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.src = src;
    v.load();

    const onLoaded = () => {
      setReady(true);
      if (isDesktop && !reduceMotion) v.currentTime = 0;
    };
    v.addEventListener('loadedmetadata', onLoaded);
    return () => v.removeEventListener('loadedmetadata', onLoaded);
  }, [src]);

  // Desktop: scroll-driven currentTime.
  useEffect(() => {
    if (!isDesktop || reduceMotion) return;
    const v = videoRef.current;
    const canvas = canvasRef.current;
    const section = document.getElementById('hero');
    if (!v || !canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    onResize();
    window.addEventListener('resize', onResize);

    const draw = () => {
      if (v.readyState >= 2 && canvas.width && canvas.height && v.videoWidth > 0) {
        const vAR = v.videoWidth / v.videoHeight;
        const cAR = canvas.width / canvas.height;
        let dw = canvas.width, dh = canvas.height, dx = 0, dy = 0;
        if (vAR > cAR) {
          dh = canvas.height;
          dw = dh * vAR;
          dx = (canvas.width - dw) / 2;
        } else {
          dw = canvas.width;
          dh = dw / vAR;
          dy = (canvas.height - dh) / 2;
        }
        ctx.drawImage(v, dx, dy, dw, dh);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      // Guard: duration may still be NaN/0/Infinity right after load.
      if (!isFinite(v.duration) || v.duration <= 0) return;
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), total);
      const max = Math.max(v.duration - 0.05, 0);
      const t = (scrolled / total) * max;
      if (isFinite(t)) v.currentTime = t;
    };

    draw();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, isDesktop, reduceMotion]);

  // Mobile: autoplay muted loop, pause when offscreen.
  useEffect(() => {
    if (isDesktop || reduceMotion) return;
    const v = videoRef.current;
    if (!v) return;
    v.loop = true;
    const play = () => v.play().catch(() => {});
    const pause = () => v.pause();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? play() : pause())),
      { threshold: 0.1 },
    );
    io.observe(v);
    play();
    return () => io.disconnect();
  }, [ready, isDesktop, reduceMotion]);

  // Always render BOTH nodes — visibility is toggled via CSS.
  return (
    <>
      <canvas
        ref={canvasRef}
        class={`absolute inset-0 w-full h-full object-cover ${
          isDesktop && !reduceMotion ? '' : 'hidden'
        }`}
        aria-label="HERRERA & CAMPO lookbook"
      />
      <video
        ref={videoRef}
        class={`absolute inset-0 w-full h-full object-cover ${
          isDesktop && !reduceMotion ? 'opacity-0 pointer-events-none' : ''
        }`}
        muted
        playsInline
        preload="metadata"
        aria-hidden={isDesktop && !reduceMotion ? 'true' : 'false'}
      />
    </>
  );
}