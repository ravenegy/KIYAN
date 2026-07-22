export class ApplicationException extends Error {
  public readonly code: string;
  public readonly details?: unknown;
  
  constructor(message: string, code: string = 'APPLICATION_ERROR', details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AppValidationException extends ApplicationException {
  constructor(message: string, errors: string[]) {
    super(message, 'VALIDATION_ERROR', errors);
  }
}

export class AuthorizationException extends ApplicationException {
  constructor(message: string) {
    super(message, 'AUTHORIZATION_ERROR');
  }
}

export class NotFoundException extends ApplicationException {
  constructor(message: string) {
    super(message, 'NOT_FOUND_ERROR');
  }
}
