
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mockDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar con la base de datos', error);
        process.exit(1);
    }
};

export default connectDB;
