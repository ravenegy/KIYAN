import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { SalesOrderLine } from '../entities';
import { SalesOrderId, CustomerId, SalesOrderLineId, Quantity, Money, Discount, TaxRate } from '../value-objects';
import { SalesOrderCreatedEvent, SalesOrderConfirmedEvent, SalesOrderCancelledEvent, SalesOrderCompletedEvent } from '../events';
import { InvalidSalesOrderStateException, SalesOrderAlreadyConfirmedException } from '../exceptions';

export enum SalesOrderStatus {
    DRAFT = 'DRAFT',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

export class SalesOrder extends AggregateRoot<SalesOrderId> {
    private _customerId: CustomerId;
    private _status: SalesOrderStatus;
    private _lines: SalesOrderLine[] = [];
    private _currency: string;

    private constructor(id: SalesOrderId, customerId: CustomerId, currency: string = 'USD') {
        super(id);
        this._customerId = customerId;
        this._status = SalesOrderStatus.DRAFT;
        this._currency = currency;
    }

    public static create(id: SalesOrderId, customerId: CustomerId, currency: string = 'USD'): SalesOrder {
        const order = new SalesOrder(id, customerId, currency);
        order.addDomainEvent(new SalesOrderCreatedEvent(id, customerId, 0));
        return order;
    }

    public get customerId(): CustomerId {
        return this._customerId;
    }

    public get status(): SalesOrderStatus {
        return this._status;
    }

    public get currency(): string {
        return this._currency;
    }

    public get lines(): ReadonlyArray<SalesOrderLine> {
        return [...this._lines];
    }

    public addLine(
        lineId: SalesOrderLineId,
        itemId: string,
        quantity: Quantity,
        unitPrice: Money,
        discount: Discount,
        taxRate: TaxRate
    ): void {
        if (this._status !== SalesOrderStatus.DRAFT) {
            throw new InvalidSalesOrderStateException(this.id.value, this._status, 'Add Line');
        }
        if (unitPrice.currency !== this._currency) {
            throw new Error('Line item currency must match sales order currency.');
        }

        const existingLine = this._lines.find(l => l.itemId === itemId);
        if (existingLine) {
            existingLine.updateQuantity(existingLine.quantity.add(quantity));
        } else {
            const line = SalesOrderLine.create(lineId, itemId, quantity, unitPrice, discount, taxRate);
            this._lines.push(line);
        }
    }

    public removeLine(lineId: SalesOrderLineId): void {
        if (this._status !== SalesOrderStatus.DRAFT) {
            throw new InvalidSalesOrderStateException(this.id.value, this._status, 'Remove Line');
        }
        this._lines = this._lines.filter(l => !l.id.equals(lineId));
    }

    public getTotalAmount(): number {
        if (this._lines.length === 0) {
            return 0;
        }
        const initial = Money.create(0, this._currency);
        return this._lines.reduce((total, line) => total.add(line.totalAmount), initial).amount;
    }

    public confirm(): void {
        if (this._status === SalesOrderStatus.CONFIRMED) {
            throw new SalesOrderAlreadyConfirmedException(this.id.value);
        }
        if (this._status !== SalesOrderStatus.DRAFT) {
            throw new InvalidSalesOrderStateException(this.id.value, this._status, SalesOrderStatus.CONFIRMED);
        }
        if (this._lines.length === 0) {
            throw new Error('Cannot confirm an empty sales order.');
        }
        this._status = SalesOrderStatus.CONFIRMED;
        this.addDomainEvent(new SalesOrderConfirmedEvent(this.id));
    }

    public cancel(reason: string): void {
        if (this._status === SalesOrderStatus.CANCELLED || this._status === SalesOrderStatus.COMPLETED) {
            throw new InvalidSalesOrderStateException(this.id.value, this._status, SalesOrderStatus.CANCELLED);
        }
        this._status = SalesOrderStatus.CANCELLED;
        this.addDomainEvent(new SalesOrderCancelledEvent(this.id, reason));
    }

    public complete(): void {
        if (this._status !== SalesOrderStatus.CONFIRMED) {
            throw new InvalidSalesOrderStateException(this.id.value, this._status, SalesOrderStatus.COMPLETED);
        }
        this._status = SalesOrderStatus.COMPLETED;
        this.addDomainEvent(new SalesOrderCompletedEvent(this.id));
    }
}
