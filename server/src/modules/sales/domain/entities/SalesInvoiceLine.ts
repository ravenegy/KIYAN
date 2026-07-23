import { Entity } from '../../../../core/domain/entities/Entity';
import { SalesInvoiceLineId, Money, Quantity, TaxRate } from '../value-objects';

export class SalesInvoiceLine extends Entity<SalesInvoiceLineId> {
    private _itemId: string;
    private _description: string;
    private _quantity: Quantity;
    private _unitPrice: Money;
    private _taxRate: TaxRate;

    private constructor(
        id: SalesInvoiceLineId,
        itemId: string,
        description: string,
        quantity: Quantity,
        unitPrice: Money,
        taxRate: TaxRate
    ) {
        super(id);
        this._itemId = itemId;
        this._description = description;
        this._quantity = quantity;
        this._unitPrice = unitPrice;
        this._taxRate = taxRate;
    }

    public static create(
        id: SalesInvoiceLineId,
        itemId: string,
        description: string,
        quantity: Quantity,
        unitPrice: Money,
        taxRate: TaxRate
    ): SalesInvoiceLine {
        return new SalesInvoiceLine(id, itemId, description, quantity, unitPrice, taxRate);
    }

    public get itemId(): string {
        return this._itemId;
    }

    public get description(): string {
        return this._description;
    }

    public get quantity(): Quantity {
        return this._quantity;
    }

    public get unitPrice(): Money {
        return this._unitPrice;
    }

    public get taxRate(): TaxRate {
        return this._taxRate;
    }

    public get totalAmount(): Money {
        const grossAmount = this._unitPrice.multiply(this._quantity.value);
        const taxAmount = this._taxRate.calculateTax(grossAmount);
        return grossAmount.add(taxAmount);
    }
}
