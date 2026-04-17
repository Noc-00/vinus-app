import { useState, useEffect } from 'react';
import { Settings, Edit3, Loader2, MessageSquare, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ProductDetailModal from '@/components/shop/ProductDetailModal';

const interestOptions = ['Matemáticas', 'Ciencias', 'Programación', 'Arte', 'Música', 'Deportes', 'Idiomas', 'Historia', 'Negocios', 'Ingeniería', 'Derecho', 'Medicina'];
const avatarStyles = ['adventurer', 'bottts', 'pixel-art', 'notionists', 'thumbs'];

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [misPreguntas, setMisPreguntas] = useState([]);
  const [misProductos, setMisProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 'form' ahora es la única fuente de verdad para los datos del usuario
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    sobreMi: '',
    institucion: '',
    intereses: '',
    fotoPerfil: 'adventurer'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const email = localStorage.getItem('userEmail');
      const nombreUsuario = localStorage.getItem('usuario_nombre');

      if (email) {
        // Obtenemos los datos frescos desde el backend
        const userRes = await apiClient.get(`/usuarios/me?email=${email}`);
        setForm({
          nombre: userRes.data.nombre || '',
          email: userRes.data.email || '',
          sobreMi: userRes.data.sobreMi || '',
          institucion: userRes.data.institucion || '',
          intereses: userRes.data.intereses || '',
          fotoPerfil: userRes.data.fotoPerfil || 'adventurer',
        });
      }

      if (nombreUsuario) {
        const [qRes, pRes] = await Promise.all([
          apiClient.get(`/forum-questions/my-questions?author=${nombreUsuario}`).catch(() => ({ data: [] })),
          apiClient.get(`/products/my-products?author=${nombreUsuario}`).catch(() => ({ data: [] }))
        ]);
        setMisPreguntas(qRes.data);
        setMisProductos(pRes.data);
      }
    } catch (e) {
      console.error("Error cargando datos:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []); // Se ejecuta al montar el componente

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.put('/usuarios/profile', form);
      setEditing(false);
      toast.success('Perfil actualizado correctamente');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const toggleInterest = (interest) => {
    if (!editing) return;
    const current = form.intereses ? form.intereses.split(',') : [];
    const next = current.includes(interest) ? current.filter(i => i !== interest) : [...current, interest];
    setForm({ ...form, intereses: next.join(',') });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="w-full h-36 bg-gradient-to-br from-[#8A63FF] via-[#A17CFF] to-[#E253A3]" />

      <div className="px-6">
        <div className="flex items-start gap-5 -mt-16 mb-6">
          <div className="relative">
            <img
              src={form.fotoPerfil?.startsWith('data:image') ? form.fotoPerfil : `https://api.dicebear.com/8.x/${form.fotoPerfil}/svg?seed=${form.email}`}
              className="w-28 h-28 rounded-2xl bg-white border-4 border-background shadow-xl object-cover"
            />
            {editing && (
              <label className="absolute bottom-1 right-1 bg-primary p-2 rounded-full cursor-pointer border-2 border-white">
                <Edit3 className="w-4 h-4 text-white" />
                <input type="file" className="hidden" onChange={(e) => {
                  const reader = new FileReader();
                  reader.onloadend = () => setForm({ ...form, fotoPerfil: reader.result });
                  reader.readAsDataURL(e.target.files[0]);
                }} />
              </label>
            )}
          </div>
          <div className="flex-1 pt-16 flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold">{form.nombre || 'Usuario'}</h1>
              <p className="text-sm text-muted-foreground">{form.email}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(!editing)} className="p-2 rounded-xl bg-muted"><Edit3 className="w-5 h-5" /></button>
              <Link to="/settings" className="p-2 rounded-xl bg-muted"><Settings className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {editing && (
            <div className="bg-card p-5 rounded-2xl border">
              <p className="text-xs font-semibold mb-3">🎨 Estilo de Avatar</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {avatarStyles.map(style => (
                  <button key={style} onClick={() => setForm({...form, fotoPerfil: style})} className={`p-1 rounded-lg ${form.fotoPerfil === style ? 'border-2 border-primary' : ''}`}>
                    <img src={`https://api.dicebear.com/8.x/${style}/svg?seed=${form.email}`} className="w-10 h-10" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-card rounded-2xl border p-5">
            <p className="text-xs font-semibold text-muted-foreground mb-2">🏛️ Institución</p>
            {editing ? <Input value={form.institucion} onChange={(e) => setForm({ ...form, institucion: e.target.value })} /> : <p className="text-sm">{form.institucion || 'Sin institución'}</p>}
          </div>

          <div className="bg-card rounded-2xl border p-5">
            <p className="text-xs font-semibold text-muted-foreground mb-2">✍️ Sobre mí</p>
            {editing ? <textarea value={form.sobreMi} onChange={(e) => setForm({ ...form, sobreMi: e.target.value })} className="w-full h-24 bg-muted/20 rounded-xl p-3 text-sm" /> : <p className="text-sm text-muted-foreground">{form.sobreMi || '...'}</p>}
          </div>

          <div className="bg-card rounded-2xl border p-5">
            <p className="text-xs font-semibold text-muted-foreground mb-2">💡 Intereses</p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => {
                const isSelected = form.intereses?.split(',').includes(interest);
                return (
                  <button
                    key={interest}
                    disabled={!editing}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors ${isSelected ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted text-muted-foreground'}`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {editing && <Button onClick={handleSave} disabled={saving} className="w-full h-12 rounded-xl">{saving ? 'Guardando...' : 'Guardar cambios'}</Button>}

          <div className="pt-6 border-t space-y-8">
             {/* ... sección de misPreguntas y misProductos se mantiene igual ... */}
             <div>
              <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Mis Preguntas en el Foro
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {misPreguntas.length > 0 ? misPreguntas.map(q => (
                  <div key={q.id} onClick={() => navigate(`/question-detail?id=${q.id}`)} className="p-4 bg-card rounded-[1.5rem] border border-border/50 shadow-sm hover:border-primary transition-all cursor-pointer">
                    <h3 className="text-xs font-bold truncate">{q.title}</h3>
                  </div>
                )) : <p className="text-[10px] italic text-muted-foreground px-2">Aún no has hecho preguntas.</p>}
              </div>
            </div>

            <div>
              <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-accent" /> Mis Productos en Venta
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {misProductos.length > 0 ? misProductos.map(p => (
                  <div key={p.id} onClick={() => setSelectedProduct(p)} className="p-4 bg-card rounded-[1.5rem] border border-border/50 shadow-sm hover:border-accent transition-all cursor-pointer">
                    <h3 className="text-xs font-bold truncate">{p.title || 'Producto'}</h3>
                  </div>
                )) : <p className="text-[10px] italic text-muted-foreground px-2">No tienes productos publicados.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}