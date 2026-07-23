export interface ILookupRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
}
