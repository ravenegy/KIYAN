import { PlannedOrder } from '../../domain/entities/PlannedOrder';
import { PlannedOrderDto } from '../dto/PlannedOrderDto';

export interface IPlannedOrderMapper {
  toDto(plannedOrder: PlannedOrder): PlannedOrderDto;
}
