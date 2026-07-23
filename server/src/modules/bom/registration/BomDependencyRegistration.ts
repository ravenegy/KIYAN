import { IContainer, Lifetime } from '../../../core/di';
import { BomConfigurationRegistration } from './BomConfigurationRegistration';
import { BomFactoryRegistration } from './BomFactoryRegistration';
import { BomValidatorRegistration } from './BomValidatorRegistration';
import { BomMapperRegistration } from './BomMapperRegistration';
import { BomRepositoryRegistration } from './BomRepositoryRegistration';
import { BomServiceRegistration } from './BomServiceRegistration';
import { BomHandlerRegistration } from './BomHandlerRegistration';
import { BomMediatorRegistration } from './BomMediatorRegistration';
import { BomModuleTokens } from './BomModuleTokens';
import { BomController } from '../presentation/controllers/BomController';

export class BomDependencyRegistration {
  public static register(container: IContainer): void {
    BomConfigurationRegistration.register(container);
    BomFactoryRegistration.register(container);
    BomValidatorRegistration.register(container);
    BomMapperRegistration.register(container);
    BomRepositoryRegistration.register(container);
    BomServiceRegistration.register(container);
    BomHandlerRegistration.register(container);
    
    // Presentation
    container.register(BomModuleTokens.BomController, (c) => new BomController(c.resolve(BomModuleTokens.IBomApplicationService)), Lifetime.Scoped);

    // Note: Mediator registration requires handlers to be registered first
    BomMediatorRegistration.register(container);
  }
}
