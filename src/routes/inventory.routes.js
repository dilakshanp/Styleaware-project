import { Router } from 'express';
import { inventoryController } from '../controllers/inventory.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Roles } from '../config/roles.js';

const router = Router();
const stockRoles = [Roles.SUPER_ADMIN, Roles.ORG_ADMIN, Roles.MANAGER, Roles.INVENTORY_STAFF];

router.use(authenticate);
router.get('/', asyncHandler(inventoryController.list));
router.get('/:id', asyncHandler(inventoryController.get));
router.post('/', authorize(...stockRoles), asyncHandler(inventoryController.create));
router.patch('/:id', authorize(...stockRoles), asyncHandler(inventoryController.update));
router.post('/:id/assign', authorize(...stockRoles), asyncHandler(inventoryController.assign));
router.post('/:id/movements', authorize(...stockRoles, Roles.CASHIER), asyncHandler(inventoryController.moveStock));
router.post('/:id/escalate', authorize(Roles.SUPER_ADMIN, Roles.ORG_ADMIN, Roles.MANAGER), asyncHandler(inventoryController.escalate));

export default router;
