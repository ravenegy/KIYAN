import { InventoryItem } from '../../domain/entities/InventoryItem';
import { InventoryItemDto } from '../dto/InventoryItemDto';

export interface IInventoryMapper {
  toDto(entity: InventoryItem): InventoryItemDto;
}
