import { Result } from '../../../../../core/results/Result';
import { QualifySupplierCommand } from '../../commands';
import { ISupplierRepository } from '../../../domain/repositories';
import { SupplierId } from '../../../domain/shared';

export class QualifySupplierCommandHandler {
    constructor(private readonly supplierRepository: ISupplierRepository) {}

    async handle(command: QualifySupplierCommand): Promise<Result<void>> {
        try {
            const supplier = await this.supplierRepository.findById(new SupplierId(command.supplierId));
            if (!supplier) {
                return Result.failure({ code: 'SUPPLIER_NOT_FOUND', message: `Supplier ${command.supplierId} not found` });
            }

            supplier.qualify(command.qualificationLevel);
            await this.supplierRepository.save(supplier);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'QUALIFY_SUPPLIER_FAILED', message: error.message });
        }
    }
}
