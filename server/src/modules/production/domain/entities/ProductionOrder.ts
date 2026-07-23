import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';
import { ProductionOrderId } from '../shared/ProductionOrderId';
import { ProductionOrderStatus } from '../enums/ProductionOrderStatus';
import { ProductionPriority } from '../enums/ProductionPriority';
import { Quantity } from '../value-objects/Quantity';
import { ProductionOperation } from './ProductionOperation';
import { ProductionMaterialIssue } from './ProductionMaterialIssue';
import { FinishedGoodReceipt } from './FinishedGoodReceipt';
import { ProductionExceptions } from '../exceptions/ProductionExceptions';
import {
  ProductionOrderCreated,
  ProductionOrderReleased,
  ProductionStarted,
  ProductionCompleted,
  ProductionCancelled,
  MaterialIssued,
  FinishedGoodsReceived
} from '../events/ProductionEvents';

export class ProductionOrder extends AggregateRoot<ProductionOrderId> {
  private _targetItemId: string;
  private _plannedQuantity: Quantity;
  private _actualQuantity: Quantity;
  private _startDate: Date;
  private _endDate: Date;
  private _actualStartDate?: Date;
  private _actualEndDate?: Date;
  private _status: ProductionOrderStatus;
  private _priority: ProductionPriority;
  private _operations: ProductionOperation[] = [];
  private _materialIssues: ProductionMaterialIssue[] = [];
  private _receipts: FinishedGoodReceipt[] = [];

  private constructor(
    id: ProductionOrderId,
    targetItemId: string,
    plannedQuantity: Quantity,
    startDate: Date,
    endDate: Date,
    status: ProductionOrderStatus,
    priority: ProductionPriority,
    createdAt?: Date,
    version?: number
  ) {
    super(id, createdAt, version);
    this._targetItemId = targetItemId;
    this._plannedQuantity = plannedQuantity;
    this._actualQuantity = Quantity.create(0).value!;
    this._startDate = startDate;
    this._endDate = endDate;
    this._status = status;
    this._priority = priority;
  }

  public get targetItemId(): string { return this._targetItemId; }
  public get plannedQuantity(): Quantity { return this._plannedQuantity; }
  public get actualQuantity(): Quantity { return this._actualQuantity; }
  public get startDate(): Date { return this._startDate; }
  public get endDate(): Date { return this._endDate; }
  public get actualStartDate(): Date | undefined { return this._actualStartDate; }
  public get actualEndDate(): Date | undefined { return this._actualEndDate; }
  public get status(): ProductionOrderStatus { return this._status; }
  public get priority(): ProductionPriority { return this._priority; }
  public get operations(): ReadonlyArray<ProductionOperation> { return Object.freeze([...this._operations]); }
  public get materialIssues(): ReadonlyArray<ProductionMaterialIssue> { return Object.freeze([...this._materialIssues]); }
  public get receipts(): ReadonlyArray<FinishedGoodReceipt> { return Object.freeze([...this._receipts]); }

  public static create(
    id: ProductionOrderId,
    targetItemId: string,
    plannedQuantity: Quantity,
    startDate: Date,
    endDate: Date,
    priority: ProductionPriority = ProductionPriority.Normal
  ): Result<ProductionOrder> {
    if (!targetItemId || targetItemId.trim().length === 0) {
      return ResultFactory.validation<ProductionOrder>('Target Item ID cannot be empty.');
    }
    
    if (plannedQuantity.amount <= 0) {
      return ResultFactory.validation<ProductionOrder>('Planned quantity must be greater than zero.');
    }
    
    if (startDate > endDate) {
      return ResultFactory.validation<ProductionOrder>('Start date cannot be after end date.');
    }

    const order = new ProductionOrder(
      id,
      targetItemId,
      plannedQuantity,
      startDate,
      endDate,
      ProductionOrderStatus.Planned,
      priority
    );

    order.addDomainEvent(new ProductionOrderCreated(
      order.id.value,
      new Date(),
      order.id.value,
      order.version,
      targetItemId,
      plannedQuantity.amount,
      startDate,
      endDate
    ));

    return ResultFactory.success(order);
  }

  public load(
    targetItemId: string,
    plannedQuantity: Quantity,
    actualQuantity: Quantity,
    startDate: Date,
    endDate: Date,
    status: ProductionOrderStatus,
    priority: ProductionPriority,
    operations: ProductionOperation[],
    materialIssues: ProductionMaterialIssue[],
    receipts: FinishedGoodReceipt[],
    actualStartDate?: Date,
    actualEndDate?: Date
  ): void {
    this._targetItemId = targetItemId;
    this._plannedQuantity = plannedQuantity;
    this._actualQuantity = actualQuantity;
    this._startDate = startDate;
    this._endDate = endDate;
    this._status = status;
    this._priority = priority;
    this._operations = operations;
    this._materialIssues = materialIssues;
    this._receipts = receipts;
    this._actualStartDate = actualStartDate;
    this._actualEndDate = actualEndDate;
  }

