import { BomComponentResponse } from './BomComponentResponse';

export interface BomResponse {
  readonly id: string;
  readonly name: string;
  readonly targetItemId: string;
  readonly status: string;
  readonly version: number;
  readonly components: readonly BomComponentResponse[];
  readonly createdAt: string;
  readonly updatedAt?: string;
}
