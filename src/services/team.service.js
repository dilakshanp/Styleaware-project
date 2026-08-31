import { BaseService } from './base.service.js';
import { teamRepository } from '../repositories/team.repository.js';

class TeamService extends BaseService {
  constructor() {
    super(teamRepository);
  }

  addMember(user, id, memberId) {
    return this.update(user, id, { $addToSet: { members: memberId } });
  }

  removeMember(user, id, memberId) {
    return this.update(user, id, { $pull: { members: memberId } });
  }
}

export const teamService = new TeamService();
