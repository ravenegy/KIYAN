import { SalesPersistenceMapper } from '../persistence/mappers/SalesPersistenceMapper';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { SalesOrderRepository } from '../repositories/SalesOrderRepository';
import { SalesQuotationRepository } from '../repositories/SalesQuotationRepository';
import { SalesInvoiceRepository } from '../repositories/SalesInvoiceRepository';

export class SalesRepositoryFactory {
    private readonly mapper: SalesPersistenceMapper;
    
    // We instantiate them once to act as singletons for our in-memory store.
    private readonly customerRepo: CustomerRepository;
    private readonly orderRepo: SalesOrderRepository;
    private readonly quotationRepo: SalesQuotationRepository;
    private readonly invoiceRepo: SalesInvoiceRepository;

    constructor() {
        this.mapper = new SalesPersistenceMapper();
        this.customerRepo = new CustomerRepository(this.mapper);
        this.orderRepo = new SalesOrderRepository(this.mapper);
        this.quotationRepo = new SalesQuotationRepository(this.mapper);
        this.invoiceRepo = new SalesInvoiceRepository(this.mapper);
    }

    createCustomerRepository(): CustomerRepository {
        return this.customerRepo;
    }

    createSalesOrderRepository(): SalesOrderRepository {
        return this.orderRepo;
    }

    createSalesQuotationRepository(): SalesQuotationRepository {
        return this.quotationRepo;
    }

    createSalesInvoiceRepository(): SalesInvoiceRepository {
        return this.invoiceRepo;
    }
}
