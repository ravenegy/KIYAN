import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../../core/results/Result';
import { ErrorCode } from '../../../../core/results/ErrorCode';

interface PersonNameProps {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export class PersonName extends ValueObject<PersonNameProps> {
  private constructor(props: PersonNameProps) {
    super(props);
  }

  public static create(firstName: string, lastName: string, middleName?: string): Result<PersonName> {
    if (!firstName || !lastName) {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'First and last name are required.'
      });
    }
    return Result.success(new PersonName({ firstName, lastName, middleName }));
  }

  public get firstName(): string { return this.props.firstName; }
  public get lastName(): string { return this.props.lastName; }
  public get middleName(): string | undefined { return this.props.middleName; }
  public get fullName(): string { 
    return this.props.middleName 
      ? `${this.props.firstName} ${this.props.middleName} ${this.props.lastName}`
      : `${this.props.firstName} ${this.props.lastName}`;
  }
}
