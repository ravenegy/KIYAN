import { ErrorCode } from './ErrorCode';

export interface ErrorDetail {
  readonly code: ErrorCode | string;
  readonly message: string;
  readonly target?: string;
  readonly details?: ReadonlyArray<string>;
  readonly metadata?: Readonly<Record<string, unknown>>;
}
