import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    name: { type: String, required: true, trim: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

teamSchema.index({ organization: 1, name: 1 });

export const Team = mongoose.model('Team', teamSchema);
