export interface BomSummaryDto {
  readonly id: string;
  readonly name: string;
  readonly targetItemId: string;
  readonly status: string;
  readonly version: number;
  readonly createdAt: string;
}
