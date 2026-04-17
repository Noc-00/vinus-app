import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const pageName = location.pathname.substring(1) || "esta página";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full">
        <div className="text-center space-y-8">

          <div className="relative">
            <h1 className="text-9xl font-black text-primary/10 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-primary/40" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-extrabold text-foreground">
              ¡Ups! Página no encontrada
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Lo sentimos, la ruta <span className="font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded">"/{pageName}"</span> no existe en Vinus o ha sido movida.
            </p>
          </div>

          {isAuthenticated && user?.role === 'admin' && (
            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-900/50">
              <div className="flex items-start space-x-3 text-left">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-500 mt-1.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest">Nota de Administrador</p>
                  <p className="text-xs text-amber-700 dark:text-amber-500/80 leading-relaxed">
                    Si acabas de crear esta vista, asegúrate de haber registrado la ruta correctamente en tu <code className="font-bold text-amber-900 dark:text-amber-300">App.jsx</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4">
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="rounded-2xl font-bold gap-2 px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105"
            >
              <Home className="w-4 h-4" />
              Volver al Inicio
            </Button>
          </div>

          <div className="pt-8">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium opacity-50">
              Vinus Learning Ecosystem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}