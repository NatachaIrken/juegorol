import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPersonaje = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [personaje, setPersonaje] = useState(null);
    const [razas, setRazas] = useState([]);
    const [habilidades, setHabilidades] = useState([]);
    const [poderes, setPoderes] = useState([]);
    const [equipamientos, setEquipamientos] = useState([]);
    const [habilidadesSeleccionadas, setHabilidadesSeleccionadas] = useState([]);
    const [poderesSeleccionados, setPoderesSeleccionados] = useState([]);
    const [equipamientoSeleccionado, setEquipamientoSeleccionado] = useState({
        anillo: "",
        collar: "",
        armadura: "",
        piernas: "",
        brazeras: "",
        casco: "",
        botas: ""
    });

    useEffect(() => {
        const fetchPersonaje = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/personajes/${id}`);
                const personajeData = response.data;
                setPersonaje(personajeData);
                setHabilidadesSeleccionadas(personajeData.habilidades);
                setPoderesSeleccionados(personajeData.poderes);
                setEquipamientoSeleccionado(personajeData.equipamiento || {
                    anillo: "",
                    collar: "",
                    armadura: "",
                    piernas: "",
                    brazeras: "",
                    casco: "",
                    botas: ""
                });
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

        const fetchEquipamientos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/equipamientos');
                setEquipamientos(response.data);
            } catch (error) {
                console.error('Error al obtener equipamientos:', error);
            }
        };

        fetchPersonaje();
        fetchRazas();
        fetchEquipamientos();
    }, [id]);

    useEffect(() => {
        if (personaje && personaje.raza_id) {
            const razaSeleccionada = razas.find(r => r._id === personaje.raza_id._id);
            if (razaSeleccionada) {
                setHabilidades(razaSeleccionada.habilidades);
                setPoderes(razaSeleccionada.poderes);
            }
        }
    }, [personaje, razas]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonaje({ ...personaje, [name]: value });
    };

    const handleEquipamientoChange = (e) => {
        const { name, value } = e.target;
        setEquipamientoSeleccionado({ ...equipamientoSeleccionado, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/personajes/${id}`, {
                ...personaje,
                habilidades: habilidadesSeleccionadas,
                poderes: poderesSeleccionados,
                equipamiento: equipamientoSeleccionado
            });
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar personaje:', error);
        }
    };

    const handleHabilidadChange = (e) => {
        const { value, checked } = e.target;
        setHabilidadesSeleccionadas(prev =>
            checked ? [...prev, value].slice(0, 6) : prev.filter(h => h !== value)
        );
    };

    const handlePoderChange = (e) => {
        const { value, checked } = e.target;
        setPoderesSeleccionados(prev =>
            checked ? [...prev, value].slice(0, 4) : prev.filter(p => p !== value)
        );
    };

    if (!personaje) return <div>Cargando...</div>;

    return (
        <div className="container mx-auto p-6 text-black">
            <h1 className="text-2xl font-bold mb-6">Editar Personaje</h1>
            <form onSubmit={handleSave}>
                <div className="mb-4">
                    <label className="block text-black mb-2" htmlFor="nombre_personaje">Nombre del Personaje</label>
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
                    <label className="block text-black mb-2" htmlFor="raza_id">Raza</label>
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
                    <label className="block text-black mb-2" htmlFor="nivel">Nivel</label>
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
                    <label className="block text-black mb-2" htmlFor="estado">Estado</label>
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
                    <h3 className="text-xl font-bold mb-2">Selecciona Habilidades (Max 6)</h3>
                    {habilidades.map((h) => (
                        <label key={h.nombre} className="block text-black">
                            <input
                                type="checkbox"
                                value={h.nombre}
                                checked={habilidadesSeleccionadas.includes(h.nombre)}
                                onChange={handleHabilidadChange}
                                disabled={!habilidadesSeleccionadas.includes(h.nombre) && habilidadesSeleccionadas.length >= 6}
                            />
                            {h.nombre}
                        </label>
                    ))}
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Selecciona Poderes (Max 4)</h3>
                    {poderes.map((p) => (
                        <label key={p.nombre} className="block text-black">
                            <input
                                type="checkbox"
                                value={p.nombre}
                                checked={poderesSeleccionados.includes(p.nombre)}
                                onChange={handlePoderChange}
                                disabled={!poderesSeleccionados.includes(p.nombre) && poderesSeleccionados.length >= 4}
                            />
                            {p.nombre}
                        </label>
                    ))}
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Selecciona Equipamiento</h3>
                    {["anillo", "collar", "armadura", "piernas", "brazeras", "casco", "botas"].map(tipo => (
                        <div key={tipo} className="mb-4">
                            <label className="block text-black mb-2" htmlFor={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</label>
                            <select
                                id={tipo}
                                name={tipo}
                                value={equipamientoSeleccionado[tipo]}
                                onChange={handleEquipamientoChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Selecciona un {tipo}</option>
                                {equipamientos.filter(e => e.tipo === tipo).map((e) => (
                                    <option key={e.nombre} value={e.nombre}>{e.nombre}</option>
                                ))}
                            </select>
                        </div>
                    ))}
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
