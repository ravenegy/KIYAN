import { LocalizationService } from '../services/LocalizationService';
import { CurrencyService } from '../services/CurrencyService';
import { DateTimeService } from '../services/DateTimeService';
import { SharedModuleConfiguration } from '../configuration/SharedModuleConfiguration';

export class SharedInfrastructureFactory {
  constructor(private readonly config: SharedModuleConfiguration) {}

  public createLocalizationService(): LocalizationService {
    return new LocalizationService(this.config);
  }

  public createCurrencyService(): CurrencyService {
    return new CurrencyService(this.config);
  }

  public createDateTimeService(): DateTimeService {
    return new DateTimeService();
  }
}
