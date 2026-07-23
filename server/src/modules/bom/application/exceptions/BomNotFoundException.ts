import { BomApplicationException } from './BomApplicationException';

export class BomNotFoundException extends BomApplicationException {
  constructor(bomId: string) {
    super(`BOM with ID ${bomId} not found`, 'BOM_NOT_FOUND');
    this.name = 'BomNotFoundException';
  }
}
