import { Result } from '../../../../../core/results/Result';
import { IssuePurchaseOrderCommand } from '../../commands';
import { IPurchaseOrderRepository } from '../../../domain/repositories';
import { PurchaseOrderId } from '../../../domain/shared';

export class IssuePurchaseOrderCommandHandler {
    constructor(private readonly purchaseOrderRepository: IPurchaseOrderRepository) {}

    async handle(command: IssuePurchaseOrderCommand): Promise<Result<void>> {
        try {
            const order = await this.purchaseOrderRepository.findById(new PurchaseOrderId(command.orderId));
            if (!order) {
                return Result.failure({ code: 'ORDER_NOT_FOUND', message: `Order ${command.orderId} not found` });
            }

            order.issue();
            await this.purchaseOrderRepository.save(order);
            
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'ISSUE_ORDER_FAILED', message: error.message });
        }
    }
}
