import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateCharacter from './components/CreateCharacter';
import ManageCharacters from './components/ManageCharacters';
import EditCharacter from './components/EditPersonaje'; 
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';
import './index.css';

const App = () => {
    const [usuario, setUsuario] = useState(null);

    const handleLogin = (usuario) => {
        setUsuario(usuario);
    };

    return (
        <Router>
            <div className="container mx-auto">
                <Navbar usuario={usuario} />
                <h1 className="text-center text-5xl my-8">Infinity World</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={usuario ? <Navigate replace to="/create-character" /> : <Login onLogin={handleLogin} />} />
                    <Route path="/create-character" element={usuario ? <CreateCharacter /> : <Navigate replace to="/login" />} />
                    <Route path="/manage-characters" element={usuario ? <ManageCharacters usuario={usuario} /> : <Navigate replace to="/login" />} />
                    <Route path="/register-user" element={<RegisterUser />} />
                    <Route path="/edit-personaje/:id" element={usuario ? <EditCharacter /> : <Navigate replace to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
