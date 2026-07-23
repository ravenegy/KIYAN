export interface AddBomComponentRequest {
  readonly itemId: string;
  readonly quantity: number;
  readonly unitOfMeasure: string;
  readonly scrapPercentage?: number;
}
