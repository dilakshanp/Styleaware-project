import { StockMovement } from '../models/stockMovement.model.js';
import { BaseRepository } from './base.repository.js';

export const stockMovementRepository = new BaseRepository(StockMovement);
