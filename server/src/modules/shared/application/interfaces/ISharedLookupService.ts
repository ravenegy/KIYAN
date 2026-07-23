import { Result } from '../../../../core/results/Result';
import { LookupDto } from '../dto/LookupDto';

export interface ISharedLookupService {
  getLookupById(id: string): Promise<Result<LookupDto>>;
  getLookupByCode(code: string): Promise<Result<LookupDto>>;
}
