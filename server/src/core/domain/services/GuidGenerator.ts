import { IDomainGuid } from './IDomainGuid';

export class GuidGenerator implements IDomainGuid {
  public generate(): string {
    return crypto.randomUUID();
  }
}
