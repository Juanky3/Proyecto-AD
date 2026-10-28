import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';

function AppContent() {
  const { user } = useAuth();

  // Si no está autenticado, renderiza la pantalla de Login / Registro
  if (!user) {
    return <AuthPage />;
  }

  // Si ya inició sesión, muestra el sistema completo
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0B0F19] to-[#0d1224] text-slate-100 relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pb-12">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}