import { Router } from 'express';
import { purchaseOrderController } from '../controllers/purchaseOrder.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Roles } from '../config/roles.js';

const router = Router();

router.use(authenticate);
router.get('/', asyncHandler(purchaseOrderController.list));
router.get('/:id', asyncHandler(purchaseOrderController.get));
router.post('/', authorize(Roles.SUPER_ADMIN, Roles.ORG_ADMIN, Roles.MANAGER, Roles.INVENTORY_STAFF), asyncHandler(purchaseOrderController.create));
router.patch('/:id', authorize(Roles.SUPER_ADMIN, Roles.ORG_ADMIN, Roles.MANAGER), asyncHandler(purchaseOrderController.update));
router.post('/:id/status', authorize(Roles.SUPER_ADMIN, Roles.ORG_ADMIN, Roles.MANAGER), asyncHandler(purchaseOrderController.transition));

export default router;
