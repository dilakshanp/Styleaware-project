import { Router } from 'express';
import authRoutes from './auth.routes.js';
import inventoryRoutes from './inventory.routes.js';
import purchaseOrderRoutes from './purchaseOrder.routes.js';
import saleRoutes from './sale.routes.js';
import reportRoutes from './report.routes.js';
import { makeCrudRoutes } from './crud.routes.js';
import { makeCrudController } from '../controllers/crud.controller.js';
import { organizationService } from '../services/organization.service.js';
import { userService } from '../services/user.service.js';
import { teamService } from '../services/team.service.js';
import {
  branchService,
  categoryService,
  departmentService,
  productService,
  supplierService
} from '../services/simple.service.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/organizations', makeCrudRoutes(makeCrudController(organizationService)));
router.use('/users', makeCrudRoutes(makeCrudController(userService)));
router.use('/teams', makeCrudRoutes(makeCrudController(teamService)));
router.use('/branches', makeCrudRoutes(makeCrudController(branchService)));
router.use('/departments', makeCrudRoutes(makeCrudController(departmentService)));
router.use('/categories', makeCrudRoutes(makeCrudController(categoryService)));
router.use('/suppliers', makeCrudRoutes(makeCrudController(supplierService)));
router.use('/products', makeCrudRoutes(makeCrudController(productService)));
router.use('/inventory', inventoryRoutes);
router.use('/purchase-orders', purchaseOrderRoutes);
router.use('/sales', saleRoutes);
router.use('/reports', reportRoutes);

export default router;
