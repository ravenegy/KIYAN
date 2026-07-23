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
