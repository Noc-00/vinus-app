"use client"

import { useState } from 'react';
import { X, Image, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import apiClient from "@/api/apiClient";
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/AuthContext';

const categories = ['Libros', 'Electrónica', 'Ropa', 'Tareas', 'Apuntes', 'Tutorías', 'Otros'];

export default function CreateProductModal({ onClose, onCreated }) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    type: 'venta',
    exchange_for: ''
  });

  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.category) {
      toast.error('Título y categoría son obligatorios');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/products', {
        title: form.title,
        description: form.description,
        price: form.type === 'regalo' ? 0 : parseFloat(form.price || 0),
        category: form.category,
        image_url: imageUrl,
        type: form.type,
        exchange_for: form.type === 'intercambio' ? form.exchange_for : null,
        status: 'Disponible',
        seller_email: user.email,
        seller_name: user.nombre
      });
      toast.success('¡Publicado con tu perfil de ' + user.nombre + '!');
      onCreated?.();
      onClose();
    } catch (error) {
      toast.error('Error al publicar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-4">
      <div className="bg-card w-full max-w-lg rounded-[2.5rem] border border-border/50 p-8 shadow-2xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">Publicar</h3>
            <p className="text-[10px] font-medium text-muted-foreground uppercase">Publicando como {user?.nombre}</p>
          </div>
          <button onClick={onClose} className="p-3 rounded-full bg-muted/50 hover:bg-primary/10"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-4">
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="¿Qué vas a publicar?" />
          <div className="grid grid-cols-2 gap-3">
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
              <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Tipo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="venta">Venta</SelectItem>
                <SelectItem value="intercambio">Intercambio</SelectItem>
                <SelectItem value="regalo">Regalo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Categoría" /></SelectTrigger>
              <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          {form.type === 'venta' && <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Precio ($)" />}
          {form.type === 'intercambio' && <Input value={form.exchange_for} onChange={(e) => setForm({ ...form, exchange_for: e.target.value })} placeholder="¿Qué buscas a cambio?" />}

          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detalles de la publicación..." className="min-h-[100px] rounded-3xl" />

          <label className={cn("flex flex-col items-center justify-center gap-3 px-4 py-8 rounded-[2rem] border-2 border-dashed border-border/60 cursor-pointer", imageUrl && "border-primary/40 bg-primary/5")}>
            {uploading ? <Loader2 className="w-8 h-8 animate-spin" /> : imageUrl ? <CheckCircle2 className="w-8 h-8 text-primary" /> : <Image className="w-8 h-8 text-muted-foreground/50" />}
            <p className="text-sm font-bold uppercase">{imageUrl ? 'Imagen Cargada' : 'Subir Imagen'}</p>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <Button onClick={handleSubmit} disabled={loading || uploading} className="w-full h-14 rounded-2xl gap-3 text-sm font-black uppercase">
            {loading ? 'Publicando...' : 'Publicar Producto'}
          </Button>
        </div>
      </div>
    </div>
  );
}