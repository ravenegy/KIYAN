import { Entity } from '../../../../core/domain/entities/Entity';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';
import { MaterialIssueId } from '../shared/MaterialIssueId';
import { Quantity } from '../value-objects/Quantity';
import { MaterialIssueStatus } from '../enums/MaterialIssueStatus';
import { ProductionExceptions } from '../exceptions/ProductionExceptions';

export class ProductionMaterialIssue extends Entity<MaterialIssueId> {
  private _itemId: string;
  private _requiredQuantity: Quantity;
  private _issuedQuantity: Quantity;
  private _status: MaterialIssueStatus;

  private constructor(
    id: MaterialIssueId,
    itemId: string,
    requiredQuantity: Quantity,
    issuedQuantity: Quantity,
    status: MaterialIssueStatus,
    createdAt?: Date,
    version?: number
  ) {
    super(id, createdAt, version);
    this._itemId = itemId;
    this._requiredQuantity = requiredQuantity;
    this._issuedQuantity = issuedQuantity;
    this._status = status;
  }

  public get itemId(): string { return this._itemId; }
  public get requiredQuantity(): Quantity { return this._requiredQuantity; }
  public get issuedQuantity(): Quantity { return this._issuedQuantity; }
  public get status(): MaterialIssueStatus { return this._status; }

  public static create(
    id: MaterialIssueId,
    itemId: string,
    requiredQuantity: Quantity
  ): Result<ProductionMaterialIssue> {
    if (!itemId || itemId.trim().length === 0) {
      return ResultFactory.validation<ProductionMaterialIssue>('Item ID cannot be empty.');
    }
    
    return ResultFactory.success(
      new ProductionMaterialIssue(
        id,
        itemId,
        requiredQuantity,
        Quantity.create(0).value!,
        MaterialIssueStatus.Pending
      )
    );
  }

  public load(
    itemId: string,
    requiredQuantity: Quantity,
    issuedQuantity: Quantity,
    status: MaterialIssueStatus
  ): void {
    this._itemId = itemId;
    this._requiredQuantity = requiredQuantity;
    this._issuedQuantity = issuedQuantity;
    this._status = status;
  }

  public issue(quantity: Quantity): Result<void> {
    if (this._status === MaterialIssueStatus.Reverted) {
      return ResultFactory.failure(ProductionExceptions.InvalidStatusTransition(this._status, MaterialIssueStatus.Issued));
    }
    
    const newIssuedQuantity = this._issuedQuantity.add(quantity);
    
    if (newIssuedQuantity.amount > this._requiredQuantity.amount) {
      return ResultFactory.failure(ProductionExceptions.ExceedsRequiredQuantity(this._itemId, newIssuedQuantity.amount, this._requiredQuantity.amount));
    }
    
    this._issuedQuantity = newIssuedQuantity;
    this._status = MaterialIssueStatus.Issued;
    
    return ResultFactory.success();
  }
}
