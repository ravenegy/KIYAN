import { Customer, SalesOrder, SalesQuotation, SalesInvoice } from '../../domain/aggregates';
import { CustomerDto, SalesOrderDto, SalesOrderLineDto, SalesQuotationDto, SalesQuotationLineDto, SalesInvoiceDto, SalesInvoiceLineDto } from '../dto/SalesDtos';
import { SalesOrderLine, SalesQuotationLine, SalesInvoiceLine } from '../../domain/entities';

export class SalesMappers {
    public static toCustomerDto(customer: Customer): CustomerDto {
        return {
            id: customer.id.value,
            name: customer.name,
            email: customer.email,
            status: customer.status,
            isEligibleForOrders: customer.isEligibleForOrders
        };
    }

    public static toSalesOrderDto(order: SalesOrder): SalesOrderDto {
        return {
            id: order.id.value,
            customerId: order.customerId.value,
            status: order.status,
            currency: order.currency,
            totalAmount: order.getTotalAmount(),
            lines: order.lines.map(SalesMappers.toSalesOrderLineDto)
        };
    }

    private static toSalesOrderLineDto(line: SalesOrderLine): SalesOrderLineDto {
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

    public static toSalesQuotationDto(quotation: SalesQuotation): SalesQuotationDto {
        return {
            id: quotation.id.value,
            customerId: quotation.customerId.value,
            status: quotation.status,
            currency: quotation.currency,
            validUntil: quotation.validUntil.toISOString(),
            lines: quotation.lines.map(SalesMappers.toSalesQuotationLineDto)
        };
    }

    private static toSalesQuotationLineDto(line: SalesQuotationLine): SalesQuotationLineDto {
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

    public static toSalesInvoiceDto(invoice: SalesInvoice): SalesInvoiceDto {
        return {
            id: invoice.id.value,
            salesOrderId: invoice.salesOrderId.value,
            customerId: invoice.customerId.value,
            status: invoice.status,
            currency: invoice.currency,
            issuedAt: invoice.issuedAt ? invoice.issuedAt.toISOString() : null,
            dueDate: invoice.dueDate.toISOString(),
            totalAmount: invoice.getTotalAmount(),
            lines: invoice.lines.map(SalesMappers.toSalesInvoiceLineDto)
        };
    }

    private static toSalesInvoiceLineDto(line: SalesInvoiceLine): SalesInvoiceLineDto {
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
}
