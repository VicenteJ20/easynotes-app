import style from '../styles/Layout.module.css'

export default function Layout({ children }){
  return (
    <div className={style.Layout}>
      <header className={style.headerBrand}>
        <h2>Easy<span className={style.colorBrand}>Notes</span></h2>
      </header>
      <div className={style.Layoutleft}>{children}</div>
      <div className={style.Layoutright}></div>
    </div>
  )
}