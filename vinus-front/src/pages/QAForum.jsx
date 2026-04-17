"use client"

import { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import QuestionCard from '../components/qa/QuestionCard';
import CreateQuestionModal from '../components/qa/CreateQuestionModal';

const categories = ['Todos', 'Matemáticas', 'Ciencias', 'Programación', 'Idiomas', 'Historia', 'Arte', 'Derecho', 'Ingeniería', 'Otros'];

export default function QAForums() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showCreate, setShowCreate] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const qRes = await apiClient.get('/forum-questions');
      const preguntasData = qRes.data;

      const preguntasConConteo = await Promise.all(
        preguntasData.map(async (q) => {
          try {
            const resAns = await apiClient.get(`/forum-answers/question/${q.id}`);
            return { ...q, answer_count: resAns.data.length };
          } catch (e) {
            return { ...q, answer_count: 0 };
          }
        })
      );

      setQuestions(preguntasConConteo);

      try {
        const meRes = await apiClient.get('/auth/me');
        setUser(meRes.data);
      } catch (e) {
        console.warn("Auth/me no encontrado.");
      }

    } catch (error) {
      console.error("Error cargando preguntas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const filtered = questions.filter(q =>
    selectedCategory === 'Todos' || q.category === selectedCategory
  );

  return (
    <div className="pb-24">
      <div className="flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 space-y-3">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm font-medium">No hay dudas publicadas en {selectedCategory}.</p>
          </div>
        ) : (
          filtered.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onClick={() => navigate(`/question-detail?id=${q.id}`)}
            />
          ))
        )}
      </div>
      <button
        onClick={() => setShowCreate(true)}
        className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/25 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showCreate && (
        <CreateQuestionModal
          user={user}
          onClose={() => setShowCreate(false)}
          onCreated={loadData}
        />
      )}
    </div>
  );
}