import express from 'express';
import connectDB from './config/db.js';
import mocksRouter from './routes/mocks.router.js';  // Ajusta la ruta según tu estructura

const app = express();

// Conectar a la base de datos
connectDB();

// Usar el router de mocks
app.use(express.json()); // Para poder manejar datos JSON en las peticiones
app.use('/api/mocks', mocksRouter);

// Configuración del puerto del servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
