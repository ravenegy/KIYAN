import { InventoryItem } from '../../../domain/entities/InventoryItem';
import { InventoryItemPersistenceModel } from '../models/InventoryItemPersistenceModel';
import { StockLevelPersistenceModel } from '../models/StockLevelPersistenceModel';
import { StockLevel } from '../../../domain/entities/StockLevel';
import { StockLevelId } from '../../../domain/shared/StockLevelId';
import { InventoryItemId } from '../../../domain/shared/InventoryItemId';
import { SKU } from '../../../domain/value-objects/SKU';
import { ItemCategory } from '../../../domain/enums/ItemCategory';
import { StockLocationId } from '../../../domain/shared/StockLocationId';
import { LotId } from '../../../domain/shared/LotId';
import { Quantity } from '../../../domain/value-objects/Quantity';

import { StockLevelPersistenceMapper } from './StockLevelPersistenceMapper';

export class InventoryPersistenceMapper {
  constructor(private readonly stockLevelMapper: StockLevelPersistenceMapper) {}

  public toPersistence(entity: InventoryItem): InventoryItemPersistenceModel {
    return {
      id: entity.id.value,
      sku: entity.sku.value,
      category: entity.category,
      name: entity.name,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
      stockLevels: entity.stockLevels.map(sl => this.stockLevelMapper.toPersistence(sl))
    };
  }

  public toDomain(model: InventoryItemPersistenceModel): InventoryItem {
    const id = InventoryItemId.create(model.id).value!;
    const sku = SKU.create(model.sku).value!;
    const category = model.category as ItemCategory;

    const item = new InventoryItem(
      id,
      sku,
      category,
      model.name,
      model.isActive,
      model.createdAt,
      model.version
    );

    const stockLevelsMap = Reflect.get(item, '_stockLevels') as Map<string, StockLevel>;

    for (const sl of model.stockLevels) {
      const stockLevel = this.stockLevelMapper.toDomain(sl);
      stockLevelsMap.set(stockLevel.locationId.value, stockLevel);
    }
    
    // Clear domain events that were generated during reconstruction
    item.clearDomainEvents();
    
    return item;
  }
}
