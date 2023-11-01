import { useState, FormEvent } from 'react';

import Head from "next/head";
import { Header } from '../../components/Header';
import styles from './styles.module.scss';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (name === '') {
            toast.error('Por favor, insira um nome para a categoria.');
            return;
        }

        try {
            const apiClient = setupAPIClient(); // Se o setupAPIClient realmente precisa do contexto, considere passar como parâmetro
            await apiClient.post('/category', { name });
            toast.success('Categoria Cadastrada com sucesso');
            setName('');
        } catch (error) {
            toast.error('Erro ao cadastrar a categoria. Tente novamente.');
            console.error("Erro ao criar categoria:", error.response?.data || error.message);
        }
    }

    return (
        <>
            <Head>
                <title>Nova Categoria - Restaurante</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Cadastrar Nova Categoria</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Digite o nome da Categoria"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button type="submit" className={styles.buttonAdd}>
                            Cadastrar Categoria
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
});
