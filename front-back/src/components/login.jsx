import React from 'react';
import '../assets/styles/login.css';
import { useContext } from 'react';
import Contexto from '../context/Contexto.jsx';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';



const Login = () => {
  const navegacion = useNavigate();
  const validaciones = {
    "usuario": {
      required: "El campo usuario es requerido",
      pattern: {
        value: /[a-zA-Z0-9]+/,
        message: "El usuario debe contener solo caracteres alfanumericos"
      }
    },
    "password": {
      required: "El campo passwrd es requerido",
      pattern: {
        value: /[a-zA-Z0-9]+/,
        message: "La contraseña debe contener solo caracteres alfanumericos"
      }
    }
  }
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:3001/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ "usuario": data.usuario, "password": data.password })
    })
    .then(respuesta => respuesta.json())
    .then(respuesta => {
      if (respuesta.token) {
        alert("Bienvenido");
        login({token:respuesta.token,usuario:respuesta.usuario, estado:respuesta.estado}); // Aquí guardás el token en el contexto
        navegacion("/inicio", { replace: true });
      } else {
        alert("Credenciales incorrectas");
      }
    })
    .catch(error => {
      console.log("Se ha generado un error en el servidor", error);
      alert("Error al intentar iniciar sesión");
    });
  };
  
  const { login } = useContext(Contexto);
  // const inciar_sesion = () => {
  //   login();
  //   navegacion("/", { replace: true })
  // }
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h3>Iniciar Sesión</h3>
        <input {...register("usuario", validaciones.usuario)} type="text" className="login-input" placeholder="Nombre de usuario" />
        {errors.usuario && errors.usuario.message}
        <input {...register("password", validaciones.password)} type="password" className="login-input" placeholder="Contraseña" />
        {errors.password && errors.password.message}
        <button className="login-button" type='submit'>Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
