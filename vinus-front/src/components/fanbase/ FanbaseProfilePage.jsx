"use client"

import { useState } from 'react';
import { ArrowLeft, Grid, MapPin, BadgeCheck, Users2, Sparkles } from 'lucide-react';
import apiClient from '@/api/apiClient';
import FanbaseFeed from './FanbaseFeed';
import { cn } from "@/lib/utils";

export default function FanbaseProfilePage({ account, posts, following, user, onFollow, onBack, onPostsChange }) {
  const [view, setView] = useState('feed');

  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-500">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 flex items-center px-6 py-4 gap-4">
        <button
          onClick={onBack}
          className="p-2.5 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col">
          <span className="font-black uppercase tracking-tighter text-sm leading-none">
            @{account.username}
          </span>
          {account.is_verified && (
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-1 flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" /> Verificado
            </span>
          )}
        </div>
      </div>

      <div className="relative h-40 w-full overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: account.cover_url
              ? `url(${account.cover_url})`
              : 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      </div>

      <div className="px-6 pb-6 relative">
        <div className="flex items-end justify-between -mt-10 mb-5">
          <div className="relative h-20 w-20 rounded-[1.8rem] border-[5px] border-background overflow-hidden bg-primary shadow-2xl transition-transform hover:scale-105">
            {account.avatar_url ? (
              <img src={account.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-primary-foreground font-black text-3xl">
                {account.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>

          <button
            onClick={onFollow}
            className={cn(
              "px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95",
              following
                ? "bg-muted text-muted-foreground shadow-none"
                : "bg-primary text-white shadow-primary/20 hover:shadow-primary/40"
            )}
          >
            {following ? 'Siguiendo' : 'Seguir'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
              {account.display_name}
              {account.is_verified && <BadgeCheck className="w-5 h-5 text-primary" />}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground/60 tracking-tight">@{account.username}</span>
              {account.city && (
                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                  <MapPin className="w-3 h-3 text-primary" /> {account.city}
                </span>
              )}
            </div>
          </div>

          {account.bio && (
            <p className="text-sm leading-relaxed text-muted-foreground font-medium max-w-lg">
              {account.bio}
            </p>
          )}

          <div className="flex gap-10 pt-4 border-t border-border/20">
            <div className="flex flex-col">
              <span className="text-lg font-black text-foreground leading-none">{posts.length}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mt-1">Posts</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-foreground leading-none">{account.followers_count || 0}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mt-1">Seguidores</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-2 bg-muted/30" />

      <div className="bg-muted/5 min-h-screen">
        <div className="px-6 py-6 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
             <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Publicaciones Recientes</span>
        </div>

        <div className="px-4 pb-24 max-w-xl mx-auto">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-30">
               <Grid className="w-12 h-12 mb-3" />
               <p className="text-xs font-black uppercase tracking-widest">Sin actividad aún</p>
            </div>
          ) : (
            <FanbaseFeed
              posts={posts}
              user={user}
              onAccountClick={() => {}}
              onPostsChange={onPostsChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}