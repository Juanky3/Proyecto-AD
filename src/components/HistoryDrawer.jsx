import { motion, AnimatePresence } from 'framer-motion';
import { X, History, ArrowRight } from 'lucide-react';

export default function HistoryDrawer({ isOpen, onClose, activity }) {
  if (!isOpen || !activity) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-indigo-600 font-bold">
                <History size={20} />
                <span>Historial de Estados</span>
              </div>
              <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-slate-800 text-sm">{activity.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">Responsable: {activity.responsible}</p>
            </div>

            <div className="mt-6 space-y-4 overflow-y-auto max-h-[70vh] pr-1">
              {activity.history && activity.history.length > 0 ? (
                activity.history.map((h, index) => (
                  <div key={index} className="relative pl-5 border-l-2 border-indigo-200 space-y-1">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-600" />
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span>{h.previousStatus}</span>
                      <ArrowRight size={12} className="text-slate-400" />
                      <span className="text-indigo-600 font-bold">{h.newStatus}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex justify-between">
                      <span>Por: {h.user}</span>
                      <span>{h.date}</span>
                    </div>
                    {h.observation && (
                      <p className="text-xs bg-slate-50 p-2 rounded-lg text-slate-600 border border-slate-100 mt-1 italic">
                        "{h.observation}"
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">Sin historial registrado aún.</p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
          >
            Cerrar
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}