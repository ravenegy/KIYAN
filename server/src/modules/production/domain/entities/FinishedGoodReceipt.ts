import { Entity } from '../../../../core/domain/entities/Entity';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';
import { FinishedGoodReceiptId } from '../shared/FinishedGoodReceiptId';
import { Quantity } from '../value-objects/Quantity';
import { ReceiptStatus } from '../enums/ReceiptStatus';

export class FinishedGoodReceipt extends Entity<FinishedGoodReceiptId> {
  private _itemId: string;
  private _quantity: Quantity;
  private _status: ReceiptStatus;

  private constructor(
    id: FinishedGoodReceiptId,
    itemId: string,
    quantity: Quantity,
    status: ReceiptStatus,
    createdAt?: Date,
    version?: number
  ) {
    super(id, createdAt, version);
    this._itemId = itemId;
    this._quantity = quantity;
    this._status = status;
  }

  public get itemId(): string { return this._itemId; }
  public get quantity(): Quantity { return this._quantity; }
  public get status(): ReceiptStatus { return this._status; }

  public static create(
    id: FinishedGoodReceiptId,
    itemId: string,
    quantity: Quantity
  ): Result<FinishedGoodReceipt> {
    if (!itemId || itemId.trim().length === 0) {
      return ResultFactory.validation<FinishedGoodReceipt>('Item ID cannot be empty.');
    }
    
    if (quantity.amount <= 0) {
      return ResultFactory.validation<FinishedGoodReceipt>('Receipt quantity must be greater than zero.');
    }
    
    return ResultFactory.success(
      new FinishedGoodReceipt(
        id,
        itemId,
        quantity,
        ReceiptStatus.Received
      )
    );
  }

  public load(
    itemId: string,
    quantity: Quantity,
    status: ReceiptStatus
  ): void {
    this._itemId = itemId;
    this._quantity = quantity;
    this._status = status;
  }
}
