import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result, ErrorCode } from '../../../../core';

export interface LeadTimeProps {
  days: number;
}

export class LeadTime extends ValueObject<LeadTimeProps> {
  private constructor(props: LeadTimeProps) {
    super(props);
  }

  public get days(): number {
    return this.props.days;
  }

  public static create(days: number): Result<LeadTime> {
    if (days === null || days === undefined) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Lead time days are required.' });
    }

    if (days < 0) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Lead time cannot be negative.' });
    }

    return Result.success(new LeadTime({ days }));
  }

  public calculateStartDate(endDate: Date): Date {
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - this.days);
    return startDate;
  }

  public calculateEndDate(startDate: Date): Date {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + this.days);
    return endDate;
  }
}
