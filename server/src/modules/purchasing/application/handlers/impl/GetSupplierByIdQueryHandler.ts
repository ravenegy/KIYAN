import { Result } from '../../../../../core/results/Result';
import { GetSupplierByIdQuery } from '../../queries';
import { SupplierDto } from '../../dto';
import { ISupplierRepository } from '../../../domain/repositories';
import { IPurchasingMapper } from '../../mappers';
import { SupplierId } from '../../../domain/shared';

export class GetSupplierByIdQueryHandler {
    constructor(
        private readonly supplierRepository: ISupplierRepository,
        private readonly mapper: IPurchasingMapper
    ) {}

    async handle(query: GetSupplierByIdQuery): Promise<Result<SupplierDto>> {
        try {
            const supplier = await this.supplierRepository.findById(new SupplierId(query.supplierId));
            if (!supplier) {
                return Result.failure({ code: 'SUPPLIER_NOT_FOUND', message: `Supplier ${query.supplierId} not found` });
            }
            return Result.success(this.mapper.toSupplierDto(supplier));
        } catch (error: any) {
            return Result.failure({ code: 'QUERY_FAILED', message: error.message });
        }
    }
}
