import { Organization } from '../models/organization.model.js';
import { BaseRepository } from './base.repository.js';

class OrganizationRepository extends BaseRepository {
  constructor() {
    super(Organization);
  }
}

export const organizationRepository = new OrganizationRepository();
