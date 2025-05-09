import logo from "../assets/img/logo.png";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from "react-router-dom";
import f1 from "../assets/sounds/f1.mp3";
import { useRef, useContext, useState } from "react"; // Importa useState
import Contexto from '../context/Contexto.jsx';

const Nav = () => {
    const linkStyles = {
        borderRadius: "25px",
        padding: "0.5rem 1.5rem",
        marginRight: "10px",
        textDecoration: "none",
        color: "#011237"
    };

    const audioRef = useRef(new Audio(f1));
    const {usuario, cerrar_sesion } = useContext(Contexto);
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario;
    const navegacion = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar el desplegable

    const reproducirAudio = () => {
        const audio = audioRef.current;
        audio.loop = true;
        audio.play();
    };

    const finalizar_sesion = () => {
        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;

        cerrar_sesion();
        navegacion("/login", { replace: true });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center text-white">
                        <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                            <img src={logo} alt="Logo" style={{ height: "70px" }} />
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {usuario ? (
                                <>
                                    <Link
                                        to="/"
                                        onClick={reproducirAudio}
                                        style={linkStyles}
                                        className="btn btn-outline-dark btn-lg"
                                    >
                                        <i className="bi bi-house-door me-2"></i>Inicio
                                    </Link>
                                    <Link to="/pilotos" style={linkStyles} className="btn btn-outline-dark btn-lg">
                                        <i className="bi bi-car-front-fill me-2"></i>Pilotos
                                    </Link>
                                    <Link to="/pistas" style={linkStyles} className="btn btn-outline-dark btn-lg">
                                        <i className="bi bi-sign-turn-slight-left me-2"></i>Pistas
                                    </Link>
                                    <Link to="/maximos_ganadores" style={linkStyles} className="btn btn-outline-dark btn-lg">
                                        <i className="bi bi-trophy me-2"></i>Máximos Ganadores
                                    </Link>
                                    <div className="dropdown">
                                        <button onClick={toggleDropdown} style={linkStyles} className="btn btn-outline-dark btn-lg">
                                            <i className="bi bi-person-circle me-2"></i>
                                            {usuario1.usuario}
                                        </button>
                                        <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                                            <Link
                                                to="/login"
                                                onClick={finalizar_sesion}
                                                style={{ ...linkStyles, marginRight: 0, borderRadius: 0, padding: "0.5rem 1rem" }}
                                                className="btn btn-light btn-sm w-100 text-start"
                                            >
                                                <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                                            </Link>
                                           
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to="/registro" style={linkStyles} className="btn btn-outline-dark btn-lg">
                                        <i className="bi bi-person-plus me-2"></i>Registro
                                    </Link>
                                    <Link to="/login" style={linkStyles} className="btn btn-outline-dark btn-lg">
                                        <i className="bi bi-box-arrow-in-right me-2"></i>Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <hr style={{ borderColor: "#011237" }} />
            <style>
                {`
          .container {
            background-color: #011237;
          }

          .btn-outline-dark {
            background-color: white;
          }

          .btn-outline-dark:hover {
            background-color: hsl(0, 100.00%, 30.20%);
            color: white;
            border-radius: 50px;
          }

          .dropdown {
            position: relative;
            display: inline-block;
          }

          .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 150px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
            border-radius: 50px;
          }

          .dropdown-content a {
            color: black;
            padding: 10px 15px;
            text-decoration: none;
            display: block;
            text-align: left;
          }

          .dropdown-content a:hover {background-color: #ddd; border-radius: 50px;}

          .dropdown:hover .dropdown-content {display: block; border-radius: 50px;}


        `}
            </style>
        </>
    );
};

export default Nav;