import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result, ErrorCode } from '../../../../core';

export interface PlanningHorizonProps {
  startDate: Date;
  endDate: Date;
}

export class PlanningHorizon extends ValueObject<PlanningHorizonProps> {
  private constructor(props: PlanningHorizonProps) {
    super(props);
  }

  public get startDate(): Date {
    return this.props.startDate;
  }

  public get endDate(): Date {
    return this.props.endDate;
  }

  public static create(startDate: Date, endDate: Date): Result<PlanningHorizon> {
    if (!startDate || !endDate) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Start and end dates are required.' });
    }

    if (startDate >= endDate) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Start date must be before end date.' });
    }

    return Result.success(new PlanningHorizon({ startDate, endDate }));
  }

  public contains(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }
}
