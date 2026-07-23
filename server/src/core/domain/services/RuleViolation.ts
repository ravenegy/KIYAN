export class RuleViolation {
  public readonly code: string;
  public readonly message: string;
  public readonly target?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(code: string, message: string, target?: string, metadata?: Record<string, unknown>) {
    this.code = code;
    this.message = message;
    this.target = target;
    this.metadata = metadata ? Object.freeze({ ...metadata }) : undefined;
    Object.freeze(this);
  }
}
