import { Inventory } from '../models/inventory.model.js';
import { BaseRepository } from './base.repository.js';

class InventoryRepository extends BaseRepository {
  constructor() {
    super(Inventory);
  }

  findByBranchProduct(user, branch, product) {
    return Inventory.findOne(this.scope(user, { branch, product }));
  }

  breachedLowStock(user, filter = {}) {
    return Inventory.find(this.scope(user, { ...filter, status: { $in: ['low_stock', 'out_of_stock', 'escalated'] } }))
      .populate('product branch assignedTo');
  }
}

export const inventoryRepository = new InventoryRepository();
