import { PurchaseOrder } from '../models/purchaseOrder.model.js';
import { BaseRepository } from './base.repository.js';

export const purchaseOrderRepository = new BaseRepository(PurchaseOrder);
