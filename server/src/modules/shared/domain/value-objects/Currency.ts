import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../../core/results/Result';
import { ErrorCode } from '../../../../core/results/ErrorCode';

interface CurrencyProps {
  code: string;
  symbol: string;
}

export class Currency extends ValueObject<CurrencyProps> {
  private constructor(props: CurrencyProps) {
    super(props);
  }

  public static create(code: string, symbol: string): Result<Currency> {
    if (!code || !symbol) {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'Currency code and symbol are required.'
      });
    }
    return Result.success(new Currency({ code: code.toUpperCase(), symbol }));
  }

  public get code(): string { return this.props.code; }
  public get symbol(): string { return this.props.symbol; }
}