  public addOperation(operation: ProductionOperation): Result<void> {
    if (this._status !== ProductionOrderStatus.Planned) {
      return ResultFactory.businessRule('Cannot add operations unless order is in Planned status.');
    }
    this._operations.push(operation);
    return ResultFactory.success();
  }

  public addMaterialIssueRequirement(materialIssue: ProductionMaterialIssue): Result<void> {
    if (this._status !== ProductionOrderStatus.Planned) {
      return ResultFactory.businessRule('Cannot add material requirements unless order is in Planned status.');
    }
    this._materialIssues.push(materialIssue);
    return ResultFactory.success();
  }

  public release(): Result<void> {
    if (this._status !== ProductionOrderStatus.Planned) {
      return ResultFactory.failure(ProductionExceptions.InvalidStatusTransition(this._status, ProductionOrderStatus.Released));
    }
    
    this._status = ProductionOrderStatus.Released;
    
    this.addDomainEvent(new ProductionOrderReleased(
      this.id.value,
      new Date(),
      this.id.value,
      this.version
    ));
    
    return ResultFactory.success();
  }

  public start(actualStartDate: Date): Result<void> {
    if (this._status !== ProductionOrderStatus.Released) {
      return ResultFactory.failure(ProductionExceptions.InvalidStatusTransition(this._status, ProductionOrderStatus.InProgress));
    }
    
    this._status = ProductionOrderStatus.InProgress;
    this._actualStartDate = actualStartDate;
    
    this.addDomainEvent(new ProductionStarted(
      this.id.value,
      new Date(),
      this.id.value,
      this.version,
      actualStartDate
    ));
    
    return ResultFactory.success();
  }

  public issueMaterial(materialIssueId: string, quantity: Quantity): Result<void> {
    if (this._status !== ProductionOrderStatus.InProgress && this._status !== ProductionOrderStatus.Released) {
      return ResultFactory.businessRule('Can only issue material when order is Released or InProgress.');
    }

    const issue = this._materialIssues.find(mi => mi.id.value === materialIssueId);
    if (!issue) {
      return ResultFactory.notFound(`Material issue requirement ${materialIssueId} not found on order.`);
    }

    const issueResult = issue.issue(quantity);
    if (issueResult.isFailure) {
      return issueResult;
    }

    this.addDomainEvent(new MaterialIssued(
      this.id.value,
      new Date(),
      this.id.value,
      this.version,
      issue.id.value,
      issue.itemId,
      quantity.amount
    ));

    return ResultFactory.success();
  }

  public receiveFinishedGoods(receipt: FinishedGoodReceipt): Result<void> {
    if (this._status !== ProductionOrderStatus.InProgress) {
      return ResultFactory.businessRule('Can only receive finished goods when order is InProgress.');
    }

    this._receipts.push(receipt);
    this._actualQuantity = this._actualQuantity.add(receipt.quantity);

    this.addDomainEvent(new FinishedGoodsReceived(
      this.id.value,
      new Date(),
      this.id.value,
      this.version,
      receipt.id.value,
      receipt.itemId,
      receipt.quantity.amount
    ));

    return ResultFactory.success();
  }

  public complete(actualEndDate: Date): Result<void> {
    if (this._status !== ProductionOrderStatus.InProgress) {
      return ResultFactory.failure(ProductionExceptions.InvalidStatusTransition(this._status, ProductionOrderStatus.Completed));
    }
    
    this._status = ProductionOrderStatus.Completed;
    this._actualEndDate = actualEndDate;
    
    this.addDomainEvent(new ProductionCompleted(
      this.id.value,
      new Date(),
      this.id.value,
      this.version,
      actualEndDate,
      this._actualQuantity.amount
    ));
    
    return ResultFactory.success();
  }

  public cancel(reason: string): Result<void> {
    if (this._status === ProductionOrderStatus.Completed || this._status === ProductionOrderStatus.Cancelled) {
      return ResultFactory.failure(ProductionExceptions.InvalidStatusTransition(this._status, ProductionOrderStatus.Cancelled));
    }
    
    this._status = ProductionOrderStatus.Cancelled;
    
    this.addDomainEvent(new ProductionCancelled(
      this.id.value,
      new Date(),
      this.id.value,
      this.version,
      reason
    ));
    
    return ResultFactory.success();
  }
}
