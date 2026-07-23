export class PagedResult<T> {
  public readonly items: ReadonlyArray<T>;
  public readonly totalCount: number;
  public readonly totalPages: number;
  public readonly hasNext: boolean;
  public readonly hasPrevious: boolean;

  constructor(items: T[], totalCount: number, pageNumber: number, pageSize: number) {
    this.items = Object.freeze([...items]);
    this.totalCount = totalCount;
    this.totalPages = Math.ceil(totalCount / pageSize);
    this.hasNext = pageNumber < this.totalPages;
    this.hasPrevious = pageNumber > 1;
    Object.freeze(this);
  }
}
