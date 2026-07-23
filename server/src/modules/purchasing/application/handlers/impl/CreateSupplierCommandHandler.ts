import { Result } from '../../../../../core/results/Result';
import { CreateSupplierCommand } from '../../commands';
import { ISupplierRepository } from '../../../domain/repositories';
import { Supplier } from '../../../domain/entities';
import { SupplierId } from '../../../domain/shared';
import { randomUUID } from 'crypto';

export class CreateSupplierCommandHandler {
    constructor(private readonly supplierRepository: ISupplierRepository) {}

    async handle(command: CreateSupplierCommand): Promise<Result<string>> {
        try {
            const id = new SupplierId(randomUUID());
            const supplier = new Supplier(id, command.name, command.contactEmail);
            await this.supplierRepository.save(supplier);
            return Result.success(id.value);
        } catch (error: any) {
            return Result.failure({ code: 'CREATE_SUPPLIER_FAILED', message: error.message });
        }
    }
}
