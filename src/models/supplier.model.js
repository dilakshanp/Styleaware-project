import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true }
  },
  { timestamps: true }
);

supplierSchema.index({ organization: 1, name: 1 });

export const Supplier = mongoose.model('Supplier', supplierSchema);
