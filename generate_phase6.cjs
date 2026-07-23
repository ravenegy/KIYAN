const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'server/src/modules/inventory/registration');

function ensureDir() {
  fs.mkdirSync(baseDir, { recursive: true });
}

function write(subpath, content) {
  fs.writeFileSync(path.join(baseDir, subpath), content.trim() + '\n');
}

ensureDir();

// InventoryModuleTokens.ts
write('InventoryModuleTokens.ts', `
import { Token } from '../../../core/di';
import { IMediator } from '../../../core/mediator';
import { IInventoryApplicationService, IInventoryReadService, IInventoryWriteService, IStockApplicationService, IStockReadService, IStockWriteService } from '../application/services';
import { InventoryItemMapper, StockMapper } from '../application/mappers/impl';
import { CreateInventoryValidator, UpdateInventoryValidator, AdjustStockValidator, TransferStockValidator, ReceiveStockValidator, IssueStockValidator } from '../application/validators/impl';
import { 
  CreateInventoryItemCommandHandler,
  UpdateInventoryItemCommandHandler,
  DeleteInventoryItemCommandHandler,
  ActivateInventoryItemCommandHandler,
  DeactivateInventoryItemCommandHandler,
  AdjustStockCommandHandler,
  TransferStockCommandHandler,
  ReceiveStockCommandHandler,
  IssueStockCommandHandler,
  GetInventoryItemByIdQueryHandler,
  GetInventoryBySkuQueryHandler,
  GetInventoryItemsQueryHandler,
  GetStockLevelsQueryHandler,
  SearchInventoryItemsQueryHandler
} from '../application/handlers/impl';

export const InventoryModuleTokens = {
  // Core
  IMediator: new Token<IMediator>('IMediator'),

  // Handlers - Commands
  CreateInventoryItemCommandHandler: new Token<CreateInventoryItemCommandHandler>('CreateInventoryItemCommandHandler'),
  UpdateInventoryItemCommandHandler: new Token<UpdateInventoryItemCommandHandler>('UpdateInventoryItemCommandHandler'),
  DeleteInventoryItemCommandHandler: new Token<DeleteInventoryItemCommandHandler>('DeleteInventoryItemCommandHandler'),
  ActivateInventoryItemCommandHandler: new Token<ActivateInventoryItemCommandHandler>('ActivateInventoryItemCommandHandler'),
  DeactivateInventoryItemCommandHandler: new Token<DeactivateInventoryItemCommandHandler>('DeactivateInventoryItemCommandHandler'),
  AdjustStockCommandHandler: new Token<AdjustStockCommandHandler>('AdjustStockCommandHandler'),
  TransferStockCommandHandler: new Token<TransferStockCommandHandler>('TransferStockCommandHandler'),
  ReceiveStockCommandHandler: new Token<ReceiveStockCommandHandler>('ReceiveStockCommandHandler'),
  IssueStockCommandHandler: new Token<IssueStockCommandHandler>('IssueStockCommandHandler'),

  // Handlers - Queries
  GetInventoryItemByIdQueryHandler: new Token<GetInventoryItemByIdQueryHandler>('GetInventoryItemByIdQueryHandler'),
  GetInventoryBySkuQueryHandler: new Token<GetInventoryBySkuQueryHandler>('GetInventoryBySkuQueryHandler'),
  GetInventoryItemsQueryHandler: new Token<GetInventoryItemsQueryHandler>('GetInventoryItemsQueryHandler'),
  GetStockLevelsQueryHandler: new Token<GetStockLevelsQueryHandler>('GetStockLevelsQueryHandler'),
  SearchInventoryItemsQueryHandler: new Token<SearchInventoryItemsQueryHandler>('SearchInventoryItemsQueryHandler'),

  // Application Services
  IInventoryApplicationService: new Token<IInventoryApplicationService>('IInventoryApplicationService'),
  IInventoryReadService: new Token<IInventoryReadService>('IInventoryReadService'),
  IInventoryWriteService: new Token<IInventoryWriteService>('IInventoryWriteService'),
  IStockApplicationService: new Token<IStockApplicationService>('IStockApplicationService'),
  IStockReadService: new Token<IStockReadService>('IStockReadService'),
  IStockWriteService: new Token<IStockWriteService>('IStockWriteService'),

  // Mappers
  InventoryItemMapper: new Token<InventoryItemMapper>('InventoryItemMapper'),
  StockMapper: new Token<StockMapper>('StockMapper'),

  // Validators
  CreateInventoryValidator: new Token<CreateInventoryValidator>('CreateInventoryValidator'),
  UpdateInventoryValidator: new Token<UpdateInventoryValidator>('UpdateInventoryValidator'),
  AdjustStockValidator: new Token<AdjustStockValidator>('AdjustStockValidator'),
  TransferStockValidator: new Token<TransferStockValidator>('TransferStockValidator'),
  ReceiveStockValidator: new Token<ReceiveStockValidator>('ReceiveStockValidator'),
  IssueStockValidator: new Token<IssueStockValidator>('IssueStockValidator'),
};
`);

