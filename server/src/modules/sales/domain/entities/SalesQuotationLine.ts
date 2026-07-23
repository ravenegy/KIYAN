import { Entity } from '../../../../core/domain/entities/Entity';
import { SalesQuotationLineId, Money, Quantity, Discount } from '../value-objects';

export class SalesQuotationLine extends Entity<SalesQuotationLineId> {
    private _itemId: string;
    private _quantity: Quantity;
    private _unitPrice: Money;
    private _discount: Discount;

    private constructor(
        id: SalesQuotationLineId,
        itemId: string,
        quantity: Quantity,
        unitPrice: Money,
        discount: Discount
    ) {
        super(id);
        this._itemId = itemId;
        this._quantity = quantity;
        this._unitPrice = unitPrice;
        this._discount = discount;
    }

    public static create(
        id: SalesQuotationLineId,
        itemId: string,
        quantity: Quantity,
        unitPrice: Money,
        discount: Discount
    ): SalesQuotationLine {
        return new SalesQuotationLine(id, itemId, quantity, unitPrice, discount);
    }

    public get itemId(): string {
        return this._itemId;
    }

    public get quantity(): Quantity {
        return this._quantity;
    }

    public get unitPrice(): Money {
        return this._unitPrice;
    }

    public get discount(): Discount {
        return this._discount;
    }

    public get totalAmount(): Money {
        const grossAmount = this._unitPrice.multiply(this._quantity.value);
        return this._discount.applyTo(grossAmount);
    }
}
