import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        nombre_usuario: nombreUsuario,
        contrasena: contrasena,
      });

      if (response.data.success) {
        setModalMessage('Login exitoso. Bienvenido!');
      } else {
        setModalMessage('Nombre de usuario o contraseña incorrectos.');
      }
    } catch (err) {
      setModalMessage('Error al autenticar. Inténtalo de nuevo.');
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h2 className="text-3xl font-bold my-4 text-white">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          placeholder="Nombre de Usuario"
          className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Contraseña"
          className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 rounded-md text-white hover:bg-blue-700">
          Login
        </button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg max-w-lg mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">{modalMessage}</h2>
          <button onClick={closeModal} className="p-2 bg-red-500 rounded-md text-white hover:bg-red-700">
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
