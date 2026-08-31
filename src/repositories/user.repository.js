import { User } from '../models/user.model.js';
import { BaseRepository } from './base.repository.js';

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  findByEmailWithPassword(email) {
    return User.findOne({ email }).select('+password');
  }
}

export const userRepository = new UserRepository();
