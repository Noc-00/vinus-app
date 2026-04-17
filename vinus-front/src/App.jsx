import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/AuthContext';

import AppLayout from './components/AppLayout';
import PageNotFound from './lib/PageNotFound';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import Welcome from './pages/auth/Welcome';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

import Home from './pages/Home';
import Shop from './pages/Shop';
import QA from './pages/QA';
import Fanbase from './pages/Fanbase';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import QuestionDetail from './pages/QuestionDetail';
import ChatRoom from './pages/ChatRoom';

const AuthenticatedApp = () => {
  const { isAuthenticated, isLoadingAuth, authError, navigateToLogin } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin?.();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/qa" element={<QA />} />
        <Route path="/fanbase" element={<Fanbase />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/settings" element={<Settings />} />
      <Route path="/question-detail" element={<QuestionDetail />} />
      <Route path="/chat-room" element={<ChatRoom />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/*" element={<AuthenticatedApp />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;