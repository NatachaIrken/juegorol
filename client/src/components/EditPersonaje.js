import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPersonaje = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [personaje, setPersonaje] = useState(null);
    const [razas, setRazas] = useState([]);
    const [habilidades, setHabilidades] = useState('');
    const [equipamiento, setEquipamiento] = useState('');
    const [poderes, setPoderes] = useState('');

    useEffect(() => {
        const fetchPersonaje = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/personajes/${id}`);
                setPersonaje(response.data);
                setHabilidades(response.data.habilidades.join(', '));
                setEquipamiento(response.data.equipamiento.join(', '));
                setPoderes(response.data.poderes.join(', '));
            } catch (error) {
                console.error('Error al obtener personaje:', error);
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

        fetchPersonaje();
        fetchRazas();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonaje({ ...personaje, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/api/personajes/${id}`, {
                ...personaje,
                habilidades: habilidades.split(',').map(hab => hab.trim()),
                equipamiento: equipamiento.split(',').map(eq => eq.trim()),
                poderes: poderes.split(',').map(pod => pod.trim()),
            });
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar personaje:', error);
        }
    };

    if (!personaje) return <div>Cargando...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Editar Personaje</h1>
            <form onSubmit={handleSave}>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="nombre_personaje">Nombre del Personaje</label>
                    <input
                        type="text"
                        id="nombre_personaje"
                        name="nombre_personaje"
                        value={personaje.nombre_personaje}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="raza_id">Raza</label>
                    <select
                        id="raza_id"
                        name="raza_id"
                        value={personaje.raza_id._id}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        {razas.map((raza) => (
                            <option key={raza._id} value={raza._id}>{raza.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="nivel">Nivel</label>
                    <input
                        type="number"
                        id="nivel"
                        name="nivel"
                        value={personaje.nivel}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="estado">Estado</label>
                    <input
                        type="text"
                        id="estado"
                        name="estado"
                        value={personaje.estado}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="habilidades">Habilidades</label>
                    <input
                        type="text"
                        id="habilidades"
                        name="habilidades"
                        value={habilidades}
                        onChange={(e) => setHabilidades(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="equipamiento">Equipamiento</label>
                    <input
                        type="text"
                        id="equipamiento"
                        name="equipamiento"
                        value={equipamiento}
                        onChange={(e) => setEquipamiento(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="poderes">Poderes</label>
                    <input
                        type="text"
                        id="poderes"
                        name="poderes"
                        value={poderes}
                        onChange={(e) => setPoderes(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default EditPersonaje;
