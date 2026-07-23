import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../../core/results/Result';
import { ErrorCode } from '../../../../core/results/ErrorCode';

interface TimeZoneProps {
  id: string;
  offset: number;
}

export class TimeZone extends ValueObject<TimeZoneProps> {
  private constructor(props: TimeZoneProps) {
    super(props);
  }

  public static create(id: string, offset: number): Result<TimeZone> {
    if (!id || typeof offset !== 'number') {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'TimeZone id and valid offset are required.'
      });
    }
    return Result.success(new TimeZone({ id, offset }));
  }

  public get id(): string { return this.props.id; }
  public get offset(): number { return this.props.offset; }
}
