import { ILocalizationService } from '../../domain/services';
import { SharedModuleConfiguration } from '../configuration/SharedModuleConfiguration';

export class LocalizationService implements ILocalizationService {
  constructor(private readonly config: SharedModuleConfiguration) {}

  public translate(key: string, language: string, args?: Record<string, string>): string {
    const lang = language || this.config.options.defaultLanguage;
    let result = `[${lang}] ${key}`;
    if (args) {
      result += ' ' + JSON.stringify(args);
    }
    return result;
  }
}
