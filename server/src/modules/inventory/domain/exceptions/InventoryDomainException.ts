export class InventoryDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InventoryDomainException';
  }
}
