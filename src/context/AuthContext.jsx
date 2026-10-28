import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicialmente null para que aparezca el Login de entrada (o con un objeto para testear directamente)
  const [user, setUser] = useState(null);

  const login = (role = 'Líder de proyecto', name = 'Juan Toaso') => {
    setUser({
      id: Date.now(),
      name,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);