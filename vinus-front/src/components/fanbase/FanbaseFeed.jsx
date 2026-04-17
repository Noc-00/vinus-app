"use client"

import { useState } from 'react';
import { Heart, MessageCircle, ExternalLink, MoreHorizontal, Share2 } from 'lucide-react';
import apiClient from '@/api/apiClient';
import moment from 'moment';
import 'moment/locale/es';
import FanbaseCommentsModal from './FanbaseCommentsModal';
import { cn } from '@/lib/utils';

const TYPE_COLORS = {
  Convocatoria: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  Evento: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Beca: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Noticia: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  Taller: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  Otro: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
};

export default function FanbaseFeed({ posts, user, onAccountClick, onPostsChange }) {
  const [commentPostId, setCommentPostId] = useState(null);
  moment.locale('es');

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="h-20 w-20 rounded-[2rem] bg-muted/30 flex items-center justify-center text-4xl shadow-inner">
          📭
        </div>
        <div className="space-y-1">
          <p className="text-sm font-black uppercase tracking-tighter">El feed está en calma</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Sigue a tus creadores favoritos para ver contenido</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-12">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          user={user}
          onAccountClick={onAccountClick}
          onComment={() => setCommentPostId(post.id)}
          onPostsChange={onPostsChange}
        />
      ))}
      {commentPostId && (
        <FanbaseCommentsModal
          postId={commentPostId}
          user={user}
          onClose={() => setCommentPostId(null)}
          onCommented={onPostsChange}
        />
      )}
    </div>
  );
}

function PostCard({ post, user, onAccountClick, onComment }) {
  const isLiked = post.liked_by?.includes(user?.email);
  const [localLiked, setLocalLiked] = useState(isLiked);
  const [localCount, setLocalCount] = useState(post.likes_count || 0);

  const handleLike = async () => {
    const nextLiked = !localLiked;
    const nextCount = nextLiked ? localCount + 1 : Math.max(0, localCount - 1);

    setLocalLiked(nextLiked);
    setLocalCount(nextCount);

    try {
      const newLikedBy = nextLiked
        ? [...(post.liked_by || []), user.email]
        : (post.liked_by || []).filter((e) => e !== user.email);

      await apiClient.entities.FanbasePost.update(post.id, {
        likes_count: nextCount,
        liked_by: newLikedBy
      });
    } catch (error) {
      setLocalLiked(isLiked);
      setLocalCount(post.likes_count || 0);
    }
  };

  return (
    <div className="group bg-card rounded-[2.5rem] border border-border/40 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]">

      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onAccountClick(post.account_id)}
            className="relative h-11 w-11 rounded-2xl overflow-hidden bg-primary shadow-lg shadow-primary/10 transition-transform hover:scale-105 active:scale-95"
          >
            {post.account_avatar ? (
              <img src={post.account_avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-primary-foreground font-black text-lg">{post.account_username?.[0]?.toUpperCase()}</span>
            )}
          </button>
          <div className="flex flex-col text-left cursor-pointer" onClick={() => onAccountClick(post.account_id)}>
            <p className="text-sm font-black uppercase tracking-tight leading-none group-hover:text-primary transition-colors">
              {post.account_display_name || post.account_username}
            </p>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-1">
              @{post.account_username} • {moment(post.created_date).fromNow()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {post.type && (
            <span className={cn(
              "text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full border",
              TYPE_COLORS[post.type] || TYPE_COLORS['Otro']
            )}>
              {post.type}
            </span>
          )}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {post.image_url && (
        <div className="relative aspect-[4/5] sm:aspect-video w-full overflow-hidden bg-muted/20 border-y border-border/20">
          <img
            src={post.image_url}
            alt="Contenido"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      <div className="px-7 pt-5 pb-2">
        <p className="text-sm leading-relaxed text-foreground/90 font-medium">
          {post.content}
        </p>
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mt-4 py-2 px-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            <ExternalLink className="w-3 w-3" /> Explorar enlace
          </a>
        )}
      </div>

      <div className="flex items-center justify-between px-6 py-5 border-t border-border/20 mt-2">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 group/btn"
          >
            <div className={cn(
              "p-2 rounded-full transition-all duration-300",
              localLiked ? "bg-rose-500/10" : "bg-muted/50 group-hover/btn:bg-rose-500/5"
            )}>
              <Heart className={cn(
                "w-5 h-5 transition-all duration-300",
                localLiked ? "fill-rose-500 text-rose-500 scale-110" : "text-muted-foreground group-hover/btn:text-rose-500"
              )} />
            </div>
            <span className={cn(
              "text-xs font-black uppercase tracking-tighter",
              localLiked ? "text-rose-600" : "text-muted-foreground"
            )}>
              {localCount}
            </span>
          </button>

          <button
            onClick={onComment}
            className="flex items-center gap-2 group/btn"
          >
            <div className="p-2 rounded-full bg-muted/50 group-hover/btn:bg-primary/10 transition-all">
              <MessageCircle className="w-5 h-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
            </div>
            <span className="text-xs font-black uppercase tracking-tighter text-muted-foreground group-hover:text-primary transition-colors">
              {post.comments_count || 0}
            </span>
          </button>
        </div>

        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <Share2 className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}