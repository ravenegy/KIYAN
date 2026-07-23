import { RfqId, SupplierId } from '../shared';
import { RfqStatus } from '../enums';
import { Quantity } from '../value-objects';
import { RfqPublishedEvent } from '../events';

export class RequestForQuotation {
    private readonly _domainEvents: any[] = [];
    private _status: RfqStatus = RfqStatus.Draft;
    private _targetSuppliers: SupplierId[] = [];

    constructor(
        private readonly _id: RfqId,
        private readonly _itemId: string,
        private readonly _requiredQuantity: Quantity,
        private readonly _requiredByDate: Date
    ) {}

    get id(): RfqId { return this._id; }
    get itemId(): string { return this._itemId; }
    get requiredQuantity(): Quantity { return this._requiredQuantity; }
    get requiredByDate(): Date { return this._requiredByDate; }
    get status(): RfqStatus { return this._status; }
    get targetSuppliers(): ReadonlyArray<SupplierId> { return this._targetSuppliers; }
    get domainEvents(): ReadonlyArray<any> { return this._domainEvents; }

    public addTargetSupplier(supplierId: SupplierId): void {
        if (this._status !== RfqStatus.Draft) {
            throw new Error('Cannot add suppliers to a non-draft RFQ');
        }
        if (!this._targetSuppliers.some(s => s.value === supplierId.value)) {
            this._targetSuppliers.push(supplierId);
        }
    }

    public publish(): void {
        if (this._status !== RfqStatus.Draft) {
            throw new Error('Cannot publish a non-draft RFQ');
        }
        if (this._targetSuppliers.length === 0) {
            throw new Error('RFQ must have at least one target supplier');
        }

        this._status = RfqStatus.Published;
        this._domainEvents.push(new RfqPublishedEvent(
            this._id.value,
            this._targetSuppliers.map(s => s.value)
        ));
    }

    public close(): void {
        this._status = RfqStatus.Closed;
    }

    public clearDomainEvents(): void {
        this._domainEvents.length = 0;
    }
}
