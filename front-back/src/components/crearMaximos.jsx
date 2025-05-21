import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/editar.css';
import Contexto from "../context/Contexto";
import { useContext } from 'react'

const CrearMaximoGanador = () => {
    const [ganador, setGanador] = useState({
        nombre: "",
        pais: "",
        victorias: 0,
        titulos: 0
    });

    const [errores, setErrores] = useState({});
    const navigate = useNavigate();
    const { usuario } = useContext(Contexto);
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario;

    const validar = () => {
        const nuevosErrores = {};
        if (!ganador.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!ganador.pais.trim()) nuevosErrores.pais = "El país es obligatorio.";
        if (ganador.victorias < 0) nuevosErrores.victorias = "Las victorias no pueden ser negativas.";
        if (ganador.titulos < 0) nuevosErrores.titulos = "Los títulos no pueden ser negativos.";
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const crearGanador = async () => {
        if (!validar()) {
            alert("Por favor corrige los errores antes de continuar.");
            return;
        }

        try {
            const respuesta = await fetch("http://192.168.4.239:3001/agregarMaximoGanador", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Autorizacion": "Back " + usuario1.token
                },
                body: JSON.stringify(ganador)
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.Error || "Error al crear máximo ganador");
            }

            alert("Máximo ganador creado correctamente");
            navigate("/maximos_ganadores");
        } catch (error) {
            console.error("Error al crear máximo ganador:", error);
            alert("Error al crear máximo ganador: " + error.message);
        }
    };

    return (
        <div id="container">
            <h2 id="titulo">Crear Nuevo Máximo Ganador</h2>

            <label>
                Nombre:
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={ganador.nombre}
                    onChange={(e) =>
                        setGanador({ ...ganador, nombre: e.target.value })
                    }
                />
                {errores.nombre && <p className="error">{errores.nombre}</p>}
            </label>
            <br />

            <label>
                País:
                <input
                    id="pais"
                    type="text"
                    name="pais"
                    value={ganador.pais}
                    onChange={(e) =>
                        setGanador({ ...ganador, pais: e.target.value })
                    }
                />
                {errores.pais && <p className="error">{errores.pais}</p>}
            </label>
            <br />

            <label>
                Victorias:
                <input
                    id="victorias"
                    type="number"
                    name="victorias"
                    value={ganador.victorias}
                    onChange={(e) =>
                        setGanador({ ...ganador, victorias: parseInt(e.target.value) || 0 })
                    }
                />
                {errores.victorias && <p className="error">{errores.victorias}</p>}
            </label>
            <br />

            <label>
                Títulos:
                <input
                    id="titulos"
                    type="number"
                    name="titulos"
                    value={ganador.titulos}
                    onChange={(e) =>
                        setGanador({ ...ganador, titulos: parseInt(e.target.value) || 0 })
                    }
                />
                {errores.titulos && <p className="error">{errores.titulos}</p>}
            </label>
            <br />

            <div id="GuarCan">
                <button className="boton-regresar" id="guardar" onClick={() => navigate(-1)}>
                    ✖️Cancelar
                </button>
                <button id="guardar" onClick={crearGanador}>
                    ✔️Crear Máximo Ganador
                </button>
            </div>
        </div>
    );
};

export default CrearMaximoGanador;
