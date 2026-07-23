import { IDomainClock } from '../../../../core/domain/services/IDomainClock';

export class IdentityClock implements IDomainClock {
  utcNow(): Date {
    return new Date();
  }

  today(): Date {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }
}
