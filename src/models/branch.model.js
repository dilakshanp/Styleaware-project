import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

branchSchema.index({ organization: 1, name: 1 });

export const Branch = mongoose.model('Branch', branchSchema);
