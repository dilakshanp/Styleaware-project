import { BaseService } from './base.service.js';
import {
  branchRepository,
  categoryRepository,
  departmentRepository,
  productRepository,
  supplierRepository
} from '../repositories/simple.repository.js';

export const branchService = new BaseService(branchRepository);
export const departmentService = new BaseService(departmentRepository);
export const categoryService = new BaseService(categoryRepository);
export const supplierService = new BaseService(supplierRepository);
export const productService = new BaseService(productRepository);
