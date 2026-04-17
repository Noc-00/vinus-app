import { Outlet } from 'react-router-dom';
import TabBar from './TabBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export default function AppLayout() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      <main className={cn(
        "flex-1 w-full mx-auto transition-all duration-300",
        "max-w-2xl px-0 sm:px-4 pb-28"
      )}>
        <Outlet />
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-2xl mx-auto">
          <TabBar />
        </div>
      </div>
    </div>
  );
}