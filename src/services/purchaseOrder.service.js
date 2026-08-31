import { purchaseOrderRepository } from '../repositories/purchaseOrder.repository.js';
import { BaseService } from './base.service.js';
import { ApiError } from '../utils/apiError.js';

const allowedTransitions = {
  draft: ['submitted', 'cancelled'],
  submitted: ['approved', 'cancelled'],
  approved: ['received', 'cancelled'],
  received: [],
  cancelled: []
};

class PurchaseOrderService extends BaseService {
  constructor() {
    super(purchaseOrderRepository);
  }

  create(user, data) {
    const total = data.items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
    return super.create(user, { ...data, total, createdBy: user._id });
  }

  async transitionStatus(user, id, status) {
    const order = await this.get(user, id);
    if (!allowedTransitions[order.status].includes(status)) {
      throw new ApiError(400, `Cannot transition purchase order from ${order.status} to ${status}`);
    }
    order.status = status;
    return order.save();
  }
}

export const purchaseOrderService = new PurchaseOrderService();
