import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../../core/results/Result';

export interface VersionProps {
  value: number;
}

export class Version extends ValueObject<VersionProps> {
  private constructor(props: VersionProps) {
    super(props);
  }

  public get value(): number {
    return this.props.value;
  }

  public next(): Version {
    return new Version({ value: this.value + 1 });
  }

  public static create(value: number): Result<Version> {
    if (value <= 0) {
      return Result.failure({ code: 'INVALID_VERSION', message: 'Version must be greater than zero.' });
    }
    return Result.success(new Version({ value }));
  }
}
