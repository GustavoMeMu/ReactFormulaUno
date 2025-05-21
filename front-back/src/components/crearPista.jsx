import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/editar.css';
import { useForm } from "react-hook-form";
import Contexto from "../context/Contexto";
import { useContext } from 'react';

const CrearPista = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { usuario } = useContext(Contexto);
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario;

    const validaciones = {
        nombre: {
            required: "El nombre es obligatorio",
            pattern: {
                value: /^[a-zA-Z- _\s]+$/,
                message: "El nombre solo puede contener letras y espacios"
            }
        },
        pais: {
            required: "El país es obligatorio",
            pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "El país solo puede contener letras y espacios"
            }
        },
        longitud_km: {
            required: "La longitud es obligatoria",
            min: {
                value: 0.1,
                message: "Debe ser mayor que 0"
            }
        },
        vueltas: {
            required: "El número de vueltas es obligatorio",
            min: {
                value: 1,
                message: "Debe haber al menos una vuelta"
            }
        }
    };

    const crearPista = async (data) => {
        try {
            const res = await fetch("http://192.168.4.239:3001/agregarPista", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Autorizacion": "Back " + usuario1.token
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.Error || "Error al crear pista");
            }

            alert("Pista creada correctamente");
            navigate("/pistas");
        } catch (error) {
            console.error("Error al crear pista:", error);
            alert("Error al crear pista: " + error.message);
        }
    };

    return (
        <div id="container">
            <h2 id="titulo">Crear Nueva Pista</h2>
            <form onSubmit={handleSubmit(crearPista)}>
                <label>
                    Nombre:
                    <input type="text" {...register("nombre", validaciones.nombre)} />
                    {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
                </label>
                <br />

                <label>
                    País:
                    <input type="text" {...register("pais", validaciones.pais)} />
                    {errors.pais && <p className="error-message">{errors.pais.message}</p>}
                </label>
                <br />

                <label>
                    Longitud (km):
                    <input type="number" step="0.01" {...register("longitud_km", validaciones.longitud_km)} />
                    {errors.longitud_km && <p className="error-message">{errors.longitud_km.message}</p>}
                </label>
                <br />

                <label>
                    Vueltas:
                    <input type="number" {...register("vueltas", validaciones.vueltas)} />
                    {errors.vueltas && <p className="error-message">{errors.vueltas.message}</p>}
                </label>
                <br />

                <div id="GuarCan">
                    <button type="button" className="boton-regresar" id="guardar" onClick={() => navigate(-1)}>
                        ✖️Cancelar
                    </button>
                    <button type="submit" id="guardar">
                        ✔️Crear Pista
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CrearPista;
