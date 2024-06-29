import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('datos');
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    document.getElementById(activeTab).classList.add('active');
  }, [activeTab]);

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="App">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'datos' ? 'active' : ''}`}
          onClick={() => openTab('datos')}
        >
          Datos
        </button>
        <button
          className={`tab-button ${activeTab === 'informacion' ? 'active' : ''}`}
          onClick={() => openTab('informacion')}
        >
          Información
        </button>
      </div>
      <div className="tab-content-container">
        <div id="datos" className={`tab-content ${activeTab === 'datos' ? 'active' : ''}`}>
          <h2>Datos</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="datos" 
            />
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="datos" 
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="datos" 
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="datos" 
            />
            <button type="submit">Registrar</button>
          </form>
        </div>
        <div id="informacion" className={`tab-content ${activeTab === 'informacion' ? 'active' : ''}`}>
          <h2>Información</h2>
          <p>Contenido de la pestaña Información.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
