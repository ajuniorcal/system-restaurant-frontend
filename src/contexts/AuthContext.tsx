import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from '../services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { useRouter, NextRouter } from 'next/router';
import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: (router: NextRouter) => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
    id: string;
    name: string;
    email: string;
};

type SignInProps = {
    email: string;
    password: string;
};

type SignUpProps = {
    name: string;
    email: string;
    password: string;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut(router: NextRouter){
    try{
        destroyCookie(undefined, '@nextauth.token');
        router.push('/');
    } catch {
        console.log('erro ao deslogar');
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps | null>(null);
    const isAuthenticated = !!user;
    const router = useRouter();

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();
        if (token) {
            api.get('/me')
                .then(response => {
                    const { id, name, email } = response.data;
                    setUser({
                        id,
                        name,
                        email
                    });
                })
                .catch(() => {
                    signOut(router);
                });
        }
    }, []);

    async function signIn({ email, password }: SignInProps){
        try{
            const response = await api.post('/session', { email, password });
            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            });

            setUser({
                id,
                name,
                email,
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            toast.success('Logado com sucesso!');
            router.push('/dashboard');
        } catch (err) {
            toast.error("Erro ao acessar!");
            console.error("ERRO AO ACESSAR", err);
        }
    }

    async function signUp({ name, email, password }: SignUpProps){
        try{
            const response = await api.post('/users', { name, email, password });
            toast.success("Conta criada com sucesso!");
            router.push('/');
        } catch (err) {
            toast.error("Erro ao cadastrar!");
            console.error("Erro ao cadastrar", err);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}
