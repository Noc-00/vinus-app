import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, HelpCircle, Megaphone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/shop', icon: ShoppingBag, label: 'Tienda' },
  { path: '/qa', icon: HelpCircle, label: 'Foro' },
  { path: '/fanbase', icon: Megaphone, label: 'Eventos' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

export default function TabBar() {
  const location = useLocation();

  return (
    <nav className="w-full bg-transparent">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ path, icon: Icon, label }) => {
          const isActive = path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path);

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "relative flex flex-col items-center gap-1 group transition-all duration-300",
                "px-4 py-1.5 rounded-2xl",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all duration-300 ease-out",
                isActive
                  ? "bg-primary/10 scale-110 shadow-sm shadow-primary/5"
                  : "group-hover:bg-muted group-active:scale-90"
              )}>
                <Icon
                  className="w-5 h-5"
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>

              <span className={cn(
                "text-[10px] font-bold tracking-tight transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-70"
              )}>
                {label}
              </span>

              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full animate-in fade-in zoom-in duration-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}