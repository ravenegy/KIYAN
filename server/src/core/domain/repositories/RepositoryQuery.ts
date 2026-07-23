import { IPagination } from './IPagination';
import { SortDirection } from './SortDirection';
import { Specification } from '../specifications/Specification';

export interface SortParam {
  readonly field: string;
  readonly direction: SortDirection;
}

export interface RepositoryQuery<T> {
  readonly filtering?: Record<string, unknown>;
  readonly ordering?: ReadonlyArray<SortParam>;
  readonly projection?: ReadonlyArray<keyof T>;
  readonly pagination?: IPagination;
  readonly specification?: Specification<T>;
}
