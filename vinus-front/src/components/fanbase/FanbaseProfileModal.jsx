"use client"

import { useState, useEffect } from 'react';
import { X, Grid, Loader2, MapPin, BadgeCheck, Users2, Layers } from 'lucide-react';
import apiClient from '@/api/apiClient';
import { cn } from "@/lib/utils";

export default function FanbaseProfileModal({ account, following, onFollow, onClose }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileContent = async () => {
      setLoading(true);
      try {
        const items = await apiClient.entities.FanbasePost.filter({
          account_id: account.id
        });
        setPosts(items);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfileContent();
  }, [account.id]);

  return (
    <div className="fixed inset-0 z-[60] bg-background animate-in slide-in-from-right duration-300 overflow-y-auto hide-scrollbar">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40 flex items-center px-6 py-4 justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <span className="font-black uppercase tracking-tighter text-sm">@{account.username}</span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Perfil de Creador</span>
          </div>
        </div>

        <button
          onClick={onFollow}
          className={cn(
            "px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg",
            following
              ? "bg-muted text-muted-foreground shadow-none"
              : "bg-primary text-primary-foreground shadow-primary/20 hover:scale-105"
          )}
        >
          {following ? 'Siguiendo' : 'Seguir'}
        </button>
      </div>

      <div className="relative h-48 w-full overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: account.cover_url
              ? `url(${account.cover_url})`
              : 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="px-8 pb-8">
        <div className="relative flex items-end justify-between -mt-12 mb-6">
          <div className="group relative h-24 w-24 rounded-[2rem] border-[6px] border-background overflow-hidden bg-primary shadow-2xl transition-transform hover:scale-105">
            {account.avatar_url ? (
              <img src={account.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-primary-foreground font-black text-4xl">
                {account.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-black uppercase tracking-tighter">{account.display_name}</h2>
              {account.is_verified && <BadgeCheck className="w-6 h-6 text-primary fill-primary/10" />}
            </div>
            {account.city && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">{account.city}</span>
              </div>
            )}
          </div>

          {account.bio && (
            <p className="text-sm leading-relaxed text-muted-foreground font-medium max-w-md italic">
              "{account.bio}"
            </p>
          )}

          <div className="flex gap-8 pt-2">
            <div className="flex flex-col">
              <span className="text-xl font-black text-foreground">{account.posts_count || 0}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Posts</span>
            </div>
            <div className="flex flex-col border-l border-border/50 pl-8">
              <span className="text-xl font-black text-foreground">{account.followers_count || 0}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Seguidores</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/40 bg-muted/5 min-h-screen">
        <div className="px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Layers className="w-4 h-4 text-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Portafolio de contenido</span>
          </div>
          <Grid className="w-4 h-4 text-muted-foreground/40" />
        </div>

        <div className="px-4 pb-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cargando galería...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 opacity-40">
              <p className="text-sm font-black uppercase tracking-tighter">Sin contenido público</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group relative aspect-square rounded-[1.5rem] overflow-hidden bg-muted border border-border/40 hover:border-primary/40 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5"
                >
                  {post.image_url ? (
                    <img src={post.image_url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center p-4 bg-gradient-to-br from-muted/50 to-muted">
                      <p className="text-[10px] font-black uppercase tracking-tighter text-center line-clamp-3 text-muted-foreground">
                        {post.content}
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[10px] font-black uppercase bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">Ver Post</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}