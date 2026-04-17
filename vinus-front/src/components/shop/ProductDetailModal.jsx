"use client"

import { useState } from 'react';
import { X, Package, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import apiClient from '@/api/apiClient';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/AuthContext';

const statuses = ['Disponible', 'Reservado', 'Vendido', 'En progreso', 'Completado'];
const statusStyles = { 'Disponible': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', 'Vendido': 'bg-rose-500/10 text-rose-600 border-rose-500/20', 'default': 'bg-amber-500/10 text-amber-600 border-amber-500/20' };

export default function ProductDetailModal({ product, onClose, onUpdated }) {
  const { user } = useAuth();
  const [status, setStatus] = useState(product.status);

  const isOwner = user?.email === product.seller_email;

  const handleContact = () => {
    const subject = encodeURIComponent(`Vinus: Interés por ${product.title}`);
    const body = encodeURIComponent(`Hola ${product.seller_name},\n\nVi tu publicación de "${product.title}" en Vinus y me gustaría obtener más información.\n\n¡Saludos!`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${product.seller_email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleStatusUpdate = async (newStatus) => {
    setStatus(newStatus);
    try {
      await apiClient.patch(`/products/${product.id}`, { status: newStatus });
      toast.success(`Estado actualizado a: ${newStatus}`);
      onUpdated?.();
    } catch (error) {
      toast.error('Error al actualizar');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-card w-full max-w-xl rounded-t-[2.5rem] sm:rounded-[2.5rem] border border-border/50 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative w-full overflow-hidden bg-muted/30">
          {product.image_url ? (
            <img src={product.image_url} alt={product.title} className="aspect-[4/3] sm:aspect-video w-full object-cover" />
          ) : (
            <div className="aspect-video w-full flex flex-col items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
          <button onClick={onClose} className="absolute top-6 right-6 p-3 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-primary/70 tracking-[0.2em]">{product.category}</span>
              <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase border", statusStyles[status] || statusStyles.default)}>
                {status}
              </span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight">{product.title}</h2>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                {product.type === 'intercambio' ? 'Intercambio por:' : 'Precio:'}
              </span>
              <p className="text-2xl font-black text-foreground">
                {product.type === 'intercambio'
                  ? <span className="text-blue-600 italic">{product.exchange_for}</span>
                  : `$${product.price?.toLocaleString()}`
                }
              </p>
            </div>
          </div>

          {product.description && <p className="text-sm font-medium text-muted-foreground leading-relaxed italic">"{product.description}"</p>}

          <div className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border border-border/50">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-lg shadow-lg shadow-primary/20">
              {product.seller_name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-black uppercase tracking-tight">{product.seller_name || 'Vendedor'}</p>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Vendedor Verificado</p>
            </div>
          </div>

          <div className="pt-2">
            {isOwner ? (
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Gestionar Estado</label>
                <Select value={status} onValueChange={handleStatusUpdate}>
                  <SelectTrigger className="h-14 rounded-2xl border-2 border-primary/20 bg-primary/5 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-border/50">
                    {statuses.map(s => <SelectItem key={s} value={s} className="font-medium">{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <Button onClick={handleContact} className="w-full h-16 rounded-[1.5rem] gap-3 text-sm font-black uppercase tracking-[0.15em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                <MessageCircle className="w-5 h-5" /> CONTACTAR AHORA
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}