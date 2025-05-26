// src/auth/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, logout as apiLogout, getSession } from './authApi';

interface User { username: string; loginAt: string; }
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 初回マウント時にセッション確認
    useEffect(() => {
        getSession()
            .then(u => setUser(u))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (username: string, password: string) => {
        setLoading(true);
        try {
            const u = await apiLogin(username, password);
            setUser(u);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await apiLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// フック
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('AuthProvider 未設定です');
    return ctx;
};