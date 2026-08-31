import { reportService } from '../services/report.service.js';
import { success } from '../utils/apiResponse.js';

export const stockReport = async (req, res) => {
  success(res, await reportService.stockReport(req.user, req.query));
};
