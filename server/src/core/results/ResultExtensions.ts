import { Result } from './Result';
import { ResultFactory } from './ResultFactory';
import { ErrorDetail } from './ErrorDetail';

export class ResultExtensions {
  public static toVoid<T>(result: Result<T>): Result<void> {
    return result.map(() => undefined);
  }

  public static ensure<T>(
    result: Result<T>,
    predicate: (value: T) => boolean,
    error: ErrorDetail,
    statusCode: number = 400
  ): Result<T> {
    if (result.isFailure) {
      return result;
    }
    if (predicate(result.value as T)) {
      return result;
    }
    return ResultFactory.failure(error, undefined, statusCode);
  }

  public static tap<T>(result: Result<T>, action: (value: T) => void): Result<T> {
    if (result.isSuccess) {
      action(result.value as T);
    }
    return result;
  }
}
