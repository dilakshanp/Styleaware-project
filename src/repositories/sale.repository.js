import { Sale } from '../models/sale.model.js';
import { BaseRepository } from './base.repository.js';

export const saleRepository = new BaseRepository(Sale);
