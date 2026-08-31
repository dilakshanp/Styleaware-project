import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number, default: 0, min: 0 },
    reorderLevel: { type: Number, default: 10, min: 0 },
    status: {
      type: String,
      enum: ['in_stock', 'low_stock', 'out_of_stock', 'escalated'],
      default: 'in_stock'
    },
    escalatedAt: Date,
    escalationReason: String
  },
  { timestamps: true }
);

inventorySchema.index({ organization: 1, branch: 1, product: 1 }, { unique: true });
inventorySchema.index({ organization: 1, status: 1 });
inventorySchema.index({ organization: 1, assignedTo: 1 });

export const Inventory = mongoose.model('Inventory', inventorySchema);
