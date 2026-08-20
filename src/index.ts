import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';
import estudiantesRouter from './routes/estudiantes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: "Servidor en línea", version: "1.0.0" });
});

app.use('/api/estudiantes', estudiantesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});