import { inventoryRepository } from '../repositories/inventory.repository.js';

class ReportService {
  async stockReport(user, query) {
    const filter = {};
    if (query.branch) filter.branch = query.branch;
    if (query.assignedTo) filter.assignedTo = query.assignedTo;

    const items = await inventoryRepository.breachedLowStock(user, filter);
    const summary = items.reduce(
      (acc, item) => {
        acc.totalBreached += 1;
        acc.byStatus[item.status] = (acc.byStatus[item.status] || 0) + 1;
        if (item.assignedTo) {
          const key = String(item.assignedTo._id);
          acc.byAssignee[key] = (acc.byAssignee[key] || 0) + 1;
        }
        return acc;
      },
      { totalBreached: 0, byStatus: {}, byAssignee: {} }
    );

    return { summary, items };
  }
}

export const reportService = new ReportService();
