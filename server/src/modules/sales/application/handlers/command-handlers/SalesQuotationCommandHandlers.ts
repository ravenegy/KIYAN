import { Result } from '../../../../../core/results/Result';
import { ISalesQuotationRepository } from '../../../domain/repositories/ISalesQuotationRepository';
import { ICustomerRepository } from '../../../domain/repositories/ICustomerRepository';
import { SalesQuotation } from '../../../domain/aggregates/SalesQuotation';
import { 
    SalesQuotationId, 
    CustomerId, 
    SalesQuotationLineId,
    Quantity,
    Money,
    Discount
} from '../../../domain/value-objects';
import { 
    CreateSalesQuotationCommand, 
    AddSalesQuotationLineCommand, 
    SubmitSalesQuotationCommand, 
    AcceptSalesQuotationCommand, 
    RejectSalesQuotationCommand 
} from '../../commands/SalesCommands';

export class CreateSalesQuotationCommandHandler {
    constructor(
        private readonly quotationRepository: ISalesQuotationRepository,
        private readonly customerRepository: ICustomerRepository
    ) {}

    async handle(command: CreateSalesQuotationCommand): Promise<Result<string>> {
        try {
            const customerId = CustomerId.create(command.customerId);
            const customer = await this.customerRepository.findById(customerId);
            if (!customer) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Customer not found' });
            }
            if (!customer.isEligibleForOrders) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Customer is not eligible for orders' });
            }
            
            const quotationId = SalesQuotationId.create();
            const quotation = SalesQuotation.create(quotationId, customerId, command.validUntil, command.currency);
            await this.quotationRepository.save(quotation);
            
            return Result.success(quotation.id.value);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class AddSalesQuotationLineCommandHandler {
    constructor(private readonly quotationRepository: ISalesQuotationRepository) {}

    async handle(command: AddSalesQuotationLineCommand): Promise<Result<void>> {
        try {
            const quotation = await this.quotationRepository.findById(SalesQuotationId.create(command.quotationId));
            if (!quotation) return Result.failure({ code: 'SALES_ERROR', message: 'Sales quotation not found' });

            quotation.addLine(
                SalesQuotationLineId.create(),
                command.itemId,
                Quantity.create(command.quantity),
                Money.create(command.unitPrice, command.currency),
                Discount.create(command.discountPercentage)
            );
            await this.quotationRepository.save(quotation);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class SubmitSalesQuotationCommandHandler {
    constructor(private readonly quotationRepository: ISalesQuotationRepository) {}

    async handle(command: SubmitSalesQuotationCommand): Promise<Result<void>> {
        try {
            const quotation = await this.quotationRepository.findById(SalesQuotationId.create(command.quotationId));
            if (!quotation) return Result.failure({ code: 'SALES_ERROR', message: 'Sales quotation not found' });

            quotation.submit();
            await this.quotationRepository.save(quotation);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class AcceptSalesQuotationCommandHandler {
    constructor(private readonly quotationRepository: ISalesQuotationRepository) {}

    async handle(command: AcceptSalesQuotationCommand): Promise<Result<void>> {
        try {
            const quotation = await this.quotationRepository.findById(SalesQuotationId.create(command.quotationId));
            if (!quotation) return Result.failure({ code: 'SALES_ERROR', message: 'Sales quotation not found' });

            quotation.accept();
            await this.quotationRepository.save(quotation);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class RejectSalesQuotationCommandHandler {
    constructor(private readonly quotationRepository: ISalesQuotationRepository) {}

    async handle(command: RejectSalesQuotationCommand): Promise<Result<void>> {
        try {
            const quotation = await this.quotationRepository.findById(SalesQuotationId.create(command.quotationId));
            if (!quotation) return Result.failure({ code: 'SALES_ERROR', message: 'Sales quotation not found' });

            quotation.reject();
            await this.quotationRepository.save(quotation);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}
