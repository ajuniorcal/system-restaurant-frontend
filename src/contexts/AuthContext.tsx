
import { createContext, ReactNode, useState } from "react";
import {api} from '../services/apiClient';

import {destroyCookie, setCookie, parseCookies} from 'nookies';
import Router from 'next/router'

import {toast} from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')

    }catch{
        console.log('Erro ao Deslogar')
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user; 

    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/session', {
               email,
               password 
            })
            /* console.log(response.data) */
            const {id, name, token} = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAg: 60*60*24*30, //Expira em um mes.
                path: "/" //Quais Caminhos terao o cookie: todos
            })

            setUser({
                id,
                name,
                email,
            })

            //Passar para as proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Bem vindo, logado com sucesso')
            //Redirecionar usuario para Dashboard

            Router.push('/dashboard')

        }catch(err){
            toast.error('Erro ao acessar')
            console.log("Erro ao acessar: ", err)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('/users', {
                name,
                email,
                password,
            })

           toast.success("Conta Criada com Sucesso")
            Router.push('/')

        }catch(err){
            toast.error("Erro ao Cadastrar, contate o Suporte")
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}