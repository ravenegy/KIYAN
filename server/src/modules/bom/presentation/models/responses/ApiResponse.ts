export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly errors?: readonly string[];
  readonly timestamp: string;
}

export class ApiResponseBuilder {
  public static success<T>(data: T): ApiResponse<T> {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  public static error<T>(error: string, errors?: readonly string[]): ApiResponse<T> {
    return {
      success: false,
      error,
      errors,
      timestamp: new Date().toISOString(),
    };
  }
}
