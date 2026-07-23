import { IContainer } from '../../../core/di';
import { MrpConfigurationRegistration } from './MrpConfigurationRegistration';
import { MrpFactoryRegistration } from './MrpFactoryRegistration';
import { MrpValidatorRegistration } from './MrpValidatorRegistration';
import { MrpMapperRegistration } from './MrpMapperRegistration';
import { MrpRepositoryRegistration } from './MrpRepositoryRegistration';
import { MrpServiceRegistration } from './MrpServiceRegistration';
import { MrpHandlerRegistration } from './MrpHandlerRegistration';
import { MrpMediatorRegistration } from './MrpMediatorRegistration';

export class MrpDependencyRegistration {
  public static register(container: IContainer): void {
    MrpConfigurationRegistration.register(container);
    MrpFactoryRegistration.register(container);
    MrpValidatorRegistration.register(container);
    MrpMapperRegistration.register(container);
    MrpRepositoryRegistration.register(container);
    MrpServiceRegistration.register(container);
    MrpHandlerRegistration.register(container);
    
    // Presentation controllers will be registered in Phase 6

    // Note: Mediator registration requires handlers to be registered first
    MrpMediatorRegistration.register(container);
  }
}
