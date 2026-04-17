import { useState, useEffect } from 'react';
import { Settings, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import { useAuth } from '@/lib/AuthContext';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';
import UnderConstruction from "@/components/shared/UnderConstruction";

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setPosts([]);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando datos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <UnderConstruction />
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Bienvenido</p>
            <h1 className="text-lg font-bold text-foreground">
              {user?.nombre || 'Estudiante'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/settings" className="p-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
              <Settings className="w-5 h-5 text-foreground" />
            </Link>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        <button onClick={() => setShowCreatePost(true)} className="w-full bg-card rounded-2xl border border-border p-4 flex items-center gap-3 hover:border-primary/30 transition-all duration-200">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
            {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm text-muted-foreground">¿Qué quieres compartir?</span>
        </button>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4"><Plus className="w-7 h-7 text-muted-foreground" /></div>
            <p className="text-muted-foreground text-sm">No hay publicaciones aún.</p>
            <p className="text-muted-foreground text-xs mt-1">¡Sé el primero en publicar!</p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      <button onClick={() => setShowCreatePost(true)} className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/25 flex items-center justify-center hover:scale-105 transition-transform z-40">
        <Plus className="w-6 h-6" />
      </button>

      {showCreatePost && <CreatePostModal user={user} onClose={() => setShowCreatePost(false)} onCreated={loadData} />}
    </div>
  );
}