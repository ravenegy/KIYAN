import { Result } from '../../../../../core/results/Result';
import { CancelPurchaseOrderCommand } from '../../commands';
import { IPurchaseOrderRepository } from '../../../domain/repositories';
import { PurchaseOrderId } from '../../../domain/shared';

export class CancelPurchaseOrderCommandHandler {
    constructor(private readonly purchaseOrderRepository: IPurchaseOrderRepository) {}

    async handle(command: CancelPurchaseOrderCommand): Promise<Result<void>> {
        try {
            const order = await this.purchaseOrderRepository.findById(new PurchaseOrderId(command.orderId));
            if (!order) {
                return Result.failure({ code: 'ORDER_NOT_FOUND', message: `Order ${command.orderId} not found` });
            }

            return Result.failure({ code: 'NOT_IMPLEMENTED', message: 'Cancel operation requires Domain support' });
        } catch (error: any) {
            return Result.failure({ code: 'CANCEL_ORDER_FAILED', message: error.message });
        }
    }
}
