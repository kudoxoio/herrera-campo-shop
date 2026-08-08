/** @jsxImportSource preact */
import { useEffect, useState, useCallback } from 'preact/hooks';
import { products, type Product, type Size } from '~/data/products';

interface CartItem {
  productId: string;
  size: Size;
  qty: number;
}

interface CareItem {
  careId: string;
  qty: number;
}

interface Props {
  /** Pulled from the global window — Astro passes cart-open dispatch via this. */
}

const CART_KEY = 'hc_cart_v1';
const CARE_KEY = 'hc_care_v1';

const fmt = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

const careProducts: Record<string, { name: string; price: number }> = {
  'aceite-castor': { name: 'Aceite de Castor', price: 280 },
  'shampoo-texana': { name: 'Shampoo para Texana', price: 320 },
  'balsamo-exoticas': { name: 'Bálsamo para Pieles Exóticas', price: 260 },
};

export default function CartDrawer(_props: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [care, setCare] = useState<CareItem[]>([]);

  // Hydrate from localStorage.
  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(CART_KEY) ?? '[]'));
      setCare(JSON.parse(localStorage.getItem(CARE_KEY) ?? '[]'));
    } catch {}
  }, []);

  // Persist on change.
  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem(CARE_KEY, JSON.stringify(care)); }, [care]);

  // Listen for open + add events.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onAdd = (e: Event) => {
      const detail = (e as CustomEvent).detail as { productId: string; size: Size };
      if (!detail?.productId) return;
      setItems((prev) => {
        const i = prev.findIndex((x) => x.productId === detail.productId && x.size === detail.size);
        if (i >= 0) {
          const copy = [...prev];
          copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
          return copy;
        }
        return [...prev, { productId: detail.productId, size: detail.size, qty: 1 }];
      });
      setOpen(true);
    };
    const onAddCare = (e: Event) => {
      const detail = (e as CustomEvent).detail as { careId: string };
      if (!detail?.careId) return;
      setCare((prev) => {
        const i = prev.findIndex((x) => x.careId === detail.careId);
        if (i >= 0) {
          const copy = [...prev];
          copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
          return copy;
        }
        return [...prev, { careId: detail.careId, qty: 1 }];
      });
      setOpen(true);
    };
    window.addEventListener('cart:open', onOpen);
    window.addEventListener('cart:add', onAdd as EventListener);
    window.addEventListener('cart:add-care', onAddCare as EventListener);
    return () => {
      window.removeEventListener('cart:open', onOpen);
      window.removeEventListener('cart:add', onAdd as EventListener);
      window.removeEventListener('cart:add-care', onAddCare as EventListener);
    };
  }, []);

  // Close on Esc.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const removeItem = useCallback((productId: string, size: Size) => {
    setItems((prev) => prev.filter((x) => !(x.productId === productId && x.size === size)));
  }, []);
  const removeCare = useCallback((careId: string) => {
    setCare((prev) => prev.filter((x) => x.careId !== careId));
  }, []);

  const productTotal = items.reduce((sum, it) => {
    const p = products.find((x) => x.id === it.productId);
    return sum + (p ? p.price * it.qty : 0);
  }, 0);
  const careTotal = care.reduce((sum, it) => {
    const c = careProducts[it.careId];
    return sum + (c ? c.price * it.qty : 0);
  }, 0);
  const total = productTotal + careTotal;
  const itemCount = items.reduce((n, it) => n + it.qty, 0) + care.reduce((n, it) => n + it.qty, 0);

  return (
    <>
      {/* Floating cart trigger — shows count */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        class={`fixed bottom-6 right-6 z-40 bg-ink text-cream rounded-full px-5 py-3 shadow-2xl font-utility hover:bg-accent transition-colors ${
          itemCount > 0 ? 'opacity-100' : 'opacity-90'
        }`}
        aria-label={`Abrir bolsa${itemCount > 0 ? ` (${itemCount})` : ''}`}
      >
        Bolsa{itemCount > 0 ? ` · ${itemCount}` : ''}
      </button>

      {/* Backdrop + drawer */}
      {open ? (
        <div
          class="fixed inset-0 z-50 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <aside class="absolute top-0 right-0 h-full w-full max-w-md bg-cream text-ink flex flex-col shadow-2xl">
            <header class="flex items-center justify-between p-6 border-b border-ink/20">
              <h2 id="cart-title" class="font-display text-2xl">Tu bolsa</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                class="font-utility text-ink hover:text-accent transition-colors"
                aria-label="Cerrar bolsa"
              >
                Cerrar
              </button>
            </header>

            <div class="flex-1 overflow-y-auto p-6">
              {items.length === 0 && care.length === 0 ? (
                <p class="font-body text-ink-secondary text-center py-12">
                  Tu bolsa está vacía. Aún no elegiste tu primer pieza.
                </p>
              ) : (
                <ul class="space-y-4">
                  {items.map((it) => {
                    const p = products.find((x) => x.id === it.productId);
                    if (!p) return null;
                    return (
                      <li key={`${it.productId}-${it.size}`} class="flex gap-4 border-b border-ink/10 pb-4">
                        <img src={p.stillUrl} alt="" class="w-16 h-16 object-cover bg-ink/5" />
                        <div class="flex-1">
                          <h3 class="font-display text-lg leading-tight">{p.name}</h3>
                          <p class="font-utility text-ink-secondary text-xs mt-1">Talla {it.size} · Cant. {it.qty}</p>
                          <p class="font-display text-base mt-1">{fmt(p.price * it.qty)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(it.productId, it.size)}
                          class="self-start font-utility text-ink-secondary text-xs hover:text-accent transition-colors"
                          aria-label={`Quitar ${p.name} talla ${it.size}`}
                        >
                          Quitar
                        </button>
                      </li>
                    );
                  })}
                  {care.map((it) => {
                    const c = careProducts[it.careId];
                    if (!c) return null;
                    return (
                      <li key={it.careId} class="flex gap-4 border-b border-ink/10 pb-4">
                        <div class="w-16 h-16 bg-ink/5 flex items-center justify-center font-display text-2xl">+</div>
                        <div class="flex-1">
                          <h3 class="font-display text-lg leading-tight">{c.name}</h3>
                          <p class="font-utility text-ink-secondary text-xs mt-1">Cant. {it.qty}</p>
                          <p class="font-display text-base mt-1">{fmt(c.price * it.qty)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCare(it.careId)}
                          class="self-start font-utility text-ink-secondary text-xs hover:text-accent transition-colors"
                          aria-label={`Quitar ${c.name}`}
                        >
                          Quitar
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <footer class="border-t border-ink/20 p-6 space-y-3">
              <div class="flex justify-between font-display text-xl">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
              <button
                type="button"
                disabled
                class="w-full bg-ink/40 text-cream py-4 font-utility cursor-not-allowed"
                aria-disabled="true"
                title="Checkout deshabilitado en vista previa"
              >
                Continuar al checkout
              </button>
              <p class="font-utility text-ink-secondary text-[0.65rem] text-center">
                Lanzamiento · 14 nov · 20:00 hrs MX
              </p>
            </footer>
          </aside>
        </div>
      ) : null}
    </>
  );
}