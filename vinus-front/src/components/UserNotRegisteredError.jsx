import React from 'react';
import { ShieldAlert, LogOut, Mail, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';

const UserNotRegisteredError = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="max-w-md w-full p-8 bg-card rounded-[2.5rem] border border-border shadow-xl shadow-primary/5 animate-in fade-in zoom-in duration-300">
        <div className="text-center">

          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-3xl bg-amber-500/10 text-amber-500">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <h1 className="text-3xl font-black text-foreground mb-3 tracking-tight">Acceso Restringido</h1>

          <p className="text-muted-foreground mb-8 text-balance">
            Parece que tu cuenta aún no está registrada en la plataforma de <strong>Vinus</strong>.
          </p>

          <div className="p-5 bg-muted/30 rounded-3xl text-left border border-border/50 mb-8 space-y-4">
            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">¿Qué puedes hacer?</p>

            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <UserCheck className="w-4 h-4 text-primary mt-0.5" />
                <p className="text-sm text-foreground/80">Verifica que usaste tu correo institucional.</p>
              </div>
              <div className="flex gap-3 items-start">
                <Mail className="w-4 h-4 text-primary mt-0.5" />
                <p className="text-sm text-foreground/80">Contacta al administrador para solicitar acceso.</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => logout()}
            variant="outline"
            className="w-full rounded-2xl py-6 font-bold gap-2 border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión e intentar de nuevo
          </Button>

          <p className="mt-8 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium opacity-50">
            Vinus Ecosystem Support
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;