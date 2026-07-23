import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../../core/results/Result';
import { ErrorCode } from '../../../../core/results/ErrorCode';

interface TaxNumberProps {
  value: string;
  countryCode: string;
}

export class TaxNumber extends ValueObject<TaxNumberProps> {
  private constructor(props: TaxNumberProps) {
    super(props);
  }

  public static create(value: string, countryCode: string): Result<TaxNumber> {
    if (!value || !countryCode) {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'TaxNumber and country code are required.'
      });
    }
    return Result.success(new TaxNumber({ value, countryCode }));
  }

  public get value(): string { return this.props.value; }
  public get countryCode(): string { return this.props.countryCode; }
}
