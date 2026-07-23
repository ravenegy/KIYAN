import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../../core/results/Result';
import { ErrorCode } from '../../../../core/results/ErrorCode';

interface AddressProps {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export class Address extends ValueObject<AddressProps> {
  private constructor(props: AddressProps) {
    super(props);
  }

  public static create(street: string, city: string, state: string, country: string, zipCode: string): Result<Address> {
    if (!street || !city || !state || !country || !zipCode) {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'All address fields are required.'
      });
    }
    return Result.success(new Address({ street, city, state, country, zipCode }));
  }

  public get street(): string { return this.props.street; }
  public get city(): string { return this.props.city; }
  public get state(): string { return this.props.state; }
  public get country(): string { return this.props.country; }
  public get zipCode(): string { return this.props.zipCode; }
}
