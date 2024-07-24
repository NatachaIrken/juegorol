import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = ({ usuario }) => {
    const [razas, setRazas] = useState([]);
    const [personajes, setPersonajes] = useState([]);
    const [nuevoPersonaje, setNuevoPersonaje] = useState({
        nombre_personaje: '',
        raza_id: '',
        habilidades: [],
        poderes: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRazas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/razas');
                setRazas(response.data);
            } catch (error) {
                console.error('Error al obtener las razas:', error);
            }
        };

        const fetchPersonajes = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/personajes/${usuario._id}`);
                setPersonajes(response.data);
            } catch (error) {
                console.error('Error al obtener los personajes:', error);
            }
        };

        fetchRazas();
        fetchPersonajes();
    }, [usuario]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoPersonaje(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e, type) => {
        const { value, checked } = e.target;
        setNuevoPersonaje(prevState => {
            const updatedList = checked
                ? [...prevState[type], value]
                : prevState[type].filter(item => item !== value);
            return { ...prevState, [type]: updatedList };
        });
    };

    const handleCrearPersonaje = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/personajes', {
                usuario_id: usuario._id,
                ...nuevoPersonaje
            });
            setPersonajes([...personajes, response.data]);
            setNuevoPersonaje({
                nombre_personaje: '',
                raza_id: '',
                habilidades: [],
                poderes: []
            });
        } catch (error) {
            console.error('Error al crear personaje:', error);
        }
    };

    const handleVerPDF = async (personajeId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/personajes/${personajeId}/pdf`, { responseType: 'blob' });
            const pdfUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(pdfUrl);
        } catch (error) {
            console.error('Error al obtener el PDF:', error);
        }
    };

    const handleEditarPersonaje = (personajeId) => {
        navigate(`/editar-personaje/${personajeId}`);
    };

    const handleEliminarPersonaje = async (personajeId) => {
        try {
            await axios.delete(`http://localhost:3001/api/personajes/${personajeId}`);
            setPersonajes(personajes.filter(personaje => personaje._id !== personajeId));
        } catch (error) {
            console.error('Error al eliminar personaje:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Bienvenido, {usuario.nombre_usuario}</h1>
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Personaje</h2>
            <form onSubmit={handleCrearPersonaje} className="mb-8">
                <input
                    type="text"
                    name="nombre_personaje"
                    value={nuevoPersonaje.nombre_personaje}
                    onChange={handleInputChange}
                    placeholder="Nombre del Personaje"
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <select
                    name="raza_id"
                    value={nuevoPersonaje.raza_id}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                >
                    <option value="">Seleccionar Raza</option>
                    {razas.map(raza => (
                        <option key={raza._id} value={raza._id}>
                            {raza.nombre}
                        </option>
                    ))}
                </select>
                {nuevoPersonaje.raza_id && (
                    <>
                        <fieldset className="mb-2">
                            <legend className="mb-1 font-semibold">Seleccionar Poderes</legend>
                            {razas.find(raza => raza._id === nuevoPersonaje.raza_id).poderes.map((poder, index) => (
                                <label key={index} className="block">
                                    <input
                                        type="checkbox"
                                        value={poder.nombre}
                                        checked={nuevoPersonaje.poderes.includes(poder.nombre)}
                                        onChange={(e) => handleCheckboxChange(e, 'poderes')}
                                    />
                                    {poder.nombre}
                                </label>
                            ))}
                        </fieldset>
                        <fieldset className="mb-4">
                            <legend className="mb-1 font-semibold">Seleccionar Habilidades</legend>
                            {razas.find(raza => raza._id === nuevoPersonaje.raza_id).habilidades.map((habilidad, index) => (
                                <label key={index} className="block">
                                    <input
                                        type="checkbox"
                                        value={habilidad.nombre}
                                        checked={nuevoPersonaje.habilidades.includes(habilidad.nombre)}
                                        onChange={(e) => handleCheckboxChange(e, 'habilidades')}
                                    />
                                    {habilidad.nombre}
                                </label>
                            ))}
                        </fieldset>
                    </>
                )}
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">Crear Personaje</button>
            </form>
            <h2 className="text-xl font-bold mb-4">Mis Personajes</h2>
            <ul>
                {personajes.map(personaje => (
                    <li key={personaje._id} className="mb-2 p-2 border border-gray-300 rounded">
                        <h3 className="text-lg font-semibold">{personaje.nombre_personaje}</h3>
                        <p>Raza: {personaje.raza.nombre}</p>
                        <p>Poderes: {personaje.poderes.join(', ')}</p>
                        <p>Habilidades: {personaje.habilidades.join(', ')}</p>
                        <button onClick={() => handleVerPDF(personaje._id)} className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded mr-2">Ver PDF</button>
                        <button onClick={() => handleEditarPersonaje(personaje._id)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded mr-2">Editar</button>
                        <button onClick={() => handleEliminarPersonaje(personaje._id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Main;
