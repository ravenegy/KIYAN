import { Result } from '../../../../core/results/Result';

export interface ILocalizationApplicationService {
  getTranslation(key: string, locale: string): Promise<Result<string>>;
}
