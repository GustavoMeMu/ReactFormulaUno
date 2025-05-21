import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Importaciones de imágenes según país
import Alemania from "../assets/img/banderas/Alemania.png";
import Brasil from "../assets/img/banderas/Brasil.jpg";
import Francia from "../assets/img/banderas/Francia.png";
import ReinoUnido from "../assets/img/banderas/ReinoUnido.png";
import DefaultImg from "../assets/img/logo.png";

import "../assets/styles/editar.css";

const DetalleGanador = () => {
    const { nombre } = useParams();
    const [ganador, setGanador] = useState(null);
    const navigate = useNavigate();

    // Imagen del país
    const getImagenPais = (pais) => {
        switch (pais) {
            case "Alemania":
                return Alemania;
            case "Brasil":
                return Brasil;
            case "Francia":
                return Francia;
            case "Reino Unido":
                return ReinoUnido;
            default:
                return DefaultImg;
        }
    };

    useEffect(() => {
        fetch(`http://localhost:3001/maximoGanador/${nombre}`)
            .then((response) => response.json())
            .then((data) => setGanador(data))
            .catch((error) =>
                console.error("Error al cargar los datos del ganador:", error)
            );
    }, [nombre]);

    if (!ganador) return <div className="container">Cargando...</div>;

    return (
        <div className="container">
            <div className="tarjeta-detalle">
                <h2>Detalle del Máximo Ganador</h2>
                <img 
                    src={getImagenPais(ganador.pais)} 
                    alt={ganador.pais} 
                    className="imagen-bandera" 
                />
                <p><strong>Nombre:</strong> {ganador.nombre}</p>
                <p><strong>País:</strong> {ganador.pais}</p>
                <p><strong>Victorias:</strong> {ganador.victorias}</p>
                <p><strong>Títulos:</strong> {ganador.titulos}</p>

                {/* Imagen del país */}

                <button className="boton-regresar" onClick={() => navigate(-1)}>⬅️ Regresar</button>
            </div>
        </div>
    );
};

export default DetalleGanador;
