import { ICurrencyService } from '../../domain/services';
import { SharedModuleConfiguration } from '../configuration/SharedModuleConfiguration';

export class CurrencyService implements ICurrencyService {
  constructor(private readonly config: SharedModuleConfiguration) {}

  public async convert(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    if (fromCurrency === toCurrency) return amount;
    return amount * 1.1; // mock
  }

  public format(amount: number, currency: string): string {
    const curr = currency || this.config.options.defaultCurrency;
    return `${amount.toFixed(2)} ${curr}`;
  }
}
