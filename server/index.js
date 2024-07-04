const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

const PersonajeSchema = new mongoose.Schema({
    nombre_jugador: String,
    nombre_personaje: String,
    raza_id: mongoose.Schema.Types.ObjectId,
    estado_id: String,
    nivel: Number,
    poderes: [String],
    habilidades: [String]
});

const Raza = mongoose.model('Raza', RazaSchema);
const Personaje = mongoose.model('Personaje', PersonajeSchema);

app.get('/api/razas', async (req, res) => {
    try {
        const razas = await Raza.find();
        res.json(razas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener razas' });
    }
});

app.post('/api/personajes', async (req, res) => {
    try {
        const personaje = new Personaje(req.body);
        await personaje.save();
        res.status(201).json(personaje);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear personaje' });
    }
});

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});
