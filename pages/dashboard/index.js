import Head from 'next/head'
import DashboardLayout from '../../layout/dashboardlayout'
import { useSession, getSession } from 'next-auth/react'
import style from '../../styles/DashboardHome.module.css'
import { useReducer } from 'react'

const formReducer = (state, event) => {
  return{
    ...state,
    [event.target.name]: event.target.value
  }
}

export default function Dashboard(){
  
  const { data: session } = useSession()

  return (
    <DashboardLayout>
      <Head><title>EasyNotes - Dashboard</title></Head>
      <header className={style.headerChild}>
        <h2 className={style.titleChild}>Menú Principal</h2>
        <p>¡Bienvenido, {session.user.name ? session.user.name : session.user.email}!</p>
      </header>
    </DashboardLayout>
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