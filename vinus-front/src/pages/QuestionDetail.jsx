"use client"

import { useState, useEffect } from 'react';
import { ArrowLeft, Users, ThumbsUp, Send, Loader2, Trash2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import { toast } from 'sonner';
import moment from 'moment';
import 'moment/locale/es';

export default function QuestionDetail() {
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get('id');
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const usuarioActual = localStorage.getItem('usuario_nombre');

  const loadData = async () => {
    if (!questionId) return;
    try {
      setLoading(true);
      const [qRes, aRes] = await Promise.all([
        apiClient.get(`/forum-questions/${questionId}`),
        apiClient.get(`/forum-answers/question/${questionId}`).catch(() => ({ data: [] }))
      ]);

      setQuestion(qRes.data);
      setAnswers(aRes.data);
    } catch (error) {
      toast.error("No se pudo cargar la información");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    moment.locale('es');
    loadData();
  }, [questionId]);

  const handleDelete = async () => {
    if (window.confirm("¿Segura que quieres eliminar esta duda?")) {
      try {
        await apiClient.delete(`/forum-questions/${questionId}?authorName=${encodeURIComponent(usuarioActual)}`);
        toast.success("Pregunta eliminada");
        navigate('/qa');
      } catch (error) {
        toast.error("No tienes permiso o hubo un error al borrar");
      }
    }
  };

  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) return;
    setSubmitting(true);
    try {
      await apiClient.post(`/forum-answers/question/${questionId}`, {
        content: newAnswer.trim(),
        author_name: usuarioActual || 'Estudiante',
        author_avatar: ''
      });
      toast.success('¡Gracias por tu ayuda!');
      setNewAnswer('');
      loadData();
    } catch (e) {
      toast.error('No se pudo publicar');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSameProblem = async () => {
    try {
      await apiClient.patch(`/forum-questions/${questionId}/same-problem`);
      loadData();
    } catch (e) {
      toast.error('No se pudo registrar');
    }
  };

  const handleVoteAnswer = async (answerId) => {
    try {
      await apiClient.patch(`/forum-answers/${answerId}/upvote`);
      loadData();
    } catch (e) {
      toast.error("No se pudo votar");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/qa')} className="p-2.5 rounded-2xl bg-muted/50 hover:bg-muted transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-extrabold text-sm">Detalle de Consulta</span>
      </header>

      <div className="px-4 pt-6 space-y-6 max-w-2xl mx-auto">
        <article className="bg-card rounded-[2.5rem] border p-6 shadow-sm">
          <h2 className="text-xl font-black mb-4">{question.title}</h2>
          <p className="text-sm text-muted-foreground">{question.content}</p>
          <div className="flex items-center gap-2 mt-6 pt-6 border-t">
            <button onClick={handleSameProblem} className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-muted text-xs font-black">
              <Users className="w-4 h-4" /> {question.same_problem_count || 0}
            </button>
            {question.author_name === usuarioActual && (
              <button onClick={handleDelete} className="p-2.5 rounded-2xl text-red-400 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
            )}
          </div>
        </article>

        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase px-2 text-muted-foreground">Respuestas ({answers.length})</h3>
          {answers.map((answer) => (
            <div key={answer.id} className="bg-card rounded-[2rem] border p-5 shadow-sm">
              <span className="text-xs font-black">{answer.author_name}</span>
              <p className="text-sm text-muted-foreground mt-2">{answer.content}</p>
              <button onClick={() => handleVoteAnswer(answer.id)} className="mt-4 flex items-center gap-2 text-[10px] font-black">
                <ThumbsUp className="w-3.5 h-3.5" /> {answer.upvotes || 0}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-2xl border-t p-5 pb-10">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <input
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Escribe tu respuesta..."
            className="flex-1 h-14 px-6 rounded-2xl bg-card border text-sm font-bold"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
          />
          <button onClick={handleSubmitAnswer} disabled={submitting} className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
            {submitting ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}