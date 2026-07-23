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
      c.resolve(BomModuleTokens.BomCycleDetectionService),
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
