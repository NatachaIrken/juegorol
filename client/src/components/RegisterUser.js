import React, { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
    const [inputs, setInputs] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        nombre_usuario: '',
        contrasena: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3001/api/usuarios', inputs);
            console.log(response.data);
            setRegistrationSuccess(true);
            setInputs({
                nombre: '',
                apellidos: '',
                email: '',
                nombre_usuario: '',
                contrasena: ''
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Regístrate</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="nombre" value={inputs.nombre} onChange={handleInputChange} placeholder="Nombre" className="w-full p-3 rounded-lg border border-gray-300 text-gray-800" />
                    <input type="text" name="apellidos" value={inputs.apellidos} onChange={handleInputChange} placeholder="Apellidos" className="w-full p-3 rounded-lg border border-gray-300 text-gray-800" />
                    <input type="email" name="email" value={inputs.email} onChange={handleInputChange} placeholder="Email" className="w-full p-3 rounded-lg border border-gray-300 text-gray-800" />
                    <input type="text" name="nombre_usuario" value={inputs.nombre_usuario} onChange={handleInputChange} placeholder="Nombre de Usuario" className="w-full p-3 rounded-lg border border-gray-300 text-gray-800" />
                    <input type="password" name="contrasena" value={inputs.contrasena} onChange={handleInputChange} placeholder="Contraseña" className="w-full p-3 rounded-lg border border-gray-300 text-gray-800" />
                    <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-150 ease-in-out">
                        {isSubmitting ? 'Registrando...' : 'Register'}
                    </button>
                </form>
                {registrationSuccess && (
                    <div className="text-center mt-4 text-green-500">
                        Registro exitoso, gracias!
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterUser;
