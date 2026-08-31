import { Router } from 'express';
import { saleController } from '../controllers/sale.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Roles } from '../config/roles.js';

const router = Router();

router.use(authenticate);
router.get('/', asyncHandler(saleController.list));
router.get('/:id', asyncHandler(saleController.get));
router.post('/', authorize(Roles.SUPER_ADMIN, Roles.ORG_ADMIN, Roles.MANAGER, Roles.CASHIER), asyncHandler(saleController.create));

export default router;
