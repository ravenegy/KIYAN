import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { Result, ErrorCode } from '../../../../core';
import { PlannedOrderId } from '../shared/PlannedOrderId';
import { PlannedOrderStatus } from '../enums/PlannedOrderStatus';
import { PlannedOrderType } from '../enums/PlannedOrderType';
import { Quantity } from '../value-objects/Quantity';
import { InvalidPlannedOrderStatusException } from '../exceptions/MrpExceptions';
import {
  PlannedOrderCreatedDomainEvent,
  PlannedOrderFirmedDomainEvent,
  PlannedOrderReleasedDomainEvent,
  PlannedOrderCancelledDomainEvent,
} from '../events/PlannedOrderEvents';

export interface PlannedOrderProps {
  itemId: string;
  quantity: Quantity;
  startDate: Date;
  endDate: Date;
  type: PlannedOrderType;
  mrpRunId: string;
  sourceRequirementId?: string;
  status?: PlannedOrderStatus;
}

export class PlannedOrder extends AggregateRoot<PlannedOrderId> {
  private _itemId: string;
  private _quantity: Quantity;
  private _startDate: Date;
  private _endDate: Date;
  private _type: PlannedOrderType;
  private _status: PlannedOrderStatus;
  private _mrpRunId: string;
  private _sourceRequirementId?: string;

  private constructor(id: PlannedOrderId, props: PlannedOrderProps) {
    super(id);
    this._itemId = props.itemId;
    this._quantity = props.quantity;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._type = props.type;
    this._mrpRunId = props.mrpRunId;
    this._sourceRequirementId = props.sourceRequirementId;
    this._status = props.status || PlannedOrderStatus.Draft;
  }

  public get itemId(): string {
    return this._itemId;
  }

  public get quantity(): Quantity {
    return this._quantity;
  }

  public get startDate(): Date {
    return this._startDate;
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public get type(): PlannedOrderType {
    return this._type;
  }

  public get status(): PlannedOrderStatus {
    return this._status;
  }

  public get mrpRunId(): string {
    return this._mrpRunId;
  }

  public get sourceRequirementId(): string | undefined {
    return this._sourceRequirementId;
  }

  public static create(id: PlannedOrderId, props: PlannedOrderProps): Result<PlannedOrder> {
    if (!props.itemId || props.itemId.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'ItemId is required.' });
    }

    if (!props.quantity || props.quantity.value <= 0) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Quantity must be greater than zero.' });
    }

    if (!props.startDate || !props.endDate) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Start and end dates are required.' });
    }

    if (props.startDate > props.endDate) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Start date cannot be after end date.' });
    }

    if (!props.mrpRunId || props.mrpRunId.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'MrpRunId is required.' });
    }

    const order = new PlannedOrder(id, props);

    if (order.status === PlannedOrderStatus.Draft) {
      order.addDomainEvent(
        new PlannedOrderCreatedDomainEvent(
          order.id.value,
          order.itemId,
          order.quantity.value,
          order.type
        )
      );
    }

    return Result.success(order);
  }

  public firm(): Result<void> {
    if (this._status !== PlannedOrderStatus.Draft) {
      return Result.failure({ code: ErrorCode.BusinessRule, message: 'Only draft orders can be firmed.' });
    }

    this._status = PlannedOrderStatus.Firmed;
    this.addDomainEvent(new PlannedOrderFirmedDomainEvent(this.id.value));
    return Result.success();
  }

  public release(): Result<void> {
    if (this._status !== PlannedOrderStatus.Firmed) {
      return Result.failure({ code: ErrorCode.BusinessRule, message: 'Only firmed orders can be released.' });
    }

    this._status = PlannedOrderStatus.Released;
    this.addDomainEvent(new PlannedOrderReleasedDomainEvent(this.id.value));
    return Result.success();
  }

  public cancel(reason: string): Result<void> {
    if (this._status === PlannedOrderStatus.Released) {
      return Result.failure({ code: ErrorCode.BusinessRule, message: 'Released orders cannot be cancelled via MRP directly.' });
    }

    if (this._status === PlannedOrderStatus.Cancelled) {
      return Result.failure({ code: ErrorCode.BusinessRule, message: 'Order is already cancelled.' });
    }

    this._status = PlannedOrderStatus.Cancelled;
    this.addDomainEvent(new PlannedOrderCancelledDomainEvent(this.id.value, reason));
    return Result.success();
  }
}
