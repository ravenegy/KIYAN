import { StockLevel } from '../../domain/entities/StockLevel';
import { StockMovement } from '../../domain/entities/StockMovement';
import { StockLevelDto } from '../dto/StockLevelDto';
import { StockMovementDto } from '../dto/StockMovementDto';

export interface IStockMapper {
  toStockLevelDto(entity: StockLevel): StockLevelDto;
  toStockMovementDto(entity: StockMovement): StockMovementDto;
}
