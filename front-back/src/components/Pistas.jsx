import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/editar.css';
import Contexto from "../context/Contexto";
import { useContext } from 'react'


const Pistas = () => {
    const [pistas, setPistas] = useState([]);
    const navigate = useNavigate();
    const { usuario } = useContext(Contexto);
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario;

    useEffect(() => {
        fetch("http://localhost:3001/pistas")
            .then(res => res.json())
            .then(data => setPistas(data))
            .catch(err => console.error("Error al cargar pistas:", err));
    }, []);

    const irAEditar = (nombre) => {
        navigate(`/pistas/editar/${nombre}`);
    };

    const irACrear = () => {
        navigate("/pistas/crear");
    };

    const eliminarPista = async (nombre) => {
        const confirmar = window.confirm(`¿Eliminar pista "${nombre}"?`);
        if (!confirmar) return;

        try {
            const res = await fetch(`http://localhost:3001/eliminarPista/${nombre}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Autorizacion": "Back " + usuario1.token }
            });

            const data = await res.json();

            if (res.ok) {
                alert("Pista eliminada correctamente");
                setPistas(pistas.filter((p) => p.nombre !== nombre));
            } else {
                alert(`Error: ${data.Error || "No se pudo eliminar la pista"}`);
            }
        } catch (error) {
            console.error("Error al eliminar pista:", error);
            alert("Hubo un error al intentar eliminar la pista.");
        }
    };

    return (
        <div className="container">
            <div className="contentPilotos">
                {/* Botón de Crear Pista */}
                {usuario1.estado === 0 && (
                    <button onClick={irACrear} className="boton-agregar">
                        ➕ Crear Pista
                    </button>
                )}
                
                <ul>
                    {pistas.map((pista) => (
                        <li key={pista.id}>
                            <span
                                className="nombre-clickable"
                                onClick={() => navigate(`/pista/${pista.nombre}`)}
                            >
                                {pista.nombre}
                            </span>
                            <div className="botones-accion">
                                {/* Botón de Editar */}
                                {usuario1.estado === 0 && (
                                    <button onClick={() => irAEditar(pista.nombre)} className="boton-editar">
                                        ✏️ Editar
                                    </button>
                                )}
                                {/* Botón de Eliminar */}
                                {usuario1.estado === 0 && (
                                    <button onClick={() => eliminarPista(pista.nombre)} className="boton-eliminar">
                                        🗑️ Eliminar
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Pistas;