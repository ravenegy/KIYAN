export class DomainException extends Error {
  public readonly code?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(message: string, code?: string, metadata?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.metadata = metadata ? Object.freeze({ ...metadata }) : undefined;
    Error.captureStackTrace(this, this.constructor);
  }
}
