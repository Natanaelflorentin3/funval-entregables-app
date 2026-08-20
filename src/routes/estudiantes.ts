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
  // #swagger.description = 'Obtiene la lista de estudiantes, con filtro opcional por bootcamp'
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
  // #swagger.description = 'Obtiene un estudiante específico por su id'
  const id = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ error: `No se encontró un estudiante con id ${id}.` });
  }

  res.json(estudiante);
});

router.post('/', (req, res) => {
  // #swagger.description = 'Crea un nuevo estudiante'
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
    // #swagger.description = 'Actualiza los datos de un estudiante existente'
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
    // #swagger.description = 'Elimina un estudiante por su id'
  const id = Number(req.params.id);
  const index = estudiantes.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `No se encontró un estudiante con id ${id}.` });
  }

  const eliminado = estudiantes.splice(index, 1);

  res.json({ mensaje: "Estudiante eliminado.", estudiante: eliminado[0] });
});

export default router;