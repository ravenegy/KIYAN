export interface BomComponentPersistenceModel {
  readonly id: string;
  readonly bomId: string;
  readonly itemId: string;
  readonly quantity: number;
  readonly unitOfMeasure: string;
  readonly scrapPercentage: number;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
  readonly version: number;
}
