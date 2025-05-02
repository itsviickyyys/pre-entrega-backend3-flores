
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import User from '../models/User.js';
import Pet from '../models/Pet.js';

// Función para encriptar contraseñas
const encryptPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Generar usuarios falsos (solo en memoria, NO insertar en base de datos)
export const generateMockUsers = async (numUsers) => {
    const users = [];
    const hashedPassword = await encryptPassword('coder123');

    for (let i = 0; i < numUsers; i++) {
        users.push({
            _id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []  // Array vacío
        });
    }
    return users;
};

// Generar mascotas falsas (solo en memoria, NO insertar en base de datos)
export const generateMockPets = (numPets) => {
    const pets = [];

    for (let i = 0; i < numPets; i++) {
        pets.push({
            _id: faker.string.uuid(),
            name: faker.animal.dog(),
            type: faker.helpers.arrayElement(['Perro', 'Gato', 'Pájaro', 'Conejo']),
            age: faker.datatype.number({ min: 1, max: 10 })
        });
    }
    return pets;
};

// Generar e insertar usuarios en base de datos
export const generateUsersInDB = async (numUsers) => {
    const hashedPassword = await encryptPassword('coder123');
    const users = [];

    for (let i = 0; i < numUsers; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        });
    }

    const createdUsers = await User.create(users);
    return createdUsers;
};

// Generar e insertar mascotas en base de datos
export const generatePetsInDB = async (numPets) => {
    const pets = [];

    for (let i = 0; i < numPets; i++) {
        pets.push({
            name: faker.animal.dog(),
            type: faker.helpers.arrayElement(['Perro', 'Gato', 'Pájaro', 'Conejo']),
            age: faker.datatype.number({ min: 1, max: 10 })
        });
    }

    const createdPets = await Pet.create(pets);
    return createdPets;
};
