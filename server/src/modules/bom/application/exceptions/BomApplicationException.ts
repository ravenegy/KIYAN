import { ApplicationException } from '../../../../core/application/exceptions/ApplicationException';

export class BomApplicationException extends ApplicationException {
  constructor(message: string, code: string = 'BOM_APPLICATION_ERROR') {
    super(message, code);
    this.name = 'BomApplicationException';
  }
}
