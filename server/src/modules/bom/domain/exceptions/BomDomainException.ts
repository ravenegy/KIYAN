import { DomainException } from '../../../../core/domain/exceptions/DomainException';

export class BomDomainException extends DomainException {
  constructor(message: string, code: string = 'BOM_DOMAIN_ERROR') {
    super(message, code);
    this.name = 'BomDomainException';
  }
}
