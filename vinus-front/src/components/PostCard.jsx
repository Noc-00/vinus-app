import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import apiClient from '@/api/apiClient';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(post.is_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  };

  const handleLike = async () => {
    // UI Optimista: Cambiamos el estado inmediatamente
    const prevLiked = liked;
    const prevCount = likesCount;

    setLiked(!prevLiked);
    setLikesCount(prevLiked ? prevCount - 1 : prevCount + 1);

    try {
    } catch (error) {
      setLiked(prevLiked);
      setLikesCount(prevCount);
      toast.error("No se pudo procesar el like");
    }
  };

  return (
    <div className="group bg-card rounded-[2rem] border border-border/60 overflow-hidden transition-all hover:shadow-md hover:shadow-primary/5">

      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="relative">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-sm border border-primary/10 overflow-hidden">
            {post.author_avatar ? (
              <img src={post.author_avatar} alt={post.author_name} className="w-full h-full object-cover" />
            ) : (
              <span>{post.author_name?.charAt(0)?.toUpperCase()}</span>
            )}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-card rounded-full" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-foreground truncate flex items-center gap-1.5">
            {post.author_name}
          </h4>
          <p className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-tight">
            {post.author_institution || 'Comunidad Vinus'} • {formatDate(post.created_at || post.created_date)}
          </p>
        </div>

        <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground/50 hover:text-foreground transition-all">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 pb-4">
        <p className="text-[15px] text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {post.image_url && (
        <div className="px-4 pb-4">
          <div className="relative rounded-3xl overflow-hidden border border-border/40 shadow-sm group-hover:shadow-md transition-shadow">
            <img
              src={post.image_url}
              alt="Post media"
              className="w-full object-cover max-h-[400px] hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-4 pb-4 pt-1">
        <div className="flex items-center gap-2">

          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all active:scale-90",
              liked
                ? "bg-red-500/10 text-red-500 shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Heart className={cn("w-4 h-4 transition-transform", liked && "fill-current scale-110")} />
            <span>{likesCount}</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all active:scale-90">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments_count || 0}</span>
          </button>
        </div>

        <button
          onClick={() => {
            navigator.share?.({ title: 'Vinus Post', url: window.location.href });
            toast.info("Enlace copiado");
          }}
          className="p-2.5 rounded-2xl text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all active:scale-90"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}