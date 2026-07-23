import { Result } from '../../../../core/results/Result';
import { ProductionOrder } from '../entities/ProductionOrder';

export interface IProductionExecutionService {
  /**
   * Validates if all required materials are available in inventory for the given order.
   * Uses Integration Services to check inventory levels.
   */
  validateMaterialAvailability(order: ProductionOrder): Promise<Result<boolean>>;
  
  /**
   * Calculates the actual yield percentage of the completed production order.
   */
  calculateYield(order: ProductionOrder): Result<number>;
}
