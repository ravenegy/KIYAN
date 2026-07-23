import { Result } from '../../../../core/results/Result';
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { CreatePermissionGroupCommand } from '../commands/CreatePermissionGroupCommand';


export interface ICreatePermissionGroupCommandHandler extends ICommandHandler<CreatePermissionGroupCommand, Result<string>> {}
