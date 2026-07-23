import { Result } from '../../../../core/results/Result';
import { CustomerDto, SalesOrderDto, SalesQuotationDto, SalesInvoiceDto } from '../dto/SalesDtos';
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

export interface ISalesApplicationService {
    // Customers
    createCustomer(command: CreateCustomerCommand): Promise<Result<string>>;
    updateCustomer(command: UpdateCustomerCommand): Promise<Result<void>>;
    suspendCustomer(command: SuspendCustomerCommand): Promise<Result<void>>;
    reactivateCustomer(command: ReactivateCustomerCommand): Promise<Result<void>>;
    getCustomerById(query: GetCustomerByIdQuery): Promise<Result<CustomerDto>>;
    getCustomers(query: GetCustomersQuery): Promise<Result<readonly CustomerDto[]>>;

    // Sales Orders
    createSalesOrder(command: CreateSalesOrderCommand): Promise<Result<string>>;
    addSalesOrderLine(command: AddSalesOrderLineCommand): Promise<Result<void>>;
    removeSalesOrderLine(command: RemoveSalesOrderLineCommand): Promise<Result<void>>;
    confirmSalesOrder(command: ConfirmSalesOrderCommand): Promise<Result<void>>;
    cancelSalesOrder(command: CancelSalesOrderCommand): Promise<Result<void>>;
    completeSalesOrder(command: CompleteSalesOrderCommand): Promise<Result<void>>;
    getSalesOrderById(query: GetSalesOrderByIdQuery): Promise<Result<SalesOrderDto>>;
    getSalesOrders(query: GetSalesOrdersQuery): Promise<Result<readonly SalesOrderDto[]>>;

    // Sales Quotations
    createSalesQuotation(command: CreateSalesQuotationCommand): Promise<Result<string>>;
    addSalesQuotationLine(command: AddSalesQuotationLineCommand): Promise<Result<void>>;
    submitSalesQuotation(command: SubmitSalesQuotationCommand): Promise<Result<void>>;
    acceptSalesQuotation(command: AcceptSalesQuotationCommand): Promise<Result<void>>;
    rejectSalesQuotation(command: RejectSalesQuotationCommand): Promise<Result<void>>;
    getSalesQuotationById(query: GetSalesQuotationByIdQuery): Promise<Result<SalesQuotationDto>>;
    getSalesQuotations(query: GetSalesQuotationsQuery): Promise<Result<readonly SalesQuotationDto[]>>;

    // Sales Invoices
    createSalesInvoice(command: CreateSalesInvoiceCommand): Promise<Result<string>>;
    addSalesInvoiceLine(command: AddSalesInvoiceLineCommand): Promise<Result<void>>;
    issueSalesInvoice(command: IssueSalesInvoiceCommand): Promise<Result<void>>;
    cancelSalesInvoice(command: CancelSalesInvoiceCommand): Promise<Result<void>>;
    getSalesInvoiceById(query: GetSalesInvoiceByIdQuery): Promise<Result<SalesInvoiceDto>>;
    getSalesInvoices(query: GetSalesInvoicesQuery): Promise<Result<readonly SalesInvoiceDto[]>>;
}
