import { BaseService } from './base.service.js';
import { userRepository } from '../repositories/user.repository.js';

class UserService extends BaseService {
  constructor() {
    super(userRepository);
  }

  assignTeam(user, id, teamId) {
    return this.update(user, id, { $addToSet: { teams: teamId } });
  }
}

export const userService = new UserService();
