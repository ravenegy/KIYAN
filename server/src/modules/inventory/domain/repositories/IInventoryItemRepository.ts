import { InventoryItem } from '../entities/InventoryItem';
import { InventoryItemId } from '../shared/InventoryItemId';
import { SKU } from '../value-objects/SKU';
import { IRepository } from '../../../../core/domain/repositories/IRepository';

export interface IInventoryItemRepository extends IRepository<InventoryItem, InventoryItemId> {
  findBySku(sku: SKU): Promise<InventoryItem | null>;
}
