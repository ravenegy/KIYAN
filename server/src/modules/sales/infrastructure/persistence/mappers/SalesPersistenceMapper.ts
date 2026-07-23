import { 
    Customer, 
    CustomerStatus,
    SalesOrder, 
    SalesOrderStatus,
    SalesQuotation, 
    SalesQuotationStatus,
    SalesInvoice,
    SalesInvoiceStatus
} from '../../../domain/aggregates';
import { 
    CustomerId, 
    SalesOrderId, 
    SalesOrderLineId,
    SalesQuotationId, 
    SalesQuotationLineId,
    SalesInvoiceId, 
    SalesInvoiceLineId,
    Quantity, 
    Money, 
    Discount, 
    TaxRate 
} from '../../../domain/value-objects';
import { 
    SalesOrderLine, 
    SalesQuotationLine, 
    SalesInvoiceLine 
} from '../../../domain/entities';
import { 
    CustomerPersistenceModel, 
    SalesOrderPersistenceModel, 
    SalesOrderLinePersistenceModel,
    SalesQuotationPersistenceModel,
    SalesQuotationLinePersistenceModel,
    SalesInvoicePersistenceModel,
    SalesInvoiceLinePersistenceModel
} from '../models';

export class SalesPersistenceMapper {
    // --- Customer ---
    public toCustomerPersistence(customer: Customer): CustomerPersistenceModel {
        return {
            id: customer.id.value,
            name: customer.name,
            email: customer.email,
            status: customer.status,
            isEligibleForOrders: customer.isEligibleForOrders
        };
    }

    public toCustomerDomain(model: CustomerPersistenceModel): Customer {
        const customer = Customer.create(
            CustomerId.create(model.id),
            model.name,
            model.email
        );
        
        if (model.status === CustomerStatus.SUSPENDED) {
            customer.suspend();
        } else if (model.status === CustomerStatus.ACTIVE && customer.status === CustomerStatus.SUSPENDED) {
            customer.reactivate();
        }
        
        customer.clearDomainEvents();
        return customer;
    }

    // --- Sales Order ---
    public toSalesOrderPersistence(order: SalesOrder): SalesOrderPersistenceModel {
        return {
            id: order.id.value,
            customerId: order.customerId.value,
            status: order.status,
            currency: order.currency,
            totalAmount: order.getTotalAmount(),
            lines: order.lines.map(line => this.toSalesOrderLinePersistence(line))
        };
    }

    private toSalesOrderLinePersistence(line: SalesOrderLine): SalesOrderLinePersistenceModel {
        return {
            id: line.id.value,
            itemId: line.itemId,
            quantity: line.quantity.value,
            unitPrice: line.unitPrice.amount,
            currency: line.unitPrice.currency,
            discountPercentage: line.discount.percentage,
            taxRatePercentage: line.taxRate.percentage,
            totalAmount: line.totalAmount.amount
        };
    }

    public toSalesOrderDomain(model: SalesOrderPersistenceModel): SalesOrder {
        const order = SalesOrder.create(
            SalesOrderId.create(model.id),
            CustomerId.create(model.customerId),
            model.currency
        );

        model.lines.forEach(lineModel => {
            order.addLine(
                SalesOrderLineId.create(lineModel.id),
                lineModel.itemId,
                Quantity.create(lineModel.quantity),
                Money.create(lineModel.unitPrice, lineModel.currency),
                Discount.create(lineModel.discountPercentage),
                TaxRate.create(lineModel.taxRatePercentage)
            );
        });

        if (model.status === SalesOrderStatus.CONFIRMED) order.confirm();
        else if (model.status === SalesOrderStatus.COMPLETED) {
            order.confirm();
            order.complete();
        }
        else if (model.status === SalesOrderStatus.CANCELLED) {
            order.cancel('Cancelled from persistence state');
        }

        order.clearDomainEvents();
        return order;
    }

