import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Bell, Users, Loader2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import moment from 'moment';
import UnderConstruction from "@/components/shared/UnderConstruction";

export default function ChatRoom() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('id');
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setUser({ full_name: 'Usuario Vinus', email: 'test@vinus.com' });
      setRoom({
        name: 'Sala de Vinus',
        members: [],
        announcement: '¡Bienvenidos al chat local de Vinus!'
      });
      setMessages([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roomId) loadData();
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    const msgData = {
      room_id: roomId,
      content: newMessage,
      sender_name: user?.full_name || 'Anónimo',
      sender_email: user?.email || '',
      created_date: new Date().toISOString()
    };
    try {
      setMessages(prev => [...prev, { ...msgData, id: Date.now() }]);
      setNewMessage('');
    } finally {
      setSending(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      <UnderConstruction />
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{room?.name || 'Cargando...'}</p>
            <p className="text-xs text-muted-foreground">{room?.members?.length || 0} miembros</p>
          </div>
          <button className="p-2 rounded-xl hover:bg-muted">
            <Users className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        {room?.announcement && (
          <div className="mt-2 flex items-center gap-2 p-2.5 rounded-xl bg-accent/10">
            <Bell className="w-4 h-4 text-accent shrink-0" />
            <p className="text-xs text-accent font-medium">{room.announcement}</p>
          </div>
        )}
      </header>

      <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground text-xs italic">No hay mensajes todavía.</div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_email === user?.email;
            return (
              <div key={msg.id} className={`flex gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                {!isMe && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                    {msg.sender_name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <div className={`max-w-[75%] ${isMe ? 'order-1' : ''}`}>
                  {!isMe && <p className="text-[10px] text-muted-foreground mb-0.5 px-1">{msg.sender_name}</p>}
                  <div className={`px-3.5 py-2 rounded-2xl ${isMe ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted rounded-bl-md'}`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className={`text-[10px] text-muted-foreground mt-0.5 ${isMe ? 'text-right' : ''} px-1`}>
                    {moment(msg.created_date).format('HH:mm')}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-card/80 backdrop-blur-xl border-t border-border p-4">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 transition-all active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}