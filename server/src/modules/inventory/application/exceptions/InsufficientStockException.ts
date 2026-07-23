import { InventoryApplicationException } from './InventoryApplicationException';

export class InsufficientStockException extends InventoryApplicationException {
  constructor(locationId: string, required: number, available: number) {
    super(`Insufficient stock at location '${locationId}'. Required: ${required}, Available: ${available}.`);
    this.name = 'InsufficientStockException';
  }
}
