import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import CreateCharacter from './components/createCharacter';
import ManageCharacters from './components/manageCharacter';
import EditCharacter from './components/editCharacter';
import RegisterUser from './components/registerUser';
import Login from './components/login';
import './index.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-character" element={<CreateCharacter />} />
                    <Route path="/manage-characters" element={<ManageCharacters />} />
                    <Route path="/edit-character/:id" element={<EditCharacter />} />
                    <Route path="/register-user" element={<RegisterUser />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <div className="footer">Marca registrada InfinityGames®</div>
            </div>
        </Router>
    );
};

export default App;
