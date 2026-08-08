/** @jsxImportSource preact */
import { useEffect, useState } from 'preact/hooks';

interface ToastEventDetail {
  message: string;
}

/**
 * Toast — listens for `toast:show` CustomEvents and renders a brief message
 * that auto-dismisses after 4s. Used by ProductCard for the "Avisarme" UX
 * when a user clicks a sold-out size.
 */
export default function Toast() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | null = null;
    const onShow = (e: Event) => {
      const detail = (e as CustomEvent).detail as ToastEventDetail;
      if (!detail?.message) return;
      setMessage(detail.message);
      setVisible(true);
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => setVisible(false), 4000);
    };
    window.addEventListener('toast:show', onShow as EventListener);
    return () => {
      window.removeEventListener('toast:show', onShow as EventListener);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      class={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message ? (
        <div class="bg-ink text-cream px-6 py-3 md:px-8 md:py-4 font-utility text-sm md:text-base shadow-2xl max-w-sm md:max-w-md">
          {message}
        </div>
      ) : null}
    </div>
  );
}