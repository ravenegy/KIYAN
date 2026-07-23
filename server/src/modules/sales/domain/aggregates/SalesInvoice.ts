import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { SalesInvoiceLine } from '../entities';
import { SalesInvoiceId, SalesOrderId, CustomerId, SalesInvoiceLineId, Quantity, Money, TaxRate } from '../value-objects';
import { SalesInvoiceIssuedEvent } from '../events';
import { SalesInvoiceAlreadyIssuedException } from '../exceptions';

export enum SalesInvoiceStatus {
    DRAFT = 'DRAFT',
    ISSUED = 'ISSUED',
    CANCELLED = 'CANCELLED'
}

export class SalesInvoice extends AggregateRoot<SalesInvoiceId> {
    private _salesOrderId: SalesOrderId;
    private _customerId: CustomerId;
    private _status: SalesInvoiceStatus;
    private _lines: SalesInvoiceLine[] = [];
    private _currency: string;
    private _issuedAt: Date | null = null;
    private _dueDate: Date;

    private constructor(
        id: SalesInvoiceId,
        salesOrderId: SalesOrderId,
        customerId: CustomerId,
        dueDate: Date,
        currency: string = 'USD'
    ) {
        super(id);
        this._salesOrderId = salesOrderId;
        this._customerId = customerId;
        this._dueDate = dueDate;
        this._currency = currency;
        this._status = SalesInvoiceStatus.DRAFT;
    }

    public static create(
        id: SalesInvoiceId,
        salesOrderId: SalesOrderId,
        customerId: CustomerId,
        dueDate: Date,
        currency: string = 'USD'
    ): SalesInvoice {
        return new SalesInvoice(id, salesOrderId, customerId, dueDate, currency);
    }

    public get salesOrderId(): SalesOrderId {
        return this._salesOrderId;
    }

    public get customerId(): CustomerId {
        return this._customerId;
    }

    public get status(): SalesInvoiceStatus {
        return this._status;
    }

    public get currency(): string {
        return this._currency;
    }

    public get issuedAt(): Date | null {
        return this._issuedAt;
    }

    public get dueDate(): Date {
        return this._dueDate;
    }

    public get lines(): ReadonlyArray<SalesInvoiceLine> {
        return [...this._lines];
    }

    public addLine(
        lineId: SalesInvoiceLineId,
        itemId: string,
        description: string,
        quantity: Quantity,
        unitPrice: Money,
        taxRate: TaxRate
    ): void {
        if (this._status !== SalesInvoiceStatus.DRAFT) {
            throw new Error('Can only add lines to draft invoices.');
        }
        if (unitPrice.currency !== this._currency) {
            throw new Error('Line item currency must match invoice currency.');
        }
        const line = SalesInvoiceLine.create(lineId, itemId, description, quantity, unitPrice, taxRate);
        this._lines.push(line);
    }

    public getTotalAmount(): number {
        if (this._lines.length === 0) {
            return 0;
        }
        const initial = Money.create(0, this._currency);
        return this._lines.reduce((total, line) => total.add(line.totalAmount), initial).amount;
    }

    public issue(): void {
        if (this._status === SalesInvoiceStatus.ISSUED) {
            throw new SalesInvoiceAlreadyIssuedException(this.id.value);
        }
        if (this._status === SalesInvoiceStatus.CANCELLED) {
            throw new Error('Cannot issue a cancelled invoice.');
        }
        if (this._lines.length === 0) {
            throw new Error('Cannot issue an empty invoice.');
        }

        this._status = SalesInvoiceStatus.ISSUED;
        this._issuedAt = new Date();
        this.addDomainEvent(new SalesInvoiceIssuedEvent(this.id, this._salesOrderId, this.getTotalAmount()));
    }

    public cancel(): void {
        if (this._status === SalesInvoiceStatus.ISSUED) {
            throw new Error('Cannot cancel an invoice that has already been issued.');
        }
        this._status = SalesInvoiceStatus.CANCELLED;
    }
}
