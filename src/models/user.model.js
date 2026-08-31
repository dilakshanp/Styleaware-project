import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { allRoles, Roles } from '../config/roles.js';

const userSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: allRoles, default: Roles.CASHIER },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

userSchema.index({ organization: 1, role: 1 });

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model('User', userSchema);
