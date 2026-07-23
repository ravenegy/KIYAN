import { 
    CreateCustomerCommand, 
    CreateSalesOrderCommand, 
    CreateSalesQuotationCommand, 
    CreateSalesInvoiceCommand 
} from '../commands';

// A simple validation facade. In a real system, we might use Zod or Joi here.
export class SalesCommandValidators {
    static validateCreateCustomer(command: CreateCustomerCommand): void {
        if (!command.name || command.name.trim() === '') {
            throw new Error('Customer name is required');
        }
        if (!command.email || command.email.trim() === '') {
            throw new Error('Customer email is required');
        }
    }

    static validateCreateSalesOrder(command: CreateSalesOrderCommand): void {
        if (!command.customerId) {
            throw new Error('Customer ID is required');
        }
        if (!command.currency) {
            throw new Error('Currency is required');
        }
    }

    static validateCreateSalesQuotation(command: CreateSalesQuotationCommand): void {
        if (!command.customerId) {
            throw new Error('Customer ID is required');
        }
        if (!command.validUntil) {
            throw new Error('Valid Until date is required');
        }
        if (!command.currency) {
            throw new Error('Currency is required');
        }
    }

    static validateCreateSalesInvoice(command: CreateSalesInvoiceCommand): void {
        if (!command.salesOrderId) {
            throw new Error('Sales Order ID is required');
        }
        if (!command.customerId) {
            throw new Error('Customer ID is required');
        }
        if (!command.dueDate) {
            throw new Error('Due date is required');
        }
        if (!command.currency) {
            throw new Error('Currency is required');
        }
    }
}
