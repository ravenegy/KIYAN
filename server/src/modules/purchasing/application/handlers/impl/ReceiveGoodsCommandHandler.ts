import { Result } from '../../../../../core/results/Result';
import { ReceiveGoodsCommand } from '../../commands';
import { IPurchaseOrderRepository } from '../../../domain/repositories';
import { PurchaseOrderId } from '../../../domain/shared';

export class ReceiveGoodsCommandHandler {
    constructor(private readonly purchaseOrderRepository: IPurchaseOrderRepository) {}

    async handle(command: ReceiveGoodsCommand): Promise<Result<void>> {
        try {
            const order = await this.purchaseOrderRepository.findById(new PurchaseOrderId(command.orderId));
            if (!order) {
                return Result.failure({ code: 'ORDER_NOT_FOUND', message: `Order ${command.orderId} not found` });
            }

            order.receiveGoods(command.lineId, command.quantity);
            await this.purchaseOrderRepository.save(order);
            
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'RECEIVE_GOODS_FAILED', message: error.message });
        }
    }
}
