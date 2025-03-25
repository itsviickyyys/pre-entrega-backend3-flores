import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]  // Referencia a las mascotas
});

const User = mongoose.model('User', userSchema);
export default User;