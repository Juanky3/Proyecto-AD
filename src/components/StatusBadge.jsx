import { Check, Clock, AlertTriangle, XCircle } from 'lucide-react';

export default function StatusBadge({ status, deadline }) {
  const isOverdue =
    deadline &&
    new Date(deadline) < new Date() &&
    (status === 'Pendiente' || status === 'En progreso');

  if (isOverdue) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 shadow-xs animate-pulse">
        <AlertTriangle size={13} />
        Vencida
      </span>
    );
  }

  const badgeConfig = {
    'Completada': {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      icon: <Check size={13} className="text-emerald-600 stroke-[2.5]" />,
    },
    'En progreso': {
      bg: 'bg-sky-50 text-sky-700 border-sky-200/80',
      icon: <Clock size={13} className="text-sky-600" />,
    },
    'Pendiente': {
      bg: 'bg-slate-50 text-slate-700 border-slate-200/80',
      icon: <Clock size={13} className="text-slate-400" />,
    },
    'No realizada': {
      bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
      icon: <XCircle size={13} className="text-amber-600" />,
    },
  };

  const current = badgeConfig[status] || badgeConfig['Pendiente'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${current.bg} shadow-xs transition-all`}
    >
      {current.icon}
      {status}
    </span>
  );
}