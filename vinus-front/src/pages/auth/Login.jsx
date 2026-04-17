import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import apiClient from '@/api/apiClient';
import { useAuth } from '@/lib/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const userData = response.data;

      if (userData && userData.nombre) {
        localStorage.setItem('usuario_nombre', userData.nombre);
      }

      login(userData, userData.email);
      navigate('/');
    } catch (err) {
      console.error("Error de login:", err);
      setError('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <button onClick={() => navigate(-1)} className="p-2 mb-6 rounded-xl hover:bg-muted"><ArrowLeft /></button>
      <h2 className="text-2xl font-bold mb-6">Iniciar sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          required
          type="email"
          placeholder="Correo"
          className="w-full p-4 rounded-xl bg-muted"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Contraseña"
          className="w-full p-4 rounded-xl bg-muted"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          disabled={loading}
          className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Entrar a Vinus'}
        </button>
      </form>
    </div>
  );
}