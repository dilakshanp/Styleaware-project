import { Router } from 'express';
import { stockReport } from '../controllers/report.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Roles } from '../config/roles.js';

const router = Router();

router.use(authenticate);
router.get('/stock', authorize(Roles.SUPER_ADMIN, Roles.ORG_ADMIN, Roles.MANAGER), asyncHandler(stockReport));

export default router;
