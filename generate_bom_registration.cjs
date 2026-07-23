const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/bom/registration');
function write(subpath, content) {
    const dir = path.dirname(path.join(modDir, subpath));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(modDir, subpath), content.trim() + '\n');
}

write('BomModuleTokens.ts', `
import { Token } from '../../../core/di';
import { IBomApplicationService } from '../application/services/IBomApplicationService';
import { IBomMapper } from '../application/mappers/IBomMapper';
import { IBomValidator } from '../application/validators/IBomValidator';
import { IBomRepository } from '../domain/repositories/IBomRepository';
import { IDomainGuid } from '../../../core/domain/services/IDomainGuid';

import { ActivateBomCommandHandler } from '../application/handlers/impl/ActivateBomCommandHandler';
import { AddBomComponentCommandHandler } from '../application/handlers/impl/AddBomComponentCommandHandler';
import { ArchiveBomCommandHandler } from '../application/handlers/impl/ArchiveBomCommandHandler';
import { CreateBomCommandHandler } from '../application/handlers/impl/CreateBomCommandHandler';
import { RemoveBomComponentCommandHandler } from '../application/handlers/impl/RemoveBomComponentCommandHandler';

import { GetActiveBomByTargetItemQueryHandler } from '../application/handlers/impl/GetActiveBomByTargetItemQueryHandler';
import { GetBomByIdQueryHandler } from '../application/handlers/impl/GetBomByIdQueryHandler';
import { GetBomsByTargetItemQueryHandler } from '../application/handlers/impl/GetBomsByTargetItemQueryHandler';

export const BomModuleTokens = {
  // Handlers - Commands
  ActivateBomCommandHandler: new Token<ActivateBomCommandHandler>('ActivateBomCommandHandler'),
  AddBomComponentCommandHandler: new Token<AddBomComponentCommandHandler>('AddBomComponentCommandHandler'),
  ArchiveBomCommandHandler: new Token<ArchiveBomCommandHandler>('ArchiveBomCommandHandler'),
  CreateBomCommandHandler: new Token<CreateBomCommandHandler>('CreateBomCommandHandler'),
  RemoveBomComponentCommandHandler: new Token<RemoveBomComponentCommandHandler>('RemoveBomComponentCommandHandler'),
  
  // Handlers - Queries
  GetActiveBomByTargetItemQueryHandler: new Token<GetActiveBomByTargetItemQueryHandler>('GetActiveBomByTargetItemQueryHandler'),
  GetBomByIdQueryHandler: new Token<GetBomByIdQueryHandler>('GetBomByIdQueryHandler'),
  GetBomsByTargetItemQueryHandler: new Token<GetBomsByTargetItemQueryHandler>('GetBomsByTargetItemQueryHandler'),
  
  // Application Services
  IBomApplicationService: new Token<IBomApplicationService>('IBomApplicationService'),
  
  // Mappers
  IBomMapper: new Token<IBomMapper>('IBomMapper'),
  
  // Validators
  IBomValidator: new Token<IBomValidator>('IBomValidator'),

  // Repositories
  IBomRepository: new Token<IBomRepository>('IBomRepository'),
  
  // Services
  IDomainGuid: new Token<IDomainGuid>('IDomainGuid')
};
`);

write('BomConfigurationRegistration.ts', `
import { IContainer } from '../../../core/di';
import { BomInfrastructureBootstrapper } from '../infrastructure/bootstrap/BomInfrastructureBootstrapper';
import { BomInfrastructureOptions } from '../infrastructure/configuration/BomInfrastructureOptions';

export class BomConfigurationRegistration {
  public static register(container: IContainer): void {
    // Infrastructure configuration is resolved by Bootstrapper in repository/factory registration
  }
}
`);

write('BomFactoryRegistration.ts', `
import { IContainer } from '../../../core/di';

export class BomFactoryRegistration {
  public static register(container: IContainer): void {
    // Factories are managed by InfrastructureBootstrapper and resolved at Repository level
  }
}
`);

write('BomValidatorRegistration.ts', `
import { IContainer, Lifetime } from '../../../core/di';
import { BomModuleTokens } from './BomModuleTokens';
import { BomValidator } from '../application/validators/impl/BomValidator';

export class BomValidatorRegistration {
  public static register(container: IContainer): void {
    container.register(BomModuleTokens.IBomValidator, () => new BomValidator(), Lifetime.Singleton);
  }
}
`);

write('BomMapperRegistration.ts', `
import { IContainer, Lifetime } from '../../../core/di';
import { BomModuleTokens } from './BomModuleTokens';
import { BomMapper } from '../application/mappers/impl/BomMapper';

export class BomMapperRegistration {
  public static register(container: IContainer): void {
    container.register(BomModuleTokens.IBomMapper, () => new BomMapper(), Lifetime.Singleton);
  }
}
`);

