import React from 'react';
import ReactDOM from 'react-dom';
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
    return (
        <Router>
            <div className="container">
                <Navbar />
                <h1>Infinity World</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-character" element={<CreateCharacter />} />
                    <Route path="/manage-characters" element={<ManageCharacters />} />
                    <Route path="/edit-character/:id" element={<EditCharacter />} />
                    <Route path="/register-user" element={<RegisterUser />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
            <div className="footer">Marca registrada InfinityGames®</div>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
