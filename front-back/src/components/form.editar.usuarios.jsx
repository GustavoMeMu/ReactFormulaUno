import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import '../assets/styles/editar.css';
import Contexto from "../context/Contexto";

const validaciones = {
    usuario: {
        required: "El nombre de usuario es obligatorio",
        pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: "Solo letras, números y guiones bajos"
        }
    },
    rol: {
        required: "El rol es obligatorio",
        validate: value => value === "Activo" || value === "Inactivo" || value === "Inhabilitado" || "Valor no válido"
    },
    estado: {
        required: "El estado es obligatorio",
        validate: value => value === "0" || value === "1" || "Valor no válido"
    }
};

const EditarUsuario = () => {
    const { nombre } = useParams(); // nombre = usuario
    const navigate = useNavigate();
    const [datosUsuario, setDatosUsuario] = useState(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            usuario: "",
            rol: "Inactivo",
            estado: "1"
        }
    });

    const { usuario } = useContext(Contexto);

    const usuario1 = usuario;

    useEffect(() => {

        fetch(`http://localhost:3001/usuarios/${nombre}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Datos recibidos para edición:", data);
                setDatosUsuario(data);
                setValue("usuario", data.usuario || "");
                setValue("rol", data.rol || "Inactivo");
                setValue("estado", data.estado?.toString() || "1");
            })
            .catch((error) => console.error("Error al obtener usuario para edición:", error));
    }, [nombre, setValue]);

    const onSubmit = async (data) => {
        try {
            await fetch(`http://localhost:3001/usuarios/editar/${nombre}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",

                    "Autorizacion": "Back " + (usuario1?.token || "")
                },
                body: JSON.stringify(data)
            });
            alert("Usuario actualizado correctamente");
            navigate("/usuarios");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Error al actualizar usuario.");
        }
    };

    return (
        <div id="container">
            <h2 id="titulo">Editando a {datosUsuario?.usuario || "..."}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Usuario:
                    <input
                        id="usuario"
                        type="text"
                        name="usuario"
                        {...register("usuario", validaciones.usuario)}
                    />
                    {errors.usuario && <p className="error-message">{errors.usuario.message}</p>}
                </label>
                <br />

                <label>
                    Estado:
                    <select id="rol" name="rol" {...register("rol", validaciones.rol)}>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="Inhabilitado">Inhabilitado</option>
                    </select>
                    {errors.rol && <p className="error-message">{errors.rol.message}</p>}
                </label>
                <br />

                <label>
                    Rol:
                    <select id="estado" name="estado" {...register("estado", validaciones.estado)}>
                        <option value="0">Admin</option>
                        <option value="1">Usuario</option>
                    </select>
                    {errors.estado && <p className="error-message">{errors.estado.message}</p>}
                </label>
                <br />

                <div id="GuarCan">
                    <button className="boton-regresar" id="guardar" onClick={() => navigate(-1)}>
                        ✖️Cancelar
                    </button>
                    <button id="guardar" type="submit">
                        ✔️Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarUsuario;
