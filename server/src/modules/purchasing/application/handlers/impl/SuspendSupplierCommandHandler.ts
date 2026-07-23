import { Result } from '../../../../../core/results/Result';
import { SuspendSupplierCommand } from '../../commands';
import { ISupplierRepository } from '../../../domain/repositories';
import { SupplierId } from '../../../domain/shared';

export class SuspendSupplierCommandHandler {
    constructor(private readonly supplierRepository: ISupplierRepository) {}

    async handle(command: SuspendSupplierCommand): Promise<Result<void>> {
        try {
            const supplier = await this.supplierRepository.findById(new SupplierId(command.supplierId));
            if (!supplier) {
                return Result.failure({ code: 'SUPPLIER_NOT_FOUND', message: `Supplier ${command.supplierId} not found` });
            }

            supplier.blacklist();
            await this.supplierRepository.save(supplier);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SUSPEND_SUPPLIER_FAILED', message: error.message });
        }
    }
}
