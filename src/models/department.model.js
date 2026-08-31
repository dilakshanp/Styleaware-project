import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    name: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

departmentSchema.index({ organization: 1, branch: 1 });

export const Department = mongoose.model('Department', departmentSchema);
