import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Roles } from '../config/roles.js';

export const makeCrudRoutes = (controller, roles = [Roles.SUPER_ADMIN, Roles.ORG_ADMIN, Roles.MANAGER]) => {
  const router = Router();
  router.use(authenticate);
  router.get('/', asyncHandler(controller.list));
  router.get('/:id', asyncHandler(controller.get));
  router.post('/', authorize(...roles), asyncHandler(controller.create));
  router.patch('/:id', authorize(...roles), asyncHandler(controller.update));
  router.delete('/:id', authorize(...roles), asyncHandler(controller.remove));
  return router;
};
