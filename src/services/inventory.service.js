import mongoose from 'mongoose';
import { inventoryRepository } from '../repositories/inventory.repository.js';
import { stockMovementRepository } from '../repositories/stockMovement.repository.js';
import { BaseService } from './base.service.js';
import { ApiError } from '../utils/apiError.js';

class InventoryService extends BaseService {
  constructor() {
    super(inventoryRepository);
  }

  resolveStatus(quantity, reorderLevel) {
    if (quantity <= 0) return 'out_of_stock';
    if (quantity <= reorderLevel) return 'low_stock';
    return 'in_stock';
  }

  async assign(user, id, assignedTo) {
    return this.update(user, id, { assignedTo });
  }

  async moveStock(user, id, data) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const inventory = await inventoryRepository.findById(user, id).session(session);
      if (!inventory) throw new ApiError(404, 'Inventory not found');

      let quantity = inventory.quantity;
      if (data.type === 'in') quantity += data.quantity;
      if (data.type === 'out') quantity -= data.quantity;
      if (data.type === 'adjustment') quantity = data.quantity;
      if (quantity < 0) throw new ApiError(400, 'Insufficient inventory quantity');

      inventory.quantity = quantity;
      inventory.status = this.resolveStatus(quantity, inventory.reorderLevel);
      await inventory.save({ session });

      await stockMovementRepository.create({
        organization: inventory.organization,
        inventory: inventory._id,
        product: inventory.product,
        branch: inventory.branch,
        type: data.type,
        quantity: data.quantity,
        note: data.note,
        createdBy: user._id
      }, session);

      await session.commitTransaction();
      return inventory;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async escalateLowStock(user, id, reason = 'Low stock threshold breached') {
    const inventory = await inventoryRepository.findById(user, id);
    if (!inventory) throw new ApiError(404, 'Inventory not found');
    if (!['low_stock', 'out_of_stock'].includes(inventory.status)) {
      throw new ApiError(400, 'Only low or out-of-stock inventory can be escalated');
    }
    inventory.status = 'escalated';
    inventory.escalatedAt = new Date();
    inventory.escalationReason = reason;
    return inventory.save();
  }
}

export const inventoryService = new InventoryService();
