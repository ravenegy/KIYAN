import { IContainer, Lifetime, Token } from '../../../../core/di';
import { SharedModuleConfiguration } from '../configuration/SharedModuleConfiguration';
import { SharedInfrastructureFactory } from '../factories/SharedInfrastructureFactory';
import { SharedRepositoryFactory } from '../factories/SharedRepositoryFactory';
import { ILocalizationService, ICurrencyService, IDateTimeService } from '../../domain/services';
import { ILookupRepository, IReferenceRepository } from '../../domain/repositories';
import { LookupDomainEntity } from '../mappers/LookupPersistenceMapper';
import { ReferenceDomainEntity } from '../repositories/ReferenceRepository';

export const SharedTokens = {
  ILocalizationService: new Token<ILocalizationService>('ILocalizationService'),
  ICurrencyService: new Token<ICurrencyService>('ICurrencyService'),
  IDateTimeService: new Token<IDateTimeService>('IDateTimeService'),
  ILookupRepository: new Token<ILookupRepository<LookupDomainEntity>>('ILookupRepository'),
  IReferenceRepository: new Token<IReferenceRepository<ReferenceDomainEntity>>('IReferenceRepository'),
  SharedModuleConfiguration: new Token<SharedModuleConfiguration>('SharedModuleConfiguration'),
};

export class SharedInfrastructureBootstrapper {
  public static bootstrap(container: IContainer, config: SharedModuleConfiguration): void {
    const infraFactory = new SharedInfrastructureFactory(config);
    const repoFactory = new SharedRepositoryFactory();

    container.register(SharedTokens.ILocalizationService, () => infraFactory.createLocalizationService(), Lifetime.Singleton);
    container.register(SharedTokens.ICurrencyService, () => infraFactory.createCurrencyService(), Lifetime.Singleton);
    container.register(SharedTokens.IDateTimeService, () => infraFactory.createDateTimeService(), Lifetime.Singleton);
    
    container.register(SharedTokens.ILookupRepository, () => repoFactory.createLookupRepository(), Lifetime.Scoped);
    container.register(SharedTokens.IReferenceRepository, () => repoFactory.createReferenceRepository(), Lifetime.Scoped);
    
    container.register(SharedTokens.SharedModuleConfiguration, () => config, Lifetime.Singleton);
  }
}
