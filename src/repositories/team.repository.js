import { Team } from '../models/team.model.js';
import { BaseRepository } from './base.repository.js';

class TeamRepository extends BaseRepository {
  constructor() {
    super(Team);
  }
}

export const teamRepository = new TeamRepository();
