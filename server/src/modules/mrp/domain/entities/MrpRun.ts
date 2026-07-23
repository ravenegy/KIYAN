import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { Result, ErrorCode } from '../../../../core';
import { MrpRunId } from '../shared/MrpRunId';
import { MrpRunStatus } from '../enums/MrpRunStatus';
import { PlanningHorizon } from '../value-objects/PlanningHorizon';
import {
  MrpRunStartedDomainEvent,
  MrpRunCompletedDomainEvent,
  MrpRunFailedDomainEvent,
} from '../events/MrpRunEvents';

export interface MrpRunProps {
  horizon: PlanningHorizon;
  plantId: string;
  status?: MrpRunStatus;
  startedAt?: Date;
  completedAt?: Date;
  errorLog?: string;
}

export class MrpRun extends AggregateRoot<MrpRunId> {
  private _horizon: PlanningHorizon;
  private _plantId: string;
  private _status: MrpRunStatus;
  private _startedAt?: Date;
  private _completedAt?: Date;
  private _errorLog?: string;

  private constructor(id: MrpRunId, props: MrpRunProps) {
    super(id);
    this._horizon = props.horizon;
    this._plantId = props.plantId;
    this._status = props.status || MrpRunStatus.Pending;
    this._startedAt = props.startedAt;
    this._completedAt = props.completedAt;
    this._errorLog = props.errorLog;
  }

  public get horizon(): PlanningHorizon {
    return this._horizon;
  }

  public get plantId(): string {
    return this._plantId;
  }

  public get status(): MrpRunStatus {
    return this._status;
  }

  public get startedAt(): Date | undefined {
    return this._startedAt;
  }

  public get completedAt(): Date | undefined {
    return this._completedAt;
  }

  public get errorLog(): string | undefined {
    return this._errorLog;
  }

  public static create(id: MrpRunId, props: MrpRunProps): Result<MrpRun> {
    if (!props.plantId || props.plantId.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'PlantId is required.' });
    }

    const run = new MrpRun(id, props);
    return Result.success(run);
  }

  public start(): Result<void> {
    if (this._status !== MrpRunStatus.Pending) {
      return Result.failure({ code: ErrorCode.BusinessRule, message: 'Only pending MRP runs can be started.' });
    }

    this._status = MrpRunStatus.Running;
    this._startedAt = new Date();
    this.addDomainEvent(new MrpRunStartedDomainEvent(this.id.value, this._startedAt));
    return Result.success();
  }

  public complete(plannedOrdersCount: number): Result<void> {
    if (this._status !== MrpRunStatus.Running) {
      return Result.failure({ code: ErrorCode.BusinessRule, message: 'Only running MRP runs can be completed.' });
    }

    this._status = MrpRunStatus.Completed;
    this._completedAt = new Date();
    this.addDomainEvent(new MrpRunCompletedDomainEvent(this.id.value, plannedOrdersCount, this._completedAt));
    return Result.success();
  }

  public fail(reason: string): Result<void> {
    if (this._status === MrpRunStatus.Completed || this._status === MrpRunStatus.Failed) {
      return Result.failure({ code: ErrorCode.BusinessRule, message: 'MRP run is already finished.' });
    }

    this._status = MrpRunStatus.Failed;
    this._completedAt = new Date();
    this._errorLog = reason;
    this.addDomainEvent(new MrpRunFailedDomainEvent(this.id.value, reason, this._completedAt));
    return Result.success();
  }
}
