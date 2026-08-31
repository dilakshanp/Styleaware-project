import { inventoryService } from '../services/inventory.service.js';
import { success } from '../utils/apiResponse.js';

export const inventoryController = {
  list: async (req, res) => success(res, await inventoryService.list(req.user, req.query)),
  get: async (req, res) => success(res, await inventoryService.get(req.user, req.params.id)),
  create: async (req, res) => success(res, await inventoryService.create(req.user, req.body), 'Created', 201),
  update: async (req, res) => success(res, await inventoryService.update(req.user, req.params.id, req.body)),
  assign: async (req, res) => success(res, await inventoryService.assign(req.user, req.params.id, req.body.assignedTo)),
  moveStock: async (req, res) => success(res, await inventoryService.moveStock(req.user, req.params.id, req.body)),
  escalate: async (req, res) => success(res, await inventoryService.escalateLowStock(req.user, req.params.id, req.body.reason))
};
