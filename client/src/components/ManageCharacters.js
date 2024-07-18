import React, { useEffect, useState } from 'react';

const ManageCharacters = ({ usuario }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (usuario) {
        // Simula la llamada a la API para obtener los personajes del usuario
        const userCharacters = [
          { id: 1, nombre: 'Personaje 1', usuario: usuario.nombre },
          { id: 2, nombre: 'Personaje 2', usuario: usuario.nombre },
        ];
        setCharacters(userCharacters);
      }
      setLoading(false); // Cambiar el estado de carga a false después de la llamada a la API
    };

    fetchCharacters();
  }, [usuario]);

  if (!usuario) {
    return <p className="text-center text-white">Por favor, inicie sesión para ver sus personajes.</p>;
  }

  if (loading) {
    return <p className="text-center text-white">Cargando personajes...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-8">Personajes de {usuario.nombre}</h1>
      {characters.length > 0 ? (
        <ul className="w-4/5">
          {characters.map((character) => (
            <li key={character.id} className="bg-gray-700 mb-4 p-4 rounded text-center">
              {character.nombre}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No tienes personajes creados.</p>
      )}
    </div>
  );
};

export default ManageCharacters;
