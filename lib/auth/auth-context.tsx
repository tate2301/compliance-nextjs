'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Helper function to get cookie value
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
            return null;
        };

        // Initialize from localStorage or cookies
        const storedUser = localStorage.getItem('user') || getCookie('user');
        const storedToken = localStorage.getItem('token') || getCookie('token');

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                // Ensure localStorage is in sync
                localStorage.setItem('user', JSON.stringify(parsedUser));
            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
        }

        if (storedToken) {
            try {
                const parsedToken = typeof storedToken === 'string' ? storedToken : JSON.parse(storedToken);
                setToken(parsedToken);
                // Ensure localStorage is in sync
                localStorage.setItem('token', JSON.stringify(parsedToken));
            } catch (error) {
                console.error('Failed to parse token:', error);
            }
        }
    }, []);

    const login = (user: User, token: string) => {
        // Set localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));

        // Set cookies
        document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=2592000`; // 30 days
        document.cookie = `token=${token}; path=/; max-age=2592000`;

        setUser(user);
        setToken(token);
    };

    const logout = () => {
        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // Clear cookies
        document.cookie = 'user=; path=/; max-age=0';
        document.cookie = 'token=; path=/; max-age=0';

        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated: !!user && !!token
        }}>
            {!!user && !!token && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};