// InventoryConfigurationRegistration.ts
write('InventoryConfigurationRegistration.ts', `
import { IContainer } from '../../../core/di';

export class InventoryConfigurationRegistration {
  public static register(container: IContainer): void {
    // Configuration registration is currently handled by the InfrastructureBootstrapper
  }
}
`);

// InventoryFactoryRegistration.ts
write('InventoryFactoryRegistration.ts', `
import { IContainer } from '../../../core/di';

export class InventoryFactoryRegistration {
  public static register(container: IContainer): void {
    // Factory registration is currently handled by the InfrastructureBootstrapper
  }
}
`);

// InventoryValidatorRegistration.ts
write('InventoryValidatorRegistration.ts', `
import { IContainer, Lifetime } from '../../../core/di';
import { InventoryModuleTokens } from './InventoryModuleTokens';
import {
  CreateInventoryValidator,
  UpdateInventoryValidator,
  AdjustStockValidator,
  TransferStockValidator,
  ReceiveStockValidator,
  IssueStockValidator
} from '../application/validators/impl';

export class InventoryValidatorRegistration {
  public static register(container: IContainer): void {
    container.register(InventoryModuleTokens.CreateInventoryValidator, () => new CreateInventoryValidator(), Lifetime.Singleton);
    container.register(InventoryModuleTokens.UpdateInventoryValidator, () => new UpdateInventoryValidator(), Lifetime.Singleton);
    container.register(InventoryModuleTokens.AdjustStockValidator, () => new AdjustStockValidator(), Lifetime.Singleton);
    container.register(InventoryModuleTokens.TransferStockValidator, () => new TransferStockValidator(), Lifetime.Singleton);
    container.register(InventoryModuleTokens.ReceiveStockValidator, () => new ReceiveStockValidator(), Lifetime.Singleton);
    container.register(InventoryModuleTokens.IssueStockValidator, () => new IssueStockValidator(), Lifetime.Singleton);
  }
}
`);

// InventoryMapperRegistration.ts
write('InventoryMapperRegistration.ts', `
import { IContainer, Lifetime } from '../../../core/di';
import { InventoryModuleTokens } from './InventoryModuleTokens';
import { InventoryItemMapper, StockMapper } from '../application/mappers/impl';

export class InventoryMapperRegistration {
  public static register(container: IContainer): void {
    container.register(InventoryModuleTokens.StockMapper, () => new StockMapper(), Lifetime.Singleton);
    container.register(
      InventoryModuleTokens.InventoryItemMapper,
      (c) => new InventoryItemMapper(c.resolve(InventoryModuleTokens.StockMapper)),
      Lifetime.Singleton
    );
  }
}
`);

// InventoryRepositoryRegistration.ts
write('InventoryRepositoryRegistration.ts', `
import { IContainer } from '../../../core/di';

export class InventoryRepositoryRegistration {
  public static register(container: IContainer): void {
    // Repository registration is currently handled by the InfrastructureBootstrapper
  }
}
`);

// InventoryServiceRegistration.ts
write('InventoryServiceRegistration.ts', `
import { IContainer, Lifetime } from '../../../core/di';
import { InventoryModuleTokens } from './InventoryModuleTokens';
import {
  InventoryApplicationService,
  InventoryReadService,
  InventoryWriteService,
  StockApplicationService,
  StockReadService,
  StockWriteService
} from '../application/services/impl';

export class InventoryServiceRegistration {
  public static register(container: IContainer): void {
    container.register(
      InventoryModuleTokens.IInventoryApplicationService,
      (c) => new InventoryApplicationService(c.resolve(InventoryModuleTokens.IMediator)),
      Lifetime.Scoped
    );
    container.register(
      InventoryModuleTokens.IInventoryReadService,
      (c) => new InventoryReadService(c.resolve(InventoryModuleTokens.IMediator)),
      Lifetime.Scoped
    );
    container.register(
      InventoryModuleTokens.IInventoryWriteService,
      (c) => new InventoryWriteService(c.resolve(InventoryModuleTokens.IMediator)),
      Lifetime.Scoped
    );
    container.register(
      InventoryModuleTokens.IStockApplicationService,
      (c) => new StockApplicationService(c.resolve(InventoryModuleTokens.IMediator)),
      Lifetime.Scoped
    );
    container.register(
      InventoryModuleTokens.IStockReadService,
      (c) => new StockReadService(c.resolve(InventoryModuleTokens.IMediator)),
      Lifetime.Scoped
    );
    container.register(
      InventoryModuleTokens.IStockWriteService,
      (c) => new StockWriteService(c.resolve(InventoryModuleTokens.IMediator)),
      Lifetime.Scoped
    );
  }
}
`);

