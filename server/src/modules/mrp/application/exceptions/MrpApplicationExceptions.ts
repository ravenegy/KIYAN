import { ApplicationException } from '../../../../core/application/exceptions/ApplicationException';

export class MrpRunNotFoundException extends ApplicationException {
  constructor(id: string) {
    super(`MRP Run with ID ${id} not found.`);
    this.name = 'MrpRunNotFoundException';
  }
}

export class PlannedOrderNotFoundException extends ApplicationException {
  constructor(id: string) {
    super(`Planned Order with ID ${id} not found.`);
    this.name = 'PlannedOrderNotFoundException';
  }
}
