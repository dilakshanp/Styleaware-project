import { Branch } from '../models/branch.model.js';
import { Category } from '../models/category.model.js';
import { Department } from '../models/department.model.js';
import { Supplier } from '../models/supplier.model.js';
import { Product } from '../models/product.model.js';
import { BaseRepository } from './base.repository.js';

export const branchRepository = new BaseRepository(Branch);
export const departmentRepository = new BaseRepository(Department);
export const categoryRepository = new BaseRepository(Category);
export const supplierRepository = new BaseRepository(Supplier);
export const productRepository = new BaseRepository(Product);
