import DashboardLayout from "../../layout/dashboardlayout";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {collection, onSnapshot, query, addDoc} from '@firebase/firestore'
import db from '../../firebase'
import style from '../../styles/Notes.module.css'
import { useSession } from "next-auth/react";
import Note from "../../components/Note";

export default function Notes(){
  const {data: session} = useSession()

  const [note, setNote] = useState([])
  const [formData, setFormData] = useState({title: '', description: '', userId: session.user.email})

  useEffect(() => {
    const collectionRef = collection(db, 'Notes')
    const q = query(collectionRef)

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setNote(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    })

    return unsubscribe
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const collectionRef = collection(db, 'Notes')
    const docRef = await addDoc(collectionRef, {...formData})
  }

  return (
    <DashboardLayout>
      <section className={style.NotesDashboard}>
        <h1>Hola mundo, estas son las notas</h1>
        <form className={style.CreateNoteForm} onSubmit={handleSubmit} >
          <div className={style.FormDiv}>
            <label>Título</label>
            <input type='text' name='title' placeholder='Ingrese título' onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className={style.FormDiv}>
            <label>Descripción</label>
            <input type='text' name='description' placeholder='Ingrese descripción'  onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className={style.FormDiv}>
            <button className={style.submitBtn}>Crear</button>
          </div>
        </form>
        <div className={style.NotesContainer}>
        {
          note.map((x, index) => x.userId === session.user.email ? <Note key={x.id} n={x} /> : '')
        }
        </div>
      </section>
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