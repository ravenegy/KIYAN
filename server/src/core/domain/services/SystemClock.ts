import { IDomainClock } from './IDomainClock';

export class SystemClock implements IDomainClock {
  public utcNow(): Date {
    return new Date();
  }

  public today(): Date {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  }
}
