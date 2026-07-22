import { ValidationSeverity } from './ValidationSeverity';

export class ValidationMessage {
  public readonly code: string;
  public readonly message: string;
  public readonly target?: string;
  public readonly severity: ValidationSeverity;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    code: string,
    message: string,
    severity: ValidationSeverity = ValidationSeverity.Error,
    target?: string,
    metadata?: Record<string, unknown>
  ) {
    this.code = code;
    this.message = message;
    this.severity = severity;
    this.target = target;
    this.metadata = metadata ? Object.freeze({ ...metadata }) : undefined;
    Object.freeze(this);
  }
}
