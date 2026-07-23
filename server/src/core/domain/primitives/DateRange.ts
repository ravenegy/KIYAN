import { ValueObject } from '../value-objects/ValueObject';
import { DomainException } from '../exceptions/DomainException';

export interface DateRangeProps {
  startDate: Date;
  endDate: Date;
}

export class DateRange extends ValueObject<DateRangeProps> {
  private constructor(props: DateRangeProps) {
    super(props);
  }

  public static create(startDate: Date, endDate: Date): DateRange {
    if (startDate > endDate) {
      throw new DomainException('Start date cannot be after end date');
    }
    return new DateRange({ startDate, endDate });
  }

  public get startDate(): Date {
    return this.props.startDate;
  }

  public get endDate(): Date {
    return this.props.endDate;
  }
}
