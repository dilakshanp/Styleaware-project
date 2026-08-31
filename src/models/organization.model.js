import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, unique: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Organization = mongoose.model('Organization', organizationSchema);
