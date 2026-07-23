import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { Result, ErrorCode } from '../../../../core';
import { MaterialRequirementId } from '../shared/MaterialRequirementId';
import { Quantity } from '../value-objects/Quantity';

import { RequirementSourceType } from '../enums/RequirementSourceType';

export interface MaterialRequirementProps {
  itemId: string;
  quantity: Quantity;
  requiredDate: Date;
  sourceType: RequirementSourceType;
  sourceId?: string;
  mrpRunId: string;
  isSatisfied?: boolean;
}

export class MaterialRequirement extends AggregateRoot<MaterialRequirementId> {
  private _itemId: string;
  private _quantity: Quantity;
  private _requiredDate: Date;
  private _sourceType: RequirementSourceType;
  private _sourceId?: string;
  private _mrpRunId: string;
  private _isSatisfied: boolean;

  private constructor(id: MaterialRequirementId, props: MaterialRequirementProps) {
    super(id);
    this._itemId = props.itemId;
    this._quantity = props.quantity;
    this._requiredDate = props.requiredDate;
    this._sourceType = props.sourceType;
    this._sourceId = props.sourceId;
    this._mrpRunId = props.mrpRunId;
    this._isSatisfied = props.isSatisfied || false;
  }

  public get itemId(): string {
    return this._itemId;
  }

  public get quantity(): Quantity {
    return this._quantity;
  }

  public get requiredDate(): Date {
    return this._requiredDate;
  }

  public get sourceType(): RequirementSourceType {
    return this._sourceType;
  }

  public get sourceId(): string | undefined {
    return this._sourceId;
  }

  public get mrpRunId(): string {
    return this._mrpRunId;
  }

  public get isSatisfied(): boolean {
    return this._isSatisfied;
  }

  public static create(id: MaterialRequirementId, props: MaterialRequirementProps): Result<MaterialRequirement> {
    if (!props.itemId || props.itemId.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'ItemId is required.' });
    }

    if (!props.quantity || props.quantity.value <= 0) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Quantity must be greater than zero.' });
    }

    if (!props.requiredDate) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Required date is required.' });
    }

    if (!props.mrpRunId || props.mrpRunId.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'MrpRunId is required.' });
    }

    const requirement = new MaterialRequirement(id, props);
    return Result.success(requirement);
  }

  public markSatisfied(): Result<void> {
    this._isSatisfied = true;
    return Result.success();
  }
}
