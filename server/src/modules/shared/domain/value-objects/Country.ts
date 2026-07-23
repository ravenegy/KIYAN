import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../../core/results/Result';
import { ErrorCode } from '../../../../core/results/ErrorCode';

interface CountryProps {
  code: string;
  name: string;
}

export class Country extends ValueObject<CountryProps> {
  private constructor(props: CountryProps) {
    super(props);
  }

  public static create(code: string, name: string): Result<Country> {
    if (!code || !name) {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'Country code and name are required.'
      });
    }
    return Result.success(new Country({ code: code.toUpperCase(), name }));
  }

  public get code(): string { return this.props.code; }
  public get name(): string { return this.props.name; }
}
