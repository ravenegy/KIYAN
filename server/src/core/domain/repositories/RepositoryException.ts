import { DomainException } from '../exceptions/DomainException';

export class RepositoryException extends DomainException {
  public readonly repositoryName: string;
  public readonly operation: string;

  constructor(message: string, repositoryName: string, operation: string, metadata?: Record<string, unknown>) {
    super(message, 'REPOSITORY_ERROR', metadata);
    this.repositoryName = repositoryName;
    this.operation = operation;
    this.name = this.constructor.name;
  }
}
