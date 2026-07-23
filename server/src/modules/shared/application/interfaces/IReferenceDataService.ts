import { Result } from '../../../../core/results/Result';

export interface IReferenceDataService {
  getReferenceData<T>(type: string): Promise<Result<ReadonlyArray<T>>>;
}
