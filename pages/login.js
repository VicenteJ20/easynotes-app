import Head from "next/head"
import Link from "next/link"
import Layout from "../layout/layout"
import style from '../styles/Login.module.css'
import { FaEye, FaGithub, FaGoogle } from 'react-icons/fa'
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useFormik } from "formik"
import validateLogin from "../schemas/login"
import { useRouter } from "next/router"


export default function Login(){
  const [show, setShow] = useState(false)
  const router = useRouter()
  
  const formik = useFormik({
    initialValues:{
      email: '',
      password: ''
    },
    validate: validateLogin,
    onSubmit
  })

  async function onSubmit(values){
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: 'http://localhost:3000/'
    })

    if (status.ok){
      router.push(status.url)
    }
  }

  async function handlerGoogleSignIn(){
    signIn('google', {callbackUrl: 'http://localhost:3000/'})
  }

  async function handlerGithubSignIn(){
    signIn('github', {callbackUrl: 'http://localhost:3000/'})
  }

  function handleShow() {
    setShow(!show)
  }

  return (
    <Layout>
    
      <Head><title>Easynotes - login</title></Head>
      <h1 className={style.title}>Iniciar sesión</h1>
      <form className={style.Form} onSubmit={formik.handleSubmit} >
        <div className={style.FormDiv}>
          <label className={style.FormLabel}>Correo electrónico</label>
          <input type='email' name='email' placeholder="ejemplo@gmail.com" onChange={formik.handleChange} value={formik.values.email} />
          {
            formik.errors.email && formik.touched.email ? <span className={style.errorSpan}>{formik.errors.email}</span> : ''
          }
        </div>
        <div className={style.FormDiv}>
          <label className={style.FormLabel}>Contraseña</label>
          <input type={`${show ? 'text' : 'password'}`} name='password' placeholder='Ingrese su contraseña...' onChange={formik.handleChange} value={formik.values.password}/>
          <span className={style.showIcon} onClick={handleShow}><FaEye /></span>
          {
            formik.errors.password && formik.touched.password ? <span className={style.errorSpan}>{formik.errors.password}</span> : ''
          }
        </div>
        <div className={`${style.FormDiv} ${style.FormDivSubmit}`}>
          <button type='submit' className={style.submitBtn}>Iniciar sesión</button>
        </div>
        <div className={`${style.FormDiv} ${style.FormDivProviders}`}>
          <button type='button' className={`${style.providerBtn} ${style.googleBtn}`} onClick={handlerGoogleSignIn}><FaGoogle /> Iniciar con Google</button>
          <button type='button' className={`${style.providerBtn} ${style.githubBtn}`} onClick={handlerGithubSignIn}><FaGithub /> Iniciar con Github</button>
        </div>
      </form>
      <div className={style.redirectDiv}>
        <p>¿Aún no tienes cuenta? - <Link href={'/signup'}>Registrarse</Link></p>
      </div>
    </Layout>
  )
}