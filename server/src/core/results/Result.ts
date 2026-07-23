import { ErrorDetail } from './ErrorDetail';

export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly value?: T;
  public readonly error?: ErrorDetail;
  public readonly errors?: ReadonlyArray<ErrorDetail>;
  public readonly statusCode?: number;

  protected constructor(
    isSuccess: boolean,
    value?: T,
    error?: ErrorDetail,
    errors?: ErrorDetail[],
    statusCode?: number
  ) {
    if (isSuccess && (error !== undefined || (errors !== undefined && errors.length > 0))) {
      throw new Error("Successful result cannot contain errors.");
    }
    if (!isSuccess && error === undefined && (errors === undefined || errors.length === 0)) {
      throw new Error("Failure result must contain at least one error.");
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.value = value;
    this.error = error;
    this.errors = errors ? Object.freeze([...errors]) : undefined;
    this.statusCode = statusCode;
    
    Object.freeze(this);
  }

  public static success<U>(value?: U, statusCode?: number): Result<U> {
    return new Result<U>(true, value, undefined, undefined, statusCode);
  }

  public static failure<U>(error: ErrorDetail, errors?: ErrorDetail[], statusCode?: number): Result<U> {
    return new Result<U>(false, undefined, error, errors, statusCode);
  }

  public map<U>(mapper: (value: T) => U): Result<U> {
    if (this.isFailure) {
      return Result.failure<U>(this.error!, this.errors ? [...this.errors] : undefined, this.statusCode);
    }
    return Result.success<U>(mapper(this.value as T), this.statusCode);
  }

  public bind<U>(binder: (value: T) => Result<U>): Result<U> {
    if (this.isFailure) {
      return Result.failure<U>(this.error!, this.errors ? [...this.errors] : undefined, this.statusCode);
    }
    return binder(this.value as T);
  }

  public match<U>(
    onSuccess: (value: T) => U,
    onFailure: (error: ErrorDetail, errors?: ReadonlyArray<ErrorDetail>) => U
  ): U {
    if (this.isSuccess) {
      return onSuccess(this.value as T);
    }
    return onFailure(this.error!, this.errors);
  }
}
