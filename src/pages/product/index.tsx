import Head from "next/head";
import styles from './styles.module.scss'
import {Header} from '../../components/Header'

import {canSSRAuth} from '../../utils/canSSRAuth'

export default function Product(){
    return(
        <>
        <Head>
            <title> Novo Produto - Restaurante</title>
        </Head>

        <div>
            <Header />

            <main className={styles.container}>
            <h1>Novo Produto</h1>

            <form className={styles.form}>
                <select>
                    <option>
                        Bebida
                    </option>
                    <option>
                        Pizzas
                    </option>
                </select>

                <input
                type="text"
                placeholder="Didite o nome do Produto"
                className={styles.input}
                />

                <input
                type="text"
                placeholder="Valor do Produto"
                className={styles.input}
                />

                <textarea
                placeholder="Descreva Seu produto"
                className={styles.input}
                />

                <button className={styles.buttonAdd} type="submit">
                    Cadastrar
                </button>

            </form>

            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return{
        props:{}
    }
})