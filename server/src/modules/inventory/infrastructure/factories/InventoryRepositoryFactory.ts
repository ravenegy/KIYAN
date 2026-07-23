import { InventoryItemRepository } from '../repositories/InventoryItemRepository';
import { InventoryPersistenceMapper } from '../persistence/mappers/InventoryPersistenceMapper';

export class InventoryRepositoryFactory {
  constructor(private readonly inventoryMapper: InventoryPersistenceMapper) {}

  public createInventoryItemRepository(): InventoryItemRepository {
    return new InventoryItemRepository(this.inventoryMapper);
  }
}
