export default function validateLogin(values){
  const errors = {}

  if (!values.email) {
    errors.email = 'Requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'El correo electrónico ingresado es inválido, revíselo y vuelva a intentar'
  }

  if (!values.password){
    errors.password = 'Requerido'
  } else if (values.password.length < 8 || values.password.lenght > 16){
    errors.password = 'La contraseña debe tener como mínimo 8 carácteres y como máximo 16 carácteres'
  } else if (values.password.includes(' ')){
    errors.password = "La contraseña es inválida"
  }

  return errors
}