import { Money, Quantity } from '../value-objects';

export class PurchaseOrderLine {
    private _receivedQuantity: Quantity;

    constructor(
        private readonly _id: string,
        private readonly _itemId: string,
        private _quantity: Quantity,
        private _unitPrice: Money,
        private _expectedDeliveryDate: Date
    ) {
        this._receivedQuantity = new Quantity(0);
    }

    get id(): string { return this._id; }
    get itemId(): string { return this._itemId; }
    get quantity(): Quantity { return this._quantity; }
    get unitPrice(): Money { return this._unitPrice; }
    get expectedDeliveryDate(): Date { return this._expectedDeliveryDate; }
    get receivedQuantity(): Quantity { return this._receivedQuantity; }

    public getTotalAmount(): Money {
        return this._unitPrice.multiply(this._quantity.value);
    }

    public receiveQuantity(quantityToReceive: Quantity): void {
        this._receivedQuantity = this._receivedQuantity.add(quantityToReceive);
    }

    public isFullyReceived(): boolean {
        return this._receivedQuantity.value >= this._quantity.value;
    }
}
