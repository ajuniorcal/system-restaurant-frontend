import Head from "next/head"
import Image from 'next/image'
import styles from '../../styles/home.module.scss'

import logoImg from '../../public/logo.svg'

import {Input} from '../components/ui/Input'
import {Button} from '../components/ui/Button'

import Link from "next/link"

export default function Home() {
  return (
    <>
    <Head>
      <title>
        Restaurante - Login
      </title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Restaurante"/>
    

    <div className={styles.login}>
      <form>
        <Input placeholder="Digite seu e-mail" type="text"/>
        <Input placeholder="Vem de Senha" type="password"/>

        <Button
        type="submit"
        loading={false}>
            Acessar
        </Button>
        
      </form>
      <Link href="/signup" className={styles.text}>Não possui conta? Se cadastre
      </Link>
      </div>
    </div>
    </>
  )
}
