import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPersonaje = () => {
    const { personajeId } = useParams();
    const [personaje, setPersonaje] = useState(null);
    const [razas, setRazas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPersonaje = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/personajes/${personajeId}`);
                setPersonaje(response.data);
            } catch (error) {
                console.error('Error al obtener el personaje:', error);
            }
        };

        const fetchRazas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/razas');
                setRazas(response.data);
            } catch (error) {
                console.error('Error al obtener las razas:', error);
            }
        };

        fetchPersonaje();
        fetchRazas();
    }, [personajeId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonaje((prevPersonaje) => ({
            ...prevPersonaje,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e, type) => {
        const { value, checked } = e.target;
        setPersonaje((prevPersonaje) => {
            const updatedList = checked
                ? [...prevPersonaje[type], value]
                : prevPersonaje[type].filter((item) => item !== value);
            return { ...prevPersonaje, [type]: updatedList };
        });
    };

    const handleGuardarCambios = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/personajes/${personajeId}`, personaje);
            navigate('/main');
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    if (!personaje) return <div>Cargando...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Editar Personaje</h1>
            <form onSubmit={handleGuardarCambios} className="mb-8">
                <input
                    type="text"
                    name="nombre_personaje"
                    value={personaje.nombre_personaje}
                    onChange={handleInputChange}
                    placeholder="Nombre del Personaje"
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <select
                    name="raza_id"
                    value={personaje.raza_id}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                >
                    <option value="">Seleccionar Raza</option>
                    {razas.map((raza) => (
                        <option key={raza._id} value={raza._id}>
                            {raza.nombre}
                        </option>
                    ))}
                </select>
                {personaje.raza_id && (
                    <>
                        <fieldset className="mb-2">
                            <legend className="mb-1 font-semibold">Seleccionar Poderes</legend>
                            {razas.find((raza) => raza._id === personaje.raza_id).poderes.map((poder, index) => (
                                <label key={index} className="block">
                                    <input
                                        type="checkbox"
                                        value={poder.nombre}
                                        checked={personaje.poderes.includes(poder.nombre)}
                                        onChange={(e) => handleCheckboxChange(e, 'poderes')}
                                    />
                                    {poder.nombre}
                                </label>
                            ))}
                        </fieldset>
                        <fieldset className="mb-4">
                            <legend className="mb-1 font-semibold">Seleccionar Habilidades</legend>
                            {razas.find((raza) => raza._id === personaje.raza_id).habilidades.map((habilidad, index) => (
                                <label key={index} className="block">
                                    <input
                                        type="checkbox"
                                        value={habilidad.nombre}
                                        checked={personaje.habilidades.includes(habilidad.nombre)}
                                        onChange={(e) => handleCheckboxChange(e, 'habilidades')}
                                    />
                                    {habilidad.nombre}
                                </label>
                            ))}
                        </fieldset>
                    </>
                )}
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditPersonaje;
