import { Result } from '../../../../../core/results/Result';
import { CreatePurchaseOrderCommand } from '../../commands';
import { IPurchaseOrderRepository, ISupplierRepository } from '../../../domain/repositories';
import { PurchaseOrder } from '../../../domain/entities';
import { PurchaseOrderId, SupplierId } from '../../../domain/shared';
import { randomUUID } from 'crypto';

export class CreatePurchaseOrderCommandHandler {
    constructor(
        private readonly purchaseOrderRepository: IPurchaseOrderRepository,
        private readonly supplierRepository: ISupplierRepository
    ) {}

    async handle(command: CreatePurchaseOrderCommand): Promise<Result<string>> {
        try {
            const supplierId = new SupplierId(command.supplierId);
            const supplier = await this.supplierRepository.findById(supplierId);
            if (!supplier) {
                return Result.failure({ code: 'SUPPLIER_NOT_FOUND', message: `Supplier ${command.supplierId} not found` });
            }

            const id = new PurchaseOrderId(randomUUID());
            const order = new PurchaseOrder(id, supplierId, command.expectedDeliveryDate, command.notes);
            await this.purchaseOrderRepository.save(order);
            
            return Result.success(id.value);
        } catch (error: any) {
            return Result.failure({ code: 'CREATE_ORDER_FAILED', message: error.message });
        }
    }
}
