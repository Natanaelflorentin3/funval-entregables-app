import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/status', (req, res) => {
  res.json({ status: "Servidor en línea", version: "1.0.0" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let idCounter: number = 1;

app.get('/api/status', (req, res) => {
  res.json({ status: "Servidor en línea", version: "1.0.0" });
});

app.get('/api/estudiantes', (req, res) => {
  res.json(estudiantes);
});

app.post('/api/estudiantes', (req, res) => {
  const { nombre, email, bootcamp } = req.body;

  if (!email) {
    return res.status(400).json({ error: "El campo email es obligatorio." });
  }

  const nuevoEstudiante: Estudiante = {
    id: idCounter,
    nombre,
    email,
    bootcamp
  };

  estudiantes.push(nuevoEstudiante);
  idCounter++;

  res.status(201).json(nuevoEstudiante);
});

app.put('/api/estudiantes/:id', (req, res) => {
  const id = Number(req.params.id);
  const estudiante = estudiantes.find(e => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ error: `No se encontró un estudiante con id ${id}.` });
  }

  const { nombre, email, bootcamp } = req.body;
  estudiante.nombre = nombre;
  estudiante.email = email;
  estudiante.bootcamp = bootcamp;

  res.json(estudiante);
});

app.delete('/api/estudiantes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = estudiantes.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `No se encontró un estudiante con id ${id}.` });
  }

  const eliminado = estudiantes.splice(index, 1);

  res.json({ mensaje: "Estudiante eliminado.", estudiante: eliminado[0] });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});