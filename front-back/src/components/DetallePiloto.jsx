import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RedBull from '../assets/img/pilotos/RedBull.jpeg';
import Ferrari from '../assets/img/pilotos/Ferrari.jpg';
import Mercedes from '../assets/img/pilotos/Mercedes.jpg';
import McLaren from '../assets/img/pilotos/McLaren.jpeg';
import AstonMartin from '../assets/img/pilotos/AstonMartin.jpg';
import Alpine from '../assets/img/pilotos/Alpine.jpeg';
import RacingBull from '../assets/img/pilotos/RacingBulls.jpeg';
import KickSauber from '../assets/img/pilotos/KickSauber.jpeg';
import Haas from '../assets/img/pilotos/Haas.jpeg';
import Williams from '../assets/img/pilotos/Williams.jpeg';
import Albon from '../assets/img/pilotosFotos/Albon.jpeg';
import Antonelli from '../assets/img/pilotosFotos/Antonelli.jpeg';
import Bearman from '../assets/img/pilotosFotos/Bearman.jpeg';
import Bortoleto from '../assets/img/pilotosFotos/Bortoleto.jpeg';
import Doohan from '../assets/img/pilotosFotos/Doohan.jpeg';
import Fernando from '../assets/img/pilotosFotos/Fernando.jpeg';
import Gasly from '../assets/img/pilotosFotos/Gasly.jpeg';
import Hadjar from '../assets/img/pilotosFotos/Hadjar.jpeg';
import Hulkenberg from '../assets/img/pilotosFotos/Hulkenberg.jpeg';
import Landon from '../assets/img/pilotosFotos/Landon.jpeg';
import Leclerc from '../assets/img/pilotosFotos/Leclerc.jpeg';
import Lewis from '../assets/img/pilotosFotos/Lewis.jpeg';
import Liam from '../assets/img/pilotosFotos/Liam.jpeg';
import Max from '../assets/img/pilotosFotos/Max.jpeg';
import Ocon from '../assets/img/pilotosFotos/Ocon.jpeg';
import Piastri from '../assets/img/pilotosFotos/Piastri.jpeg';
import Russell from '../assets/img/pilotosFotos/Russell.jpeg';
import Sainz from '../assets/img/pilotosFotos/Sainz.jpeg';
import Stroll from '../assets/img/pilotosFotos/Stroll.jpeg';
import Yuki from '../assets/img/pilotosFotos/Yuki.jpeg';
import ImagenPorDefecto from '../assets/img/logo.png'
import '../assets/styles/editar.css';

const DetallePiloto = () => {
    const { nombre } = useParams();
    const [piloto, setPiloto] = useState(null);
    const navigate = useNavigate();

    const getImagenEquipo = (equipo) => {
        switch (equipo) {
            case "Red Bull":
                return RedBull;
            case "Ferrari":
                return Ferrari;
            case "Mercedes":
                return Mercedes;
            case "McLaren":
                return McLaren;
            case "AstonMartin":
                return AstonMartin;
            case "Alpine":
                return Alpine;
            case "RacingBull":
                return RacingBull;
            case "KickSauber":
                return KickSauber;
            case "Haas":
                return Haas;
            case "Williams":
                return Williams;
            default:
                return ImagenPorDefecto;
        }
    };
    const getImagenPiloto = (nombrePiloto) => {
        switch (nombrePiloto) {
            case "Max_Verstappen":
                return Max;
            case "Fernando_Alonso":
                return Fernando;
            case "Charles_Leclerc":
                return Leclerc;
            case "Lewis_Hamilton":
                return Lewis;
            case "Lando_Norris":
                return Landon;
            case "Carlos_Sainz":
                return Sainz;
            case "Oscar_Piastri":
                return Piastri;
            case "George_Russell":
                return Russell;
            case "Pierre_Gasly":
                return Gasly;
            case "Esteban_Ocon":
                return Ocon;
            case "Yuki_Tsunoda":
                return Yuki;
            case "Liam_Lawson":
                return Liam;
            case "Isack_Hadjar":
                return Hadjar;
            case "Gabriel_Bortoleto":
                return Bortoleto;
            case "Jack_Doohan":
                return Doohan;
            case "Nico_Hülkenberg":
                return Hulkenberg;
            case "Oliver_Bearman":
                return Bearman;
            case "Alexander_Albon":
                return Albon;
            case "Andrea_Kimi_Antonelli":
                return Antonelli;
            case "Lance_Stroll":
                return Stroll;
            default:
                return ImagenPorDefecto;
        }
    };

    useEffect(() => {
        fetch(`http://192.168.4.239:3001/piloto/${encodeURIComponent(nombre)}`)
            .then((res) => res.json())
            .then((data) => {
                setPiloto(data);
            })
            .catch((error) => {
                console.error("Error al cargar los datos del piloto:", error);
            });
    }, [nombre]);

    if (!piloto) return <div className="container">Cargando información...</div>;

    return (
        <div className="container">
            <div className="tarjeta-detalle">
                <h2>{piloto.nombre}</h2>
                <div className="imagenes-contenedor">
                    {getImagenPiloto(piloto.nombre) && (
                        <img
                            src={getImagenPiloto(piloto.nombre)}
                            alt={piloto.nombre}
                            className="imagen-piloto"
                        />
                    )}
                    {getImagenEquipo(piloto.equipo) && (
                        <img
                            src={getImagenEquipo(piloto.equipo)}
                            alt={piloto.equipo}
                            className="imagen-equipo"
                        />
                    )}
                </div>
                <p><strong>Equipo:</strong> {piloto.equipo}</p>
                <p><strong>Numero:</strong> {piloto.numero}</p>
                <button className="boton-regresar" onClick={() => navigate(-1)}>⬅️ Regresar</button>
            </div>
        </div>
    );
};

export default DetallePiloto;
