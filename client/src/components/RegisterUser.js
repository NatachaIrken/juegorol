import React, { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [nombre_usuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3001/api/usuarios', {
                nombre,
                apellidos,
                email,
                nombre_usuario,
                contrasena
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold my-4">Registrar Usuario</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    className="p-2 rounded-md bg-gray-800 text-white"
                />
                <input
                    type="text"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    placeholder="Apellidos"
                    className="p-2 rounded-md bg-gray-800 text-white"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="p-2 rounded-md bg-gray-800 text-white"
                />
                <input
                    type="text"
                    value={nombre_usuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    placeholder="Nombre de Usuario"
                    className="p-2 rounded-md bg-gray-800 text-white"
                />
                <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="Contraseña"
                    className="p-2 rounded-md bg-gray-800 text-white"
                />
                <button 
                    type="submit" 
                    className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-700"
                    disabled={isSubmitting}
                >
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default RegisterUser;
