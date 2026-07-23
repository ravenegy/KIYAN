import { PurchaseOrderId, SupplierId } from '../shared';
import { PurchaseOrderLine } from './PurchaseOrderLine';
import { PurchaseOrderStatus, ApprovalStatus } from '../enums';
import { Money, Quantity } from '../value-objects';
import { 
    InvalidPurchaseOrderStatusException, 
    PurchaseOrderWithoutLinesException 
} from '../exceptions/PurchasingExceptions';
import { 
    PurchaseOrderCreatedEvent, 
    PurchaseOrderApprovedEvent, 
    PurchaseOrderIssuedEvent 
} from '../events/PurchasingEvents';

export class PurchaseOrder {
    private readonly _domainEvents: any[] = [];
    private _lines: PurchaseOrderLine[] = [];
    private _status: PurchaseOrderStatus = PurchaseOrderStatus.Draft;
    private _approvalStatus: ApprovalStatus = ApprovalStatus.Pending;

    constructor(
        private readonly _id: PurchaseOrderId,
        private readonly _supplierId: SupplierId,
        private _expectedDeliveryDate: Date,
        private _notes: string = ''
    ) {}

    get id(): PurchaseOrderId { return this._id; }
    get supplierId(): SupplierId { return this._supplierId; }
    get expectedDeliveryDate(): Date { return this._expectedDeliveryDate; }
    get notes(): string { return this._notes; }
    get status(): PurchaseOrderStatus { return this._status; }
    get approvalStatus(): ApprovalStatus { return this._approvalStatus; }
    get lines(): ReadonlyArray<PurchaseOrderLine> { return this._lines; }
    get domainEvents(): ReadonlyArray<any> { return this._domainEvents; }

    public addLine(itemId: string, quantity: number, unitPrice: number, expectedDeliveryDate: Date): void {
        if (this._status !== PurchaseOrderStatus.Draft) {
            throw new InvalidPurchaseOrderStatusException(this._id.value, this._status, PurchaseOrderStatus.Draft);
        }
        
        const line = new PurchaseOrderLine(
            `${this._id.value}-${this._lines.length + 1}`,
            itemId,
            new Quantity(quantity),
            new Money(unitPrice),
            expectedDeliveryDate
        );
        
        this._lines.push(line);
    }

    public getTotalAmount(): Money {
        return this._lines.reduce(
            (total, line) => total.add(line.getTotalAmount()), 
            new Money(0)
        );
    }

    public submitForApproval(): void {
        if (this._status !== PurchaseOrderStatus.Draft) {
            throw new InvalidPurchaseOrderStatusException(this._id.value, this._status, PurchaseOrderStatus.Draft);
        }
        if (this._lines.length === 0) {
            throw new PurchaseOrderWithoutLinesException(this._id.value);
        }

        this._status = PurchaseOrderStatus.PendingApproval;
        this._domainEvents.push(new PurchaseOrderCreatedEvent(
            this._id.value, 
            this._supplierId.value, 
            this.getTotalAmount().amount
        ));
    }

    public approve(approvedBy: string): void {
        if (this._status !== PurchaseOrderStatus.PendingApproval) {
            throw new InvalidPurchaseOrderStatusException(this._id.value, this._status, PurchaseOrderStatus.PendingApproval);
        }

        this._status = PurchaseOrderStatus.Approved;
        this._approvalStatus = ApprovalStatus.Approved;
        this._domainEvents.push(new PurchaseOrderApprovedEvent(this._id.value, approvedBy));
    }


    public reject(): void {
        if (this._status !== PurchaseOrderStatus.PendingApproval) {
            throw new InvalidPurchaseOrderStatusException(this._id.value, this._status, PurchaseOrderStatus.PendingApproval);
        }

        this._status = PurchaseOrderStatus.Rejected;
        this._approvalStatus = ApprovalStatus.Rejected;
    }

    public issue(): void {
        if (this._status !== PurchaseOrderStatus.Approved) {
            throw new InvalidPurchaseOrderStatusException(this._id.value, this._status, PurchaseOrderStatus.Approved);
        }

        this._status = PurchaseOrderStatus.Issued;
        this._domainEvents.push(new PurchaseOrderIssuedEvent(this._id.value, this._supplierId.value));
    }

    public receiveGoods(lineId: string, quantity: number): void {
        if (this._status !== PurchaseOrderStatus.Issued && this._status !== PurchaseOrderStatus.PartiallyReceived) {
            throw new InvalidPurchaseOrderStatusException(this._id.value, this._status, PurchaseOrderStatus.Issued);
        }

        const line = this._lines.find(l => l.id === lineId);
        if (!line) {
            throw new Error(`Line ${lineId} not found in order ${this._id.value}`);
        }

        line.receiveQuantity(new Quantity(quantity));
        this._status = this.checkIfFullyReceived() ? PurchaseOrderStatus.Received : PurchaseOrderStatus.PartiallyReceived;
    }

    private checkIfFullyReceived(): boolean {
        return this._lines.every(line => line.isFullyReceived());
    }

    public clearDomainEvents(): void {
        this._domainEvents.length = 0;
    }
}
