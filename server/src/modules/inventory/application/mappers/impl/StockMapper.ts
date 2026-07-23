import { IStockMapper } from '../IStockMapper';
import { StockLevel } from '../../../domain/entities/StockLevel';
import { StockMovement } from '../../../domain/entities/StockMovement';
import { StockLevelDto } from '../../dto/StockLevelDto';
import { StockMovementDto } from '../../dto/StockMovementDto';

export class StockMapper implements IStockMapper {
  toStockLevelDto(entity: StockLevel): StockLevelDto {
    return {
      locationId: entity.locationId.value,
      quantity: entity.quantity.value,
      lotId: entity.lotId?.value
    };
  }

  toStockMovementDto(entity: StockMovement): StockMovementDto {
    return {
      id: entity.id.value,
      inventoryItemId: entity.inventoryItemId.value,
      type: entity.type.toString(),
      quantity: entity.quantity.value,
      locationId: entity.locationId.value,
      timestamp: entity.createdAt.toISOString()
    };
  }
}
