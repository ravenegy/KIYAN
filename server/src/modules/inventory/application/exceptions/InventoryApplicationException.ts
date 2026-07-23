export class InventoryApplicationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InventoryApplicationException';
  }
}
