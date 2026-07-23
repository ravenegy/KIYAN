import { CustomerDto, SalesOrderDto, SalesQuotationDto, SalesInvoiceDto } from '../dto/SalesDtos';

export interface ISalesQueryService {
    getCustomers(status?: string): Promise<readonly CustomerDto[]>;
    getCustomerById(customerId: string): Promise<CustomerDto | null>;
    
    getSalesOrders(customerId?: string, status?: string): Promise<readonly SalesOrderDto[]>;
    getSalesOrderById(orderId: string): Promise<SalesOrderDto | null>;
    
    getSalesQuotations(customerId?: string, status?: string): Promise<readonly SalesQuotationDto[]>;
    getSalesQuotationById(quotationId: string): Promise<SalesQuotationDto | null>;
    
    getSalesInvoices(salesOrderId?: string, customerId?: string, status?: string): Promise<readonly SalesInvoiceDto[]>;
    getSalesInvoiceById(invoiceId: string): Promise<SalesInvoiceDto | null>;
}
