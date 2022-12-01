import style from '../styles/Layout.module.css'

export default function Layout({ children }){
  return (
    <div className={style.Layout}>
      <div className={style.Layoutleft}>{children}</div>
      <div className={style.Layoutright}></div>
    </div>
  )
}