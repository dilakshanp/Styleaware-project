import { ApiError } from '../utils/apiError.js';
import { Roles } from '../config/roles.js';

export class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  withOrganization(user, data) {
    if (user.role === Roles.SUPER_ADMIN && data.organization) return data;
    return { ...data, organization: user.organization };
  }

  list(user, filter) {
    return this.repository.find(user, filter);
  }

  async get(user, id) {
    const item = await this.repository.findById(user, id);
    if (!item) throw new ApiError(404, 'Resource not found');
    return item;
  }

  create(user, data) {
    return this.repository.model.create(this.withOrganization(user, data));
  }

  async update(user, id, data) {
    const item = await this.repository.updateById(user, id, data);
    if (!item) throw new ApiError(404, 'Resource not found');
    return item;
  }

  async remove(user, id) {
    const item = await this.repository.deleteById(user, id);
    if (!item) throw new ApiError(404, 'Resource not found');
    return item;
  }
}
