import { ErrorCode } from './ErrorCode';
import { ErrorDetail } from './ErrorDetail';
import { Result } from './Result';

export class ResultFactory {
  public static success<T>(value?: T, statusCode: number = 200): Result<T> {
    return Result.success(value, statusCode);
  }

  public static failure<T>(error: ErrorDetail, errors?: ErrorDetail[], statusCode: number = 500): Result<T> {
    return Result.failure(error, errors, statusCode);
  }

  public static validation<T>(message: string, errors?: ErrorDetail[], target?: string): Result<T> {
    return this.failure({ code: ErrorCode.Validation, message, target }, errors, 400);
  }

  public static unauthorized<T>(message: string = "Unauthorized"): Result<T> {
    return this.failure({ code: ErrorCode.Unauthorized, message }, undefined, 401);
  }

  public static forbidden<T>(message: string = "Forbidden"): Result<T> {
    return this.failure({ code: ErrorCode.Forbidden, message }, undefined, 403);
  }

  public static notFound<T>(message: string = "Not Found", target?: string): Result<T> {
    return this.failure({ code: ErrorCode.NotFound, message, target }, undefined, 404);
  }

  public static conflict<T>(message: string = "Conflict", target?: string): Result<T> {
    return this.failure({ code: ErrorCode.Conflict, message, target }, undefined, 409);
  }

  public static businessRule<T>(message: string, target?: string): Result<T> {
    return this.failure({ code: ErrorCode.BusinessRule, message, target }, undefined, 422);
  }

  public static concurrency<T>(message: string = "Concurrency conflict", target?: string): Result<T> {
    return this.failure({ code: ErrorCode.Concurrency, message, target }, undefined, 409);
  }

  public static timeout<T>(message: string = "Request timeout"): Result<T> {
    return this.failure({ code: ErrorCode.Timeout, message }, undefined, 408);
  }

  public static cancelled<T>(message: string = "Request cancelled"): Result<T> {
    return this.failure({ code: ErrorCode.Cancelled, message }, undefined, 499);
  }

  public static unexpected<T>(message: string = "Unexpected error", details?: string[]): Result<T> {
    return this.failure({ code: ErrorCode.Unexpected, message, details }, undefined, 500);
  }

  public static infrastructure<T>(message: string = "Infrastructure error", details?: string[]): Result<T> {
    return this.failure({ code: ErrorCode.Infrastructure, message, details }, undefined, 500);
  }
}
