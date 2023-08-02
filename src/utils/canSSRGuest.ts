import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import {parseCookies} from 'nookies'
import { parse } from 'path'

// Função que permite apenas visitantes
export function canSSRGuest<p>(fn: GetServerSideProps<p>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<p>> => {

        const cookies = parseCookies(ctx);
        //Se tentar acessar a página já logado, será redirecionado

        if(cookies['@nextauth.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false,
                }
            }
            
        }

        return await fn(ctx)
    }


}