write('BomRepositoryRegistration.ts', `
import { IContainer, Lifetime } from '../../../core/di';
import { BomModuleTokens } from './BomModuleTokens';
import { BomInfrastructureBootstrapper } from '../infrastructure/bootstrap/BomInfrastructureBootstrapper';
import { BomInfrastructureOptions } from '../infrastructure/configuration/BomInfrastructureOptions';

export class BomRepositoryRegistration {
  public static register(container: IContainer): void {
    const options: BomInfrastructureOptions = { useInMemoryStore: true }; // Configuration resolution goes here
    const infraService = BomInfrastructureBootstrapper.bootstrap(options);
    
    container.register(
      BomModuleTokens.IBomRepository,
      () => infraService.getBomRepository(),
      Lifetime.Singleton
    );
  }
}
`);

write('BomServiceRegistration.ts', `
import { IContainer, Lifetime } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { BomModuleTokens } from './BomModuleTokens';
import { BomApplicationService } from '../application/services/impl/BomApplicationService';
import { GuidGenerator } from '../../../core/domain/services/GuidGenerator';

export class BomServiceRegistration {
  public static register(container: IContainer): void {
    container.register(
      BomModuleTokens.IDomainGuid,
      () => new GuidGenerator(),
      Lifetime.Singleton
    );

    container.register(
      BomModuleTokens.IBomApplicationService,
      (c) => new BomApplicationService(
        c.resolve(CoreTokens.Mediator),
        c.resolve(BomModuleTokens.IBomValidator)
      ),
      Lifetime.Scoped
    );
  }
}
`);

write('BomHandlerRegistration.ts', `
import { IContainer, Lifetime } from '../../../core/di';
import { BomModuleTokens } from './BomModuleTokens';

import { ActivateBomCommandHandler } from '../application/handlers/impl/ActivateBomCommandHandler';
import { AddBomComponentCommandHandler } from '../application/handlers/impl/AddBomComponentCommandHandler';
import { ArchiveBomCommandHandler } from '../application/handlers/impl/ArchiveBomCommandHandler';
import { CreateBomCommandHandler } from '../application/handlers/impl/CreateBomCommandHandler';
import { RemoveBomComponentCommandHandler } from '../application/handlers/impl/RemoveBomComponentCommandHandler';

import { GetActiveBomByTargetItemQueryHandler } from '../application/handlers/impl/GetActiveBomByTargetItemQueryHandler';
import { GetBomByIdQueryHandler } from '../application/handlers/impl/GetBomByIdQueryHandler';
import { GetBomsByTargetItemQueryHandler } from '../application/handlers/impl/GetBomsByTargetItemQueryHandler';

export class BomHandlerRegistration {
  public static register(container: IContainer): void {
    // Commands
    container.register(BomModuleTokens.ActivateBomCommandHandler, (c) => new ActivateBomCommandHandler(
      c.resolve(BomModuleTokens.IBomRepository)
    ), Lifetime.Scoped);
    
    container.register(BomModuleTokens.AddBomComponentCommandHandler, (c) => new AddBomComponentCommandHandler(
      c.resolve(BomModuleTokens.IBomRepository),
      c.resolve(BomModuleTokens.IDomainGuid)
    ), Lifetime.Scoped);

    container.register(BomModuleTokens.ArchiveBomCommandHandler, (c) => new ArchiveBomCommandHandler(
      c.resolve(BomModuleTokens.IBomRepository)
    ), Lifetime.Scoped);

    container.register(BomModuleTokens.CreateBomCommandHandler, (c) => new CreateBomCommandHandler(
      c.resolve(BomModuleTokens.IBomRepository),
      c.resolve(BomModuleTokens.IDomainGuid)
    ), Lifetime.Scoped);

    container.register(BomModuleTokens.RemoveBomComponentCommandHandler, (c) => new RemoveBomComponentCommandHandler(
      c.resolve(BomModuleTokens.IBomRepository)
    ), Lifetime.Scoped);

    // Queries
    container.register(BomModuleTokens.GetActiveBomByTargetItemQueryHandler, (c) => new GetActiveBomByTargetItemQueryHandler(
      c.resolve(BomModuleTokens.IBomRepository),
      c.resolve(BomModuleTokens.IBomMapper)
    ), Lifetime.Scoped);

    container.register(BomModuleTokens.GetBomByIdQueryHandler, (c) => new GetBomByIdQueryHandler(
      c.resolve(BomModuleTokens.IBomRepository),
      c.resolve(BomModuleTokens.IBomMapper)
    ), Lifetime.Scoped);

    container.register(BomModuleTokens.GetBomsByTargetItemQueryHandler, (c) => new GetBomsByTargetItemQueryHandler(
      c.resolve(BomModuleTokens.IBomRepository),
      c.resolve(BomModuleTokens.IBomMapper)
    ), Lifetime.Scoped);
  }
}
`);

