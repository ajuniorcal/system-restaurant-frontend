import {useState, ChangeEvent} from 'react'
import Head from "next/head";
import styles from './styles.module.scss'
import {Header} from '../../components/Header'

import {canSSRAuth} from '../../utils/canSSRAuth'

import {FiUpload} from 'react-icons/fi'

export default function Product(){

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    function handleFile(e:ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return
        }

        const image = e.target.files[0];

        if(!image){
            return
        }

        if(image.type === 'image/jpeg' || image.type =='image/png'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

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

                <label className={styles.labelAvatar}>
                    <span>
                        <FiUpload size = {40} color="#fff"/>
                    </span>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                    {avatarUrl && (
                        <img 
                        className={styles.preview}
                        src={avatarUrl}
                        alt="Imagem do produto"
                        width={250}
                        height={250}
                        />
                    )}


                    

                    
                </label>


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