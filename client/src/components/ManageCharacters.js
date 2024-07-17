import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageCharacters = ({ usuario }) => {
    const [personajes, setPersonajes] = useState([]);

    useEffect(() => {
        if (usuario) {
            axios.get(`http://localhost:3001/api/personajes?usuario_id=${usuario._id}`)
                .then(response => setPersonajes(response.data))
                .catch(error => console.error(error));
        }
    }, [usuario]);

    if (!usuario) {
        return <div className="text-center">Por favor, inicia sesión para ver tus personajes.</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold my-4">Gestionar Personajes</h2>
            <ul className="space-y-4">
                {personajes.map((personaje) => (
                    <li key={personaje._id} className="p-4 bg-gray-800 text-white rounded-md">
                        <h3 className="text-xl">{personaje.nombre_personaje}</h3>
                        <p>Raza: {personaje.raza.nombre}</p>
                        <p>Nivel: {personaje.nivel}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCharacters;
