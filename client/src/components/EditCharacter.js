import React from 'react';
import { useParams } from 'react-router-dom';

const EditCharacter = () => {
    const { id } = useParams();
    return (
        <div>
            <h2>Editar Personaje {id}</h2>
        </div>
    );
};

export default EditCharacter;