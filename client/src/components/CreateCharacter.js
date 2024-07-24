import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCharacter = () => {
    const [personaje, setPersonaje] = useState('');
    const [raza, setRaza] = useState('');
    const [nivel, setNivel] = useState(1);
    const [razas, setRazas] = useState([]);
    const [habilidades, setHabilidades] = useState([]);
    const [poderes, setPoderes] = useState([]);
    const [habilidad1, setHabilidad1] = useState('');
    const [habilidad2, setHabilidad2] = useState('');
    const [poder, setPoder] = useState('');
    const [personajeCreado, setPersonajeCreado] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/razas')
            .then(response => setRazas(response.data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (raza) {
            const razaSeleccionada = razas.find(r => r._id === raza);
            if (razaSeleccionada) {
                setHabilidades(razaSeleccionada.habilidades);
                setPoderes(razaSeleccionada.poderes);
                setHabilidad1('');
                setHabilidad2('');
                setPoder('');
            }
        }
    }, [raza, razas]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoPersonaje = {
            nombre_personaje: personaje,
            raza_id: raza,
            nivel: nivel,
            habilidades: [habilidad1, habilidad2],
            poderes: [poder]
        };

        axios.post('http://localhost:3001/api/personajes', nuevoPersonaje)
            .then(response => {
                setPersonajeCreado(response.data);
                setPersonaje('');
                setRaza('');
                setNivel(1);
                setHabilidad1('');
                setHabilidad2('');
                setPoder('');
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
                <div>
                    <h3 className="text-xl font-bold mb-2">Selecciona Habilidad 1</h3>
                    <select
                        value={habilidad1}
                        onChange={(e) => setHabilidad1(e.target.value)}
                        className="p-3 w-full rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Selecciona una Habilidad</option>
                        {habilidades.map((h, index) => (
                            <option key={index} value={h.nombre}>{h.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Selecciona Habilidad 2</h3>
                    <select
                        value={habilidad2}
                        onChange={(e) => setHabilidad2(e.target.value)}
                        className="p-3 w-full rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Selecciona una Habilidad</option>
                        {habilidades.map((h, index) => (
                            <option key={index} value={h.nombre}>{h.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Selecciona un Poder</h3>
                    <select
                        value={poder}
                        onChange={(e) => setPoder(e.target.value)}
                        className="p-3 w-full rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Selecciona un Poder</option>
                        {poderes.map((p, index) => (
                            <option key={index} value={p.nombre}>{p.nombre}</option>
                        ))}
                    </select>
                </div>
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
                    <p><strong>Poderes:</strong> {personajeCreado.poderes.join(', ')}</p>
                    <p><strong>Habilidades:</strong> {personajeCreado.habilidades.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default CreateCharacter;
