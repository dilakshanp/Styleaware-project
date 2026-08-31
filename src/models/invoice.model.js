import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    sale: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
    invoiceNumber: { type: String, required: true },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['issued', 'paid', 'void'], default: 'issued' }
  },
  { timestamps: true }
);

invoiceSchema.index({ organization: 1, invoiceNumber: 1 }, { unique: true });
invoiceSchema.index({ organization: 1, status: 1 });

export const Invoice = mongoose.model('Invoice', invoiceSchema);
