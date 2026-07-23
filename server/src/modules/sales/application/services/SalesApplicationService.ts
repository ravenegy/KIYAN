import { Result } from '../../../../core/results/Result';
import { CustomerDto, SalesOrderDto, SalesQuotationDto, SalesInvoiceDto } from '../dto/SalesDtos';
import { ISalesApplicationService } from './ISalesApplicationService';
import { 
    CreateCustomerCommand, 
    UpdateCustomerCommand, 
    SuspendCustomerCommand, 
    ReactivateCustomerCommand,
    CreateSalesOrderCommand, 
    AddSalesOrderLineCommand, 
    RemoveSalesOrderLineCommand, 
    ConfirmSalesOrderCommand, 
    CancelSalesOrderCommand, 
    CompleteSalesOrderCommand,
    CreateSalesQuotationCommand, 
    AddSalesQuotationLineCommand, 
    SubmitSalesQuotationCommand, 
    AcceptSalesQuotationCommand, 
    RejectSalesQuotationCommand,
    CreateSalesInvoiceCommand, 
    AddSalesInvoiceLineCommand, 
    IssueSalesInvoiceCommand, 
    CancelSalesInvoiceCommand
} from '../commands/SalesCommands';
import { 
    GetCustomerByIdQuery, 
    GetCustomersQuery,
    GetSalesOrderByIdQuery, 
    GetSalesOrdersQuery,
    GetSalesQuotationByIdQuery, 
    GetSalesQuotationsQuery,
    GetSalesInvoiceByIdQuery, 
    GetSalesInvoicesQuery
} from '../queries/SalesQueries';

import {
    CreateCustomerCommandHandler,
    UpdateCustomerCommandHandler,
    SuspendCustomerCommandHandler,
    ReactivateCustomerCommandHandler,
    CreateSalesOrderCommandHandler,
    AddSalesOrderLineCommandHandler,
    RemoveSalesOrderLineCommandHandler,
    ConfirmSalesOrderCommandHandler,
    CancelSalesOrderCommandHandler,
    CompleteSalesOrderCommandHandler,
    CreateSalesQuotationCommandHandler,
    AddSalesQuotationLineCommandHandler,
    SubmitSalesQuotationCommandHandler,
    AcceptSalesQuotationCommandHandler,
    RejectSalesQuotationCommandHandler,
    CreateSalesInvoiceCommandHandler,
    AddSalesInvoiceLineCommandHandler,
    IssueSalesInvoiceCommandHandler,
    CancelSalesInvoiceCommandHandler
} from '../handlers/command-handlers';

import {
    GetCustomerByIdQueryHandler,
    GetCustomersQueryHandler,
    GetSalesOrderByIdQueryHandler,
    GetSalesOrdersQueryHandler,
    GetSalesQuotationByIdQueryHandler,
    GetSalesQuotationsQueryHandler,
    GetSalesInvoiceByIdQueryHandler,
    GetSalesInvoicesQueryHandler
} from '../handlers/query-handlers';

export class SalesApplicationService implements ISalesApplicationService {
    constructor(
        // Customer Handlers
        private readonly createCustomerHandler: CreateCustomerCommandHandler,
        private readonly updateCustomerHandler: UpdateCustomerCommandHandler,
        private readonly suspendCustomerHandler: SuspendCustomerCommandHandler,
        private readonly reactivateCustomerHandler: ReactivateCustomerCommandHandler,
        private readonly getCustomerByIdHandler: GetCustomerByIdQueryHandler,
        private readonly getCustomersHandler: GetCustomersQueryHandler,

        // Sales Order Handlers
        private readonly createSalesOrderHandler: CreateSalesOrderCommandHandler,
        private readonly addSalesOrderLineHandler: AddSalesOrderLineCommandHandler,
        private readonly removeSalesOrderLineHandler: RemoveSalesOrderLineCommandHandler,
        private readonly confirmSalesOrderHandler: ConfirmSalesOrderCommandHandler,
        private readonly cancelSalesOrderHandler: CancelSalesOrderCommandHandler,
        private readonly completeSalesOrderHandler: CompleteSalesOrderCommandHandler,
        private readonly getSalesOrderByIdHandler: GetSalesOrderByIdQueryHandler,
        private readonly getSalesOrdersHandler: GetSalesOrdersQueryHandler,

        // Sales Quotation Handlers
        private readonly createSalesQuotationHandler: CreateSalesQuotationCommandHandler,
        private readonly addSalesQuotationLineHandler: AddSalesQuotationLineCommandHandler,
        private readonly submitSalesQuotationHandler: SubmitSalesQuotationCommandHandler,
        private readonly acceptSalesQuotationHandler: AcceptSalesQuotationCommandHandler,
        private readonly rejectSalesQuotationHandler: RejectSalesQuotationCommandHandler,
        private readonly getSalesQuotationByIdHandler: GetSalesQuotationByIdQueryHandler,
        private readonly getSalesQuotationsHandler: GetSalesQuotationsQueryHandler,

        // Sales Invoice Handlers
        private readonly createSalesInvoiceHandler: CreateSalesInvoiceCommandHandler,
        private readonly addSalesInvoiceLineHandler: AddSalesInvoiceLineCommandHandler,
        private readonly issueSalesInvoiceHandler: IssueSalesInvoiceCommandHandler,
        private readonly cancelSalesInvoiceHandler: CancelSalesInvoiceCommandHandler,
        private readonly getSalesInvoiceByIdHandler: GetSalesInvoiceByIdQueryHandler,
        private readonly getSalesInvoicesHandler: GetSalesInvoicesQueryHandler
    ) {}

