import { Result } from '../../../../core/results/Result';
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { AssignPermissionCommand } from '../commands/AssignPermissionCommand';


export interface IAssignPermissionCommandHandler extends ICommandHandler<AssignPermissionCommand, Result<string>> {}
