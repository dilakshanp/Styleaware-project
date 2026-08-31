import { Invoice } from '../models/invoice.model.js';
import { BaseRepository } from './base.repository.js';

export const invoiceRepository = new BaseRepository(Invoice);
