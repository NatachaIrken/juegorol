import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCharacter = () => {
    const [personaje, setPersonaje] = useState('');
    const [raza, setRaza] = useState('');
    const [nivel, setNivel] = useState(1); 
    const [razas, setRazas] = useState([]);
    const [personajeCreado, setPersonajeCreado] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/razas')
            .then(response => setRazas(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoPersonaje = {
            nombre_personaje: personaje,
            raza_id: raza,
            nivel: nivel,
        };

        axios.post('http://localhost:3001/api/personajes', nuevoPersonaje)
            .then(response => {
                setPersonajeCreado(response.data);
                setPersonaje('');
                setRaza('');
                setNivel(1); 
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h2 className="text-4xl font-bold mb-8">Crear Personaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                <input
                    type="text"
                    value={personaje}
                    onChange={(e) => setPersonaje(e.target.value)}
                    placeholder="Nombre del Personaje"
                    className="p-3 w-full rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <select
                    value={raza}
                    onChange={(e) => setRaza(e.target.value)}
                    className="p-3 w-full rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                    <option value="">Selecciona una Raza</option>
                    {razas.map((r) => (
                        <option key={r._id} value={r._id}>{r.nombre}</option>
                    ))}
                </select>
                <button type="submit" className="p-3 w-full bg-blue-500 rounded-md text-white hover:bg-blue-700">
                    Crear Personaje
                </button>
            </form>

            {personajeCreado && (
                <div className="mt-8 p-6 bg-gray-800 text-white rounded-md w-full max-w-md">
                    <h3 className="text-2xl font-bold mb-4">Personaje Creado</h3>
                    <p><strong>Nombre del Personaje:</strong> {personajeCreado.nombre_personaje}</p>
                    <p><strong>Raza:</strong> {razas.find(r => r._id === personajeCreado.raza_id)?.nombre}</p>
                    <p><strong>Nivel:</strong> {personajeCreado.nivel}</p>
                    <p><strong>Poderes:</strong> {razas.find(r => r._id === personajeCreado.raza_id)?.poderes.map(p => p.nombre).join(', ')}</p>
                    <p><strong>Habilidades:</strong> {razas.find(r => r._id === personajeCreado.raza_id)?.habilidades.map(h => h.nombre).join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default CreateCharacter;
