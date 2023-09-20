import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string|null>('');

    useEffect(() => {;
        const tokenFromStorage = localStorage.getItem('access_token')
        setToken(tokenFromStorage);
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}


