import { ILocalizationApplicationService } from '../interfaces/ILocalizationApplicationService';
import { Result, ErrorCode } from '../../../../core';

export class LocalizationApplicationService implements ILocalizationApplicationService {
  public async getTranslation(key: string, locale: string): Promise<Result<string>> {
    return Result.failure({
      code: ErrorCode.Unexpected,
      message: 'Not implemented'
    });
  }
}
