import { Result } from '../../../../core/results/Result';
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { AssignRoleCommand } from '../commands/AssignRoleCommand';


export interface IAssignRoleCommandHandler extends ICommandHandler<AssignRoleCommand, Result<string>> {}
