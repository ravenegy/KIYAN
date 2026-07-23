import { Entity } from '../../../../core/domain/entities/Entity';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';
import { OperationId } from '../shared/OperationId';
import { WorkCenterId } from '../shared/WorkCenterId';
import { ProductionDuration } from '../value-objects/ProductionDuration';
import { OperationStatus } from '../enums/OperationStatus';
import { ProductionExceptions } from '../exceptions/ProductionExceptions';

export class ProductionOperation extends Entity<OperationId> {
  private _sequence: number;
  private _name: string;
  private _workCenterId: WorkCenterId;
  private _setupTime: ProductionDuration;
  private _runTime: ProductionDuration;
  private _status: OperationStatus;
  
  private constructor(
    id: OperationId,
    sequence: number,
    name: string,
    workCenterId: WorkCenterId,
    setupTime: ProductionDuration,
    runTime: ProductionDuration,
    status: OperationStatus,
    createdAt?: Date,
    version?: number
  ) {
    super(id, createdAt, version);
    this._sequence = sequence;
    this._name = name;
    this._workCenterId = workCenterId;
    this._setupTime = setupTime;
    this._runTime = runTime;
    this._status = status;
  }

  public get sequence(): number { return this._sequence; }
  public get name(): string { return this._name; }
  public get workCenterId(): WorkCenterId { return this._workCenterId; }
  public get setupTime(): ProductionDuration { return this._setupTime; }
  public get runTime(): ProductionDuration { return this._runTime; }
  public get status(): OperationStatus { return this._status; }

  public static create(
    id: OperationId,
    sequence: number,
    name: string,
    workCenterId: WorkCenterId,
    setupTime: ProductionDuration,
    runTime: ProductionDuration
  ): Result<ProductionOperation> {
    if (sequence <= 0) {
      return ResultFactory.validation<ProductionOperation>('Sequence must be greater than zero.');
    }
    if (!name || name.trim().length === 0) {
      return ResultFactory.validation<ProductionOperation>('Operation name cannot be empty.');
    }

    return ResultFactory.success(
      new ProductionOperation(
        id,
        sequence,
        name,
        workCenterId,
        setupTime,
        runTime,
        OperationStatus.Pending
      )
    );
  }
  
  public load(
    sequence: number,
    name: string,
    workCenterId: WorkCenterId,
    setupTime: ProductionDuration,
    runTime: ProductionDuration,
    status: OperationStatus
  ): void {
    this._sequence = sequence;
    this._name = name;
    this._workCenterId = workCenterId;
    this._setupTime = setupTime;
    this._runTime = runTime;
    this._status = status;
  }

  public markAsReady(): Result<void> {
    if (this._status !== OperationStatus.Pending) {
      return ResultFactory.failure(ProductionExceptions.InvalidStatusTransition(this._status, OperationStatus.Ready));
    }
    this._status = OperationStatus.Ready;
    return ResultFactory.success();
  }

  public start(): Result<void> {
    if (this._status !== OperationStatus.Ready) {
      return ResultFactory.failure(ProductionExceptions.InvalidStatusTransition(this._status, OperationStatus.InProgress));
    }
    this._status = OperationStatus.InProgress;
    return ResultFactory.success();
  }

  public complete(): Result<void> {
    if (this._status !== OperationStatus.InProgress) {
      return ResultFactory.failure(ProductionExceptions.InvalidStatusTransition(this._status, OperationStatus.Completed));
    }
    this._status = OperationStatus.Completed;
    return ResultFactory.success();
  }
}
