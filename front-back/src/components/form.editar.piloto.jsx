import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../assets/styles/editar.css';
import { useForm } from 'react-hook-form';
import Contexto from "../context/Contexto";
import { useContext } from 'react';

const validaciones = {
    nombre: {
        required: "El nombre es obligatorio",
        pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "Solo se permiten letras y espacios"
        }
    },
    equipo: {
        required: "El equipo es obligatorio",
        pattern: {
            value: /^[a-zA-Z0-9\s]+$/,
            message: "Solo se permiten letras, números y espacios"
        }
    },
    numero: {
        required: "El número es obligatorio",
        min: {
            value: 1,
            message: "El número debe ser mayor o igual a 1"
        },
        pattern: {
            value: /^[0-9]+$/,
            message: "Solo se permiten números"
        }
    }
};

const EditarPiloto = () => {
    const { nombre: nombreParam } = useParams();
    const navigate = useNavigate();
    const [piloto, setPiloto] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            nombre: '',
            equipo: '',
            numero: 1
        }
    });
    const { usuario } = useContext(Contexto);
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario;

    useEffect(() => {
        fetch(`http://localhost:3001/piloto/${nombreParam}`)
            .then((res) => res.json())
            .then((data) => {
                setPiloto(data);
                // Establecer los valores en el formulario una vez que se cargan los datos
                setValue("nombre", data.nombre || "");
                setValue("equipo", data.equipo || "");
                setValue("numero", data.numero || 1);
            })
            .catch((error) => console.error("Error al obtener piloto:", error));
    }, [nombreParam, setValue]);

    const onSubmit = async (data) => {
        try {
            await fetch(`http://localhost:3001/editarPiloto/${nombreParam}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Autorizacion": "Back " + usuario1.token },
                body: JSON.stringify(data)
            });
            alert("Piloto actualizado correctamente");
            navigate("/pilotos");
        } catch (error) {
            console.error("Error al actualizar piloto:", error);
        }
    };

    if (!piloto) return <p id="loading">Cargando datos del piloto...</p>;

    return (
        <div id="container">
            <h2 id="titulo">Editando a {piloto?.nombre || "..."}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Nombre:
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        {...register("nombre", validaciones.nombre)}
                    />
                    {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
                </label>
                <br />

                <label>
                    Equipo:
                    <input
                        id="equipo"
                        type="text"
                        name="equipo"
                        {...register("equipo", validaciones.equipo)}
                    />
                    {errors.equipo && <p className="error-message">{errors.equipo.message}</p>}
                </label>
                <br />

                <label>
                    Número:
                    <input
                        id="numero"
                        type="number"
                        name="numero"
                        {...register("numero", validaciones.numero)}
                    />
                    {errors.numero && <p className="error-message">{errors.numero.message}</p>}
                </label>
                <br />
                <div id="GuarCan">
                    <button className="boton-regresar" id="guardar" onClick={() => navigate(-1)}>
                        ✖️Cancelar
                    </button>
                    <button id="guardar" type="submit">
                        ✔️Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarPiloto;