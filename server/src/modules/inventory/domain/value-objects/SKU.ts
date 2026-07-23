import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result, ErrorCode } from '../../../../core';

export interface SKUProps {
  value: string;
}

export class SKU extends ValueObject<SKUProps> {
  private constructor(props: SKUProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): Result<SKU> {
    if (!value || value.trim().length === 0) {
      return Result.failure({ code: ErrorCode.Validation, message: 'SKU cannot be empty.' });
    }
    if (!/^[A-Z0-9-]+$/.test(value)) {
      return Result.failure({ code: ErrorCode.Validation, message: 'SKU contains invalid characters.' });
    }
    return Result.success(new SKU({ value }));
  }
}
