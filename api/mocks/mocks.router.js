
// routes/mocks.router.js
import { Router } from 'express';
import { generateMockUsers } from '../utils/mocking.js';  // Ruta correcta a mocking.js
import User from '../models/User.js';
import Pet from '../models/Pet.js';

const router = Router();

// Endpoint POST para generar usuarios y mascotas
router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;  // Obtenemos los parámetros 'users' y 'pets' de la solicitud

    if (!users || !pets) {
        return res.status(400).json({ status: 'error', message: 'Faltan los parámetros "users" o "pets"' });
    }

    try {
        // Llamamos a la función para generar usuarios con mascotas
        const generatedUsers = await generateMockUsers(users);

        res.json({
            status: 'success',
            message: `${users} usuarios y ${pets} mascotas generados`,
            data: generatedUsers  // Devolvemos los usuarios generados (opcional)
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al generar los datos' });
    }
});

// Endpoint GET para obtener los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().populate('pets');  // Traemos los usuarios con las mascotas
        res.json({ status: 'success', data: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener usuarios' });
    }
});

// Endpoint GET para obtener las mascotas
router.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json({ status: 'success', data: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener mascotas' });
    }
});

export default router;
