import { InventoryApplicationException } from './InventoryApplicationException';

export class InventoryNotFoundException extends InventoryApplicationException {
  constructor(idOrSku: string) {
    super(`Inventory item with identifier '${idOrSku}' was not found.`);
    this.name = 'InventoryNotFoundException';
  }
}
