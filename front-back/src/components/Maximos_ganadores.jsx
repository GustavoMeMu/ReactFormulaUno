import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/editar.css';
import Contexto from "../context/Contexto";
import { useContext } from 'react'

const MaximosGanadores = () => {
    const [ganadores, setGanadores] = useState([]);
    const navigate = useNavigate();
    const { usuario } = useContext(Contexto);
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario;
    useEffect(() => {
        fetch("http://localhost:3001/maximosGanadores")
            .then((response) => response.json())
            .then((data) => setGanadores(data))
            .catch((error) => console.error("Error fetching maximos ganadores:", error));
    }, []);

    const irAEditar = (nombre) => {
        navigate(`/maximosGanadores/editar/${nombre}`);
    };

    const irACrear = () => {
        navigate("/maximosGanadores/crear");
    };

    const eliminarGanador = async (nombre) => {
        const confirmar = window.confirm(`¿Seguro que quieres eliminar a ${nombre}?`);
        if (!confirmar) return;

        try {
            const res = await fetch(`http://localhost:3001/eliminarMaximoGanador/${nombre}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Autorizacion": "Back " + usuario1.token }
            });

            const data = await res.json();

            if (res.ok) {
                alert("Máximo ganador eliminado correctamente");
                setGanadores(ganadores.filter((g) => g.nombre !== nombre));
            } else {
                alert(`Error: ${data.Error || "No se pudo eliminar el máximo ganador"}`);
            }
        } catch (error) {
            console.error("Error al eliminar máximo ganador:", error);
            alert("Hubo un error al intentar eliminar el máximo ganador.");
        }
    };

    return (
        <div className="container">
            <div className="contentGanadores">
                <button onClick={irACrear} className="boton-agregar">
                    ➕ Crear Máximo Ganador
                </button>
                <ul>
                    {ganadores.map((ganador) => (
                        <li key={ganador._id}>

                            <span
                                className="nombre-clickable"
                                onClick={() => navigate(`/maximosGanadores/detalle/${ganador.nombre}`)}
                            >
                                {ganador.nombre}
                            </span>
                            <div className="botones-accion">
                                <button
                                    onClick={() => irAEditar(ganador.nombre)}
                                    className="boton-editar"
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    onClick={() => eliminarGanador(ganador.nombre)}
                                    className="boton-eliminar"
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MaximosGanadores;
