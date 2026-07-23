export interface ILocalizationService {
  translate(key: string, language: string, args?: Record<string, string>): string;
}

export interface ICurrencyService {
  convert(amount: number, fromCurrency: string, toCurrency: string): Promise<number>;
  format(amount: number, currency: string): string;
}

export interface IDateTimeService {
  now(): Date;
  utcNow(): Date;
  format(date: Date, formatString: string): string;
}
