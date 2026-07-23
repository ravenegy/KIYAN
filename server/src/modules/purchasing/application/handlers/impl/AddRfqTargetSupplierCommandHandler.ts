import { Result } from '../../../../../core/results/Result';
import { AddRfqTargetSupplierCommand } from '../../commands';
import { IRfqRepository } from '../../../domain/repositories';
import { RfqId, SupplierId } from '../../../domain/shared';

export class AddRfqTargetSupplierCommandHandler {
    constructor(private readonly rfqRepository: IRfqRepository) {}

    async handle(command: AddRfqTargetSupplierCommand): Promise<Result<void>> {
        try {
            const rfq = await this.rfqRepository.findById(new RfqId(command.rfqId));
            if (!rfq) {
                return Result.failure({ code: 'RFQ_NOT_FOUND', message: `RFQ ${command.rfqId} not found` });
            }

            rfq.addTargetSupplier(new SupplierId(command.supplierId));
            await this.rfqRepository.save(rfq);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'ADD_TARGET_SUPPLIER_FAILED', message: error.message });
        }
    }
}
