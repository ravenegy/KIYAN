import { Result } from '../../../../../core/results/Result';
import { ISalesInvoiceRepository } from '../../../domain/repositories/ISalesInvoiceRepository';
import { SalesInvoice } from '../../../domain/aggregates/SalesInvoice';
import { 
    SalesInvoiceId, 
    SalesOrderId,
    CustomerId, 
    SalesInvoiceLineId,
    Quantity,
    Money,
    TaxRate
} from '../../../domain/value-objects';
import { 
    CreateSalesInvoiceCommand, 
    AddSalesInvoiceLineCommand, 
    IssueSalesInvoiceCommand, 
    CancelSalesInvoiceCommand 
} from '../../commands/SalesCommands';

export class CreateSalesInvoiceCommandHandler {
    constructor(private readonly invoiceRepository: ISalesInvoiceRepository) {}

    async handle(command: CreateSalesInvoiceCommand): Promise<Result<string>> {
        try {
            const invoiceId = SalesInvoiceId.create();
            const invoice = SalesInvoice.create(
                invoiceId, 
                SalesOrderId.create(command.salesOrderId),
                CustomerId.create(command.customerId),
                command.dueDate, 
                command.currency
            );
            await this.invoiceRepository.save(invoice);
            
            return Result.success(invoice.id.value);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class AddSalesInvoiceLineCommandHandler {
    constructor(private readonly invoiceRepository: ISalesInvoiceRepository) {}

    async handle(command: AddSalesInvoiceLineCommand): Promise<Result<void>> {
        try {
            const invoice = await this.invoiceRepository.findById(SalesInvoiceId.create(command.invoiceId));
            if (!invoice) return Result.failure({ code: 'SALES_ERROR', message: 'Sales invoice not found' });

            invoice.addLine(
                SalesInvoiceLineId.create(),
                command.itemId,
                command.description,
                Quantity.create(command.quantity),
                Money.create(command.unitPrice, command.currency),
                TaxRate.create(command.taxRatePercentage)
            );
            await this.invoiceRepository.save(invoice);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class IssueSalesInvoiceCommandHandler {
    constructor(private readonly invoiceRepository: ISalesInvoiceRepository) {}

    async handle(command: IssueSalesInvoiceCommand): Promise<Result<void>> {
        try {
            const invoice = await this.invoiceRepository.findById(SalesInvoiceId.create(command.invoiceId));
            if (!invoice) return Result.failure({ code: 'SALES_ERROR', message: 'Sales invoice not found' });

            invoice.issue();
            await this.invoiceRepository.save(invoice);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class CancelSalesInvoiceCommandHandler {
    constructor(private readonly invoiceRepository: ISalesInvoiceRepository) {}

    async handle(command: CancelSalesInvoiceCommand): Promise<Result<void>> {
        try {
            const invoice = await this.invoiceRepository.findById(SalesInvoiceId.create(command.invoiceId));
            if (!invoice) return Result.failure({ code: 'SALES_ERROR', message: 'Sales invoice not found' });

            invoice.cancel();
            await this.invoiceRepository.save(invoice);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}
