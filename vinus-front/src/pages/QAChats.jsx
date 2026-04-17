import { useState, useEffect } from 'react';
import { Plus, Users, Lock, Globe, Bell, Loader2, MessageSquare, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import moment from 'moment';
import UnderConstruction from "@/components/shared/UnderConstruction";

export default function QAChats() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState('my');

  const loadData = async () => {
    try {
      setLoading(true);
      setUser({ email: 'test@vinus.com', full_name: 'Usuario Vinus' });
      setRooms([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const myRooms = rooms.filter(r => r.members?.includes(user?.email));
  const publicRooms = rooms.filter(r => r.type === 'group_public' && !r.members?.includes(user?.email));
  const requestRooms = rooms.filter(r => r.pending_requests?.includes(user?.email));

  const displayRooms = tab === 'my' ? myRooms : tab === 'public' ? publicRooms : requestRooms;

  return (
    <div className="relative pb-20">
      <UnderConstruction />
      <div className="flex gap-1 px-4 pb-3 overflow-x-auto scrollbar-none">
        {[
          { key: 'my', label: 'Mis chats', icon: MessageSquare },
          { key: 'public', label: 'Públicos', icon: Globe },
          { key: 'requests', label: 'Solicitudes', icon: Bell },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${tab === key ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>
      <div className="px-4 space-y-3">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : displayRooms.length === 0 ? (
          <div className="text-center py-20 bg-card/30 rounded-3xl border border-dashed border-border"><p className="text-muted-foreground text-sm italic">{tab === 'my' ? 'No tienes chats aún.' : tab === 'public' ? 'No hay chats públicos disponibles.' : 'No hay solicitudes pendientes.'}</p></div>
        ) : (
          displayRooms.map((room) => (
            <button key={room.id} onClick={() => navigate(`/chat-room?id=${room.id}`)} className="w-full bg-card rounded-2xl border border-border p-4 text-left hover:border-primary/30 hover:shadow-sm transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {room.type === 'group_public' ? <Globe className="w-6 h-6 text-primary" /> : room.type === 'group_private' ? <Lock className="w-6 h-6 text-muted-foreground" /> : <Users className="w-6 h-6 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm truncate text-foreground">{room.name}</p>
                    {room.last_message_time && <span className="text-[10px] text-muted-foreground">{moment(room.last_message_time).fromNow()}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{room.last_message || room.description || `${room.members?.length || 0} miembros`}</p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
      <button onClick={() => setShowCreate(true)} className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"><Plus className="w-7 h-7" /></button>
      {showCreate && <CreateChatModal user={user} onClose={() => setShowCreate(false)} onCreated={loadData} />}
    </div>
  );
}

function CreateChatModal({ user, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('group_public');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!name.trim()) { toast.error('El chat necesita un nombre'); return; }
    setLoading(true);
    try {
      toast.success('¡Chat creado con éxito!');
      onCreated?.();
      onClose();
    } catch (e) { toast.error('Error al crear el chat'); } finally { setLoading(false); }
  };
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className="bg-card w-full max-w-lg rounded-3xl border border-border shadow-2xl p-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Nuevo Chat</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5"><label className="text-xs font-semibold px-1 text-muted-foreground uppercase">Nombre</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Grupo de Estudio Java" className="rounded-xl h-11" /></div>
          <div className="space-y-1.5"><label className="text-xs font-semibold px-1 text-muted-foreground uppercase">Descripción</label><Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="¿De qué trata este chat?" className="rounded-xl h-11" /></div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold px-1 text-muted-foreground uppercase">Privacidad</label>
            <Select value={type} onValueChange={setType}><SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="group_public">🌎 Público</SelectItem><SelectItem value="group_private">🔒 Privado (Con solicitud)</SelectItem><SelectItem value="private">👤 Directo</SelectItem></SelectContent></Select>
          </div>
          <Button onClick={handleSubmit} disabled={loading || !name.trim()} className="w-full rounded-xl h-12 text-md font-bold mt-2 shadow-lg shadow-primary/20">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Crear Sala de Chat'}</Button>
        </div>
      </div>
    </div>
  );
}