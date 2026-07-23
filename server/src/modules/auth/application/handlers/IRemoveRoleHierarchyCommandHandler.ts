import { Result } from '../../../../core/results/Result';
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { RemoveRoleHierarchyCommand } from '../commands/RemoveRoleHierarchyCommand';


export interface IRemoveRoleHierarchyCommandHandler extends ICommandHandler<RemoveRoleHierarchyCommand, Result<void>> {}
