import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import crypto from 'crypto';

export class CustomerId extends StronglyTypedId<string> {
    private constructor(value: string) {
        super(value);
    }
    public static create(value?: string): CustomerId {
        return new CustomerId(value || crypto.randomUUID());
    }
}

export class SalesOrderId extends StronglyTypedId<string> {
    private constructor(value: string) {
        super(value);
    }
    public static create(value?: string): SalesOrderId {
        return new SalesOrderId(value || crypto.randomUUID());
    }
}

export class SalesOrderLineId extends StronglyTypedId<string> {
    private constructor(value: string) {
        super(value);
    }
    public static create(value?: string): SalesOrderLineId {
        return new SalesOrderLineId(value || crypto.randomUUID());
    }
}

export class SalesQuotationId extends StronglyTypedId<string> {
    private constructor(value: string) {
        super(value);
    }
    public static create(value?: string): SalesQuotationId {
        return new SalesQuotationId(value || crypto.randomUUID());
    }
}

export class SalesQuotationLineId extends StronglyTypedId<string> {
    private constructor(value: string) {
        super(value);
    }
    public static create(value?: string): SalesQuotationLineId {
        return new SalesQuotationLineId(value || crypto.randomUUID());
    }
}

export class SalesInvoiceId extends StronglyTypedId<string> {
    private constructor(value: string) {
        super(value);
    }
    public static create(value?: string): SalesInvoiceId {
        return new SalesInvoiceId(value || crypto.randomUUID());
    }
}

export class SalesInvoiceLineId extends StronglyTypedId<string> {
    private constructor(value: string) {
        super(value);
    }
    public static create(value?: string): SalesInvoiceLineId {
        return new SalesInvoiceLineId(value || crypto.randomUUID());
    }
}
