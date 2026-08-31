import { Roles } from '../config/roles.js';

export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  scope(user, filter = {}) {
    if (user.role === Roles.SUPER_ADMIN) return filter;
    return { ...filter, organization: user.organization };
  }

  create(data, session) {
    return this.model.create([data], { session }).then(([doc]) => doc);
  }

  find(user, filter = {}, options = {}) {
    return this.model.find(this.scope(user, filter), null, options);
  }

  findById(user, id) {
    return this.model.findOne(this.scope(user, { _id: id }));
  }

  updateById(user, id, data, session) {
    return this.model.findOneAndUpdate(this.scope(user, { _id: id }), data, {
      new: true,
      runValidators: true,
      session
    });
  }

  deleteById(user, id) {
    return this.model.findOneAndDelete(this.scope(user, { _id: id }));
  }
}
