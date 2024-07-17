import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="nav">
            <Link to="/">Inicio</Link>
            <Link to="/create-character">Crear Personaje</Link>
            <Link to="/manage-characters">Gestionar Personajes</Link>
            <Link to="/register-user">Registrar Usuario</Link>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Navbar;
