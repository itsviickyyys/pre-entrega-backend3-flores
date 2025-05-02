import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]  // Relación con mascotas
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
