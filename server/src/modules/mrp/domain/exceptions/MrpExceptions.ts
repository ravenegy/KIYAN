import { DomainException } from '../../../../core/domain/exceptions/DomainException';

export class InvalidMrpStatusException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidMrpStatusException';
  }
}

export class InvalidPlannedOrderStatusException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPlannedOrderStatusException';
  }
}