    // --- Sales Quotation ---
    public toSalesQuotationPersistence(quotation: SalesQuotation): SalesQuotationPersistenceModel {
        return {
            id: quotation.id.value,
            customerId: quotation.customerId.value,
            status: quotation.status,
            currency: quotation.currency,
            validUntil: quotation.validUntil.toISOString(),
            lines: quotation.lines.map(line => this.toSalesQuotationLinePersistence(line))
        };
    }

    private toSalesQuotationLinePersistence(line: SalesQuotationLine): SalesQuotationLinePersistenceModel {
        return {
            id: line.id.value,
            itemId: line.itemId,
            quantity: line.quantity.value,
            unitPrice: line.unitPrice.amount,
            currency: line.unitPrice.currency,
            discountPercentage: line.discount.percentage,
            totalAmount: line.totalAmount.amount
        };
    }

    public toSalesQuotationDomain(model: SalesQuotationPersistenceModel): SalesQuotation {
        const quotation = SalesQuotation.create(
            SalesQuotationId.create(model.id),
            CustomerId.create(model.customerId),
            new Date(model.validUntil),
            model.currency
        );

        model.lines.forEach(lineModel => {
            quotation.addLine(
                SalesQuotationLineId.create(lineModel.id),
                lineModel.itemId,
                Quantity.create(lineModel.quantity),
                Money.create(lineModel.unitPrice, lineModel.currency),
                Discount.create(lineModel.discountPercentage)
            );
        });

        if (model.status === SalesQuotationStatus.SUBMITTED) quotation.submit();
        else if (model.status === SalesQuotationStatus.ACCEPTED) {
            quotation.submit();
            quotation.accept();
        }
        else if (model.status === SalesQuotationStatus.REJECTED) {
            quotation.submit();
            quotation.reject();
        }

        quotation.clearDomainEvents();
        return quotation;
    }

    // --- Sales Invoice ---
    public toSalesInvoicePersistence(invoice: SalesInvoice): SalesInvoicePersistenceModel {
        return {
            id: invoice.id.value,
            salesOrderId: invoice.salesOrderId.value,
            customerId: invoice.customerId.value,
            status: invoice.status,
            currency: invoice.currency,
            issuedAt: invoice.issuedAt ? invoice.issuedAt.toISOString() : null,
            dueDate: invoice.dueDate.toISOString(),
            totalAmount: invoice.getTotalAmount(),
            lines: invoice.lines.map(line => this.toSalesInvoiceLinePersistence(line))
        };
    }

    private toSalesInvoiceLinePersistence(line: SalesInvoiceLine): SalesInvoiceLinePersistenceModel {
        return {
            id: line.id.value,
            itemId: line.itemId,
            description: line.description,
            quantity: line.quantity.value,
            unitPrice: line.unitPrice.amount,
            currency: line.unitPrice.currency,
            taxRatePercentage: line.taxRate.percentage,
            totalAmount: line.totalAmount.amount
        };
    }

    public toSalesInvoiceDomain(model: SalesInvoicePersistenceModel): SalesInvoice {
        const invoice = SalesInvoice.create(
            SalesInvoiceId.create(model.id),
            SalesOrderId.create(model.salesOrderId),
            CustomerId.create(model.customerId),
            new Date(model.dueDate),
            model.currency
        );

        model.lines.forEach(lineModel => {
            invoice.addLine(
                SalesInvoiceLineId.create(lineModel.id),
                lineModel.itemId,
                lineModel.description,
                Quantity.create(lineModel.quantity),
                Money.create(lineModel.unitPrice, lineModel.currency),
                TaxRate.create(lineModel.taxRatePercentage)
            );
        });

        if (model.status === SalesInvoiceStatus.ISSUED) {
            invoice.issue();
        } else if (model.status === SalesInvoiceStatus.CANCELLED) {
            invoice.cancel();
        }

        invoice.clearDomainEvents();
        return invoice;
    }
}
