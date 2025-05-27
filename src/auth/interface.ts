import { ReactNode } from 'react';

export interface User {
    username: string;
    loginAt: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

// Props に children を含める
export interface AuthProviderProps {
    children: ReactNode;
}