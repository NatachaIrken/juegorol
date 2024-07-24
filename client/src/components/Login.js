import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const nombre_usuario = e.target.elements.username.value;
        const contrasena = e.target.elements.password.value;

        try {
            const response = await axios.post('http://localhost:3001/api/login', { nombre_usuario, contrasena });
            if (response.data.success) {
                const usuario = response.data.usuario;
                if (onLogin) {
                    onLogin(usuario);
                }
                setIsModalVisible(true);
                setErrorMessage('');
            } else {
                setErrorMessage('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Error al autenticar usuario');
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        navigate('/create-character');
    };

    return (
        <div style={styles.loginContainer}>
            <form onSubmit={handleLogin} style={styles.form}>
                <input type="text" name="username" placeholder="Usuario" required style={styles.input} />
                <input type="password" name="password" placeholder="Contraseña" required style={styles.input} />
                <button type="submit" style={styles.button}>Login</button>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            </form>
            {isModalVisible && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <p>Login exitoso. ¡Bienvenido!</p>
                        <button style={styles.closeBtn} onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#1a202c', // Fondo oscuro
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#2d3748', // Fondo oscuro para los inputs
    color: 'white',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#2d3748', // Fondo del botón
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  modal: {
    display: 'block',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: '60px',
  },
  modalContent: {
    backgroundColor: '#2d3748', // Fondo oscuro para el modal
    margin: '5% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
    textAlign: 'center',
    color: 'white',
    borderRadius: '8px',
  },
  closeBtn: {
    backgroundColor: '#e53e3e', // Botón de cerrar en rojo
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  }
};

export default Login;
