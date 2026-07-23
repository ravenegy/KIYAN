import { IContainer } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { ICommandBus, IQueryBus } from '../../../core/mediator';
import { MrpModuleTokens } from './MrpModuleTokens';

import { CancelMrpRunCommand } from '../application/commands/CancelMrpRunCommand';
import { CancelPlannedOrderCommand } from '../application/commands/CancelPlannedOrderCommand';
import { CompleteMrpRunCommand } from '../application/commands/CompleteMrpRunCommand';
import { CreateMrpRunCommand } from '../application/commands/CreateMrpRunCommand';
import { CreatePlannedOrderCommand } from '../application/commands/CreatePlannedOrderCommand';
import { FirmPlannedOrderCommand } from '../application/commands/FirmPlannedOrderCommand';
import { ReleasePlannedOrderCommand } from '../application/commands/ReleasePlannedOrderCommand';
import { StartMrpRunCommand } from '../application/commands/StartMrpRunCommand';

import { GetMaterialRequirementsQuery } from '../application/queries/GetMaterialRequirementsQuery';
import { GetMrpRunByIdQuery } from '../application/queries/GetMrpRunByIdQuery';
import { GetPlannedOrderByIdQuery } from '../application/queries/GetPlannedOrderByIdQuery';
import { GetPlannedOrdersQuery } from '../application/queries/GetPlannedOrdersQuery';
import { SearchPlannedOrdersQuery } from '../application/queries/SearchPlannedOrdersQuery';

export class MrpMediatorRegistration {
  public static register(container: IContainer): void {
    const commandBus = container.resolve<ICommandBus>(CoreTokens.CommandBus);
    const queryBus = container.resolve<IQueryBus>(CoreTokens.QueryBus);

    // Commands
    commandBus.register(
      CancelMrpRunCommand.name,
      { handle: (command: CancelMrpRunCommand) => container.resolve(MrpModuleTokens.CancelMrpRunCommandHandler).handle(command) }
    );

    commandBus.register(
      CancelPlannedOrderCommand.name,
      { handle: (command: CancelPlannedOrderCommand) => container.resolve(MrpModuleTokens.CancelPlannedOrderCommandHandler).handle(command) }
    );

    commandBus.register(
      CompleteMrpRunCommand.name,
      { handle: (command: CompleteMrpRunCommand) => container.resolve(MrpModuleTokens.CompleteMrpRunCommandHandler).handle(command) }
    );

    commandBus.register(
      CreateMrpRunCommand.name,
      { handle: (command: CreateMrpRunCommand) => container.resolve(MrpModuleTokens.CreateMrpRunCommandHandler).handle(command) }
    );

    commandBus.register(
      CreatePlannedOrderCommand.name,
      { handle: (command: CreatePlannedOrderCommand) => container.resolve(MrpModuleTokens.CreatePlannedOrderCommandHandler).handle(command) }
    );

    commandBus.register(
      FirmPlannedOrderCommand.name,
      { handle: (command: FirmPlannedOrderCommand) => container.resolve(MrpModuleTokens.FirmPlannedOrderCommandHandler).handle(command) }
    );

    commandBus.register(
      ReleasePlannedOrderCommand.name,
      { handle: (command: ReleasePlannedOrderCommand) => container.resolve(MrpModuleTokens.ReleasePlannedOrderCommandHandler).handle(command) }
    );

    commandBus.register(
      StartMrpRunCommand.name,
      { handle: (command: StartMrpRunCommand) => container.resolve(MrpModuleTokens.StartMrpRunCommandHandler).handle(command) }
    );

    // Queries
    queryBus.register(
      GetMaterialRequirementsQuery.name,
      { handle: (query: GetMaterialRequirementsQuery) => container.resolve(MrpModuleTokens.GetMaterialRequirementsQueryHandler).handle(query) }
    );

    queryBus.register(
      GetMrpRunByIdQuery.name,
      { handle: (query: GetMrpRunByIdQuery) => container.resolve(MrpModuleTokens.GetMrpRunByIdQueryHandler).handle(query) }
    );

    queryBus.register(
      GetPlannedOrderByIdQuery.name,
      { handle: (query: GetPlannedOrderByIdQuery) => container.resolve(MrpModuleTokens.GetPlannedOrderByIdQueryHandler).handle(query) }
    );

    queryBus.register(
      GetPlannedOrdersQuery.name,
      { handle: (query: GetPlannedOrdersQuery) => container.resolve(MrpModuleTokens.GetPlannedOrdersQueryHandler).handle(query) }
    );

    queryBus.register(
      SearchPlannedOrdersQuery.name,
      { handle: (query: SearchPlannedOrdersQuery) => container.resolve(MrpModuleTokens.SearchPlannedOrdersQueryHandler).handle(query) }
    );
  }
}
