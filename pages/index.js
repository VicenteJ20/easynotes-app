import Head from 'next/head'
import style from '../styles/Home.module.css'
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

function Logged({session, handleSignOut}){
  return (
    <main>
      <h2>Usuario Autorizado</h2>
      <div>
        <h3>Username: {session.user.name}</h3>
        <h3>Email: {session.user.email}</h3>
      </div>
      <div className={style.SignOutDiv}>
        <button onClick={handleSignOut}>Cerrar sesión</button>
      </div>
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

  return {
    props:{session}
  }
}