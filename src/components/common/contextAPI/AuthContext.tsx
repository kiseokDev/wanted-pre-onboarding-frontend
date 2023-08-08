import React, { createContext } from 'react';

interface AuthContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const initialAuthContext: AuthContextType = {
    token: null,
    setToken: () => { },
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);
