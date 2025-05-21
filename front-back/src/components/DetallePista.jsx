import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlbertPark from "../assets/img/pistas/AlbertPark.jpg";
import Shanghai from "../assets/img/pistas/Shanghai.jpg";
import Suzuka from "../assets/img/pistas/Suzuka.jpg";
import Sakhir from "../assets/img/pistas/Sakhir.jpg";
import Jeddah from "../assets/img/pistas/Jeddah.jpg";
import HardRock from "../assets/img/pistas/HardRock.jpg";
import Imola from "../assets/img/pistas/Imola.jpg";
import Montecarlo from "../assets/img/pistas/Montecarlo.jpg";
import Barcelona from "../assets/img/pistas/Barcelona.jpg";
import GillesVilleneuve from "../assets/img/pistas/GillesVilleneuve.jpg";
import RedBullRing from "../assets/img/pistas/RedBullRing.jpg";
import Silverstone from "../assets/img/pistas/Silverstone.jpg";
import Spa from "../assets/img/pistas/Spa.jpg";
import Hungaroring from "../assets/img/pistas/Hungaroring.jpg";
import Zandvoort from "../assets/img/pistas/Zandvoort.jpg";
import Monza from "../assets/img/pistas/Monza.jpg";
import Baku from "../assets/img/pistas/Baku.jpg";
import MarinaBay from "../assets/img/pistas/MarinaBay.jpg";
import LasAmericas from "../assets/img/pistas/LasAmericas.jpg";
import HermanosRodriguez from "../assets/img/pistas/HermanosRodriguez.jpg";
import Interlagos from "../assets/img/pistas/Interlagos.jpg";
import LasVegas from "../assets/img/pistas/LasVegas.jpg";
import Losail from "../assets/img/pistas/Losail.jpg";
import YasMarina from "../assets/img/pistas/YasMarina.jpg";

import DefaultImg from "../assets/img/logo.png";
import '../assets/styles/editar.css';

const DetallePista = () => {
    const { nombre } = useParams();
    const [pista, setPista] = useState(null);
    const navigate = useNavigate();

    // Función para obtener la imagen de la pista según su nombre
    const getImagenPista = (nombre) => {
        switch (nombre) {
            case "Albert Park":
                return AlbertPark;
            case "Shanghai":
                return Shanghai;
            case "Suzuka":
                return Suzuka;
            case "Sakhir":
                return Sakhir;
            case "Jeddah International Street Circuit":
                return Jeddah;
            case "Hard Rock Stadium Circuit":
                return HardRock;
            case "Imola":
                return Imola;
            case "Montecarlo":
                return Montecarlo;
            case "Barcelona Catalunya":
                return Barcelona;
            case "Gilles Villeneuve":
                return GillesVilleneuve;
            case "Red Bull Ring":
                return RedBullRing;
            case "Silverstone":
                return Silverstone;
            case "Spa-Francorchamps":
                return Spa;
            case "Hungaroring":
                return Hungaroring;
            case "Zandvoort":
                return Zandvoort;
            case "Monza":
                return Monza;
            case "Baku City Circuit":
                return Baku;
            case "Marina Bay":
                return MarinaBay;
            case "Las Américas":
                return LasAmericas;
            case "Hermanos Rodríguez":
                return HermanosRodriguez;
            case "Interlagos":
                return Interlagos;
            case "Las Vegas":
                return LasVegas;
            case "Losail":
                return Losail;
            case "Yas Marina":
                return YasMarina;
            default:
                return DefaultImg;
        }
    };

    useEffect(() => {
        fetch(`http://192.168.4.239:3001/pista/${(nombre)}`)
            .then((res) => res.json())
            .then((data) => {
                setPista(data);
            })
            .catch((error) => {
                console.error("Error al cargar los datos de la pista:", error);
            });
    }, [nombre]);

    if (!pista) return <div className="container">Cargando información...</div>;

    return (
        <div className="container">
            <div className="tarjeta-detalle">
                <h2>{pista.nombre}</h2>
                <img
                    src={getImagenPista(pista.nombre)}
                    alt={pista.nombre}
                    className="imagen-pista"
                />
                <p><strong>País:</strong> {pista.pais}</p>
                <p><strong>Longitud:</strong> {pista.longitud_km} km</p>
                <p><strong>Vueltas:</strong> {pista.vueltas}</p>


                <button className="boton-regresar" onClick={() => navigate(-1)}>⬅️ Regresar</button>
            </div>
        </div>
    );
};

export default DetallePista;
