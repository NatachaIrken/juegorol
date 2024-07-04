import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('crearPersonaje');
  const [razas, setRazas] = useState([]);
  const [personajeData, setPersonajeData] = useState({
    nombre_jugador: '',
    nombre_personaje: '',
    raza_id: '',
    estado_id: '',
    nivel: 1,
    poderes: [],
    habilidades: []
  });
  const [personajes, setPersonajes] = useState([]);
  const [usuarioData, setUsuarioData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    nombre_usuario: '',
    contrasena: '',
    confirmarContrasena: '',
    rol_id: 1
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/razas')
      .then(response => response.json())
      .then(data => {
        console.log("Razas:", data);
        setRazas(data);
      });
  }, []);

  useEffect(() => {
    if (personajeData.raza_id) {
      const selectedRaza = razas.find(raza => raza._id === personajeData.raza_id);
      if (selectedRaza) {
        setPersonajeData(prevState => ({
          ...prevState,
          poderes: selectedRaza.poderes.map(poder => poder.nombre),
          habilidades: selectedRaza.habilidades.map(habilidad => habilidad.nombre)
        }));
      }
    }
  }, [personajeData.raza_id, razas]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonajeData({
      ...personajeData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/personajes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(personajeData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Personaje creado:', data);
        setPersonajeData({
          nombre_jugador: '',
          nombre_personaje: '',
          raza_id: '',
          estado_id: '',
          nivel: 1,
          poderes: [],
          habilidades: []
        });
      });
  };

  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    setUsuarioData({
      ...usuarioData,
      [name]: value
    });
  };

  const handleUsuarioSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioData)
    })
      .then(response => response.json())
      .then(data => {
        setUsuarioData({
          nombre: '',
          apellidos: '',
          email: '',
          nombre_usuario: '',
          contrasena: '',
          confirmarContrasena: '',
          rol_id: 1
        });
      });
  };

  const handleEdit = (personaje) => {
    // Manejar edición de personaje
    console.log('Editar personaje:', personaje);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/personajes/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setPersonajes(personajes.filter(p => p.id !== id));
      });
  };

  return (
    <div className="container">
      <div className="tab-buttons">
        <button className={activeTab === 'crearPersonaje' ? 'active' : ''} onClick={() => handleTabChange('crearPersonaje')}>Crear Personaje</button>
        <button className={activeTab === 'informacion' ? 'active' : ''} onClick={() => handleTabChange('informacion')}>Información</button>
        <button className={activeTab === 'registroUsuario' ? 'active' : ''} onClick={() => handleTabChange('registroUsuario')}>Registro Usuario</button>
      </div>

      <div className={`tab-content ${activeTab === 'crearPersonaje' ? 'active' : ''}`}>
        <h2>Crear Personaje</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre_jugador" placeholder="Nombre del Jugador" value={personajeData.nombre_jugador} onChange={handleInputChange} required />
          <input type="text" name="nombre_personaje" placeholder="Nombre del Personaje" value={personajeData.nombre_personaje} onChange={handleInputChange} required />
          <select name="raza_id" value={personajeData.raza_id} onChange={handleInputChange} required>
            <option value="">Selecciona una Raza</option>
            {razas.map(raza => (
              <option key={raza._id} value={raza._id}>{raza.nombre}</option>
            ))}
          </select>
          <select name="estado_id" value={personajeData.estado_id} onChange={handleInputChange} required>
            <option value="">Selecciona un Estado</option>
            <option value="Vivo">Vivo</option>
            <option value="Muerto">Muerto</option>
            <option value="Congelado">Congelado</option>
            <option value="Envenenado">Envenenado</option>
            <option value="Herido">Herido</option>
            <option value="Petrificado">Petrificado</option>
          </select>
          <input type="number" name="nivel" placeholder="Nivel" value={personajeData.nivel} onChange={handleInputChange} required />
          <label>Poderes:</label>
          <select multiple name="poderes" value={personajeData.poderes} onChange={handleInputChange}>
            {razas.find(raza => raza._id === personajeData.raza_id)?.poderes.map(poder => (
              <option key={poder.nombre} value={poder.nombre}>{poder.nombre}</option>
            ))}
          </select>
          <label>Habilidades:</label>
          <select multiple name="habilidades" value={personajeData.habilidades} onChange={handleInputChange}>
            {razas.find(raza => raza._id === personajeData.raza_id)?.habilidades.map(habilidad => (
              <option key={habilidad.nombre} value={habilidad.nombre}>{habilidad.nombre}</option>
            ))}
          </select>
          <button type="submit">Crear Personaje</button>
        </form>
      </div>

      <div id="registroUsuario" className={`tab-content ${activeTab === 'registroUsuario' ? 'active' : ''}`}>
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleUsuarioSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={usuarioData.nombre} onChange={handleUsuarioChange} required />
          <input type="text" name="apellidos" placeholder="Apellidos" value={usuarioData.apellidos} onChange={handleUsuarioChange} required />
          <input type="email" name="email" placeholder="Correo Electrónico" value={usuarioData.email} onChange={handleUsuarioChange} required />
          <input type="text" name="nombre_usuario" placeholder="Nombre de Usuario" value={usuarioData.nombre_usuario} onChange={handleUsuarioChange} required />
          <input type="password" name="contrasena" placeholder="Contraseña" value={usuarioData.contrasena} onChange={handleUsuarioChange} required />
          <input type="password" name="confirmarContrasena" placeholder="Confirmar Contraseña" value={usuarioData.confirmarContrasena} onChange={handleUsuarioChange} required />
          <button type="submit">Registrar Usuario</button>
        </form>
      </div>

      <div id="informacion" className={`tab-content ${activeTab === 'informacion' ? 'active' : ''}`}>
        <h2>Información de Personajes</h2>
        <table>
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Personaje</th>
              <th>Raza</th>
              <th>Estado</th>
              <th>Nivel</th>
              <th>Poderes</th>
              <th>Habilidades</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personajes.map(personaje => (
              <tr key={personaje._id}>
                <td>{personaje.nombre_jugador}</td>
                <td>{personaje.nombre_personaje}</td>
                <td>{personaje.raza_id}</td>
                <td>{personaje.estado_id}</td>
                <td>{personaje.nivel}</td>
                <td>{personaje.poderes.join(', ')}</td>
                <td>{personaje.habilidades.join(', ')}</td>
                <td>
                  <button onClick={() => handleEdit(personaje)}>Editar</button>
                  <button onClick={() => handleDelete(personaje._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
