import { ValidationMessage } from './ValidationMessage';
import { ValidationSeverity } from './ValidationSeverity';

export class ValidationResult {
  public readonly messages: ReadonlyArray<ValidationMessage>;

  constructor(messages: ValidationMessage[] = []) {
    this.messages = Object.freeze([...messages]);
    Object.freeze(this);
  }

  public get isValid(): boolean {
    return !this.messages.some(
      m => m.severity === ValidationSeverity.Error || m.severity === ValidationSeverity.Critical
    );
  }

  public get errors(): ReadonlyArray<ValidationMessage> {
    return this.messages.filter(m => m.severity === ValidationSeverity.Error);
  }

  public get warnings(): ReadonlyArray<ValidationMessage> {
    return this.messages.filter(m => m.severity === ValidationSeverity.Warning);
  }

  public get infos(): ReadonlyArray<ValidationMessage> {
    return this.messages.filter(m => m.severity === ValidationSeverity.Info);
  }

  public get criticals(): ReadonlyArray<ValidationMessage> {
    return this.messages.filter(m => m.severity === ValidationSeverity.Critical);
  }

  public static success(): ValidationResult {
    return new ValidationResult();
  }

  public static failure(messages: ValidationMessage[]): ValidationResult {
    return new ValidationResult(messages);
  }

  public merge(other: ValidationResult): ValidationResult {
    return new ValidationResult([...this.messages, ...other.messages]);
  }

  public static combine(results: ReadonlyArray<ValidationResult>): ValidationResult {
    const allMessages = results.flatMap(r => r.messages);
    return new ValidationResult(allMessages);
  }
}
