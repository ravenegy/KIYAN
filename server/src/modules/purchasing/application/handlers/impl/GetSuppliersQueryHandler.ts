import { Result } from '../../../../../core/results/Result';
import { GetSuppliersQuery } from '../../queries';
import { SupplierDto } from '../../dto';
import { ISupplierRepository } from '../../../domain/repositories';
import { IPurchasingMapper } from '../../mappers';

export class GetSuppliersQueryHandler {
    constructor(
        private readonly supplierRepository: ISupplierRepository,
        private readonly mapper: IPurchasingMapper
    ) {}

    async handle(query: GetSuppliersQuery): Promise<Result<readonly SupplierDto[]>> {
        try {
            let suppliers = await this.supplierRepository.findAll();
            if (query.status) {
                suppliers = suppliers.filter(s => s.status === query.status);
            }
            if (query.qualificationLevel) {
                suppliers = suppliers.filter(s => s.qualificationLevel === query.qualificationLevel);
            }
            return Result.success(suppliers.map(s => this.mapper.toSupplierDto(s)));
        } catch (error: any) {
            return Result.failure({ code: 'QUERY_FAILED', message: error.message });
        }
    }
}
