import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => { // Asegúrate de que 'onLogin' se está recibiendo como prop
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nombre_usuario = formData.get('nombre_usuario');
        const contrasena = formData.get('contrasena');
        
        try {
            const response = await axios.post('http://localhost:3001/api/login', { nombre_usuario, contrasena });
            if (response.data.success) {
                onLogin(response.data.usuario); // Llama a la función pasada como prop
                navigate('/create-character'); // Cambiado a '/create-character' en lugar de '/main'
            } else {
                setErrorMessage('Nombre de usuario o contraseña incorrectos');
                setIsModalVisible(true);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Iniciar sesión</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="text" name="nombre_usuario" placeholder="Nombre de Usuario" className="w-full p-3 rounded-lg border border-gray-300 text-gray-800" />
                    <input type="password" name="contrasena" placeholder="Contraseña" className="w-full p-3 rounded-lg border border-gray-300 text-gray-800" />
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-150 ease-in-out">Login</button>
                </form>
                {isModalVisible && (
                    <div className="text-center mt-4 text-red-500">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
