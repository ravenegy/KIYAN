import { Result } from '../../../../../core/results/Result';
import { AddPurchaseOrderLineCommand } from '../../commands';
import { IPurchaseOrderRepository } from '../../../domain/repositories';
import { PurchaseOrderId } from '../../../domain/shared';

export class AddPurchaseOrderLineCommandHandler {
    constructor(private readonly purchaseOrderRepository: IPurchaseOrderRepository) {}

    async handle(command: AddPurchaseOrderLineCommand): Promise<Result<void>> {
        try {
            const order = await this.purchaseOrderRepository.findById(new PurchaseOrderId(command.orderId));
            if (!order) {
                return Result.failure({ code: 'ORDER_NOT_FOUND', message: `Order ${command.orderId} not found` });
            }

            order.addLine(command.itemId, command.quantity, command.unitPrice, command.expectedDeliveryDate);
            await this.purchaseOrderRepository.save(order);
            
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'ADD_LINE_FAILED', message: error.message });
        }
    }
}
