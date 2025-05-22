import React, { useState, useEffect, useContext } from 'react'; // Importa useContext
import axios from 'axios';
import '../assets/styles/editar.css';
import Contexto from '../context/Contexto.jsx'; // Importa el Contexto

const Imagenes = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { usuario } = useContext(Contexto); // Obtén el usuario del contexto
    const usuario1 = typeof usuario !== "object" ? JSON.parse(usuario) : usuario; // Parsea si es necesario

    const API_BASE_URL = 'http://localhost:3001';

    // Función para obtener la lista de imágenes ya subidas
    const fetchImages = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/imagenes`);
            setUploadedImages(res.data.imagenes);
            console.log("Imágenes cargadas desde la BD:", res.data.imagenes);
        } catch (err) {
            console.error("Error al cargar las imágenes:", err.response?.data?.msj || err.message);
            setError("Error al cargar las imágenes existentes.");
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setMessage('');
        setError('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Por favor, selecciona un archivo antes de subir.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const res = await axios.post(`${API_BASE_URL}/imagen`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(res.data.msj);
            setError('');
            console.log("Respuesta de la subida:", res.data);
            setUploadedImages((prevImages) => [...prevImages, res.data.imagen]);
            setSelectedFile(null);
        } catch (err) {
            setError(err.response?.data?.msj || 'Error al subir la imagen.');
            setMessage('');
            console.error('Error al subir la imagen:', err);
        }
    };

    // Función para copiar la URL al portapapeles
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('URL copiada al portapapeles: ' + text);
            })
            .catch((err) => {
                console.error('Error al copiar al portapapeles:', err);
                alert('No se pudo copiar la URL al portapapeles.');
            });
    };

    // Función para abrir la URL en una nueva pestaña
    const openInNewTab = (url) => {
        window.open(url, '_blank');
    };

    // función para manejar la eliminación de una imagen
    const handleDeleteImage = async (imageId, filenameForConfirm) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar la imagen "${filenameForConfirm}"?`)) {
            try {
                const res = await axios.delete(`${API_BASE_URL}/imagen/${imageId}`);
                setMessage(res.data.msj);
                setError('');
                console.log("Respuesta de la eliminación:", res.data);
                setUploadedImages((prevImages) =>
                    prevImages.filter((img) => img._id !== imageId)
                );
            } catch (err) {
                setError(err.response?.data?.msj || 'Error al eliminar la imagen.');
                setMessage('');
                console.error('Error al eliminar la imagen:', err);
            }
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
            <h1>Cargar y Mostrar Imágenes</h1>

            {usuario1.estado === 0 && ( // Solo muestra la sección de carga si usuario.estado es 0
                <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', backgroundColor: '#011237' }}>
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif, .webp"
                        onChange={handleFileChange}
                        style={{ marginRight: '10px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile}
                        style={{ padding: '10px 20px', backgroundColor: 'purple', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: selectedFile ? 1 : 0.6 }}
                    >
                        Subir Imagen
                    </button>
                </div>
            )}

            {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

            {selectedFile && (
                <div style={{ marginTop: '15px', padding: '10px', border: '1px dashed #007bff', borderRadius: '5px', backgroundColor: '#011237' }}>
                    <h3>Archivo seleccionado:</h3>
                    <p style={{ margin: '0', fontWeight: 'bold' }}>{selectedFile.name}</p>
                </div>
            )}

            ---
            <h2>Imágenes Subidas:</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {uploadedImages.length === 0 ? (
                    <p>No hay imágenes subidas aún.</p>
                ) : (
                    uploadedImages.map((image) => {
                        const imageUrl = `${API_BASE_URL}/imagenes/${image.nombreArchivo}`;
                        return (
                            <div key={image._id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#011237', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                <img
                                    src={imageUrl}
                                    alt={image.nombreArchivo || 'Imagen subida'}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '1px solid #ddd' }}
                                />
                                <div style={{ padding: '15px', color: 'white' }}>
                                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', wordBreak: 'break-all' }}>
                                        {image.nombreArchivo}
                                    </p>
                                    <div style={{ marginBottom: '10px', wordBreak: 'break-all', fontSize: '0.9em' }}>
                                        <p style={{ margin: '0' }}>URL:</p>
                                        <a
                                            href={imageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#61dafb', textDecoration: 'none' }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openInNewTab(imageUrl);
                                            }}
                                        >
                                            {imageUrl}
                                        </a>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <button
                                            onClick={() => copyToClipboard(imageUrl)}
                                            style={{
                                                padding: '2%',
                                                backgroundColor: '#572364',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.9em',
                                                flexGrow: 1
                                            }}
                                        >
                                            Copiar URL
                                        </button>
                                        <button
                                            onClick={() => openInNewTab(imageUrl)}
                                            style={{
                                                padding: '2%',
                                                backgroundColor: '#572364',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.9em',
                                                flexGrow: 1
                                            }}
                                        >
                                            Pantalla completa
                                        </button>
                                        {usuario1.estado === 0 && ( // Solo muestra el botón de eliminar si usuario.estado es 0
                                            <button
                                                onClick={() => handleDeleteImage(image._id, image.nombreArchivo)}
                                                style={{
                                                    padding: '8px 12px',
                                                    backgroundColor: '#dc3545', // Rojo
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9em',
                                                    flexGrow: 1
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Imagenes;