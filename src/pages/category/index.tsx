import {useState, FormEvent} from 'react'

import Head from "next/head"
import {Header} from '../../components/Header'
import styles from './styles.module.scss'
import {setupAPIClient} from '../../services/api'
import {toast} from 'react-toastify'

export default function Category(){
    const [name, Setname] = useState('')

    async function handleRegister(event:FormEvent) {
        event.preventDefault
        
        if(name=== ''){
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        })

        toast.success('Categoria Cadastrada com sucesso')
        Setname('');
    }

    return(
        <>
        <Head>
            <title>Nova Categoria - Restaurante</title>
        </Head>
        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Cadastrar Nova Categoria</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                    type="text"
                    placeholder="Digite o nome da Categoria"
                    className={styles.input}
                    value={name}
                    onChange={(e) => Setname(e.target.value)}
                    />
                    <button type="submit" className={styles.buttonAdd}>
                        Cadastrar Categoria
                    </button>

                </form>
            </main>
        </div>
        </>
    )
}