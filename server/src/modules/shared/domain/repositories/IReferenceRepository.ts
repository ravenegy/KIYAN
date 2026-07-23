export interface IReferenceRepository<T> {
  getByReferenceCode(code: string): Promise<T | null>;
}
