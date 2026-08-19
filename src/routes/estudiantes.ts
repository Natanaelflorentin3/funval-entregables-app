import { Router } from 'express';

const router = Router();

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let idCounter: number = 1;

router.get('/', (req, res) => {
  const { bootcamp } = req.query;
  let resultado = [...estudiantes];

  if (bootcamp) {
    resultado = resultado.filter(
      (e) => e.bootcamp.toLowerCase() === (bootcamp as string).toLowerCase(),
    );
  }

  res.json(resultado);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ error: `No se encontró un estudiante con id ${id}.` });
  }

  res.json(estudiante);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ error: `No se encontró un estudiante con id ${id}.` });
  }

  const { nombre, email, bootcamp } = req.body;
  estudiante.nombre = nombre;
  estudiante.email = email;
  estudiante.bootcamp = bootcamp;

  res.json(estudiante);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = estudiantes.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `No se encontró un estudiante con id ${id}.` });
  }

  const eliminado = estudiantes.splice(index, 1);

  res.json({ mensaje: "Estudiante eliminado.", estudiante: eliminado[0] });
});

export default router;