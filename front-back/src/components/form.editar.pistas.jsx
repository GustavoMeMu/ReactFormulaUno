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
            value: /^[a-zA-Z0-9 - _\s]+$/,
            message: "Solo se permiten letras, números y espacios"
        }
    },
    pais: {
        required: "El país es obligatorio",
        pattern: {
            value: /^[a-zA-Z - _\s]+$/,
            message: "Solo se permiten letras y espacios"
        }
    },
    longitud_km: {
        required: "La longitud es obligatoria",
        min: {
            value: 0.1,
            message: "La longitud debe ser mayor a 0"
        },
        pattern: {
            value: /^[0-9.]+$/,
            message: "Formato de longitud inválido"
        }
    },
    vueltas: {
        required: "El número de vueltas es obligatorio",
        min: {
            value: 1,
            message: "Debe haber al menos 1 vuelta"
        },
        pattern: {
            value: /^[0-9]+$/,
            message: "Solo se permiten números enteros"
        }
    }
};

const EditarPista = () => {
    const { nombre: nombreParam } = useParams();
    const navigate = useNavigate();
    const [pista, setPista] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            nombre: '',
            pais: '',
            longitud_km: 0.1,
            vueltas: 1
        }
    });
    const { usuario } = useContext(Contexto);
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario;

    useEffect(() => {
        fetch(`http://192.168.4.239:3001/pista/${nombreParam}`)
            .then(res => res.json())
            .then(data => {
                setPista(data);
                setValue("nombre", data.nombre || "");
                setValue("pais", data.pais || "");
                setValue("longitud_km", data.longitud_km || 0.1);
                setValue("vueltas", data.vueltas || 1);
            })
            .catch(err => console.error("Error al obtener pista:", err));
    }, [nombreParam, setValue]);

    const onSubmit = async (data) => {
        try {
            await fetch(`http://192.168.4.239:3001/editarPista/${nombreParam}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" , "Autorizacion": "Back " + usuario1.token},
                body: JSON.stringify(data)
            });
            alert("Pista actualizada correctamente");
            navigate("/pistas");
        } catch (error) {
            console.error("Error al actualizar pista:", error);
        }
    };

    if (!pista) return <p id="loading">Cargando datos de la pista...</p>;

    return (
        <div id="container">
            <h2 id="titulo">Editando pista: {pista?.nombre}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Nombre:
                    <input
                        id="nombre"
                        type="text"
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
                        {...register("pais", validaciones.pais)}
                    />
                    {errors.pais && <p className="error-message">{errors.pais.message}</p>}
                </label>
                <br />

                <label>
                    Longitud (km):
                    <input
                        id="longitud_km"
                        type="number"
                        step="0.01"
                        {...register("longitud_km", validaciones.longitud_km)}
                    />
                    {errors.longitud_km && <p className="error-message">{errors.longitud_km.message}</p>}
                </label>
                <br />

                <label>
                    Vueltas:
                    <input
                        id="vueltas"
                        type="number"
                        {...register("vueltas", validaciones.vueltas)}
                    />
                    {errors.vueltas && <p className="error-message">{errors.vueltas.message}</p>}
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

export default EditarPista;