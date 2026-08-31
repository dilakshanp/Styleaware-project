import mongoose from 'mongoose';

const stockMovementSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    type: { type: String, enum: ['in', 'out', 'adjustment'], required: true },
    quantity: { type: Number, required: true, min: 1 },
    note: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

stockMovementSchema.index({ organization: 1, createdAt: -1 });
stockMovementSchema.index({ organization: 1, product: 1 });

export const StockMovement = mongoose.model('StockMovement', stockMovementSchema);
