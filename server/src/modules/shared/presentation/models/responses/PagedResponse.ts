export interface PagedResponse<T> {
  readonly items: ReadonlyArray<T>;
  readonly totalCount: number;
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly totalPages: number;
}
