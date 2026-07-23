export interface IDomainClock {
  utcNow(): Date;
  today(): Date;
}
