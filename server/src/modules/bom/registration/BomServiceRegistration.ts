import { IContainer, Lifetime } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { BomModuleTokens } from './BomModuleTokens';
import { BomApplicationService } from '../application/services/impl/BomApplicationService';
import { BomIntegrationService } from '../integration/BomIntegrationService';
import { GuidGenerator } from '../../../core/domain/services/GuidGenerator';
import { BomCycleDetectionService } from '../domain/services/BomCycleDetectionService';

export class BomServiceRegistration {
  public static register(container: IContainer): void {
    container.register(
      BomModuleTokens.IDomainGuid,
      () => new GuidGenerator(),
      Lifetime.Singleton
    );

    container.register(
      BomModuleTokens.BomCycleDetectionService,
      (c) => new BomCycleDetectionService(c.resolve(BomModuleTokens.IBomRepository)),
      Lifetime.Scoped
    );

    container.register(
      BomModuleTokens.IBomApplicationService,
      (c) => new BomApplicationService(
        c.resolve(CoreTokens.Mediator),
        c.resolve(BomModuleTokens.IBomValidator)
      ),
      Lifetime.Scoped
    );

    container.register(
      BomModuleTokens.IBomIntegrationService,
      (c) => new BomIntegrationService(
        c.resolve(BomModuleTokens.IBomRepository)
      ),
      Lifetime.Scoped
    );
  }
}
