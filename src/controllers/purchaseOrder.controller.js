import { purchaseOrderService } from '../services/purchaseOrder.service.js';
import { success } from '../utils/apiResponse.js';

export const purchaseOrderController = {
  list: async (req, res) => success(res, await purchaseOrderService.list(req.user, req.query)),
  get: async (req, res) => success(res, await purchaseOrderService.get(req.user, req.params.id)),
  create: async (req, res) => success(res, await purchaseOrderService.create(req.user, req.body), 'Created', 201),
  update: async (req, res) => success(res, await purchaseOrderService.update(req.user, req.params.id, req.body)),
  transition: async (req, res) => success(res, await purchaseOrderService.transitionStatus(req.user, req.params.id, req.body.status))
};
