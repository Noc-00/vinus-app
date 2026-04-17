"use client"

import { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import apiClient from '@/api/apiClient';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthContext';

const categories = [
  'Matemáticas', 'Ciencias', 'Programación',
  'Idiomas', 'Historia', 'Arte',
  'Derecho', 'Ingeniería', 'Otros'
];

export default function CreateQuestionModal({ onClose, onCreated }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !category) {
      toast.error('Completa todos los campos para continuar');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/forum-questions', {
        title: title.trim(),
        content: content.trim(),
        category: category,
        author_name: user?.nombre || 'Usuario',
        author_email: user?.email,
        answers_count: 0,
        same_problem_count: 0,
        is_resolved: false,
        reports_count: 0
      });

      toast.success('¡Duda publicada en el foro!');
      if (onCreated) onCreated();
      onClose();
    } catch (error) {
      console.error("Error al crear la pregunta:", error);
      toast.error('No pudimos conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-4 text-foreground">
      <div className="bg-card w-full max-w-lg rounded-[2.5rem] border border-border/50 p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Nueva Consulta</h3>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest ml-0.5 italic opacity-70">Publicando como {user?.nombre}</p>
          </div>
          <button onClick={onClose} className="p-3 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Título de la duda</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="¿Cuál es tu pregunta?" className="rounded-2xl h-12 text-sm font-bold bg-muted/20" disabled={loading} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Contexto Detallado</label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Explica tu problema con detalle..." className="min-h-[120px] rounded-2xl p-4 text-sm leading-relaxed bg-muted/20" disabled={loading} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Área Académica</label>
            <Select value={category} onValueChange={(value) => setCategory(value)} disabled={loading}>
              <SelectTrigger className="rounded-2xl h-12 bg-muted/20">
                <SelectValue placeholder="Elegir categoría" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-border/50 shadow-xl bg-card">
                {categories.map(c => <SelectItem key={c} value={c} className="font-bold text-xs uppercase tracking-tight">{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full h-14 rounded-2xl gap-3 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? 'Publicando...' : 'Lanzar Pregunta'}
          </Button>
        </div>
      </div>
    </div>
  );
}