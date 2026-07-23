import { QuotationId, RfqId, SupplierId } from '../shared';
import { QuotationStatus } from '../enums';
import { Money } from '../value-objects';
import { QuotationExpiredException } from '../exceptions';

export class Quotation {
    private _status: QuotationStatus = QuotationStatus.Pending;

    constructor(
        private readonly _id: QuotationId,
        private readonly _rfqId: RfqId,
        private readonly _supplierId: SupplierId,
        private _unitPrice: Money,
        private _leadTimeDays: number,
        private _validUntil: Date
    ) {}

    get id(): QuotationId { return this._id; }
    get rfqId(): RfqId { return this._rfqId; }
    get supplierId(): SupplierId { return this._supplierId; }
    get unitPrice(): Money { return this._unitPrice; }
    get leadTimeDays(): number { return this._leadTimeDays; }
    get validUntil(): Date { return this._validUntil; }
    get status(): QuotationStatus { return this._status; }

    public accept(): void {
        this.checkExpiration();
        this._status = QuotationStatus.Accepted;
    }

    public reject(): void {
        this._status = QuotationStatus.Rejected;
    }

    private checkExpiration(): void {
        if (new Date() > this._validUntil) {
            this._status = QuotationStatus.Expired;
            throw new QuotationExpiredException(this._id.value);
        }
    }
}
