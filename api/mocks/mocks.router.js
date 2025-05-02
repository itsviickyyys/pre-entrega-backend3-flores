
import { Router } from 'express';
import {
    generateMockUsers,
    generateMockPets,
    generateUsersInDB,
    generatePetsInDB
} from '../utils/mocking.js';
import User from '../models/User.js';
import Pet from '../models/Pet.js';

const router = Router();

// Endpoint GET /mockingusers → Genera 50 usuarios fake
router.get('/mockingusers', async (req, res) => {
    try {
        const users = await generateMockUsers(50);
        res.json({ status: 'success', data: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Endpoint GET /mockingpets → Genera 50 mascotas fake
router.get('/mockingpets', (req, res) => {
    try {
        const pets = generateMockPets(50);
        res.json({ status: 'success', data: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Endpoint POST /generateData → Inserta usuarios y mascotas en MongoDB
router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets) {
        return res.status(400).json({ status: 'error', message: 'Faltan parámetros "users" o "pets"' });
    }

    try {
        const createdUsers = await generateUsersInDB(users);
        const createdPets = await generatePetsInDB(pets);

        res.json({
            status: 'success',
            message: `Se generaron e insertaron ${users} usuarios y ${pets} mascotas.`,
            users: createdUsers,
            pets: createdPets
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Endpoint GET /users → Trae todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().populate('pets');
        res.json({ status: 'success', data: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Endpoint GET /pets → Trae todas las mascotas
router.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json({ status: 'success', data: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;
