import React, { useState, useEffect } from "react";
import '../assets/styles/editar.css';
import { useNavigate } from "react-router-dom";


const Rol = () => {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://localhost:3001/usuarios")
            .then((response) => response.json())
            .then((data) => setUsuarios(data))
            .catch((error) => console.error("Error al obtener usuarios:", error));
    }, []);
    const irAEditar = (nombre) => {
        navigate(`/usuarios/editar/${nombre}`);
    };
    return (
        <div className="container">
            <div className="contentUsuarios">
                <ul>
                    {usuarios.map((usuario) => (
                        <li key={usuario.nombre}>
                            <span className="nombre">
                               *USUARIO: {usuario.usuario} *ROL: {usuario.estado === 0 ? "Admin" : "Usuario"}  *ESTADO: {usuario.estado === 0 ? "Activo" : "Inactivo"}
                            </span>
                            <div className="botones-accion"> {/* Aquí es donde debes envolver los botones */}
                                <button
                                    onClick={() => irAEditar(usuario.usuario)}
                                    className="boton-editar"
                                >
                                    ✏️ Editar
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Rol;
