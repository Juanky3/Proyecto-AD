import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function ObservationModal({ isOpen, onClose, onConfirm }) {
  const [observation, setObservation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!observation.trim()) return;
    onConfirm(observation);
    setObservation('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-100"
        >
          <div className="flex items-center gap-2 text-rose-600 mb-2">
            <AlertCircle size={22} />
            <h3 className="font-semibold text-lg text-slate-900">Actividad No Realizada</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Debe registrar obligatoriamente una observación explicando el motivo del incumplimiento.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              required
              rows={3}
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Describa el motivo..."
              className="w-full text-sm text-slate-900 bg-white p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-rose-600 text-white font-medium rounded-xl hover:bg-rose-700 transition"
              >
                Guardar Observación
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}