import { Entity } from '../../../../core/domain/entities/Entity';
import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { IdentityException } from '../exceptions/IdentityException';

export class ClaimId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }
  public static create(value: string): ClaimId {
    return new ClaimId(value);
  }
}

export class Claim extends Entity<ClaimId> {
  private _type: string;
  private _value: string;
  private _issuer: string;

  private constructor(
    id: ClaimId,
    type: string,
    value: string,
    issuer: string,
    createdAt?: Date,
    version?: number
  ) {
    super(id, createdAt, version);
    this._type = type;
    this._value = value;
    this._issuer = issuer;
  }

  public get type(): string {
    return this._type;
  }

  public get value(): string {
    return this._value;
  }

  public get issuer(): string {
    return this._issuer;
  }

  public static create(id: ClaimId, type: string, value: string, issuer: string): Claim {
    if (!type || type.trim().length === 0) {
      throw new IdentityException('Claim type cannot be empty');
    }
    if (!value || value.trim().length === 0) {
      throw new IdentityException('Claim value cannot be empty');
    }
    
    return new Claim(id, type, value, issuer || 'SYSTEM');
  }
}
