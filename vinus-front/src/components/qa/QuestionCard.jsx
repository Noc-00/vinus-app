"use client"

import { MessageCircle, Users, CheckCircle2, Clock } from 'lucide-react';
import moment from 'moment';
import 'moment/locale/es';
import { cn } from "@/lib/utils";

export default function QuestionCard({ question, onClick }) {
  moment.locale('es');

  return (
    <button
      onClick={() => onClick?.(question)}
      className="group relative flex w-full flex-col overflow-hidden rounded-[2rem] border border-border/40 bg-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="flex items-start gap-4">

        <div className="relative shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/80 to-accent text-lg font-black text-white shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:scale-110">
            {question.author_name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          {question.is_resolved && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shadow-sm" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <span className="truncate text-[10px] font-black uppercase tracking-widest text-primary">
              {question.author_name}
            </span>
            <span className="text-muted-foreground/30">•</span>
            <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-tighter text-muted-foreground">
              <Clock className="h-3 w-3" />
              {moment(question.created_date).fromNow()}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="line-clamp-2 text-base font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
              {question.title}
            </h3>
            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground/80">
              {question.content}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-primary">
                {question.category}
              </span>

              <div className="flex items-center gap-1.5 text-muted-foreground transition-colors group-hover:text-foreground">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs font-bold">{question.answer_count || 0}</span>
              </div>

              {(question.same_problem_count || 0) > 0 && (
                <div className="flex items-center gap-1.5 text-muted-foreground transition-colors group-hover:text-amber-500">
                  <Users className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    +{question.same_problem_count} dudas
                  </span>
                </div>
              )}
            </div>

            <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
               <span className="text-[10px] font-black uppercase tracking-widest text-primary">Leer más →</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}