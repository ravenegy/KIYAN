export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: {
    readonly code: string;
    readonly message: string;
    readonly details?: ReadonlyArray<string>;
  };
  readonly meta?: Record<string, unknown>;
}
