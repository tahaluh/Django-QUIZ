import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { Login } from './services.tsx/login';
import { apiRoutes } from '../../services/apiRoutes';
import api from '../../services/api';

interface AuthUser {
    uuid: string;
    username: string | null;
    email: string;
    first_name: string;
    last_name: string;
}

interface AuthContextType {
    isAuthorized: boolean;
    user: AuthUser | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    refreshToken: () => void;
}

interface DecodedToken {
    exp: number;
    iat: number;
    jti: string;
    token_type: string;
    user: AuthUser
    user_id: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const decodedToken: DecodedToken = jwtDecode(token);
            const tokenExpiration = decodedToken?.exp ? decodedToken.exp * 1000 : 0;
            const now = Date.now();
            if (tokenExpiration < now) {
                refreshToken().then(() => setIsLoading(false));
            } else {
                setUser(decodedToken.user);
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }

    }, []);



    const login = async (email: string, password: string) => {
        try {
            const res = await Login({
                email,
                password
            });


            if (res.error) {
                console.error(res.error);
                setIsLoading(false);
                return false;
            }

            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

            const decodedToken: DecodedToken = jwtDecode(res.data.access);
            setUser(decodedToken.user);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setUser(null);
            return;
        }

        try {
            const response = await api.post(apiRoutes.auth.refreshToken, { refresh: refreshToken });
            if (response.status !== 200) {
                setUser(null);
                return;
            }
            const token = response.data.access;
            localStorage.setItem(ACCESS_TOKEN, token);
            const decodedToken: DecodedToken = jwtDecode(token);
            setUser(decodedToken.user);
        } catch (error) {
            console.error('Refresh token error:', error);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthorized: !!user, user, isLoading, login, logout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
