import style from '../styles/NoteComponent.module.css'
import {FaTrash, FaEdit} from 'react-icons/fa'
import { deleteDoc, doc} from 'firebase/firestore'
import db from '../firebase'

export default function Note({n}){

  const deleteNote = async(id, e) => {
    e.stopPropagation()
    const docRef = doc(db, 'Notes', id)
    await deleteDoc(docRef)
  }

  const handleEdit = (id, title, description) => {
    return (
      <h2>Hola mundo</h2>
    )
  }

  return (
    <>
      <div className={style.Note}>
        <header>
          <h2>{n.title}</h2>
          <div className={style.divIconButton}>
            <button className={style.iconNote} onClick={(e) => deleteNote(n.id, e)}><FaTrash /></button>
            <button className={style.iconNote} onClick={() => handleEdit(n.id, n.title, n.description)}><FaEdit /></button>
          </div>
        </header>
        <div className={style.description}>
          <p>{n.description}</p>
        </div>
        <div className={style.owner}>
          <p>{n.userId}</p>
        </div>
      </div>
    </>
  )
}