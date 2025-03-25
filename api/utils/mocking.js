// utils/mocking.js
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

// Función para encriptar la contraseña
const encryptPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Función para generar usuarios falsos con mascotas
export const generateMockUsers = async (numUsers) => {
    const users = [];
    const hashedPassword = await encryptPassword('coder123');  // Contraseña encriptada

    for (let i = 0; i < numUsers; i++) {
        // Generamos entre 0 y 3 mascotas para cada usuario
        const pets = Array.from({ length: faker.datatype.number({ min: 0, max: 3 }) }, () => ({
            name: faker.animal.dog(),  // Nombre de la mascota
            type: faker.helpers.arrayElement(['Perro', 'Gato', 'Pájaro', 'Conejo']),  // Tipo de mascota aleatorio
            age: faker.datatype.number({ min: 1, max: 10 })  // Edad de la mascota
        }));

        users.push({
            _id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: hashedPassword,  // Contraseña encriptada
            role: faker.helpers.arrayElement(['user', 'admin']),  // Rol aleatorio
            pets: pets  // Array de mascotas
        });
    }

    return users;
};
