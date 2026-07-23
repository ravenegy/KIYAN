import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../../core/results/Result';
import { ErrorCode } from '../../../../core/results/ErrorCode';

interface CompanyNameProps {
  value: string;
}

export class CompanyName extends ValueObject<CompanyNameProps> {
  private constructor(props: CompanyNameProps) {
    super(props);
  }

  public static create(value: string): Result<CompanyName> {
    if (!value || value.trim() === '') {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'CompanyName cannot be empty'
      });
    }
    return Result.success(new CompanyName({ value: value.trim() }));
  }

  public get value(): string { return this.props.value; }
}
