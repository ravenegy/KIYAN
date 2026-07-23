import { RepositoryFactory } from './RepositoryFactory';
import { PasswordHasher } from '../services/PasswordHasher';
import { PasswordVerifier } from '../services/PasswordVerifier';
import { TokenGenerator } from '../services/TokenGenerator';
import { RefreshTokenGenerator } from '../services/RefreshTokenGenerator';
import { UserLookupService } from '../services/UserLookupService';
import { IdentityClock } from '../services/IdentityClock';
import { IdentityGuidProvider } from '../services/IdentityGuidProvider';

export class IdentityInfrastructureFactory {
  
  public static createPasswordHasher(): PasswordHasher {
    return new PasswordHasher();
  }

  public static createPasswordVerifier(): PasswordVerifier {
    return new PasswordVerifier();
  }

  public static createTokenGenerator(): TokenGenerator {
    return new TokenGenerator();
  }

  public static createRefreshTokenGenerator(): RefreshTokenGenerator {
    return new RefreshTokenGenerator();
  }

  public static createUserLookupService(): UserLookupService {
    return new UserLookupService(RepositoryFactory.getUserRepository());
  }

  public static createClock(): IdentityClock {
    return new IdentityClock();
  }

  public static createGuidProvider(): IdentityGuidProvider {
    return new IdentityGuidProvider();
  }
}
