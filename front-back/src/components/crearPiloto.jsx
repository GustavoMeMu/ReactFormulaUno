import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/editar.css';
import { useForm } from "react-hook-form"; // ✅ MODIFICADO
import { useContext } from 'react';
import Contexto from "../context/Contexto";

const CrearPiloto = () => {
    const navigate = useNavigate();
    const { usuario } = useContext(Contexto);
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const validaciones = { 
        nombre: {
            required: "El campo NOMBRE es obligatorio",
            pattern: {
                value: /^[a-zA-Z- _]+$/, 
                message: "Solo se permiten LETRAS"
            }
        },
        equipo: {
            required: "El campo EQUIPO es obligatorio",
            pattern: {
                value: /^[a-zA-Z- _\s]+$/,
                message: "Solo se permiten LETRAS"
            }
        },
        numero: {
            required: "El campo NÚMERO es obligatorio",
            pattern: {
                value: /^[0-9]+$/,
                message: "Solo se permiten caracteres numéricos"
            }
        }
    };

    const crearPiloto = async (data) => { 
        try {
            const respuesta = await fetch("http://192.168.4.239:3001/agregarPiloto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Autorizacion": "Back " + usuario1.token
                },
                body: JSON.stringify(data)
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.Error || "Error al crear piloto");
            }

            alert("Piloto creado correctamente");
            navigate("/pilotos");
        } catch (error) {
            console.error("Error al crear piloto:", error);
            alert("Error al crear piloto: " + error.message);
        }
    };

    return (
        <div id="container">
            <h2 id="titulo">Crear Nuevo Piloto</h2>

            <form onSubmit={handleSubmit(crearPiloto)}> 
                <label>
                    Nombre:
                    <input
                        id="nombre"
                        type="text"
                        {...register("nombre", validaciones.nombre)} 
                    />
                </label>
                {errors.nombre && <p className="error-message">{errors.nombre.message}</p>} 
                <br />

                <label>
                    Equipo:
                    <input
                        id="equipo"
                        type="text"
                        {...register("equipo", validaciones.equipo)} 
                    />
                </label>
                {errors.equipo && <p className="error-message">{errors.equipo.message}</p>} 
                <br />

                <label>
                    Número:
                    <input
                        id="numero"
                        type="number"
                        {...register("numero", validaciones.numero)} 
                    />
                </label>
                {errors.numero && <p className="error-message">{errors.numero.message}</p>}
                <br />

                <div id="GuarCan">
                    <button type="button" className="boton-regresar" id="guardar" onClick={() => navigate(-1)}>
                        ✖️Cancelar
                    </button>

                    <button type="submit" id="guardar"> 
                        ✔️Crear Piloto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CrearPiloto;
