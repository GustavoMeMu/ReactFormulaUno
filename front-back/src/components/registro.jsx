import React from 'react';
import '../assets/styles/registro.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const validaciones = {
        usuario: {
            required: "El campo usuario es obligatorio",
            pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Solo se permiten caracteres alfanuméricos"
            }
        },
        password: {
            required: "La contraseña es obligatoria",
            minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres"
            },
            pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Solo se permiten caracteres alfanuméricos"
            }
        },
        rol: {
            required: "El rol es obligatorio"
        },
        estado: {
            required: "El estado es obligatorio"
        }
    };

    const onSubmit = (data) => {
        fetch("http://192.168.4.239:3001/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(respuesta => {
            if (respuesta.msj === "usuario registrado") {
                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                navigate("/login");
            } else {
                alert("Error al registrar: " + respuesta.msj);
            }
        })
        .catch(error => {
            console.error("Error del servidor:", error);
            alert("Error en el servidor al registrar");
        });
    };

    return (
        <div className="registro-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Registro de Usuario</h3>

                <input type="text" placeholder="Usuario" {...register("usuario", validaciones.usuario)} />
                {errors.usuario && <p className="error-message">{errors.usuario.message}</p>}

                <input type="password" placeholder="Contraseña" {...register("password", validaciones.password)} />
                {errors.password && <p className="error-message">{errors.password.message}</p>}

                <select className="form-select" {...register("rol", validaciones.rol)}>
                    <option value="">Selecciona un estado</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                {errors.rol && <p className="error-message">{errors.rol.message}</p>}

                <select className="form-select" {...register("estado", validaciones.estado)}>
                    <option value="">Selecciona el rol</option>
                    <option value="0">Admin</option>
                    <option value="1">Usuario</option>
                </select>
                {errors.estado && <p className="error-message">{errors.estado.message}</p>}

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Registro;
