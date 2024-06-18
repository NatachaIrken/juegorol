import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('datos');

  useEffect(() => {
    document.getElementById(activeTab).classList.add('active');
  }, [activeTab]);

  const openTab = (tabName) => {
    setActiveTab(tabName);
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
        >a
          Información
        </button>
      </div>
      <div className="tab-content-container">
        <div id="datos" className={`tab-content ${activeTab === 'datos' ? 'active' : ''}`}>
          <h2>Datos</h2>
          <p>Contenido de la pestaña Datos.</p>
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
