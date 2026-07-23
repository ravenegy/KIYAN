import { Result } from '../../../../core/results/Result';
import { ProductionOrder } from '../entities/ProductionOrder';
import { SchedulingMode } from '../enums/SchedulingMode';

export interface IProductionSchedulingService {
  /**
   * Schedules operations for a production order based on the specified mode.
   * Forward scheduling starts from a given date and calculates the end date.
   * Backward scheduling starts from a target end date and calculates the start date.
   */
  scheduleOrder(order: ProductionOrder, mode: SchedulingMode, targetDate: Date): Promise<Result<void>>;
  
  /**
   * Checks if work center capacity is available for the given operations.
   */
  checkCapacity(order: ProductionOrder): Promise<Result<boolean>>;
}
