import { IContainer, Lifetime } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { MrpModuleTokens } from './MrpModuleTokens';
import { MrpCommandService } from '../application/services/impl/MrpCommandService';
import { MrpQueryService } from '../application/services/impl/MrpQueryService';
import { MrpIntegrationService } from '../integration/MrpIntegrationService';

export class MrpServiceRegistration {
  public static register(container: IContainer): void {
    container.register(
      MrpModuleTokens.IMrpCommandService,
      (c) => new MrpCommandService(
        c.resolve(CoreTokens.CommandBus)
      ),
      Lifetime.Scoped
    );

    container.register(
      MrpModuleTokens.IMrpQueryService,
      (c) => new MrpQueryService(
        c.resolve(CoreTokens.QueryBus)
      ),
      Lifetime.Scoped
    );

    container.register(
      MrpModuleTokens.IMrpIntegrationService,
      (c) => new MrpIntegrationService(
        c.resolve(MrpModuleTokens.IMrpCommandService),
        c.resolve(MrpModuleTokens.IMrpQueryService)
      ),
      Lifetime.Scoped
    );
  }
}
