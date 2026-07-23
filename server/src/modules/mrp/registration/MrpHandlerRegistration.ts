import { IContainer, Lifetime } from '../../../core/di';
import { MrpModuleTokens } from './MrpModuleTokens';

// Commands
import { CancelMrpRunCommandHandler } from '../application/handlers/commands/CancelMrpRunCommandHandler';
import { CancelPlannedOrderCommandHandler } from '../application/handlers/commands/CancelPlannedOrderCommandHandler';
import { CompleteMrpRunCommandHandler } from '../application/handlers/commands/CompleteMrpRunCommandHandler';
import { CreateMrpRunCommandHandler } from '../application/handlers/commands/CreateMrpRunCommandHandler';
import { CreatePlannedOrderCommandHandler } from '../application/handlers/commands/CreatePlannedOrderCommandHandler';
import { FirmPlannedOrderCommandHandler } from '../application/handlers/commands/FirmPlannedOrderCommandHandler';
import { ReleasePlannedOrderCommandHandler } from '../application/handlers/commands/ReleasePlannedOrderCommandHandler';
import { StartMrpRunCommandHandler } from '../application/handlers/commands/StartMrpRunCommandHandler';

// Queries
import { GetMaterialRequirementsQueryHandler } from '../application/handlers/queries/GetMaterialRequirementsQueryHandler';
import { GetMrpRunByIdQueryHandler } from '../application/handlers/queries/GetMrpRunByIdQueryHandler';
import { GetPlannedOrderByIdQueryHandler } from '../application/handlers/queries/GetPlannedOrderByIdQueryHandler';
import { GetPlannedOrdersQueryHandler } from '../application/handlers/queries/GetPlannedOrdersQueryHandler';
import { SearchPlannedOrdersQueryHandler } from '../application/handlers/queries/SearchPlannedOrdersQueryHandler';

export class MrpHandlerRegistration {
  public static register(container: IContainer): void {
    // Command Handlers
    container.register(MrpModuleTokens.CancelMrpRunCommandHandler, (c) => new CancelMrpRunCommandHandler(
      c.resolve(MrpModuleTokens.IMrpRunRepository)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.CancelPlannedOrderCommandHandler, (c) => new CancelPlannedOrderCommandHandler(
      c.resolve(MrpModuleTokens.IPlannedOrderRepository)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.CompleteMrpRunCommandHandler, (c) => new CompleteMrpRunCommandHandler(
      c.resolve(MrpModuleTokens.IMrpRunRepository)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.CreateMrpRunCommandHandler, (c) => new CreateMrpRunCommandHandler(
      c.resolve(MrpModuleTokens.IMrpRunRepository)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.CreatePlannedOrderCommandHandler, (c) => new CreatePlannedOrderCommandHandler(
      c.resolve(MrpModuleTokens.IPlannedOrderRepository)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.FirmPlannedOrderCommandHandler, (c) => new FirmPlannedOrderCommandHandler(
      c.resolve(MrpModuleTokens.IPlannedOrderRepository)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.ReleasePlannedOrderCommandHandler, (c) => new ReleasePlannedOrderCommandHandler(
      c.resolve(MrpModuleTokens.IPlannedOrderRepository)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.StartMrpRunCommandHandler, (c) => new StartMrpRunCommandHandler(
      c.resolve(MrpModuleTokens.IMrpRunRepository)
    ), Lifetime.Scoped);

    // Query Handlers
    container.register(MrpModuleTokens.GetMaterialRequirementsQueryHandler, (c) => new GetMaterialRequirementsQueryHandler(
      c.resolve(MrpModuleTokens.IMaterialRequirementRepository),
      c.resolve(MrpModuleTokens.IMaterialRequirementMapper)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.GetMrpRunByIdQueryHandler, (c) => new GetMrpRunByIdQueryHandler(
      c.resolve(MrpModuleTokens.IMrpRunRepository),
      c.resolve(MrpModuleTokens.IMrpRunMapper)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.GetPlannedOrderByIdQueryHandler, (c) => new GetPlannedOrderByIdQueryHandler(
      c.resolve(MrpModuleTokens.IPlannedOrderRepository),
      c.resolve(MrpModuleTokens.IPlannedOrderMapper)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.GetPlannedOrdersQueryHandler, (c) => new GetPlannedOrdersQueryHandler(
      c.resolve(MrpModuleTokens.IPlannedOrderRepository),
      c.resolve(MrpModuleTokens.IPlannedOrderMapper)
    ), Lifetime.Scoped);

    container.register(MrpModuleTokens.SearchPlannedOrdersQueryHandler, (c) => new SearchPlannedOrdersQueryHandler(
      c.resolve(MrpModuleTokens.IPlannedOrderRepository),
      c.resolve(MrpModuleTokens.IPlannedOrderMapper)
    ), Lifetime.Scoped);
  }
}
