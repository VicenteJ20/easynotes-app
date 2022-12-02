import Link from 'next/link'
import style from '../styles/Dashboard.module.css'
import { AiFillHome, AiFillCopy, AiFillCalendar, AiFillNotification, AiFillDelete, AiFillBug, AiFillTool } from 'react-icons/ai'
import { useSession, signOut} from 'next-auth/react'
import Image from 'next/image'

export default function DashboardLayout({ children }) {
  const { data: session } = useSession()

  function handleSignOut(){
    signOut()
  }
  return (
    <>
      <main className={style.Dashboard}>
        <section className={style.DashboardNav}>
          <header className={style.headerBrand}>
            <h2>Easy<span className={style.colorBrand}>Notes</span></h2>
          </header>
          <nav className={style.Navigation}>
            <ul>
              <li><Link href='/'><AiFillHome /> Inicio</Link></li>
              <li><Link href='/dashboard/notes'><AiFillCopy /> Notas</Link></li>
              <li><Link href='/'><AiFillCalendar /> Calendario</Link></li>
              <li><Link href='/'><AiFillNotification /> Notificaciones</Link></li>
              <li><Link href='/'><AiFillDelete /> Papelera</Link></li>
              <li><Link href='/'><AiFillBug /> Soporte</Link></li>
              <li><Link href='/'><AiFillTool /> Ajustes</Link></li>
            </ul>
          </nav>
          <div className={style.ProfileDashboard}>
            <div className={style.userImageDiv}>
            {
              session.user.image ? <Image className={style.userImage} src={session.user.image} alt='Profile IMG' width={42} height={42} /> : '' 
            }
            </div>
            <h2>{session.user.name ? session.user.name : session.user.email}</h2>
            <p>{session.user.name ? session.user.email : ''}</p>
            <button className={style.logout} onClick={handleSignOut}>Cerrar sesión</button>
          </div>
        </section>
        <section className={style.DashboardChildren}>{children}</section>
      </main>
    </>
  )
}