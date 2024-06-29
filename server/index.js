const express = require("express");
const app = express();
const mysql = require("mysql");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host:"localhost",
    root:"root",
    pass:"",
    database:"juego_rol"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Conectado a la base de datos MySQL");
});

app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
}) 

// Endpoint para crear un usuario
app.post("/usuarios", (req, res) => {
    const { nombre_usuario, contrasena, rol_id } = req.body;
    const INSERT_USUARIO_QUERY = `INSERT INTO Usuarios (nombre_usuario, contrasena, rol_id) VALUES (?, ?, ?)`;
    
    db.query(INSERT_USUARIO_QUERY, [nombre_usuario, contrasena, rol_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al crear usuario");
        } else {
            console.log("Usuario creado correctamente");
            res.status(201).send("Usuario creado correctamente");
        }
    });
});

// Endpoint para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
    const SELECT_USUARIOS_QUERY = `SELECT * FROM Usuarios`;
    db.query(SELECT_USUARIOS_QUERY, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al obtener usuarios");
        } else {
            res.status(200).json(results);
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


