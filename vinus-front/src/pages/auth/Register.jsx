import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import apiClient from '@/api/apiClient';
import { useAuth } from '@/lib/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '', nombre: '', fechaNacimiento: '', sexo: '', password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/register', formData);
      login(response.data, response.data.email);
      navigate('/');
    } catch (error) {
      alert("Error al registrar: " + (error.response?.data || "Intenta de nuevo"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <button onClick={() => navigate(-1)} className="p-2 mb-6 rounded-xl hover:bg-muted"><ArrowLeft /></button>
      <h2 className="text-2xl font-bold mb-6">Crea tu cuenta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required type="text" placeholder="Nombre completo" className="w-full p-4 rounded-xl bg-muted" onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
        <input required type="email" placeholder="Correo" className="w-full p-4 rounded-xl bg-muted" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input required type="date" className="w-full p-4 rounded-xl bg-muted" onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})} />
        <select required className="w-full p-4 rounded-xl bg-muted" onChange={(e) => setFormData({...formData, sexo: e.target.value})}>
            <option value="">Selecciona tu sexo</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
        </select>
        <input required type="password" placeholder="Contraseña" className="w-full p-4 rounded-xl bg-muted" onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button disabled={loading} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold">
          {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}