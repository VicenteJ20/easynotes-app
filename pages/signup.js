import Head from "next/head"
import Layout from "../layout/layout"
import Link from "next/link"
import { FaEye, FaGithub, FaGoogle} from 'react-icons/fa'
import { useState  } from "react"
import style from '../styles/SignUp.module.css'
import { useFormik } from "formik"
import validateSignUp from "../schemas/signup"
import Router from "next/router"

export default function SignUp(){

  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmpassword: ''
    },
    validate: validateSignUp,
    onSubmit
  })

  async function onSubmit(values){
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    }

    await fetch('http://localhost:3000/api/auth/signup', options).then(res => res.json()).then((data) => {
      if(data) Router.push('http://localhost:3000')
    })
  }

  function handleShow() {
    setShow(!show)
  }

  function handleShow2() {
    setShow2(!show2)
  }

  return (
    <Layout>
      <Head><title>Easynotes - signup</title></Head>
      <h1>Registrarse</h1>
      <form className={style.Form} onSubmit={formik.handleSubmit}>
        <div className={style.FormDiv}>
          <label className={style.FormLabel}>Nombre de usuario</label>
          <input type='text' name='username' placeholder="Ejemplo: Vicente1234" onChange={formik.handleChange} value={formik.values.username}/>
          {
            formik.errors.username && formik.touched.username ? <span className={style.errorSpan}>{formik.errors.username}</span> : ''
          }
        </div>
        <div className={style.FormDiv}>
          <label className={style.FormLabel}>Correo electrónico</label>
          <input type='email' name='email' placeholder="ejemplo@gmail.com" onChange={formik.handleChange} value={formik.values.email} />
          {
            formik.errors.email && formik.touched.email ? <span className={style.errorSpan}>{formik.errors.email}</span> : ''
          }
        </div>
        <div className={style.FormDiv}>
          <label className={style.FormLabel}>Contraseña</label>
          <input type={`${show ? 'text' : 'password'}`} name='password' placeholder='Ingrese su contraseña...' onChange={formik.handleChange} value={formik.values.password} />
          <span className={style.showIcon} onClick={handleShow}><FaEye /></span>
        </div>
        {
          formik.errors.password && formik.touched.password ? <span className={style.errorSpan}>{formik.errors.password}</span> : ''
        }
        <div className={style.FormDiv}>
          <label className={style.FormLabel}>Confirme su Contraseña</label>
          <input type={`${show2 ? 'text' : 'password'}`} name='confirmpassword' placeholder='Vuelva a ingresar su contraseña...' onChange={formik.handleChange} value={formik.values.confirmpassword} />
          <span className={style.showIcon} onClick={handleShow2}><FaEye /></span>
        </div>
        {
          formik.errors.confirmpassword && formik.touched.confirmpassword ? <span className={style.errorSpan}>{formik.errors.confirmpassword}</span> : ''
        }
        <div className={`${style.FormDiv} ${style.FormDivSubmit}`}>
          <button type='submit' className={style.submitBtn}>Registrarme</button>
        </div>
        <div className={`${style.FormDiv} ${style.FormDivProviders}`}>
          <button type='submit' className={`${style.providerBtn} ${style.googleBtn}`}><FaGoogle /> Iniciar con Google</button>
          <button type='submit' className={`${style.providerBtn} ${style.githubBtn}`}><FaGithub /> Iniciar con Github</button>
        </div>
      </form>
      <div className={style.redirectDiv}>
        <p>¿Ya tienes cuenta? - <Link href={'/login'}>Iniciar sesión</Link></p>
      </div>
    </Layout>
  )
}