import { ApiResponse } from './ApiResponse';

export interface PagedResponse<T> extends ApiResponse<readonly T[]> {
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}
