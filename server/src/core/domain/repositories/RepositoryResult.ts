export class RepositoryResult<T> {
  public readonly items: ReadonlyArray<T>;
  public readonly count: number;
  public readonly executionTime: number;

  constructor(items: T[], count: number, executionTime: number) {
    this.items = Object.freeze([...items]);
    this.count = count;
    this.executionTime = executionTime;
    Object.freeze(this);
  }
}
