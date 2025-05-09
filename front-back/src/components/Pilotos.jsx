import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/editar.css';
import Contexto from "../context/Contexto";
import { useContext } from 'react'
const Pilotos = () => {
    const [pilotos, setPilotos] = useState([]);
    const navigate = useNavigate();
    const { usuario } = useContext(Contexto);
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario;
    useEffect(() => {
        fetch("http://localhost:3001/pilotos")
            .then((response) => response.json())
            .then((data) => setPilotos(data))
            .catch((error) => console.error("Error fetching pilotos:", error));
    }, []);

    const irAEditar = (nombre) => {
        navigate(`/pilotos/editar/${nombre}`);
    };

    const irACrear = () => {
        navigate("/pilotos/crear");
    };

    const eliminarPiloto = async (nombre) => {
        const confirmar = window.confirm(`¿Seguro que quieres eliminar a ${nombre}?`);
        if (!confirmar) return;

        try {
            const res = await fetch(`http://localhost:3001/eliminarPiloto/${nombre}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Autorizacion": "Back " + usuario1.token }
            });

            const data = await res.json();

            if (res.ok) {
                alert("Piloto eliminado correctamente");

                setPilotos(pilotos.filter((p) => p.nombre !== nombre));
            } else {
                alert(`Error: ${data.Error || "No se pudo eliminar el piloto"}`);
            }
        } catch (error) {
            console.error("Error al eliminar piloto:", error);
            alert("Hubo un error al intentar eliminar el piloto.");
        }
    };

    return (
        <div className="container">
            <div className="contentPilotos">
                <button
                    onClick={irACrear}
                    className="boton-agregar"
                >
                    ➕ Crear Piloto
                </button>
                <ul>
                    {pilotos.map((piloto) => (
                        <li key={piloto.id}>
                            <span
                                className="nombre-clickable"
                                onClick={() => navigate(`/piloto/${(piloto.nombre)}`)}
                            >
                                {piloto.nombre}
                            </span>
                            <div className="botones-accion"> {/* Aquí es donde debes envolver los botones */}
                                <button
                                    onClick={() => irAEditar(piloto.nombre)}
                                    className="boton-editar"
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    onClick={() => eliminarPiloto(piloto.nombre)}
                                    className="boton-eliminar"
                                >
                                    🗑️ Eliminar
                                </button>
                            </div> {/* Cierre del div botones-accion */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Pilotos;