    // Customers
    createCustomer(command: CreateCustomerCommand): Promise<Result<string>> {
        return this.createCustomerHandler.handle(command);
    }
    updateCustomer(command: UpdateCustomerCommand): Promise<Result<void>> {
        return this.updateCustomerHandler.handle(command);
    }
    suspendCustomer(command: SuspendCustomerCommand): Promise<Result<void>> {
        return this.suspendCustomerHandler.handle(command);
    }
    reactivateCustomer(command: ReactivateCustomerCommand): Promise<Result<void>> {
        return this.reactivateCustomerHandler.handle(command);
    }
    getCustomerById(query: GetCustomerByIdQuery): Promise<Result<CustomerDto>> {
        return this.getCustomerByIdHandler.handle(query);
    }
    getCustomers(query: GetCustomersQuery): Promise<Result<readonly CustomerDto[]>> {
        return this.getCustomersHandler.handle(query);
    }

    // Sales Orders
    createSalesOrder(command: CreateSalesOrderCommand): Promise<Result<string>> {
        return this.createSalesOrderHandler.handle(command);
    }
    addSalesOrderLine(command: AddSalesOrderLineCommand): Promise<Result<void>> {
        return this.addSalesOrderLineHandler.handle(command);
    }
    removeSalesOrderLine(command: RemoveSalesOrderLineCommand): Promise<Result<void>> {
        return this.removeSalesOrderLineHandler.handle(command);
    }
    confirmSalesOrder(command: ConfirmSalesOrderCommand): Promise<Result<void>> {
        return this.confirmSalesOrderHandler.handle(command);
    }
    cancelSalesOrder(command: CancelSalesOrderCommand): Promise<Result<void>> {
        return this.cancelSalesOrderHandler.handle(command);
    }
    completeSalesOrder(command: CompleteSalesOrderCommand): Promise<Result<void>> {
        return this.completeSalesOrderHandler.handle(command);
    }
    getSalesOrderById(query: GetSalesOrderByIdQuery): Promise<Result<SalesOrderDto>> {
        return this.getSalesOrderByIdHandler.handle(query);
    }
    getSalesOrders(query: GetSalesOrdersQuery): Promise<Result<readonly SalesOrderDto[]>> {
        return this.getSalesOrdersHandler.handle(query);
    }

    // Sales Quotations
    createSalesQuotation(command: CreateSalesQuotationCommand): Promise<Result<string>> {
        return this.createSalesQuotationHandler.handle(command);
    }
    addSalesQuotationLine(command: AddSalesQuotationLineCommand): Promise<Result<void>> {
        return this.addSalesQuotationLineHandler.handle(command);
    }
    submitSalesQuotation(command: SubmitSalesQuotationCommand): Promise<Result<void>> {
        return this.submitSalesQuotationHandler.handle(command);
    }
    acceptSalesQuotation(command: AcceptSalesQuotationCommand): Promise<Result<void>> {
        return this.acceptSalesQuotationHandler.handle(command);
    }
    rejectSalesQuotation(command: RejectSalesQuotationCommand): Promise<Result<void>> {
        return this.rejectSalesQuotationHandler.handle(command);
    }
    getSalesQuotationById(query: GetSalesQuotationByIdQuery): Promise<Result<SalesQuotationDto>> {
        return this.getSalesQuotationByIdHandler.handle(query);
    }
    getSalesQuotations(query: GetSalesQuotationsQuery): Promise<Result<readonly SalesQuotationDto[]>> {
        return this.getSalesQuotationsHandler.handle(query);
    }

    // Sales Invoices
    createSalesInvoice(command: CreateSalesInvoiceCommand): Promise<Result<string>> {
        return this.createSalesInvoiceHandler.handle(command);
    }
    addSalesInvoiceLine(command: AddSalesInvoiceLineCommand): Promise<Result<void>> {
        return this.addSalesInvoiceLineHandler.handle(command);
    }
    issueSalesInvoice(command: IssueSalesInvoiceCommand): Promise<Result<void>> {
        return this.issueSalesInvoiceHandler.handle(command);
    }
    cancelSalesInvoice(command: CancelSalesInvoiceCommand): Promise<Result<void>> {
        return this.cancelSalesInvoiceHandler.handle(command);
    }
    getSalesInvoiceById(query: GetSalesInvoiceByIdQuery): Promise<Result<SalesInvoiceDto>> {
        return this.getSalesInvoiceByIdHandler.handle(query);
    }
    getSalesInvoices(query: GetSalesInvoicesQuery): Promise<Result<readonly SalesInvoiceDto[]>> {
        return this.getSalesInvoicesHandler.handle(query);
    }
}
