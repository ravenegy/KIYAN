import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { SalesQuotationLine } from '../entities';
import { SalesQuotationId, CustomerId, SalesQuotationLineId, Quantity, Money, Discount } from '../value-objects';
import { SalesQuotationCreatedEvent, SalesQuotationAcceptedEvent } from '../events';
import { SalesQuotationExpiredException } from '../exceptions';

export enum SalesQuotationStatus {
    DRAFT = 'DRAFT',
    SUBMITTED = 'SUBMITTED',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    EXPIRED = 'EXPIRED'
}

export class SalesQuotation extends AggregateRoot<SalesQuotationId> {
    private _customerId: CustomerId;
    private _status: SalesQuotationStatus;
    private _lines: SalesQuotationLine[] = [];
    private _currency: string;
    private _validUntil: Date;

    private constructor(id: SalesQuotationId, customerId: CustomerId, validUntil: Date, currency: string = 'USD') {
        super(id);
        this._customerId = customerId;
        this._validUntil = validUntil;
        this._currency = currency;
        this._status = SalesQuotationStatus.DRAFT;
    }

    public static create(id: SalesQuotationId, customerId: CustomerId, validUntil: Date, currency: string = 'USD'): SalesQuotation {
        const quotation = new SalesQuotation(id, customerId, validUntil, currency);
        quotation.addDomainEvent(new SalesQuotationCreatedEvent(id, customerId));
        return quotation;
    }

    public get customerId(): CustomerId {
        return this._customerId;
    }

    public get status(): SalesQuotationStatus {
        return this._status;
    }

    public get currency(): string {
        return this._currency;
    }

    public get validUntil(): Date {
        return this._validUntil;
    }

    public get lines(): ReadonlyArray<SalesQuotationLine> {
        return [...this._lines];
    }

    public addLine(
        lineId: SalesQuotationLineId,
        itemId: string,
        quantity: Quantity,
        unitPrice: Money,
        discount: Discount
    ): void {
        if (this._status !== SalesQuotationStatus.DRAFT) {
            throw new Error('Can only add lines to draft quotations.');
        }
        if (unitPrice.currency !== this._currency) {
            throw new Error('Line item currency must match quotation currency.');
        }
        const line = SalesQuotationLine.create(lineId, itemId, quantity, unitPrice, discount);
        this._lines.push(line);
    }

    public submit(): void {
        if (this._status !== SalesQuotationStatus.DRAFT) {
            throw new Error('Only draft quotations can be submitted.');
        }
        this._status = SalesQuotationStatus.SUBMITTED;
    }

    public accept(): void {
        if (this._status !== SalesQuotationStatus.SUBMITTED) {
            throw new Error('Only submitted quotations can be accepted.');
        }
        if (new Date() > this._validUntil) {
            this._status = SalesQuotationStatus.EXPIRED;
            throw new SalesQuotationExpiredException(this.id.value);
        }
        this._status = SalesQuotationStatus.ACCEPTED;
        this.addDomainEvent(new SalesQuotationAcceptedEvent(this.id));
    }

    public reject(): void {
        if (this._status !== SalesQuotationStatus.SUBMITTED) {
            throw new Error('Only submitted quotations can be rejected.');
        }
        this._status = SalesQuotationStatus.REJECTED;
    }

    public checkExpiration(): void {
        if (this._status === SalesQuotationStatus.SUBMITTED && new Date() > this._validUntil) {
            this._status = SalesQuotationStatus.EXPIRED;
        }
    }
}
