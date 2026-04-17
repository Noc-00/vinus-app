import { useState } from 'react';
import { X, Image as ImageIcon, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import apiClient from '@/api/apiClient';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function CreatePostModal({ user, onClose, onCreated }) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("La imagen es demasiado pesada (máx 5MB)");
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      setTimeout(() => {
        setImageUrl(URL.createObjectURL(file));
        setUploading(false);
      }, 1000);

    } catch (error) {
      toast.error("Error al subir la imagen");
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);

    try {
      const postData = {
        content: content.trim(),
        image_url: imageUrl || null,
        author_name: user?.full_name || 'Estudiante Vinus',
        author_avatar: user?.avatar_url || null,
        author_institution: user?.institution || 'Vinus App',
        likes_count: 0,
        comments_count: 0
      };

      await apiClient.post('/posts', postData);

      toast.success('¡Publicado con éxito!');
      onCreated?.();
      onClose();
    } catch (error) {
      console.error("Error detallado:", error.response?.data || error.message);
      toast.error("No se pudo crear la publicación. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className={cn(
        "relative bg-card w-full max-w-lg shadow-2xl border border-border transition-all duration-300",
        "rounded-t-[2.5rem] sm:rounded-3xl p-6 mb-0 sm:mb-20",
        "animate-in slide-in-from-bottom sm:zoom-in-95"
      )}>

        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6 sm:hidden" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-foreground">Crear Post</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`¿Qué hay de nuevo, ${user?.full_name?.split(' ')[0] || 'Vinus'}?`}
          className="w-full h-40 bg-muted/30 rounded-2xl p-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary/10 placeholder:text-muted-foreground/60 border-none"
          autoFocus
        />

        {imageUrl && (
          <div className="relative mt-4 group">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full rounded-2xl max-h-56 object-cover border border-border shadow-sm"
            />
            <button
              onClick={() => setImageUrl('')}
              className="absolute top-3 right-3 bg-black/60 hover:bg-red-500 text-white rounded-full p-1.5 backdrop-blur-md transition-all scale-100 group-hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-2xl hover:bg-primary/5 text-primary cursor-pointer transition-all active:scale-95">
            {uploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ImageIcon className="w-5 h-5" />
            )}
            <span className="text-sm font-bold">{uploading ? 'Subiendo...' : 'Media'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || loading || uploading}
            className="rounded-2xl gap-2 px-6 font-bold shadow-lg shadow-primary/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Publicar
          </Button>
        </div>
      </div>
    </div>
  );
}