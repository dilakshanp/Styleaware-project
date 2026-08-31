import mongoose from 'mongoose';
import { saleRepository } from '../repositories/sale.repository.js';
import { invoiceRepository } from '../repositories/invoice.repository.js';
import { inventoryRepository } from '../repositories/inventory.repository.js';
import { stockMovementRepository } from '../repositories/stockMovement.repository.js';
import { BaseService } from './base.service.js';
import { ApiError } from '../utils/apiError.js';

class SaleService extends BaseService {
  constructor() {
    super(saleRepository);
  }

  async create(user, data) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let total = 0;
      for (const item of data.items) {
        const inventory = await inventoryRepository.findByBranchProduct(user, data.branch, item.product).session(session);
        if (!inventory || inventory.quantity < item.quantity) {
          throw new ApiError(400, 'Insufficient stock for sale');
        }
        inventory.quantity -= item.quantity;
        inventory.status = inventory.quantity <= 0
          ? 'out_of_stock'
          : inventory.quantity <= inventory.reorderLevel ? 'low_stock' : 'in_stock';
        await inventory.save({ session });
        total += item.quantity * item.unitPrice;
        await stockMovementRepository.create({
          organization: inventory.organization,
          inventory: inventory._id,
          product: item.product,
          branch: data.branch,
          type: 'out',
          quantity: item.quantity,
          note: 'Sale',
          createdBy: user._id
        }, session);
      }

      const sale = await saleRepository.create(this.withOrganization(user, {
        ...data,
        total,
        cashier: user._id
      }), session);

      const invoiceNumber = `INV-${Date.now()}-${String(sale._id).slice(-6)}`;
      const invoice = await invoiceRepository.create({
        organization: sale.organization,
        sale: sale._id,
        invoiceNumber,
        total
      }, session);

      await session.commitTransaction();
      return { sale, invoice };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export const saleService = new SaleService();
