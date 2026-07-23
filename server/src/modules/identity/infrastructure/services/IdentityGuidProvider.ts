import { IDomainGuid } from '../../../../core/domain/services/IDomainGuid';
import * as crypto from 'crypto';

export class IdentityGuidProvider implements IDomainGuid {
  generate(): string {
    return crypto.randomUUID();
  }
}
