import { Result } from '../../../../core/results/Result';
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { DeletePermissionGroupCommand } from '../commands/DeletePermissionGroupCommand';


export interface IDeletePermissionGroupCommandHandler extends ICommandHandler<DeletePermissionGroupCommand, Result<void>> {}