// InventoryHandlerRegistration.ts
write('InventoryHandlerRegistration.ts', `
import { IContainer, Lifetime } from '../../../core/di';
import { InventoryModuleTokens } from './InventoryModuleTokens';
import { 
  CreateInventoryItemCommandHandler,
  UpdateInventoryItemCommandHandler,
  DeleteInventoryItemCommandHandler,
  ActivateInventoryItemCommandHandler,
  DeactivateInventoryItemCommandHandler,
  AdjustStockCommandHandler,
  TransferStockCommandHandler,
  ReceiveStockCommandHandler,
  IssueStockCommandHandler,
  GetInventoryItemByIdQueryHandler,
  GetInventoryBySkuQueryHandler,
  GetInventoryItemsQueryHandler,
  GetStockLevelsQueryHandler,
  SearchInventoryItemsQueryHandler
} from '../application/handlers/impl';

export class InventoryHandlerRegistration {
  public static register(container: IContainer): void {
    // Commands
    container.register(InventoryModuleTokens.CreateInventoryItemCommandHandler, () => new CreateInventoryItemCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.UpdateInventoryItemCommandHandler, () => new UpdateInventoryItemCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.DeleteInventoryItemCommandHandler, () => new DeleteInventoryItemCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.ActivateInventoryItemCommandHandler, () => new ActivateInventoryItemCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.DeactivateInventoryItemCommandHandler, () => new DeactivateInventoryItemCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.AdjustStockCommandHandler, () => new AdjustStockCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.TransferStockCommandHandler, () => new TransferStockCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.ReceiveStockCommandHandler, () => new ReceiveStockCommandHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.IssueStockCommandHandler, () => new IssueStockCommandHandler(), Lifetime.Scoped);

    // Queries
    container.register(InventoryModuleTokens.GetInventoryItemByIdQueryHandler, () => new GetInventoryItemByIdQueryHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.GetInventoryBySkuQueryHandler, () => new GetInventoryBySkuQueryHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.GetInventoryItemsQueryHandler, () => new GetInventoryItemsQueryHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.GetStockLevelsQueryHandler, () => new GetStockLevelsQueryHandler(), Lifetime.Scoped);
    container.register(InventoryModuleTokens.SearchInventoryItemsQueryHandler, () => new SearchInventoryItemsQueryHandler(), Lifetime.Scoped);
  }
}
`);

