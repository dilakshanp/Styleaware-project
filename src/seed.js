import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Organization } from './models/organization.model.js';
import { User } from './models/user.model.js';
import { Roles } from './config/roles.js';

dotenv.config();

await connectDB();

const organization = await Organization.findOneAndUpdate(
  { code: 'DEMO' },
  { name: 'Demo Super Market', code: 'DEMO', isActive: true },
  { upsert: true, new: true }
);

const existingAdmin = await User.findOne({ email: 'admin@supermarket.test' });
if (!existingAdmin) {
  await User.create({
    organization: organization._id,
    name: 'Demo Admin',
    email: 'admin@supermarket.test',
    password: 'password123',
    role: Roles.ORG_ADMIN
  });
}

console.log('Seed complete');
console.log('Login: admin@supermarket.test / password123');
process.exit(0);
