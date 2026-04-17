import { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Shield, Moon, Sun, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthContext';

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    document.documentElement.classList.toggle('dark', newValue);
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    toast.info(newValue ? 'Modo oscuro activado' : 'Modo claro activado');
  };

  const toggleNotifications = async () => {
    const newValue = !notifications;
    setNotifications(newValue);
    toast.success(newValue ? 'Notificaciones activadas' : 'Notificaciones desactivadas');
  };

  const handleLogout = () => {
    logout();
    toast.info('Sesión cerrada');
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-bold text-xl text-foreground">Ajustes</h1>
      </header>

      <div className="px-5 pt-6 space-y-8 max-w-md mx-auto">

        <section>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] px-1 mb-3">Tu Cuenta</p>
          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-4 p-4 w-full hover:bg-muted/30 transition-all text-left group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-black shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1">
                <p className="font-bold text-base text-foreground">{user?.nombre || 'Cargando...'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
            </button>
          </div>
        </section>

        <section>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] px-1 mb-3">Preferencias</p>
          <div className="bg-card rounded-3xl border border-border overflow-hidden divide-y divide-border/50 shadow-sm">
            <div className="flex items-center justify-between p-4 py-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Apariencia</p>
                  <p className="text-[11px] text-muted-foreground">Alternar modo oscuro/claro</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>
            <div className="flex items-center justify-between p-4 py-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Notificaciones</p>
                  <p className="text-[11px] text-muted-foreground">Alertas de foros y chats</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={toggleNotifications} />
            </div>
          </div>
        </section>

        <section>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] px-1 mb-3">Seguridad</p>
          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
            <button className="flex items-center justify-between p-4 py-5 w-full hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">Privacidad</p>
                  <p className="text-[11px] text-muted-foreground">Gestionar contraseñas y datos</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
            </button>
          </div>
        </section>

        <div className="pt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-destructive/5 text-destructive border border-destructive/10 rounded-2xl p-4 flex items-center justify-center gap-2 font-bold text-sm hover:bg-destructive hover:text-white transition-all active:scale-95 shadow-sm"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>

        <div className="text-center pt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-muted text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Vinus App • v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}