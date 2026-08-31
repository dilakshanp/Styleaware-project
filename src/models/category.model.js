import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

categorySchema.index({ organization: 1, name: 1 });

export const Category = mongoose.model('Category', categorySchema);
