import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Layers,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
} from 'lucide-react';

// Credenciales fijas predefinidas del equipo con sus roles específicos
const PRESET_USERS = {
  'juan.toaso@sgi.com': {
    password: '123',
    name: 'Juan Toaso',
    role: 'Líder de proyecto',
  },
  'anderson.iza@sgi.com': {
    password: '123',
    name: 'Anderson Iza',
    role: 'Integrante',
  },
  'gabriel.pantoja@sgi.com': {
    password: '123',
    name: 'Gabriel Pantoja',
    role: 'Integrante',
  },
  'legner.yaguana@sgi.com': {
    password: '123',
    name: 'Legner Yaguana',
    role: 'Integrante',
  },
};

export default function AuthPage() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Base local mutable para usuarios registrados durante la sesión
  const [registeredUsers, setRegisteredUsers] = useState(PRESET_USERS);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const emailTrimmed = formData.email.trim().toLowerCase();
    const passTrimmed = formData.password.trim();

    if (isRegister) {
      // Flujo de Registro
      if (!formData.name.trim() || !emailTrimmed || !passTrimmed) {
        setErrorMessage('Por favor completa todos los campos.');
        return;
      }

      if (registeredUsers[emailTrimmed]) {
        setErrorMessage('Este correo ya se encuentra registrado en el sistema.');
        return;
      }

      // Los nuevos registros entran con rol "Integrante" por defecto
      const newUser = {
        name: formData.name.trim(),
        password: passTrimmed,
        role: 'Integrante',
      };

      setRegisteredUsers((prev) => ({
        ...prev,
        [emailTrimmed]: newUser,
      }));

      // Autentica e ingresa automáticamente
      login(newUser.role, newUser.name);
    } else {
      // Flujo de Inicio de Sesión
      const userFound = registeredUsers[emailTrimmed];

      if (!userFound || userFound.password !== passTrimmed) {
        setErrorMessage('Credenciales inválidas. Verifica tu correo y contraseña.');
        return;
      }

      // Credenciales correctas: ingresa con el rol asignado por el sistema
      login(userFound.role, userFound.name);
    }
  };

  // Función para rellenar rápido desde las cuentas demo
  const fillCredentials = (email, pass) => {
    setErrorMessage('');
    setIsRegister(false);
    setFormData({
      name: '',
      email,
      password: pass,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#0B0F19] to-[#0d1224] text-slate-100">
      
      {/* Luces y esferas atmosféricas */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-[-15%] left-[-10%] w-[550px] h-[550px] rounded-full bg-indigo-600/30 blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.22, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="fixed bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/25 blur-[140px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10 space-y-4"
      >
        {/* Cabecera / Identidad visual */}
        <div className="text-center space-y-2">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="inline-flex p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-xl shadow-indigo-500/25 text-white mb-1 cursor-pointer border border-white/20"
          >
            <Layers size={28} />
          </motion.div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
            SGI Distribuido
          </h1>
          <p className="text-xs text-slate-400 font-light max-w-xs mx-auto">
            {isRegister
              ? 'Registro de nuevo miembro en el Servicio de Usuarios'
              : 'Accede con tus credenciales asignadas'}
          </p>
        </div>

        {/* Tarjeta Glassmorphism */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-2xl p-7 relative overflow-hidden">
          
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

          {/* Selector de modo Login / Registro */}
          <div className="relative flex bg-white/5 border border-white/10 p-1.5 rounded-2xl mb-5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setErrorMessage('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition duration-200 relative z-10 cursor-pointer ${
                !isRegister ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setErrorMessage('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition duration-200 relative z-10 cursor-pointer ${
                isRegister ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Registrarse
            </button>

            {/* Píldora animada de fondo */}
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className={`absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-500/30 ${
                isRegister ? 'left-[50%] right-1.5' : 'left-1.5 right-[50%]'
              }`}
            />
          </div>

          {/* Mensaje de Error Animado */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium"
              >
                <AlertCircle size={16} className="text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {/* Campo Nombre Completo (solo en Registro) */}
              {isRegister && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1.5"
                >
                  <label className="block text-xs font-semibold text-slate-300">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      required={isRegister}
                      placeholder="Ej. Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-100 placeholder:text-slate-500 transition"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Correo Electrónico */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Correo institucional / electrónico *
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="usuario@sgi.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-100 placeholder:text-slate-500 transition"
                />
              </div>
            </div>

            {/* Contraseña con botón de ver/ocultar */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Contraseña *
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full text-xs pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-100 placeholder:text-slate-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Nota de rol en caso de registro */}
            {isRegister && (
              <p className="text-[11px] text-slate-400 bg-white/5 p-2.5 rounded-xl border border-white/10">
                ℹ️ Los nuevos usuarios son dados de alta como <strong>Integrante</strong>. Un líder de proyecto podrá actualizar tus privilegios posteriormente.
              </p>
            )}

            {/* Botón Principal */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/30 border border-indigo-400/30 transition cursor-pointer"
            >
              <span>{isRegister ? 'Registrar Cuenta' : 'Acceder al Sistema'}</span>
              <ArrowRight size={15} />
            </motion.button>
          </form>

          {/* Sección de Cuentas Demo Rápidas */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
              <KeyRound size={13} className="text-indigo-400" />
              <span>Cuentas de prueba autorizadas (Contraseña: 123):</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillCredentials('juan.toaso@sgi.com', '123')}
                className="text-left p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
              >
                <div className="text-xs font-bold text-indigo-300">Juan Toaso</div>
                <div className="text-[10px] text-emerald-400 font-medium">Líder de proyecto</div>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('anderson.iza@sgi.com', '123')}
                className="text-left p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-200">Anderson Iza</div>
                <div className="text-[10px] text-sky-400 font-medium">Integrante</div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}