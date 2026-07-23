import { Entity } from '../../../../core/domain/entities/Entity';
import { SalesOrderLineId, Money, Quantity, Discount, TaxRate } from '../value-objects';

export class SalesOrderLine extends Entity<SalesOrderLineId> {
    private _itemId: string;
    private _quantity: Quantity;
    private _unitPrice: Money;
    private _discount: Discount;
    private _taxRate: TaxRate;

    private constructor(
        id: SalesOrderLineId,
        itemId: string,
        quantity: Quantity,
        unitPrice: Money,
        discount: Discount,
        taxRate: TaxRate
    ) {
        super(id);
        this._itemId = itemId;
        this._quantity = quantity;
        this._unitPrice = unitPrice;
        this._discount = discount;
        this._taxRate = taxRate;
    }

    public static create(
        id: SalesOrderLineId,
        itemId: string,
        quantity: Quantity,
        unitPrice: Money,
        discount: Discount,
        taxRate: TaxRate
    ): SalesOrderLine {
        return new SalesOrderLine(id, itemId, quantity, unitPrice, discount, taxRate);
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

    public get taxRate(): TaxRate {
        return this._taxRate;
    }

    public get totalAmount(): Money {
        const grossAmount = this._unitPrice.multiply(this._quantity.value);
        const amountAfterDiscount = this._discount.applyTo(grossAmount);
        const taxAmount = this._taxRate.calculateTax(amountAfterDiscount);
        return amountAfterDiscount.add(taxAmount);
    }

    public updateQuantity(newQuantity: Quantity): void {
        this._quantity = newQuantity;
    }

    public updateDiscount(newDiscount: Discount): void {
        this._discount = newDiscount;
    }
}
