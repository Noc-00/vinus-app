"use client"

import { Package, Tag, Repeat, Gift, User } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function ProductCard({ product, onClick }) {
  return (
    <button onClick={() => onClick?.(product)} className="group relative flex flex-col w-full overflow-hidden rounded-[2rem] border border-border/50 bg-card transition-all hover:-translate-y-1 hover:shadow-xl text-left">
      <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="text-muted-foreground/20" />
          </div>
        )}

        <div className="absolute left-3 top-3">
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-black uppercase backdrop-blur-md shadow-sm border",
            product.type === 'regalo' ? 'bg-green-500/90 text-white border-green-400' :
            product.type === 'intercambio' ? 'bg-blue-500/90 text-white border-blue-400' :
            'bg-zinc-900/90 text-white border-zinc-700'
          )}>
            {product.type === 'regalo' && <Gift className="w-3 h-3" />}
            {product.type === 'intercambio' && <Repeat className="w-3 h-3" />}
            {product.type || 'Venta'}
          </span>
        </div>
      </div>

      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-black uppercase text-primary/60">{product.category}</span>
          <span className="text-[9px] font-bold text-muted-foreground flex items-center gap-1">
            <User className="w-3 h-3" /> {product.seller_name || 'Vendedor'}
          </span>
        </div>
        <h3 className="text-sm font-black uppercase truncate">{product.title}</h3>

        <div className="mt-3 flex items-end justify-between">
          <span className="text-lg font-black tracking-tighter truncate max-w-[75%]">
            {product.type === 'regalo' ? '¡Gratis!' :
             product.type === 'intercambio' ? (
               <span className="text-sm text-blue-600 italic truncate block">Busca: {product.exchange_for}</span>
             ) : (
               `$${product.price?.toLocaleString()}`
             )}
          </span>

          <div className="rounded-xl bg-primary p-2 text-white shrink-0">
            <Tag className="h-4 w-4" />
          </div>
        </div>
      </div>
    </button>
  );
}