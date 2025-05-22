import { useReducer } from 'react';
import Contexto from './Contexto.jsx';
import types from './types.js';
import MiReducer from './MiReducer.jsx';

const inicio = () => {
    
    const sesion = localStorage.getItem("usuario");
    return {
        logueado: !!sesion, 
        usuario: sesion ? JSON.parse(sesion) : null 
    }
}

const Provider = ({ children }) => {
    const [logeado, dispatch] = useReducer(MiReducer, {}, inicio);

    const login = (datos) => {
        const action = {
            type: types.login,
            usuario: datos 
        }
        localStorage.setItem("usuario", JSON.stringify(datos));
        dispatch(action)
    }

    
    const cerrar_sesion = async () => {
        
        if (logeado.usuario && logeado.usuario.usuario) { 
            try {
                const response = await fetch("http://localhost:3001/logout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ usuario: logeado.usuario.usuario }) 
                });

                if (response.ok) {
                    console.log("Rol de usuario actualizado a Inactivo en el backend.");
                } else {
                    const errorData = await response.json();
                    console.error("Error al actualizar el rol en el backend durante el logout:", errorData.msj);
                }
            } catch (error) {
                console.error("Error de red al intentar hacer logout:", error);
            }
        }
        const action = {
            type: types.logout,
            usuario: null
        }
        localStorage.removeItem("usuario");
        dispatch(action);
    }

    return (
        <Contexto.Provider value={{ ...logeado, login, cerrar_sesion }}>
            {children}
        </Contexto.Provider>
    )
}

export default Provider;
