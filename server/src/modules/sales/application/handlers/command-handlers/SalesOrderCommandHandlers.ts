import { Result } from '../../../../../core/results/Result';
import { ISalesOrderRepository } from '../../../domain/repositories/ISalesOrderRepository';
import { ICustomerRepository } from '../../../domain/repositories/ICustomerRepository';
import { SalesOrder } from '../../../domain/aggregates/SalesOrder';
import { 
    SalesOrderId, 
    CustomerId, 
    SalesOrderLineId,
    Quantity,
    Money,
    Discount,
    TaxRate
} from '../../../domain/value-objects';
import { 
    CreateSalesOrderCommand, 
    AddSalesOrderLineCommand, 
    RemoveSalesOrderLineCommand, 
    ConfirmSalesOrderCommand, 
    CancelSalesOrderCommand, 
    CompleteSalesOrderCommand 
} from '../../commands/SalesCommands';

export class CreateSalesOrderCommandHandler {
    constructor(
        private readonly salesOrderRepository: ISalesOrderRepository,
        private readonly customerRepository: ICustomerRepository
    ) {}

    async handle(command: CreateSalesOrderCommand): Promise<Result<string>> {
        try {
            const customerId = CustomerId.create(command.customerId);
            const customer = await this.customerRepository.findById(customerId);
            if (!customer) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Customer not found' });
            }
            if (!customer.isEligibleForOrders) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Customer is not eligible for orders' });
            }
            
            const orderId = SalesOrderId.create();
            const order = SalesOrder.create(orderId, customerId, command.currency);
            await this.salesOrderRepository.save(order);
            
            return Result.success(order.id.value);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class AddSalesOrderLineCommandHandler {
    constructor(private readonly salesOrderRepository: ISalesOrderRepository) {}

    async handle(command: AddSalesOrderLineCommand): Promise<Result<void>> {
        try {
            const order = await this.salesOrderRepository.findById(SalesOrderId.create(command.orderId));
            if (!order) return Result.failure({ code: 'SALES_ERROR', message: 'Sales order not found' });

            order.addLine(
                SalesOrderLineId.create(),
                command.itemId,
                Quantity.create(command.quantity),
                Money.create(command.unitPrice, command.currency),
                Discount.create(command.discountPercentage),
                TaxRate.create(command.taxRatePercentage)
            );
            await this.salesOrderRepository.save(order);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class RemoveSalesOrderLineCommandHandler {
    constructor(private readonly salesOrderRepository: ISalesOrderRepository) {}

    async handle(command: RemoveSalesOrderLineCommand): Promise<Result<void>> {
        try {
            const order = await this.salesOrderRepository.findById(SalesOrderId.create(command.orderId));
            if (!order) return Result.failure({ code: 'SALES_ERROR', message: 'Sales order not found' });

            order.removeLine(SalesOrderLineId.create(command.lineId));
            await this.salesOrderRepository.save(order);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class ConfirmSalesOrderCommandHandler {
    constructor(private readonly salesOrderRepository: ISalesOrderRepository) {}

    async handle(command: ConfirmSalesOrderCommand): Promise<Result<void>> {
        try {
            const order = await this.salesOrderRepository.findById(SalesOrderId.create(command.orderId));
            if (!order) return Result.failure({ code: 'SALES_ERROR', message: 'Sales order not found' });

            order.confirm();
            await this.salesOrderRepository.save(order);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class CancelSalesOrderCommandHandler {
    constructor(private readonly salesOrderRepository: ISalesOrderRepository) {}

    async handle(command: CancelSalesOrderCommand): Promise<Result<void>> {
        try {
            const order = await this.salesOrderRepository.findById(SalesOrderId.create(command.orderId));
            if (!order) return Result.failure({ code: 'SALES_ERROR', message: 'Sales order not found' });

            order.cancel(command.reason);
            await this.salesOrderRepository.save(order);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class CompleteSalesOrderCommandHandler {
    constructor(private readonly salesOrderRepository: ISalesOrderRepository) {}

    async handle(command: CompleteSalesOrderCommand): Promise<Result<void>> {
        try {
            const order = await this.salesOrderRepository.findById(SalesOrderId.create(command.orderId));
            if (!order) return Result.failure({ code: 'SALES_ERROR', message: 'Sales order not found' });

            order.complete();
            await this.salesOrderRepository.save(order);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}
