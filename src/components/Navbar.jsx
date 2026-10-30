import { useAuth } from '../context/AuthContext';
import { Layers, UserCircle, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/40 border-b border-white/10 px-6 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logotipo */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/20 text-white">
            <Layers size={20} />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
              SGI Distribuido
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                v1.0
              </span>
            </span>
          </div>
        </div>

        {/* Identidad del usuario y Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-2xl backdrop-blur-md shadow-inner text-xs">
            <UserCircle size={18} className="text-indigo-400" />
            <span className="font-semibold text-slate-200">{user?.name}</span>
            <span className={`px-2.5 py-0.5 rounded-lg font-semibold tracking-wide border ${
              user?.role === 'Líder de proyecto'
                ? 'bg-gradient-to-r from-indigo-500/30 to-violet-500/30 border-indigo-400/40 text-indigo-300'
                : 'bg-white/10 border-white/15 text-slate-300'
            }`}>
              {user?.role}
            </span>
          </div>

          <button
            onClick={logout}
            title="Cerrar sesión"
            className="p-2 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition cursor-pointer active:scale-95"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}