write('BomMediatorRegistration.ts', `
import { IContainer } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { ICommandBus, IQueryBus } from '../../../core/mediator';
import { BomModuleTokens } from './BomModuleTokens';

import { ActivateBomCommand } from '../application/commands/ActivateBomCommand';
import { AddBomComponentCommand } from '../application/commands/AddBomComponentCommand';
import { ArchiveBomCommand } from '../application/commands/ArchiveBomCommand';
import { CreateBomCommand } from '../application/commands/CreateBomCommand';
import { RemoveBomComponentCommand } from '../application/commands/RemoveBomComponentCommand';

import { GetActiveBomByTargetItemQuery } from '../application/queries/GetActiveBomByTargetItemQuery';
import { GetBomByIdQuery } from '../application/queries/GetBomByIdQuery';
import { GetBomsByTargetItemQuery } from '../application/queries/GetBomsByTargetItemQuery';

export class BomMediatorRegistration {
  public static register(container: IContainer): void {
    const commandBus = container.resolve<ICommandBus>(CoreTokens.CommandBus);
    const queryBus = container.resolve<IQueryBus>(CoreTokens.QueryBus);

    // Commands
    commandBus.register(
      ActivateBomCommand.name,
      { handle: (command: ActivateBomCommand) => container.resolve(BomModuleTokens.ActivateBomCommandHandler).handle(command) }
    );
    
    commandBus.register(
      AddBomComponentCommand.name,
      { handle: (command: AddBomComponentCommand) => container.resolve(BomModuleTokens.AddBomComponentCommandHandler).handle(command) }
    );

    commandBus.register(
      ArchiveBomCommand.name,
      { handle: (command: ArchiveBomCommand) => container.resolve(BomModuleTokens.ArchiveBomCommandHandler).handle(command) }
    );

    commandBus.register(
      CreateBomCommand.name,
      { handle: (command: CreateBomCommand) => container.resolve(BomModuleTokens.CreateBomCommandHandler).handle(command) }
    );

    commandBus.register(
      RemoveBomComponentCommand.name,
      { handle: (command: RemoveBomComponentCommand) => container.resolve(BomModuleTokens.RemoveBomComponentCommandHandler).handle(command) }
    );

    // Queries
    queryBus.register(
      GetActiveBomByTargetItemQuery.name,
      { handle: (query: GetActiveBomByTargetItemQuery) => container.resolve(BomModuleTokens.GetActiveBomByTargetItemQueryHandler).handle(query) }
    );

    queryBus.register(
      GetBomByIdQuery.name,
      { handle: (query: GetBomByIdQuery) => container.resolve(BomModuleTokens.GetBomByIdQueryHandler).handle(query) }
    );

    queryBus.register(
      GetBomsByTargetItemQuery.name,
      { handle: (query: GetBomsByTargetItemQuery) => container.resolve(BomModuleTokens.GetBomsByTargetItemQueryHandler).handle(query) }
    );
  }
}
`);

write('BomDependencyRegistration.ts', `
import { IContainer } from '../../../core/di';
import { BomConfigurationRegistration } from './BomConfigurationRegistration';
import { BomFactoryRegistration } from './BomFactoryRegistration';
import { BomValidatorRegistration } from './BomValidatorRegistration';
import { BomMapperRegistration } from './BomMapperRegistration';
import { BomRepositoryRegistration } from './BomRepositoryRegistration';
import { BomServiceRegistration } from './BomServiceRegistration';
import { BomHandlerRegistration } from './BomHandlerRegistration';
import { BomMediatorRegistration } from './BomMediatorRegistration';

export class BomDependencyRegistration {
  public static register(container: IContainer): void {
    BomConfigurationRegistration.register(container);
    BomFactoryRegistration.register(container);
    BomValidatorRegistration.register(container);
    BomMapperRegistration.register(container);
    BomRepositoryRegistration.register(container);
    BomServiceRegistration.register(container);
    BomHandlerRegistration.register(container);
    
    // Note: Mediator registration requires handlers to be registered first
    BomMediatorRegistration.register(container);
  }
}
`);

write('index.ts', `
export * from './BomConfigurationRegistration';
export * from './BomDependencyRegistration';
export * from './BomFactoryRegistration';
export * from './BomHandlerRegistration';
export * from './BomMapperRegistration';
export * from './BomMediatorRegistration';
export * from './BomModuleTokens';
export * from './BomRepositoryRegistration';
export * from './BomServiceRegistration';
export * from './BomValidatorRegistration';
`);
