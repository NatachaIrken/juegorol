import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageCharacters = ({ usuario }) => {
    const [personajes, setPersonajes] = useState([]);
    const [razas, setRazas] = useState([]);
    const [nombrePersonaje, setNombrePersonaje] = useState('');
    const [razaId, setRazaId] = useState('');
    const [habilidades, setHabilidades] = useState('');
    const [poderes, setPoderes] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPersonajes = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/personajes/${usuario._id}`);
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
    }, [usuario._id]);

    const handleCreate = async () => {
        try {
            const nuevoPersonaje = {
                usuario_id: usuario._id,
                nombre_personaje: nombrePersonaje,
                raza_id: razaId,
                habilidades: habilidades.split(',').map(h => h.trim()),
                poderes: poderes.split(',').map(p => p.trim())
            };
            const response = await axios.post('http://localhost:3001/api/personajes', nuevoPersonaje);
            setPersonajes([...personajes, response.data]);
            clearForm();
        } catch (error) {
            console.error('Error al crear personaje:', error);
        }
    };

    const handleUpdate = (personaje) => {
        navigate(`/edit-personaje/${personaje._id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/personajes/${id}`);
            setPersonajes(personajes.filter(p => p._id !== id));
        } catch (error) {
            console.error('Error al eliminar personaje:', error);
        }
    };

    const clearForm = () => {
        setNombrePersonaje('');
        setRazaId('');
        setHabilidades('');
        setPoderes('');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Gestión de Personajes</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }} className="mb-8">
                <input
                    type="text"
                    placeholder="Nombre del Personaje"
                    value={nombrePersonaje}
                    onChange={(e) => setNombrePersonaje(e.target.value)}
                    required
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <select value={razaId} onChange={(e) => setRazaId(e.target.value)} required className="w-full p-2 mb-2 border border-gray-300 rounded">
                    <option value="">Seleccionar Raza</option>
                    {razas.map(raza => (
                        <option key={raza._id} value={raza._id}>{raza.nombre}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Habilidades (separadas por comas)"
                    value={habilidades}
                    onChange={(e) => setHabilidades(e.target.value)}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Poderes (separados por comas)"
                    value={poderes}
                    onChange={(e) => setPoderes(e.target.value)}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">Crear Personaje</button>
            </form>
            <ul>
                {personajes.map(personaje => (
                    <li key={personaje._id} className="bg-gray-700 mb-4 p-4 rounded text-center">
                        <h2 className="text-xl font-bold">{personaje.nombre_personaje} (Nivel: {personaje.nivel})</h2>
                        <p>Raza: {personaje.raza_id.nombre}</p>
                        <button onClick={() => handleUpdate(personaje)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2">Editar</button>
                        <button onClick={() => handleDelete(personaje._id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-2 ml-2">Eliminar</button>
                        <a href={`http://localhost:3001/api/personajes/${personaje._id}/pdf`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2 ml-2">Ver Informe</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCharacters;
