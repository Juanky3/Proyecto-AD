import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Shield, ShieldCheck, UserCheck } from 'lucide-react';

export default function TeamManagementModal({ isOpen, onClose, members, onUpdateRole }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-slate-900/90 border border-white/10 backdrop-blur-2xl rounded-[32px] shadow-2xl w-full max-w-lg p-7 text-slate-100"
        >
          {/* Cabecera */}
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Gestión de Integrantes y Roles</h3>
                <p className="text-xs text-slate-400 font-light">Asigna o retira permisos de líder de proyecto</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Lista de miembros */}
          <div className="mt-5 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {members.map((member) => {
              const isLeader = member.role === 'Líder de proyecto';

              return (
                <div
                  key={member.email || member.name}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 hover:bg-white/[0.08] transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${member.color} flex items-center justify-center font-bold text-white text-sm shadow-md`}>
                      {member.initials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5">
                        {member.name}
                        {isLeader && (
                          <span title="Líder activo">
                            <ShieldCheck size={14} className="text-indigo-400" />
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-400">{member.email}</p>
                    </div>
                  </div>

                  {/* Selector de Rol individual */}
                  <div className="flex items-center gap-2">
                    <select
                      value={member.role}
                      onChange={(e) => onUpdateRole(member.name, e.target.value)}
                      className={`text-xs font-semibold rounded-xl px-3 py-2 border focus:outline-none transition cursor-pointer ${
                        isLeader
                          ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <option value="Integrante" className="bg-slate-900 text-slate-200">
                        Integrante
                      </option>
                      <option value="Líder de proyecto" className="bg-slate-900 text-slate-200">
                        Líder de proyecto
                      </option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pie del modal */}
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-indigo-300">
              <Shield size={14} /> Los cambios aplican de inmediato en los permisos
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition cursor-pointer"
            >
              Listo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}