import Head from 'next/head'
import Link from 'next/link'
import { useSession, getSession, signOut } from 'next-auth/react'

export default function Home() {

  const { data: session } = useSession()

  function handleSignOut(){
    signOut()
  }
  
  return (
    <>
      <Head><title>Easynotes - Home</title></Head>
      <h1>Hello world</h1>
      { session ? Logged({session, handleSignOut}) : NotLogged()}
    </>
  )
}

function NotLogged(){
  return (
    <main>
      <h2>Hola Mundo - Recuerda iniciar sesión</h2>
      <Link href='/login'>Iniciar sesión</Link>
    </main>
  )
}

export async function getServerSideProps({req}){
  const session = await getSession({req})

  if (!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  if (session){
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props:{session}
  }
}