// InventoryMediatorRegistration.ts
write('InventoryMediatorRegistration.ts', `
import { IContainer } from '../../../core/di';
import { IMediator } from '../../../core/mediator';
import { InventoryModuleTokens } from './InventoryModuleTokens';

// Commands
import { CreateInventoryItemCommand } from '../application/commands/CreateInventoryItemCommand';
import { UpdateInventoryItemCommand } from '../application/commands/UpdateInventoryItemCommand';
import { DeleteInventoryItemCommand } from '../application/commands/DeleteInventoryItemCommand';
import { ActivateInventoryItemCommand } from '../application/commands/ActivateInventoryItemCommand';
import { DeactivateInventoryItemCommand } from '../application/commands/DeactivateInventoryItemCommand';
import { AdjustStockCommand } from '../application/commands/AdjustStockCommand';
import { TransferStockCommand } from '../application/commands/TransferStockCommand';
import { ReceiveStockCommand } from '../application/commands/ReceiveStockCommand';
import { IssueStockCommand } from '../application/commands/IssueStockCommand';

// Queries
import { GetInventoryItemByIdQuery } from '../application/queries/GetInventoryItemByIdQuery';
import { GetInventoryBySkuQuery } from '../application/queries/GetInventoryBySkuQuery';
import { GetInventoryItemsQuery } from '../application/queries/GetInventoryItemsQuery';
import { GetStockLevelsQuery } from '../application/queries/GetStockLevelsQuery';
import { SearchInventoryItemsQuery } from '../application/queries/SearchInventoryItemsQuery';

export class InventoryMediatorRegistration {
  public static register(container: IContainer): void {
    const mediator = container.resolve<IMediator>(InventoryModuleTokens.IMediator);

    // Register Command Handlers
    mediator.registerHandler(
      CreateInventoryItemCommand.name,
      () => container.resolve(InventoryModuleTokens.CreateInventoryItemCommandHandler)
    );
    mediator.registerHandler(
      UpdateInventoryItemCommand.name,
      () => container.resolve(InventoryModuleTokens.UpdateInventoryItemCommandHandler)
    );
    mediator.registerHandler(
      DeleteInventoryItemCommand.name,
      () => container.resolve(InventoryModuleTokens.DeleteInventoryItemCommandHandler)
    );
    mediator.registerHandler(
      ActivateInventoryItemCommand.name,
      () => container.resolve(InventoryModuleTokens.ActivateInventoryItemCommandHandler)
    );
    mediator.registerHandler(
      DeactivateInventoryItemCommand.name,
      () => container.resolve(InventoryModuleTokens.DeactivateInventoryItemCommandHandler)
    );
    mediator.registerHandler(
      AdjustStockCommand.name,
      () => container.resolve(InventoryModuleTokens.AdjustStockCommandHandler)
    );
    mediator.registerHandler(
      TransferStockCommand.name,
      () => container.resolve(InventoryModuleTokens.TransferStockCommandHandler)
    );
    mediator.registerHandler(
      ReceiveStockCommand.name,
      () => container.resolve(InventoryModuleTokens.ReceiveStockCommandHandler)
    );
    mediator.registerHandler(
      IssueStockCommand.name,
      () => container.resolve(InventoryModuleTokens.IssueStockCommandHandler)
    );

    // Register Query Handlers
    mediator.registerHandler(
      GetInventoryItemByIdQuery.name,
      () => container.resolve(InventoryModuleTokens.GetInventoryItemByIdQueryHandler)
    );
    mediator.registerHandler(
      GetInventoryBySkuQuery.name,
      () => container.resolve(InventoryModuleTokens.GetInventoryBySkuQueryHandler)
    );
    mediator.registerHandler(
      GetInventoryItemsQuery.name,
      () => container.resolve(InventoryModuleTokens.GetInventoryItemsQueryHandler)
    );
    mediator.registerHandler(
      GetStockLevelsQuery.name,
      () => container.resolve(InventoryModuleTokens.GetStockLevelsQueryHandler)
    );
    mediator.registerHandler(
      SearchInventoryItemsQuery.name,
      () => container.resolve(InventoryModuleTokens.SearchInventoryItemsQueryHandler)
    );
  }
}
`);

// InventoryDependencyRegistration.ts
write('InventoryDependencyRegistration.ts', `
import { IContainer } from '../../../core/di';
import { InventoryConfigurationRegistration } from './InventoryConfigurationRegistration';
import { InventoryFactoryRegistration } from './InventoryFactoryRegistration';
import { InventoryValidatorRegistration } from './InventoryValidatorRegistration';
import { InventoryMapperRegistration } from './InventoryMapperRegistration';
import { InventoryRepositoryRegistration } from './InventoryRepositoryRegistration';
import { InventoryServiceRegistration } from './InventoryServiceRegistration';
import { InventoryHandlerRegistration } from './InventoryHandlerRegistration';
import { InventoryMediatorRegistration } from './InventoryMediatorRegistration';

export class InventoryDependencyRegistration {
  public static register(container: IContainer): void {
    InventoryConfigurationRegistration.register(container);
    InventoryFactoryRegistration.register(container);
    InventoryValidatorRegistration.register(container);
    InventoryMapperRegistration.register(container);
    InventoryRepositoryRegistration.register(container);
    InventoryServiceRegistration.register(container);
    InventoryHandlerRegistration.register(container);
    
    // Note: Mediator registration requires handlers to be registered first
    InventoryMediatorRegistration.register(container);
  }
}
`);

// index.ts
write('index.ts', `
export * from './InventoryModuleTokens';
export * from './InventoryConfigurationRegistration';
export * from './InventoryFactoryRegistration';
export * from './InventoryValidatorRegistration';
export * from './InventoryMapperRegistration';
export * from './InventoryRepositoryRegistration';
export * from './InventoryServiceRegistration';
export * from './InventoryHandlerRegistration';
export * from './InventoryMediatorRegistration';
export * from './InventoryDependencyRegistration';
`);
