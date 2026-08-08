/** @jsxImportSource preact */
import { useEffect, useState } from 'preact/hooks';

/**
 * CountdownTimer — ticks down to the next Friday at 20:00 hrs Mexico City.
 * Renders days / hours / minutes / seconds with tabular numerals.
 */
export default function CountdownTimer() {
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Target: next Friday at 20:00 in America/Mexico_City (UTC-6, no DST since 2022).
  const target = (() => {
    const d = new Date();
    d.setHours(20, 0, 0, 0);
    // 5 = Friday
    const day = d.getDay();
    let add = (5 - day + 7) % 7;
    if (add === 0 && d.getTime() <= Date.now()) add = 7;
    d.setDate(d.getDate() + add);
    return d.getTime();
  })();

  let days = '00', hours = '00', minutes = '00', seconds = '00';
  if (now > 0) {
    const diff = Math.max(target - now, 0);
    days = String(Math.floor(diff / 86_400_000)).padStart(2, '0');
    hours = String(Math.floor((diff % 86_400_000) / 3_600_000)).padStart(2, '0');
    minutes = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, '0');
    seconds = String(Math.floor((diff % 60_000) / 1000)).padStart(2, '0');
  }

  const Cell = ({ value, label }: { value: string; label: string }) => (
    <span class="inline-flex flex-col items-center mx-2 md:mx-3">
      <span class="font-display text-cream text-4xl md:text-7xl tabular-nums leading-none">
        {value}
      </span>
      <span class="font-utility text-cream/60 text-[0.6rem] md:text-xs mt-2">
        {label}
      </span>
    </span>
  );

  return (
    <span role="timer" aria-live="polite" aria-atomic="true">
      <Cell value={days} label="días" />
      <span class="font-display text-cream/50 text-3xl md:text-6xl" aria-hidden="true">·</span>
      <Cell value={hours} label="hrs" />
      <span class="font-display text-cream/50 text-3xl md:text-6xl" aria-hidden="true">·</span>
      <Cell value={minutes} label="min" />
      <span class="font-display text-cream/50 text-3xl md:text-6xl" aria-hidden="true">·</span>
      <Cell value={seconds} label="seg" />
    </span>
  );
}