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

const Raza = mongoose.model('Raza', RazaSchema);

const RazasIniciales = [
  { 
    nombre: 'Humano',
    poderes: [
      { nombre: 'Curación Rápida', detalle: 'Permite una recuperación acelerada de heridas' },
      { nombre: 'Inspiración', detalle: 'Aumenta la moral y el rendimiento de aliados cercanos' },
      { nombre: 'Resistencia', detalle: 'Aumenta la resistencia física durante un tiempo' },
      { nombre: 'Adaptabilidad', detalle: 'Mejora la capacidad de adaptarse a diferentes entornos' }
    ],
    habilidades: [
      { nombre: 'Diplomacia', detalle: 'Mejora la capacidad para negociar y resolver conflictos' },
      { nombre: 'Liderazgo', detalle: 'Aumenta la capacidad para liderar grupos' },
      { nombre: 'Estrategia', detalle: 'Mejora la planificación y ejecución de tácticas' },
      { nombre: 'Alquimia', detalle: 'Permite la creación de pociones y brebajes' },
      { nombre: 'Caza', detalle: 'Mejora la habilidad para rastrear y cazar animales' },
      { nombre: 'Comercio', detalle: 'Aumenta la habilidad para el comercio y la negociación' },
      { nombre: 'Primeros Auxilios', detalle: 'Mejora la capacidad para sanar heridas leves' },
      { nombre: 'Exploración', detalle: 'Aumenta la capacidad para explorar y cartografiar nuevas áreas' }
    ]
  },
  { 
    nombre: 'Elfo',
    poderes: [
      { nombre: 'Flecha Mágica', detalle: 'Dispara una flecha con precisión mágica' },
      { nombre: 'Visión Nocturna', detalle: 'Permite ver en la oscuridad total' },
      { nombre: 'Caminata Silenciosa', detalle: 'Permite moverse sin hacer ruido' },
      { nombre: 'Comunión con la Naturaleza', detalle: 'Permite comunicarse con animales y plantas' }
    ],
    habilidades: [
      { nombre: 'Arquería', detalle: 'Mejora la precisión y daño con arcos' },
      { nombre: 'Herboristería', detalle: 'Permite la recolección y uso de plantas medicinales' },
      { nombre: 'Magia Arcana', detalle: 'Aumenta la habilidad para usar magia antigua' },
      { nombre: 'Sigilo', detalle: 'Mejora la capacidad para moverse sin ser detectado' },
      { nombre: 'Canto Élfico', detalle: 'Permite usar la música para influir en el entorno' },
      { nombre: 'Equitación', detalle: 'Mejora la capacidad para montar y controlar animales' },
      { nombre: 'Visión Aguda', detalle: 'Aumenta la capacidad para ver a largas distancias' },
      { nombre: 'Danza de la Espada', detalle: 'Mejora la destreza en el combate con espadas' }
    ]
  },
  { 
    nombre: 'Enano',
    poderes: [
      { nombre: 'Fuerza Sobrehumana', detalle: 'Aumenta la fuerza física temporalmente' },
      { nombre: 'Piel de Piedra', detalle: 'Endurece la piel como si fuera piedra' },
      { nombre: 'Martillo Trueno', detalle: 'Golpe con un martillo que causa un impacto sónico' },
      { nombre: 'Resistencia al Fuego', detalle: 'Aumenta la resistencia a altas temperaturas y llamas' }
    ],
    habilidades: [
      { nombre: 'Minería', detalle: 'Mejora la capacidad para extraer minerales' },
      { nombre: 'Forja', detalle: 'Permite la creación de armas y armaduras' },
      { nombre: 'Ingeniería', detalle: 'Mejora la capacidad para construir y reparar mecanismos' },
      { nombre: 'Resistencia Física', detalle: 'Aumenta la capacidad para soportar trabajos duros' },
      { nombre: 'Cerveza Enana', detalle: 'Permite la creación de bebidas alcohólicas potentes' },
      { nombre: 'Defensa', detalle: 'Mejora la capacidad para bloquear y resistir ataques' },
      { nombre: 'Túneles', detalle: 'Aumenta la habilidad para excavar y construir túneles' },
      { nombre: 'Topografía', detalle: 'Mejora la capacidad para leer y crear mapas subterráneos' }
    ]
  },
  { 
    nombre: 'Orco',
    poderes: [
      { nombre: 'Rabia Berserker', detalle: 'Aumenta el daño y la velocidad de ataque' },
      { nombre: 'Grito de Guerra', detalle: 'Intimida a los enemigos cercanos' },
      { nombre: 'Regeneración Rápida', detalle: 'Cura heridas a un ritmo acelerado' },
      { nombre: 'Golpe Aplastante', detalle: 'Un golpe que causa un daño devastador al objetivo' }
    ],
    habilidades: [
      { nombre: 'Combate Cuerpo a Cuerpo', detalle: 'Mejora la habilidad en el combate cercano' },
      { nombre: 'Supervivencia', detalle: 'Aumenta la capacidad para sobrevivir en entornos hostiles' },
      { nombre: 'Intimidación', detalle: 'Mejora la capacidad para asustar y dominar a otros' },
      { nombre: 'Caza Mayor', detalle: 'Mejora la habilidad para cazar grandes presas' },
      { nombre: 'Resistencia al Dolor', detalle: 'Aumenta la capacidad para resistir el dolor' },
      { nombre: 'Ataque Salvaje', detalle: 'Mejora la ferocidad y daño en el combate' },
      { nombre: 'Pelea con Armas', detalle: 'Aumenta la habilidad para usar diversas armas' },
      { nombre: 'Liderazgo Tribal', detalle: 'Mejora la capacidad para liderar tribus y clanes' }
    ]
  }
];

Raza.insertMany(RazasIniciales)
  .then(() => console.log('Razas insertadas correctamente con poderes y habilidades'))
  .catch(err => console.error('Error al insertar razas con poderes y habilidades:', err));

const PersonajeSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    nombre_personaje: String,
    raza_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Raza' },
    nivel: { type: Number, default: 1 },
    poderes: [String],
    habilidades: [String]
});

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    email: String,
    nombre_usuario: String,
    contrasena: String,
    rol_id: Number
});

const Personaje = mongoose.model('Personaje', PersonajeSchema);
const Usuario = mongoose.model('Usuario', UsuarioSchema);

app.post('/api/login', async (req, res) => {
    try {
        const { nombre_usuario, contrasena } = req.body;
        const usuario = await Usuario.findOne({ nombre_usuario, contrasena });
        if (usuario) {
            res.json({ success: true, usuario });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al autenticar usuario' });
    }
});

app.get('/api/personajes', async (req, res) => {
    try {
        const { usuario_id } = req.query;
        const personajes = await Personaje.find({ usuario_id }).populate('raza_id');
        res.json(personajes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener personajes' });
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

app.get('/api/razas', async (req, res) => {
    try {
        const razas = await Raza.find();
        res.json(razas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener razas' });
    }
});

app.post('/api/usuarios', async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});
