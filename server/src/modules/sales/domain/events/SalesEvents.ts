import { DomainEvent } from '../../../../core/domain/events/DomainEvent';
import { 
    SalesOrderId, 
    CustomerId, 
    SalesQuotationId, 
    SalesInvoiceId 
} from '../value-objects';
import crypto from 'crypto';

export class SalesOrderCreatedEvent extends DomainEvent {
    constructor(
        public readonly salesOrderId: SalesOrderId,
        public readonly customerId: CustomerId,
        public readonly totalAmount: number
    ) {
        super(crypto.randomUUID(), 'SalesOrderCreatedEvent', new Date(), salesOrderId.value, 'SalesOrder', 1);
    }
}

export class SalesOrderConfirmedEvent extends DomainEvent {
    constructor(public readonly salesOrderId: SalesOrderId) {
        super(crypto.randomUUID(), 'SalesOrderConfirmedEvent', new Date(), salesOrderId.value, 'SalesOrder', 1);
    }
}

export class SalesOrderCancelledEvent extends DomainEvent {
    constructor(public readonly salesOrderId: SalesOrderId, public readonly reason: string) {
        super(crypto.randomUUID(), 'SalesOrderCancelledEvent', new Date(), salesOrderId.value, 'SalesOrder', 1);
    }
}

export class SalesOrderCompletedEvent extends DomainEvent {
    constructor(public readonly salesOrderId: SalesOrderId) {
        super(crypto.randomUUID(), 'SalesOrderCompletedEvent', new Date(), salesOrderId.value, 'SalesOrder', 1);
    }
}

export class SalesQuotationCreatedEvent extends DomainEvent {
    constructor(
        public readonly quotationId: SalesQuotationId,
        public readonly customerId: CustomerId
    ) {
        super(crypto.randomUUID(), 'SalesQuotationCreatedEvent', new Date(), quotationId.value, 'SalesQuotation', 1);
    }
}

export class SalesQuotationAcceptedEvent extends DomainEvent {
    constructor(public readonly quotationId: SalesQuotationId) {
        super(crypto.randomUUID(), 'SalesQuotationAcceptedEvent', new Date(), quotationId.value, 'SalesQuotation', 1);
    }
}

export class SalesInvoiceIssuedEvent extends DomainEvent {
    constructor(
        public readonly invoiceId: SalesInvoiceId,
        public readonly salesOrderId: SalesOrderId,
        public readonly totalAmount: number
    ) {
        super(crypto.randomUUID(), 'SalesInvoiceIssuedEvent', new Date(), invoiceId.value, 'SalesInvoice', 1);
    }
}

export class CustomerCreatedEvent extends DomainEvent {
    constructor(
        public readonly customerId: CustomerId,
        public readonly name: string
    ) {
        super(crypto.randomUUID(), 'CustomerCreatedEvent', new Date(), customerId.value, 'Customer', 1);
    }
}

export class CustomerSuspendedEvent extends DomainEvent {
    constructor(public readonly customerId: CustomerId) {
        super(crypto.randomUUID(), 'CustomerSuspendedEvent', new Date(), customerId.value, 'Customer', 1);
    }
}
