import { DomainException } from '../../../../core/domain/exceptions/DomainException';

export class SalesOrderAlreadyConfirmedException extends DomainException {
    constructor(orderId: string) {
        super(`Sales order ${orderId} is already confirmed.`);
    }
}

export class InvalidSalesOrderStateException extends DomainException {
    constructor(orderId: string, currentState: string, desiredState: string) {
        super(`Cannot transition sales order ${orderId} from ${currentState} to ${desiredState}.`);
    }
}

export class CustomerNotEligibleException extends DomainException {
    constructor(customerId: string, reason: string) {
        super(`Customer ${customerId} is not eligible: ${reason}`);
    }
}

export class SalesQuotationExpiredException extends DomainException {
    constructor(quotationId: string) {
        super(`Sales quotation ${quotationId} has expired.`);
    }
}

export class SalesInvoiceAlreadyIssuedException extends DomainException {
    constructor(invoiceId: string) {
        super(`Sales invoice ${invoiceId} has already been issued.`);
    }
}
