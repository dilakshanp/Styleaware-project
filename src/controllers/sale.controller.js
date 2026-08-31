import { saleService } from '../services/sale.service.js';
import { success } from '../utils/apiResponse.js';

export const saleController = {
  list: async (req, res) => success(res, await saleService.list(req.user, req.query)),
  get: async (req, res) => success(res, await saleService.get(req.user, req.params.id)),
  create: async (req, res) => success(res, await saleService.create(req.user, req.body), 'Created', 201)
};
