export interface BomComponentResponse {
  readonly id: string;
  readonly bomId: string;
  readonly itemId: string;
  readonly quantity: number;
  readonly unitOfMeasure: string;
  readonly scrapPercentage: number;
}
