import { BaseService } from './base.service.js';
import { organizationRepository } from '../repositories/organization.repository.js';

export const organizationService = new BaseService(organizationRepository);
