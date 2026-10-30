import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import ObservationModal from '../components/ObservationModal';
import NewActivityModal from '../components/NewActivityModal';
import HistoryDrawer from '../components/HistoryDrawer';
import TeamManagementModal from '../components/TeamManagementModal';
import { Plus, Clock, Users, Calendar, History, Sparkles, Filter, UserCog } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const isLeader = user?.role === 'Líder de proyecto';

  const [project] = useState({
    id: 1,
    name: 'Sistema de Gestión y Seguimiento de Actividades',
    description: 'Sistema distribuido para coordinar el trabajo en equipo mediante API REST.',
  });

  // Lista de integrantes con sus roles y correos
  const [projectMembers, setProjectMembers] = useState([
    { name: 'Juan Toaso', email: 'juan.toaso@sgi.com', role: 'Líder de proyecto', initials: 'JT', color: 'bg-emerald-500' },
    { name: 'Anderson Iza', email: 'anderson.iza@sgi.com', role: 'Integrante', initials: 'AI', color: 'bg-fuchsia-500' },
    { name: 'Gabriel Pantoja', email: 'gabriel.pantoja@sgi.com', role: 'Integrante', initials: 'GP', color: 'bg-sky-500' },
    { name: 'Legner Yaguana', email: 'legner.yaguana@sgi.com', role: 'Integrante', initials: 'LY', color: 'bg-rose-500' },
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Análisis de requisitos y casos de uso',
      responsible: 'Anderson Iza',
      hours: 4,
      startDate: '2026-10-15',
      deadline: '2026-11-05',
      status: 'Completada',
      observation: '',
      history: [
        { previousStatus: '-', newStatus: 'Pendiente', user: 'Anderson Iza', date: '15/10/2026, 09:00', observation: 'Creación' },
        { previousStatus: 'Pendiente', newStatus: 'Completada', user: 'Anderson Iza', date: '20/10/2026, 17:30', observation: 'Requisitos listos' },
      ],
    },
    {
      id: 2,
      title: 'Diseño de modelos de datos y API',
      responsible: 'Legner Yaguana',
      hours: 6,
      startDate: '2026-10-18',
      deadline: '2026-11-12',
      status: 'Completada',
      observation: '',
      history: [
        { previousStatus: '-', newStatus: 'Pendiente', user: 'Legner Yaguana', date: '18/10/2026, 10:00', observation: 'Creación' },
        { previousStatus: 'Pendiente', newStatus: 'Completada', user: 'Legner Yaguana', date: '24/10/2026, 11:15', observation: 'Endpoints listos' },
      ],
    },
    {
      id: 3,
      title: 'Bocetos y maquetación de interfaz web',
      responsible: 'Juan Toaso',
      hours: 5,
      startDate: '',
      deadline: '2026-10-20',
      status: 'Completada',
      observation: '',
      history: [
        { previousStatus: '-', newStatus: 'Pendiente', user: 'Juan Toaso', date: '19/10/2026, 08:30', observation: 'Creación' },
        { previousStatus: 'Pendiente', newStatus: 'Completada', user: 'Juan Toaso', date: '25/10/2026, 15:45', observation: 'Mockups y componentes listos' },
      ],
    },
    {
      id: 4,
      title: 'Configuración inicial del repositorio',
      responsible: 'Gabriel Pantoja',
      hours: 2,
      startDate: '',
      deadline: '2026-10-25',
      status: 'No realizada',
      observation: 'Falta de permisos en la organización',
      history: [
        { previousStatus: '-', newStatus: 'Pendiente', user: 'Gabriel Pantoja', date: '20/10/2026, 14:00', observation: 'Creación' },
        { previousStatus: 'Pendiente', newStatus: 'No realizada', user: 'Gabriel Pantoja', date: '25/10/2026, 18:00', observation: 'Falta de permisos en la organización' },
      ],
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('Todas');
  const [isObservationModalOpen, setIsObservationModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [historyActivity, setHistoryActivity] = useState(null);

  const completedCount = activities.filter((a) => a.status === 'Completada').length;
  const progressPercentage = activities.length > 0 ? Math.round((completedCount / activities.length) * 100) : 0;

  // Cambiar rol de un miembro
  const handleUpdateMemberRole = (memberName, newRole) => {
    setProjectMembers((prev) =>
      prev.map((m) => (m.name === memberName ? { ...m, role: newRole } : m))
    );

    if (user?.name === memberName) {
      user.role = newRole;
    }
  };

  const handleStatusChange = (activity, newStatus) => {
    if (newStatus === 'No realizada') {
      setSelectedActivity(activity);
      setIsObservationModalOpen(true);
      return;
    }

    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === activity.id) {
          const newHistory = [
            ...(act.history || []),
            {
              previousStatus: act.status,
              newStatus,
              user: user?.name || 'Usuario',
              date: new Date().toLocaleString(),
              observation: '',
            },
          ];
          return { ...act, status: newStatus, observation: '', history: newHistory };
        }
        return act;
      })
    );
  };

  const handleConfirmObservation = (reason) => {
    if (!selectedActivity) return;

    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === selectedActivity.id) {
          const newHistory = [
            ...(act.history || []),
            {
              previousStatus: act.status,
              newStatus: 'No realizada',
              user: user?.name || 'Usuario',
              date: new Date().toLocaleString(),
              observation: reason,
            },
          ];
          return { ...act, status: 'No realizada', observation: reason, history: newHistory };
        }
        return act;
      })
    );
    setIsObservationModalOpen(false);
  };

  const handleAddActivity = (newAct) => {
    setActivities((prev) => [newAct, ...prev]);
  };

  const filteredActivities = activities.filter((act) => {
    const isOverdue =
      act.deadline &&
      new Date(act.deadline) < new Date() &&
      (act.status === 'Pendiente' || act.status === 'En progreso');
    if (activeFilter === 'Todas') return true;
    if (activeFilter === 'Vencidas') return isOverdue;
    return act.status === activeFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 space-y-6">
      
      {/* TARJETA SUPERIOR HERO GLASSMORPHISM */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] p-8 text-white shadow-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-slate-950/80 border border-white/10 backdrop-blur-2xl"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-violet-600/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 inline-block shadow-xs">
              Proyecto Activo
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl drop-shadow-sm">
              {project.name}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {project.description}
            </p>

            {/* Integrantes y Botón de Gestión */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold mr-1">
                <Users size={16} className="text-indigo-400" />
                <span>Integrantes:</span>
              </div>
              <div className="flex -space-x-2">
                {projectMembers.map((m, idx) => (
                  <div
                    key={idx}
                    title={`${m.name} (${m.role})`}
                    className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center text-[11px] font-bold text-white border-2 border-slate-900 shadow-md cursor-pointer hover:scale-110 transition-transform`}
                  >
                    {m.initials}
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-300 font-medium">
                {projectMembers.map((m) => `${m.name}${m.role === 'Líder de proyecto' ? ' (Líder)' : ''}`).join(' • ')}
              </span>

              {/* Botón Gestión de Roles (Exclusivo para Líder) */}
              {isLeader && (
                <button
                  onClick={() => setIsTeamModalOpen(true)}
                  className="ml-2 flex items-center gap-1.5 text-[11px] font-semibold bg-white/10 hover:bg-white/15 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-xl transition cursor-pointer"
                >
                  <UserCog size={13} />
                  <span>Gestionar Roles</span>
                </button>
              )}
            </div>
          </div>

          {/* Tarjeta Glassmorphism de Progreso */}
          <div className="w-full lg:w-96 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 backdrop-blur-md flex items-center justify-center font-black text-2xl text-white border border-white/20 shadow-inner">
                {progressPercentage}%
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1.5">
                  <span>Progreso Global</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full shadow-lg shadow-indigo-500/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {progressPercentage === 100 && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold py-2 rounded-xl"
              >
                <Sparkles size={16} />
                ¡Proyecto Completado! 🎉
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* SECCIÓN DE ACTIVIDADES */}
      <div className="bg-slate-900/60 backdrop-blur-xl rounded-[32px] border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Cabecera y Filtros */}
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Actividades</h2>
            <p className="text-xs text-slate-400">Supervisión y control de avance por integrante</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-2xl text-xs font-medium text-slate-300">
              <Filter size={13} className="ml-2 text-slate-400" />
              {['Todas', 'Pendiente', 'En progreso', 'Completada', 'No realizada', 'Vencidas'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-md shadow-indigo-500/25'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Botón Nueva Actividad (Solo para Líder) */}
            {isLeader && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsNewModalOpen(true)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/30 border border-indigo-400/30 transition cursor-pointer"
              >
                <Plus size={16} />
                <span>Nueva Actividad</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Listado de Actividades */}
        <div className="divide-y divide-white/5">
          <AnimatePresence>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((act) => (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  layout
                  className="p-5 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-white/[0.03] transition"
                >
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-slate-100 text-sm">{act.title}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="font-semibold text-slate-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-lg">
                        {act.responsible}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-slate-400" /> {act.hours}h estimadas
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" /> Límite: {act.deadline}
                      </span>
                    </div>

                    {act.observation && (
                      <p className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl inline-block mt-1 font-medium">
                        <strong>Motivo de incumplimiento:</strong> {act.observation}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={act.status} deadline={act.deadline} />

                    {/* Selector de estado oscuro */}
                    <select
                      value={act.status}
                      onChange={(e) => handleStatusChange(act, e.target.value)}
                      className="text-xs font-semibold bg-slate-950/80 hover:bg-slate-900 border border-white/15 text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition"
                    >
                      <option value="Pendiente" className="bg-slate-900 text-slate-200">Pendiente</option>
                      <option value="En progreso" className="bg-slate-900 text-slate-200">En progreso</option>
                      <option value="Completada" className="bg-slate-900 text-slate-200">Completada</option>
                      <option value="No realizada" className="bg-slate-900 text-slate-200">No realizada</option>
                    </select>

                    {/* Botón Historial */}
                    <button
                      onClick={() => setHistoryActivity(act)}
                      title="Ver historial de cambios"
                      className="p-2 text-slate-400 hover:text-indigo-300 hover:bg-white/10 rounded-xl transition cursor-pointer"
                    >
                      <History size={17} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-500 text-xs">
                No hay actividades que coincidan con el filtro seleccionado.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modales y Drawers */}
      <ObservationModal
        isOpen={isObservationModalOpen}
        onClose={() => setIsObservationModalOpen(false)}
        onConfirm={handleConfirmObservation}
      />

      <NewActivityModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAdd={handleAddActivity}
        members={projectMembers.map((m) => m.name)}
      />

      <HistoryDrawer
        isOpen={Boolean(historyActivity)}
        onClose={() => setHistoryActivity(null)}
        activity={historyActivity}
      />

      <TeamManagementModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        members={projectMembers}
        onUpdateRole={handleUpdateMemberRole}
      />
    </div>
  );
}