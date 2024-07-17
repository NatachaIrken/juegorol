import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateCharacter from './components/CreateCharacter';
import ManageCharacters from './components/ManageCharacters';
import EditCharacter from './components/EditCharacter';
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
                <Navbar />
                <h1 className="text-center text-5xl my-8">Infinity World</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-character" element={<CreateCharacter />} />
                    <Route path="/manage-characters" element={<ManageCharacters usuario={usuario} />} />
                    <Route path="/edit-character/:id" element={<EditCharacter />} />
                    <Route path="/register-user" element={<RegisterUser />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                </Routes>
                <div className="footer">Marca registrada InfinityGames®</div>
            </div>
        </Router>
    );
};

export default App;