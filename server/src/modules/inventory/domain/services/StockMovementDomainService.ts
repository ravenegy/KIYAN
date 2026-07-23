import { InventoryItem } from '../entities/InventoryItem';
import { StockLocationId } from '../shared/StockLocationId';
import { Quantity } from '../value-objects/Quantity';
import { InventoryDomainException } from '../exceptions/InventoryDomainException';

export class StockMovementDomainService {
  public transferStock(
    item: InventoryItem,
    fromLocation: StockLocationId,
    toLocation: StockLocationId,
    amount: Quantity
  ): void {
    if (fromLocation.equals(toLocation)) {
      throw new InventoryDomainException('Cannot transfer stock to the same location.');
    }

    const currentFromStock = item.getStockAt(fromLocation);
    if (currentFromStock.value < amount.value) {
      throw new InventoryDomainException('Insufficient stock at source location for transfer.');
    }

    item.adjustStock(fromLocation, currentFromStock.subtract(amount).value as Quantity, 'Transfer Out');
    
    const currentToStock = item.getStockAt(toLocation);
    item.adjustStock(toLocation, currentToStock.add(amount).value as Quantity, 'Transfer In');
  }
}
