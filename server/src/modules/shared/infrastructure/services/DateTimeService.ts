import { IDateTimeService } from '../../domain/services';

export class DateTimeService implements IDateTimeService {
  public now(): Date {
    return new Date();
  }

  public utcNow(): Date {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  }

  public format(date: Date, formatString: string): string {
    // Basic mock formatting
    return date.toISOString();
  }
}
