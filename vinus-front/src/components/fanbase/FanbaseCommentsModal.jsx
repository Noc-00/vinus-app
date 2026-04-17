"use client"

import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, MessageSquare } from 'lucide-react';
import apiClient from '@/api/apiClient';
import moment from 'moment';
import 'moment/locale/es';
import { cn } from "@/lib/utils";

export default function FanbaseCommentsModal({ postId, user, onClose, onCommented }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  moment.locale('es');

  useEffect(() => {
    const loadComments = async () => {
      try {
        const list = await apiClient.entities.FanbaseComment.filter({ post_id: postId }, 'created_date');
        setComments(list);
      } catch (error) {
        console.error("Error cargando comentarios:", error);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [postId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  const handleSend = async () => {
    if (!text.trim() || sending) return;

    setSending(true);
    try {
      const newComment = await apiClient.entities.FanbaseComment.create({
        post_id: postId,
        author_name: user?.full_name || 'Vinus User',
        author_email: user?.email,
        content: text.trim(),
      });

      const post = await apiClient.entities.FanbasePost.get(postId);
      if (post) {
        await apiClient.entities.FanbasePost.update(postId, {
          comments_count: (post.comments_count || 0) + 1
        });
      }

      setComments(prev => [...prev, newComment]);
      setText('');
      onCommented?.();
    } catch (error) {
      console.error("Error al comentar:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex items-end justify-center p-0 sm:p-4">
      <div className="bg-card w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] border border-border/50 flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom duration-300">

        <div className="flex items-center justify-between px-8 py-6 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tighter">Comentarios</h3>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{comments.length} interacciones</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-6 hide-scrollbar"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Sincronizando...</span>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-20 space-y-2">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-tight">Silencio en el hilo</p>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">Sé el primero en romper el hielo</p>
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex gap-3 group animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg shadow-primary/10 transition-transform group-hover:scale-110">
                  <span className="text-white text-xs font-black">{c.author_name?.[0]?.toUpperCase()}</span>
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{c.author_name}</span>
                    <span className="text-[10px] text-muted-foreground/40 font-medium">• {moment(c.created_date).fromNow()}</span>
                  </div>
                  <div className="bg-muted/40 rounded-[1.25rem] rounded-tl-none px-4 py-3 border border-border/30">
                    <p className="text-sm leading-relaxed text-foreground">{c.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-6 border-t border-border/40 bg-card/50">
          <div className="relative flex items-center gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Deja tu huella..."
              className="flex-1 bg-muted/50 rounded-2xl px-5 py-4 text-sm font-medium border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest"
            />
            <button
              onClick={handleSend}
              disabled={sending || !text.trim()}
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl",
                text.trim() ? "bg-primary text-white shadow-primary/20 translate-x-0" : "bg-muted text-muted-foreground/40 opacity-50 cursor-not-allowed"
              )}
            >
              {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 fill-current" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}