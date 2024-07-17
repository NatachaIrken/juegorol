import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/login', { nombre_usuario: nombreUsuario, contrasena: contrasena })
            .then(response => {
                if (response.data.success) {
                    onLogin(response.data.usuario);
                } else {
                    alert('Login failed');
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold my-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={nombreUsuario}
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
                <button type="submit" className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
