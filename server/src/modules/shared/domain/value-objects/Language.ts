import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../../core/results/Result';
import { ErrorCode } from '../../../../core/results/ErrorCode';

interface LanguageProps {
  code: string;
}

export class Language extends ValueObject<LanguageProps> {
  private constructor(props: LanguageProps) {
    super(props);
  }

  public static create(code: string): Result<Language> {
    if (!code) {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'Language code is required.'
      });
    }
    return Result.success(new Language({ code: code.toLowerCase() }));
  }

  public get code(): string { return this.props.code; }
}
