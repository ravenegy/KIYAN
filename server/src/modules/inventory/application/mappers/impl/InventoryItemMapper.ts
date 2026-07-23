import { IInventoryMapper } from '../IInventoryMapper';
import { InventoryItem } from '../../../domain/entities/InventoryItem';
import { InventoryItemDto } from '../../dto/InventoryItemDto';
import { StockMapper } from './StockMapper';

export class InventoryItemMapper implements IInventoryMapper {
  constructor(private readonly stockMapper: StockMapper) {}

  toDto(entity: InventoryItem): InventoryItemDto {
    return {
      id: entity.id.value,
      sku: entity.sku.value,
      category: entity.category.toString(),
      name: entity.name,
      isActive: entity.isActive,
      stockLevels: entity.stockLevels.map(sl => this.stockMapper.toStockLevelDto(sl)),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt ? entity.updatedAt.toISOString() : undefined
    };
  }
}
