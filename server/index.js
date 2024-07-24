const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pdf = require('html-pdf'); // Para la generación de PDFs

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/juego_rol', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

const RazaSchema = new mongoose.Schema({
    nombre: String,
    poderes: [{ nombre: String, detalle: String }],
    habilidades: [{ nombre: String, detalle: String }]
});

const Raza = mongoose.model('Raza', RazaSchema);

const PersonajeSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    nombre_personaje: String,
    raza_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Raza' },
    nivel: { type: Number, default: 1 },
    estado: { type: String, default: 'Vivo' },
    habilidades: [{ type: String }],
    equipamiento: [{ type: String }],
    poderes: [{ type: String }]
});

const Personaje = mongoose.model('Personaje', PersonajeSchema);

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    email: String,
    nombre_usuario: { type: String, unique: true },
    contrasena: String
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

app.post('/api/usuarios', async (req, res) => {
    try {
        const { nombre, apellidos, email, nombre_usuario, contrasena } = req.body;
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const nuevoUsuario = new Usuario({ nombre, apellidos, email, nombre_usuario, contrasena: hashedPassword });
        const usuario = await nuevoUsuario.save();
        res.json(usuario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;

    try {
        const usuario = await Usuario.findOne({ nombre_usuario });
        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ success: true, usuario });
    } catch (err) {
        console.error('Error en el login:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/api/personajes', async (req, res) => {
    try {
        const nuevoPersonaje = new Personaje(req.body);
        const personaje = await nuevoPersonaje.save();
        res.json(personaje);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Ruta para obtener todos los personajes
app.get('/api/personajes', async (req, res) => {
    try {
        const personajes = await Personaje.find().populate('raza_id');
        res.json(personajes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener personajes' });
    }
});

app.get('/api/razas', async (req, res) => {
    try {
        const razas = await Raza.find();
        res.json(razas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener razas' });
    }
});

app.get('/api/personajes/:id', async (req, res) => {
    try {
        const personaje = await Personaje.findById(req.params.id).populate('raza_id');
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        res.json(personaje);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el personaje' });
    }
});

app.put('/api/personajes/:id', async (req, res) => {
    try {
        const personaje = await Personaje.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('raza_id');
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        res.json(personaje);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar personaje' });
    }
});

app.delete('/api/personajes/:id', async (req, res) => {
    try {
        const personaje = await Personaje.findByIdAndDelete(req.params.id);
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar personaje' });
    }
});

app.get('/api/personajes/:id/pdf', async (req, res) => {
    try {
        const personaje = await Personaje.findById(req.params.id).populate('raza_id').exec();
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        const contenidoHTML = `
            <h1>Informe de Personaje</h1>
            <p><strong>Nombre:</strong> ${personaje.nombre_personaje}</p>
            <p><strong>Raza:</strong> ${personaje.raza_id.nombre}</p>
            <p><strong>Nivel:</strong> ${personaje.nivel}</p>
            <p><strong>Estado:</strong> ${personaje.estado}</p>
            <p><strong>Poderes:</strong> ${personaje.poderes.join(', ')}</p>
            <p><strong>Habilidades:</strong> ${personaje.habilidades.join(', ')}</p>
        `;
        pdf.create(contenidoHTML).toStream((err, stream) => {
            if (err) return res.status(500).json({ error: 'Error al generar PDF' });
            res.setHeader('Content-type', 'application/pdf');
            stream.pipe(res);
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener personaje' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
