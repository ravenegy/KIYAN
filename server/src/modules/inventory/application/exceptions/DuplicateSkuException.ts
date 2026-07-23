import { InventoryApplicationException } from './InventoryApplicationException';

export class DuplicateSkuException extends InventoryApplicationException {
  constructor(sku: string) {
    super(`An inventory item with SKU '${sku}' already exists.`);
    this.name = 'DuplicateSkuException';
  }
}
