/** @jsxImportSource preact */
import { useEffect, useRef, useState } from 'preact/hooks';
import type { Product, Size } from '~/data/products';

interface Props {
  product: Product;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

/**
 * ProductCard — still image, hover-spin video, size selector, sold-out UI.
 * Sold-out sizes show "Avisarme" trigger (toast) instead of an add-to-cart action.
 */
export default function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [openSize, setOpenSize] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // On hover → play. On leave → pause + reset.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered]);

  const handleAdd = () => {
    if (!selectedSize) {
      setOpenSize(true);
      return;
    }
    window.dispatchEvent(
      new CustomEvent('cart:add', { detail: { productId: product.id, size: selectedSize } }),
    );
    setOpenSize(false);
  };

  const handleNotify = (size: Size) => {
    // We don't have a real email pipeline — log + dispatch toast event.
    window.dispatchEvent(
      new CustomEvent('toast:show', {
        detail: { message: `Te avisamos cuando vuelva "${product.name}" en talla ${size}.` },
      }),
    );
  };

  return (
    <article class="flex flex-col">
      <div
        class="relative aspect-square overflow-hidden bg-ink/5 group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusIn={() => setHovered(true)}
        onFocusOut={() => setHovered(false)}
      >
        <img
          src={product.stillUrl}
          alt={`${product.name} — ${product.caption}`}
          loading="lazy"
          class={`w-full h-full object-cover transition-opacity duration-500 ${
            hovered && product.spinVideoUrl ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {product.spinVideoUrl ? (
          <video
            ref={videoRef}
            src={product.spinVideoUrl}
            muted
            loop
            playsinline
            preload="metadata"
            data-hover-spin
            class={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={!hovered}
          />
        ) : null}
      </div>

      <div class="mt-5 md:mt-6 flex-1 flex flex-col">
        <div class="flex items-start justify-between gap-4 mb-2">
          <h3 class="font-display text-2xl md:text-3xl leading-tight">{product.name}</h3>
          <p class="font-display text-xl md:text-2xl text-ink whitespace-nowrap">{fmt(product.price)}</p>
        </div>
        <p class="font-body text-ink-secondary text-sm md:text-base mb-5 md:mb-6 leading-relaxed">
          {product.caption}
        </p>

        {/* Size pills */}
        <div class="flex flex-wrap gap-2 mb-5 md:mb-6">
          {product.sizes.map((s) => {
            const isSoldOut = product.soldOutSizes.includes(s);
            const isSelected = selectedSize === s;
            return (
              <button
                key={s}
                type="button"
                disabled={isSoldOut}
                onClick={() => {
                  if (isSoldOut) {
                    handleNotify(s);
                    return;
                  }
                  setSelectedSize(isSelected ? null : s);
                }}
                class={`px-3 py-2 border font-utility text-xs transition-colors ${
                  isSoldOut
                    ? 'border-ink/15 text-ink/30 line-through cursor-not-allowed hover:border-ink/15'
                    : isSelected
                      ? 'border-ink bg-ink text-cream'
                      : 'border-ink/30 text-ink hover:border-ink'
                }`}
                aria-pressed={isSelected}
                aria-label={isSoldOut ? `Talla ${s} agotada — avisarme` : `Seleccionar talla ${s}`}
              >
                {s}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleAdd}
          class={`w-full py-4 font-utility transition-colors ${
            openSize && !selectedSize
              ? 'bg-accent text-cream'
              : 'bg-ink text-cream hover:bg-accent'
          }`}
        >
          {openSize && !selectedSize ? 'Elegí una talla primero' : 'Agregar a la bolsa'}
        </button>
      </div>
    </article>
  );
}