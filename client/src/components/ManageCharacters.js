import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageCharacter = () => {
    const [personajes, setPersonajes] = useState([]);
    const [razas, setRazas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPersonajes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/personajes');
                setPersonajes(response.data);
            } catch (error) {
                console.error('Error al obtener personajes:', error);
            }
        };

        const fetchRazas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/razas');
                setRazas(response.data);
            } catch (error) {
                console.error('Error al obtener razas:', error);
            }
        };

        fetchPersonajes();
        fetchRazas();
    }, []);

    const handleEditClick = (personaje) => {
        navigate(`/edit-personaje/${personaje._id}`);
    };

    const handleDownloadPDF = (id) => {
        window.open(`http://localhost:3001/api/personajes/${id}/pdf`, '_blank');
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/personajes/${id}`);
            setPersonajes(personajes.filter((p) => p._id !== id));
        } catch (error) {
            console.error('Error al eliminar personaje:', error);
        }
    };

    if (!personajes.length || !razas.length) return <div>Cargando...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Gestión de Personajes</h1>
            <ul>
                {personajes.map((personaje) => (
                    <li key={personaje._id} className="bg-gray-700 mb-4 p-4 rounded text-center">
                        <h2 className="text-xl font-bold">{personaje.nombre_personaje} (Nivel: {personaje.nivel})</h2>
                        <p>Raza: {personaje.raza_id.nombre}</p>
                        <p>Estado: {personaje.estado}</p>
                        <div className="mt-4 flex justify-around">
                            <button
                                onClick={() => handleEditClick(personaje)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDownloadPDF(personaje._id)}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Descargar PDF
                            </button>
                            <button
                                onClick={() => handleDelete(personaje._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCharacter;
