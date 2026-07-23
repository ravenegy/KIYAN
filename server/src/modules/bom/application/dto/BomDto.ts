import { BomComponentDto } from './BomComponentDto';

export interface BomDto {
  readonly id: string;
  readonly name: string;
  readonly targetItemId: string;
  readonly status: string;
  readonly version: number;
  readonly components: readonly BomComponentDto[];
  readonly createdAt: string;
  readonly updatedAt?: string;
}
