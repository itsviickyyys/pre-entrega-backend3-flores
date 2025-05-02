import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import mocksRouter from './routes/mocks.router.js';

dotenv.config(); // Cargar variables desde .env

const app = express();

// Conectar a la base de datos
connectDB();

app.use(express.json());
app.use('/api/mocks', mocksRouter);

// Configuración del puerto usando .env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
