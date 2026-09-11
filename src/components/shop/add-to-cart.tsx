"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  service,
  className,
  label = "Agregar",
}: {
  service: Service;
  className?: string;
  label?: string;
}) {
  const { add, openCart } = useCart();
  const [done, setDone] = useState(false);

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className={cn("w-full", className)}
      onClick={() => {
        add(service);
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
        toast("Servicio agregado", {
          description: service.name,
          action: { label: "Ver carrito", onClick: openCart },
        });
      }}
    >
      {done ? (
        <>
          <Check className="h-3.5 w-3.5" strokeWidth={2} /> Agregado
        </>
      ) : (
        <>
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} /> {label}
        </>
      )}
    </Button>
  );
}

export function AddToCartPanel({ service }: { service: Service }) {
  const { add, openCart } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex h-12 items-center border border-forest/25">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Reducir cantidad"
          className="flex h-full w-11 items-center justify-center text-forest transition-colors hover:bg-forest hover:text-cream"
        >
          <Minus className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
        <span className="num w-12 text-center text-[0.9rem]">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(99, q + 1))}
          aria-label="Aumentar cantidad"
          className="flex h-full w-11 items-center justify-center text-forest transition-colors hover:bg-forest hover:text-cream"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
      <Button
        type="button"
        className="flex-1"
        onClick={() => {
          add(service, qty);
          openCart();
          toast("Servicio agregado al carrito", {
            description: `${qty} × ${service.name}`,
          });
        }}
      >
        <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
        Agregar al carrito
      </Button>
    </div>
  );
}
