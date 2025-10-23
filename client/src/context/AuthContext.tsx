import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'employee' | 'admin' | 'coach';

interface User {
  id: string;
  name: string;
  role: UserRole;
  teamCode?: string;
  companyCode?: string;
  coachCode?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, code: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole, code: string, name: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name,
      role,
      ...(role === 'employee' && { teamCode: code }),
      ...(role === 'admin' && { companyCode: code }),
      ...(role === 'coach' && { coachCode: code }),
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
