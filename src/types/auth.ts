import { ReactNode } from 'react';
import { User } from './user';

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