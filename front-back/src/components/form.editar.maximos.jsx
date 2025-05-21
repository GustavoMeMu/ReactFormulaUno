import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../assets/styles/editar.css';
import { useForm } from 'react-hook-form'; 
import Contexto from "../context/Contexto";
import{useContext} from 'react';

const validaciones = {
    nombre: {
        required: "El nombre es obligatorio",
        pattern: {
            value: /^[a-zA-Z- _\s]+$/,
            message: "Solo se permiten letras y espacios"
        }
    },
    pais: {
        required: "El país es obligatorio",
        pattern: {
            value: /^[a-zA-Z- _\s]+$/,
            message: "Solo se permiten letras y espacios"
        }
    },
    victorias: {
        required: "Las victorias son obligatorias",
        min: {
            value: 0,
            message: "Las victorias no pueden ser negativas"
        },
        pattern: {
            value: /^[0-9]+$/,
            message: "Solo se permiten números"
        }
    },
    titulos: {
        required: "Los títulos son obligatorios",
        min: {
            value: 0,
            message: "Los títulos no pueden ser negativos"
        },
        pattern: {
            value: /^[0-9]+$/,
            message: "Solo se permiten números"
        }
    }
};

const EditarMaximoGanador = () => {
    const { nombre: nombreParam } = useParams();
    const navigate = useNavigate();
    const [ganador, setGanador] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            nombre: '',
            pais: '',
            victorias: 0,
            titulos: 0
        }
    });
    const { usuario } = useContext(Contexto);
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario;

    useEffect(() => {
        fetch(`http://localhost:3001/maximoGanador/${nombreParam}`)
            .then((res) => res.json())
            .then((data) => {
                setGanador(data);
                
                setValue("nombre", data.nombre || "");
                setValue("pais", data.pais || "");
                setValue("victorias", data.victorias || 0);
                setValue("titulos", data.titulos || 0);
            })
            .catch((error) => console.error("Error al obtener máximo ganador:", error));
    }, [nombreParam, setValue]);

    const onSubmit = async (data) => {
        try {
            await fetch(`http://localhost:3001/editarMaximoGanador/${nombreParam}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" , "Autorizacion": "Back " + usuario1.token },
                body: JSON.stringify(data)
            });
            alert("Máximo ganador actualizado correctamente");
            navigate("/maximos_ganadores");
        } catch (error) {
            console.error("Error al actualizar máximo ganador:", error);
        }
    };

    if (!ganador) return <p id="loading">Cargando datos del máximo ganador...</p>;

    return (
        <div id="container">
            <h2 id="titulo">Editando a {ganador?.nombre || "..."}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Nombre:
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        {...register("nombre", validaciones.nombre)}
                    />
                    {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
                </label>
                <br />

                <label>
                    País:
                    <input
                        id="pais"
                        type="text"
                        name="pais"
                        {...register("pais", validaciones.pais)}
                    />
                    {errors.pais && <p className="error-message">{errors.pais.message}</p>}
                </label>
                <br />

                <label>
                    Victorias:
                    <input
                        id="victorias"
                        type="number"
                        name="victorias"
                        {...register("victorias", validaciones.victorias)}
                    />
                    {errors.victorias && <p className="error-message">{errors.victorias.message}</p>}
                </label>
                <br />

                <label>
                    Títulos:
                    <input
                        id="titulos"
                        type="number"
                        name="titulos"
                        {...register("titulos", validaciones.titulos)}
                    />
                    {errors.titulos && <p className="error-message">{errors.titulos.message}</p>}
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

export default EditarMaximoGanador;