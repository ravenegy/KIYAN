import { DomainException } from '../exceptions/DomainException';

export class FactoryException extends DomainException {
  public readonly targetType: string;
  public readonly errors: ReadonlyArray<string>;

  constructor(targetType: string, message: string, errors: string[] = [], metadata?: Record<string, unknown>) {
    super(message, 'FACTORY_ERROR', metadata);
    this.targetType = targetType;
    this.errors = Object.freeze([...errors]);
    this.name = this.constructor.name;
  }
}
