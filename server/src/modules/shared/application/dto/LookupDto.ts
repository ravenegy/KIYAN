import { LookupItemDto } from './LookupItemDto';

export interface LookupDto {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly description?: string;
  readonly items: ReadonlyArray<LookupItemDto>;
}
