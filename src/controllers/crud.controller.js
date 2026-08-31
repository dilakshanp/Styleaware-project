import { success } from '../utils/apiResponse.js';

export const makeCrudController = (service) => ({
  list: async (req, res) => success(res, await service.list(req.user, req.query)),
  get: async (req, res) => success(res, await service.get(req.user, req.params.id)),
  create: async (req, res) => success(res, await service.create(req.user, req.body), 'Created', 201),
  update: async (req, res) => success(res, await service.update(req.user, req.params.id, req.body)),
  remove: async (req, res) => success(res, await service.remove(req.user, req.params.id), 'Deleted')
});
