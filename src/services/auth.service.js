import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository.js';
import { ApiError } from '../utils/apiError.js';

class AuthService {
  async register(data) {
    const existing = await userRepository.findByEmailWithPassword(data.email);
    if (existing) throw new ApiError(409, 'Email already exists');

    const user = await userRepository.model.create(data);
    return this.toAuthResponse(user);
  }

  async login(email, password) {
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid email or password');
    }
    return this.toAuthResponse(user);
  }

  toAuthResponse(user) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
    const cleanUser = user.toObject();
    delete cleanUser.password;
    return { token, user: cleanUser };
  }
}

export const authService = new AuthService();
