import { Result } from '../../../../core/results/Result';
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { UpdatePermissionGroupCommand } from '../commands/UpdatePermissionGroupCommand';


export interface IUpdatePermissionGroupCommandHandler extends ICommandHandler<UpdatePermissionGroupCommand, Result<void>> {}
