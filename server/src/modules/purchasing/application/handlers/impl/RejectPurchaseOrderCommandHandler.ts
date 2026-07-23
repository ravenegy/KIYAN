import { Result } from '../../../../../core/results/Result';
import { RejectPurchaseOrderCommand } from '../../commands';
import { IPurchaseOrderRepository } from '../../../domain/repositories';
import { PurchaseOrderId } from '../../../domain/shared';

export class RejectPurchaseOrderCommandHandler {
    constructor(private readonly purchaseOrderRepository: IPurchaseOrderRepository) {}

    async handle(command: RejectPurchaseOrderCommand): Promise<Result<void>> {
        try {
            const order = await this.purchaseOrderRepository.findById(new PurchaseOrderId(command.orderId));
            if (!order) {
                return Result.failure({ code: 'ORDER_NOT_FOUND', message: `Order ${command.orderId} not found` });
            }

            order.reject();
            await this.purchaseOrderRepository.save(order);
            
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'REJECT_ORDER_FAILED', message: error.message });
        }
    }
}
