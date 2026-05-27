import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
type User = { email: string; role: 'user' | 'admin' }
type AuthContextType = { user: User | null; login: (email: string) => void; logout: () => void }
const AuthContext = createContext<AuthContextType | null>(null)
export function AuthProvider({ children }: { children: ReactNode }) { const [user, setUser] = useState<User | null>(null); const value = useMemo(() => ({ user, login: (email: string) => setUser({ email, role: email.includes('admin') ? 'admin' : 'user' }), logout: () => setUser(null) }), [user]); return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> }
export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth must be used inside AuthProvider'); return ctx }
