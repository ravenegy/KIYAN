import { InventoryItem } from '../entities/InventoryItem';
import { StockLocationId } from '../shared/StockLocationId';
import { Quantity } from '../value-objects/Quantity';
import { ItemCategory } from '../enums/ItemCategory';

export class StockAllocationPolicy {
  public static canAllocate(item: InventoryItem, locationId: StockLocationId, amount: Quantity): boolean {
    if (!item.isActive) return false;
    
    if (item.category === ItemCategory.RawMaterial) {
      const total = item.getTotalStock();
      if (total.value - amount.value < 10) {
        return false;
      }
    }

    const stockAtLocation = item.getStockAt(locationId);
    return stockAtLocation.value >= amount.value;
  }
}
